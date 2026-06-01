"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Globe } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-24 md:py-36 bg-white border-t border-zinc-100 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background image with overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=60&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
        />
        {/* Gradient overlay to maintain text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />
      </div>

      {/* Radial emerald glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Icon */}
        <motion.div
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "backOut" }}
          aria-hidden
        >
          <Globe className="h-6 w-6" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="cta-heading"
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-tight text-zinc-900 leading-tight mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          Prepare for the Future of{" "}
          <span className="text-emerald-500">Building Compliance</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          Unify product data, streamline compliance, and gain complete visibility
          across every building asset. Connect with our compliance experts today.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <CustomButton
            variant="primary"
            size="lg"
            onClick={() => alert("Demo booking flow — We will be in touch within 24 hours.")}
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            Schedule a Demo
          </CustomButton>
          <CustomButton variant="secondary" size="lg" href="#features">
            Explore Platform
          </CustomButton>
        </motion.div>

        {/* Social proof footnote */}
        <motion.p
          className="mt-10 text-xs text-zinc-400 font-medium"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          Trusted by leading manufacturers, developers, and compliance teams across Europe.
        </motion.p>
      </div>
    </section>
  );
}
