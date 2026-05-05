import { NextRequest, NextResponse } from "next/server";
import { getEpd, saveEpd } from "@/lib/epd/store";
import { isDppReady } from "@/lib/epd/validator";
import type { ErrorResponse } from "@/lib/epd/schema";

function generateDppId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "dpp_";
  for (let i = 0; i < 10; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// Map EPD modules to ESPR DPP schema fields
function buildDppPayload(epd: ReturnType<typeof getEpd>) {
  if (!epd) return null;

  const cv = epd.carbon?.values ?? {};

  // Sum total lifecycle GWP (excluding D)
  const lifecycleKeys = ["a1_a3","a4","a5","b1","b2","b3","b4","b5","b6","b7","c1","c2","c3","c4"] as const;
  const totalGwp = lifecycleKeys.reduce((acc, k) => {
    const v = cv[k];
    return v != null ? acc + v : acc;
  }, 0);

  return {
    // ESPR DPP mandatory fields
    dpp_id:             generateDppId(),
    created_at:         new Date().toISOString(),
    schema_version:     "ESPR-2024-v1",
    status:             "draft",

    // Product identity
    product: {
      name:            epd.product.name,
      manufacturer:    epd.product.manufacturer,
      declared_unit:   epd.product.declared_unit,
      geography:       epd.product.geography,
    },

    // Compliance & traceability
    declarations: {
      epd_number:          epd.epd_info.epd_number,
      epd_standard:        epd.epd_info.standard,
      programme_operator:  epd.epd_info.programme_operator,
      verifier:            epd.epd_info.verifier,
      valid_until:         epd.epd_info.valid_until,
    },

    // Carbon footprint — EN 15804 module breakdown
    carbon_footprint: {
      unit:              epd.carbon.unit,
      total_lifecycle:   Math.round(totalGwp * 100) / 100,
      a1_a3_manufacturing: cv.a1_a3,
      a4_transport:        cv.a4,
      a5_installation:     cv.a5,
      b_use_stage:         [cv.b1, cv.b2, cv.b3, cv.b4, cv.b5, cv.b6, cv.b7].filter(Boolean).reduce<number>((a, v) => a + (v ?? 0), 0) || null,
      c_end_of_life:       [cv.c1, cv.c2, cv.c3, cv.c4].filter(Boolean).reduce<number>((a, v) => a + (v ?? 0), 0) || null,
      d_recycling_benefit: cv.d,
    },

    // Material composition
    material_composition: epd.materials.map((m) => ({
      material:    m.name,
      percentage:  m.percentage,
      mass_kg:     m.mass_kg,
    })),

    // Environmental indicators summary
    environmental_indicators: Object.entries(epd.indicators).map(([key, ind]) => ({
      indicator: key.toUpperCase(),
      label:     ind?.label,
      unit:      ind?.unit,
      a1_a3:     ind?.values?.a1_a3,
    })),

    // Access control (ESPR requires role-based visibility)
    access_control: {
      public_fields:       ["product.name", "carbon_footprint.total_lifecycle", "material_composition", "declarations.valid_until"],
      manufacturer_fields: ["*"],
      auditor_fields:      ["*", "declarations", "environmental_indicators"],
      oem_fields:          ["carbon_footprint", "material_composition", "declarations"],
    },

    // QR / NFC
    distribution: {
      qr_url:       `https://floilan.com/passport/${generateDppId()}`,
      nfc_ndef:     true,
      public_link:  true,
    },
  };
}

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const epd = getEpd(params.id);
  if (!epd) {
    return NextResponse.json<ErrorResponse>(
      { success: false, error: `EPD '${params.id}' not found.` },
      { status: 404 },
    );
  }

  if (!isDppReady(epd)) {
    return NextResponse.json(
      {
        success:  false,
        error:    "EPD does not have sufficient data for DPP conversion.",
        detail:   "Ensure product name, EPD number, programme operator, and GWP A1-A3 are all present. Run POST /validate first.",
        dpp_ready: false,
      },
      { status: 422 },
    );
  }

  const dpp = buildDppPayload(epd);

  // Mark EPD as DPP-converted
  epd.dpp_ready = true;
  saveEpd(epd);

  return NextResponse.json({
    success:   true,
    epd_id:    params.id,
    dpp,
    message:   "DPP payload generated. Publish via your floilan dashboard or POST to /api/dpp/publish.",
  }, { status: 201 });
}
