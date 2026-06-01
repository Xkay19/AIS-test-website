"use client";
import { HeroScrub } from "@/components/ui/hero-scrub";

export default function HeroScrubSection() {
  return (
    <HeroScrub
      frameCount={300}
      frameUrl={(i) =>
        `https://raw.githubusercontent.com/duthiljean/ferrari-hero-demo/main/${String(i + 1).padStart(4, "0")}.webp`
      }
      titleTop="Define"
      titleBottom="Future"
      bgClassName="bg-black"
      accentHex="#0c0a07"
      defaultAspect={16 / 9}
    />
  );
}
