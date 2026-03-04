'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

import Image from 'next/image';

const FlowerAnimation = dynamic(() => import('@/components/FlowerAnimation'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const MEMORIES = [
  { id: 1, caption: 'First Pic I saw of you',          accent: 'rgba(201,168,76,0.12)',  src: '/image 1.jpg' },
  { id: 2, caption: 'Shhot yako ya kwanza',            accent: 'rgba(212,99,122,0.12)',  src: '/image 2.jpg' },
  { id: 3, caption: 'Ati anaenda kuswim',              accent: 'rgba(155,127,212,0.12)', src: '/image 3.jpg' },
  { id: 4, caption: 'FLowers @ 200 streak',            accent: 'rgba(108,234,255,0.10)', src: '/image 4.jpg' },
  { id: 5, caption: 'The aroma ya maua 😂',            accent: 'rgba(201,168,76,0.10)',  src: '/image 5.jpg' },
  { id: 6, caption: 'Ati lab technician',              accent: 'rgba(212,99,122,0.10)',  src: '/image 6.jpg' },
];

const LETTER = `Hello Aggie,

You are now 20. Let that sink in for a second — twenty whole years of you being you, and honestly? The world has genuinely been better for it.

I have known you long enough to say this without bias: you are one of the most real people I have ever met. Not perfectly put-together, not always with a plan — but real. And that is rare.

Here is what I know about you at 20: you are so much stronger than you think. You worry too much about things that have not happened yet, and you forget to give yourself credit for everything you have already survived. Trust me, I have been there watching.

Twenty is the age where life starts feeling serious — and some of it really is. But you do not have to have it all figured out today. You just have to keep going, keep being you, and stop being so hard on yourself.

You have a kind of energy that people are genuinely lucky to be around. Do not shrink that for anyone.

Happy 20th, Aggie. This is your decade. Own it.

— Your bestie`;

export default function BirthdayPage() {
  const heroTextRef  = useRef<HTMLDivElement>(null);
  const letterRef    = useRef<HTMLDivElement>(null);
  const galleryRef   = useRef<HTMLDivElement>(null);
  const closingRef   = useRef<HTMLDivElement>(null);

  const [displayedText, setDisplayedText] = useState('');
  const [typewriterStarted, setTypewriterStarted] = useState(false);

  /* ── GSAP entrance ── */
  useEffect(() => {
    gsap.fromTo(heroTextRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.3 }
    );
    spawnConfetti();
  }, []);

  /* ── Scroll animations ── */
  useEffect(() => {
    const animateSections = [letterRef.current, galleryRef.current, closingRef.current];
    animateSections.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 70 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el, start: 'top 80%', once: true,
            onEnter: () => { if (el === letterRef.current && !typewriterStarted) setTypewriterStarted(true); },
          },
        }
      );
    });

    if (galleryRef.current) {
      gsap.fromTo(galleryRef.current.querySelectorAll('.mem-card'),
        { opacity: 0, y: 50, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: galleryRef.current, start: 'top 75%', once: true } }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Typewriter ── */
  useEffect(() => {
    if (!typewriterStarted) return;
    let i = 0;
    setDisplayedText('');
    const iv = setInterval(() => {
      i++;
      setDisplayedText(LETTER.slice(0, i));
      if (i >= LETTER.length) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [typewriterStarted]);

  function spawnConfetti() {
    const colors = ['#c9a84c','#d4637a','#9b7fd4','#6ceaff'];
    for (let i = 0; i < 55; i++) {
      const el = document.createElement('div');
      const size = 4 + Math.random() * 5;
      el.style.cssText = `
        position:fixed;width:${size}px;height:${size}px;
        border-radius:${Math.random()>.5?'50%':'2px'};
        background:${colors[Math.floor(Math.random()*colors.length)]};
        left:${Math.random()*100}vw;top:-12px;
        pointer-events:none;z-index:9999;
      `;
      document.body.appendChild(el);
      gsap.to(el, {
        y: `${75+Math.random()*50}vh`, x: `${(Math.random()-.5)*250}px`,
        rotation: Math.random()*540, opacity: 0,
        duration: 2.5+Math.random()*2, delay: Math.random()*1.2,
        ease: 'power1.in', onComplete: () => el.remove(),
      });
    }
  }

  /* ── Styles ── */
  const sectionStyle: React.CSSProperties = { width: 'min(80%, 860px)', margin: '0 auto' };

  return (
    <main style={{ background: '#080610', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '620px' }}>

        {/* Flower fills entire hero */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <FlowerAnimation />
        </div>

        {/* Dark gradient so text sits on top */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(8,6,16,0.15) 0%, rgba(8,6,16,0) 35%, rgba(8,6,16,0.9) 100%)',
        }} />

        {/* Hero text — bottom of section */}
        <div ref={heroTextRef} style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
          opacity: 0, textAlign: 'center',
        }}>
          <p className="script" style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            color: 'var(--gold)',
            marginBottom: '1rem',
            letterSpacing: '0.02em',
          }}>
            Happy Birthday
          </p>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 200,
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            color: 'var(--cream)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            To You,{' '}
            <em className="script" style={{
              color: 'var(--gold)',
              fontStyle: 'normal',
              fontSize: 'clamp(3.8rem, 10vw, 9rem)',
            }}>
              Bestie
            </em>
          </h1>

          <p style={{
            marginTop: '1.5rem',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            color: 'rgba(240,235,255,0.5)',
            letterSpacing: '0.12em',
          }}>
            6th March — a day the world became a little brighter
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          animation: 'fadeInScroll 1s 2.2s ease both',
          zIndex: 20,
        }}>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 300,
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(240,235,255,0.35)',
          }}>
            scroll
          </span>
          <div style={{ animation: 'bounceArrow 1.6s ease-in-out infinite' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="rgba(201,168,76,0.55)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Letter ── */}
      <section style={{ padding: 'clamp(6rem, 12vh, 10rem) 1.5rem', opacity: 0 }} ref={letterRef}>
        <div style={sectionStyle}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
            <p className="script" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--rose)', marginBottom: '0.5rem' }}>
              words for you
            </p>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 200,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--cream)',
              letterSpacing: '-0.01em',
            }}>
              A Letter
            </h2>
            <div style={{
              width: '48px', height: '1px',
              background: 'var(--gold)', margin: '1.5rem auto 0',
            }} />
          </div>

          {/* Letter card */}
          <div style={{
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 4rem)',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
          }}>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'rgba(240,235,255,0.78)',
              lineHeight: 2.1,
              whiteSpace: 'pre-line',
            }}>
              {displayedText}
              <span style={{
                display: 'inline-block',
                width: '2px', height: '1.1em',
                background: 'var(--gold)',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: 'blink 1s step-end infinite',
              }} />
            </p>
          </div>
        </div>
      </section>

      {/* ── Memories ── */}
      <section style={{ padding: '0 1.5rem clamp(6rem, 12vh, 10rem)', opacity: 0 }} ref={galleryRef}>
        <div style={sectionStyle}>

          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
            <p className="script" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--rose)', marginBottom: '0.5rem' }}>
              captured moments
            </p>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 200,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--cream)',
            }}>
              Our Memories
            </h2>
            <div style={{ width: '48px', height: '1px', background: 'var(--gold)', margin: '1.5rem auto 0' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(1.2rem, 3vw, 2rem)',
          }}>
            {MEMORIES.map((m) => (
              <div key={m.id} className="mem-card" style={{
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: m.accent,
                aspectRatio: '4/3',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              }}
                onMouseEnter={e => {
                  gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 });
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}>

                {/* Photo */}
                <Image
                  src={m.src}
                  alt={m.caption}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Caption — slides up on hover */}
                <div className="mem-caption" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '1rem 1.25rem',
                  background: 'linear-gradient(to top, rgba(8,6,16,0.9), transparent)',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.3s ease',
                }}>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif', fontWeight: 300,
                    fontSize: '0.9rem', color: 'var(--cream)',
                    textAlign: 'center',
                  }}>
                    {m.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section style={{ padding: 'clamp(4rem, 8vh, 7rem) 1.5rem clamp(6rem, 12vh, 10rem)', opacity: 0, textAlign: 'center' }} ref={closingRef}>
        <div style={{ ...sectionStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, var(--gold))', marginBottom: '3rem' }} />

          <p className="script" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: 'var(--rose)', marginBottom: '1rem' }}>
            wishing you
          </p>

          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 200,
            fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: 'var(--cream)',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '2rem',
          }}>
            A beautiful day,{' '}
            <span className="script" style={{ color: 'var(--gold)', fontWeight: 400, fontSize: 'clamp(3.2rem, 8.5vw, 7rem)' }}>
              always
            </span>
          </h2>

          <p style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(240,235,255,0.45)',
            maxWidth: '480px',
            lineHeight: 1.9,
            letterSpacing: '0.03em',
          }}>
            May your year bloom as beautifully as you do.
            <br />Happy Birthday.
          </p>

          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to top, transparent, var(--gold))', marginTop: '3rem' }} />
        </div>
      </section>

      {/* Hover CSS + blink cursor */}
      <style jsx global>{`
        .mem-card:hover .mem-caption { transform: translateY(0) !important; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
        @keyframes fadeInScroll {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
