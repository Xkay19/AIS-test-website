export const caseStudies = {
  "novabatt": {
    slug:      "novabatt",
    company:   "NovaBatt UK",
    industry:  "Batteries",
    headline:  "EU Battery Passport live across 12,000 EV cells in 6 weeks",
    excerpt:   "NovaBatt needed to comply with EU Reg 2023/1542 before their OEM contract renewal. floilan delivered a complete DPP pipeline without disrupting production.",
    metric:    { value: "6 wks", label: "time to compliance" },
    challenge: "NovaBatt faced a hard deadline: their largest OEM customer required a fully EU-compliant Battery DPP linked to every cell before renewing the supply contract. They had 6 weeks, 12,000 cells in production, and no existing system for tracking carbon footprint or supply chain due diligence data.",
    solution:  "floilan deployed their Battery DPP module in week one, connecting directly to NovaBatt's manufacturing ERP to pull cell-level production data. The floilan supplier portal was used to collect cobalt and lithium due diligence data from 8 upstream suppliers. Carbon footprint calculations were automated using the EU Reg 2023/1542 methodology.",
    results: [
      { metric: "6 weeks",   label: "from kickoff to first compliant DPP" },
      { metric: "12,000",    label: "cells passported and QR-tagged" },
      { metric: "8 suppliers", label: "connected via supplier data portal" },
      { metric: "£2.1M",    label: "OEM contract secured" },
    ],
    quote: {
      text:   "floilan gave us a compliance path when we genuinely didn't know where to start. The OEM was impressed — they said NovaBatt was the first supplier to arrive with a fully working Battery DPP.",
      author: "Operations Director, NovaBatt UK",
    },
  },
  "frameworks": {
    slug:      "frameworks",
    company:   "FrameWorks Ltd",
    industry:  "Construction",
    headline:  "68% cut in embodied carbon reporting time for structural steel",
    excerpt:   "FrameWorks' sustainability team was spending 3 days per project manually assembling carbon data for planning submissions. floilan automated the entire process.",
    metric:    { value: "68%", label: "time saved on EPD reports" },
    challenge: "FrameWorks produces 40+ structural steel product lines. Every major project required a manually assembled Environmental Product Declaration (EPD) for planning submissions — a 3-day process that consumed two sustainability staff members per project and was prone to data errors.",
    solution:  "floilan's Construction DPP module connected to FrameWorks' product database and steel supplier data feeds. EN 15804 lifecycle assessment calculations were automated. EPD PDFs are now generated on demand in under 5 minutes, with a QR-linked DPP for each product available for specifiers to reference.",
    results: [
      { metric: "68%",    label: "reduction in EPD preparation time" },
      { metric: "3 days → 5 min", label: "EPD generation time" },
      { metric: "40+",    label: "product lines passported" },
      { metric: "£180k",  label: "annual staff time saved" },
    ],
    quote: {
      text:   "Our sustainability team now focuses on actual improvement work instead of data wrangling. The floilan DPP has also become a sales tool — specifiers request it by name.",
      author: "Head of Sustainability, FrameWorks Ltd",
    },
  },
  "woven-co": {
    slug:      "woven-co",
    company:   "Woven & Co.",
    industry:  "Fashion",
    headline:  "End-to-end fibre transparency for 2,400 SKUs across 14 suppliers",
    excerpt:   "Woven & Co. used floilan to build DPPs for their entire SS25 collection — tracking fibre origin, dye processes, and end-of-life pathways.",
    metric:    { value: "2,400", label: "SKUs passported" },
    challenge: "Woven & Co. sources from 14 suppliers across 6 countries. Their SS25 collection had 2,400 SKUs, each requiring a Digital Product Passport under incoming ESPR textiles requirements. Fibre data existed in 14 different supplier spreadsheet formats. Microplastic shedding data didn't exist at all.",
    solution:  "floilan deployed a supplier data portal that standardised fibre intake data from all 14 suppliers. Microplastic shedding estimates were auto-calculated using floilan's fibre composition model. Each finished garment got a QR-linked consumer passport, live in time for SS25 trade shows.",
    results: [
      { metric: "2,400",  label: "SKUs passported for SS25" },
      { metric: "14",     label: "suppliers connected via portal" },
      { metric: "1 week", label: "to full collection DPP coverage" },
      { metric: "3 retailers", label: "cited DPP as reason for listing" },
    ],
    quote: {
      text:   "Three of our biggest retail partners said the floilan passport was a deciding factor in their buying decision. Compliance became a commercial advantage overnight.",
      author: "Director of Sustainability, Woven & Co.",
    },
  },
};

export type CaseStudySlug = keyof typeof caseStudies;
