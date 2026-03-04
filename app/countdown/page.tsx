'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const target = new Date('2026-03-06T00:00:00');
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const spawnParticles = useCallback(() => {
    const container = particlesRef.current;
    if (!container) return;
    const marks = ['·', '—', '·', '*'];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.textContent = marks[i % marks.length];
      const size = 8 + Math.random() * 14;
      el.style.cssText = `
        position:absolute;font-size:${size}px;
        left:${Math.random() * 100}%;top:${100 + Math.random() * 10}%;
        color:${Math.random() > 0.5 ? '#c9a84c' : '#9b7fd4'};
        opacity:0;pointer-events:none;font-family:'Outfit',sans-serif;
      `;
      container.appendChild(el);
      gsap.to(el, {
        y: -(400 + Math.random() * 500), x: (Math.random() - 0.5) * 160,
        opacity: 0.4 + Math.random() * 0.4,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 6,
        repeat: -1, ease: 'none',
        onRepeat: () => gsap.set(el, { y: 0, opacity: 0, x: 0 }),
      });
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(titleRef.current,   { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30  }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
      .fromTo(timerRef.current?.children ? Array.from(timerRef.current.children) : [],
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8 }, '-=0.5'
      )
      .fromTo(bottomRef.current,  { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
    spawnParticles();
  }, [spawnParticles]);

  useEffect(() => {
    const iv = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        clearInterval(iv);
        router.push('/birthday');
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [router]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const units = [
    { label: 'Days',    value: timeLeft.days    },
    { label: 'Hours',   value: timeLeft.hours   },
    { label: 'Minutes', value: timeLeft.minutes  },
    { label: 'Seconds', value: timeLeft.seconds  },
  ];

  return (
    <main
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100vh', maxHeight: '100vh', background: 'radial-gradient(ellipse at 50% 60%, #130d24 0%, #080610 70%)' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width:  `${Math.random() * 1.8 + 0.5}px`,
              height: `${Math.random() * 1.8 + 0.5}px`,
              left:   `${Math.random() * 100}%`,
              top:    `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${2.5 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" />

      {/* Glow orb */}
      <div className="absolute pointer-events-none"
        style={{
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(155,127,212,0.07) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center"
        style={{ width: 'min(80%, 900px)' }}>

        {/* Top ornament label */}
        <p ref={subtitleRef}
          className="script mb-6 opacity-0"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--gold)', letterSpacing: '0.02em' }}>
          Something special is coming
        </p>

        {/* Main title */}
        <h1 ref={titleRef}
          className="opacity-0"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 200,
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            color: 'var(--cream)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            marginBottom: 'clamp(2rem, 5vh, 4rem)',
          }}>
          March 6th is{' '}
          <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 300 }}>almost here</span>
        </h1>

        {/* Countdown — 4 cols always, huge numbers */}
        <div ref={timerRef}
          className="grid grid-cols-4 w-full"
          style={{ gap: 'clamp(0.5rem, 2vw, 2rem)', marginBottom: 'clamp(1.5rem, 4vh, 3rem)' }}>
          {units.map(({ label, value }, idx) => (
            <div key={label} className="flex flex-col items-center" style={{ position: 'relative' }}>
              {/* Number */}
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 200,
                  fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                  color: 'var(--cream)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                {pad(value)}
              </span>
              {/* Gold line */}
              <div style={{ width: '100%', height: '1px', background: 'var(--border)', margin: '0.75rem 0 0.6rem' }} />
              {/* Label */}
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
                color: 'var(--lavender)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
              {/* Colon separator (except last) */}
              {idx < 3 && (
                <span style={{
                  position: 'absolute',
                  right: 'clamp(-1rem, -1.5vw, -0.75rem)',
                  top: '0.1em',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 200,
                  fontSize: 'clamp(2rem, 6vw, 5rem)',
                  color: 'rgba(201,168,76,0.4)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom area */}
        <div ref={bottomRef} className="flex flex-col items-center opacity-0">
          <div className="ornament">
            <span className="script" style={{ fontSize: '1.6rem', color: 'var(--rose)' }}>for her</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50%       { opacity: 0.7; }
        }
      `}</style>
    </main>
  );
}
