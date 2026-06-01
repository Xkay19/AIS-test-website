'use client';

import React, { useEffect } from 'react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Modern architectural building',
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Urban cityscape at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Structural architecture detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Futuristic interior space',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Open plan office environment',
  },
  {
    src: 'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Timber and glass facade',
  },
  {
    src: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Curved modern structure',
  },
];

export default function ParallaxSection() {
  useEffect(() => {
    let lenis: import('@studio-freight/lenis').default | null = null;

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis();

      function raf(time: number) {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <section>
      {/* Label */}
      <div className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full blur-[60px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(217,119,6,0.12), transparent 60%)',
          }}
        />
        <div className="relative z-10 text-center flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber/30 bg-amber/10 text-amber text-[10px] font-bold tracking-[0.3em] uppercase">
            Our World
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
            Scroll Down for <br />
            <span className="text-amber">Immersion</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Seven perspectives on the built environment — from structure to soul.
          </p>
        </div>
      </div>

      <ZoomParallax images={images} />

      <div className="h-[30vh]" />
    </section>
  );
}
