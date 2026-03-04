'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const birthday = new Date('2026-03-06T00:00:00');

    if (now >= birthday) {
      router.replace('/birthday');
    } else {
      router.replace('/countdown');
    }
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen" style={{ background: '#0a0812' }}>
      <div className="text-center" style={{ color: '#d4af37', fontFamily: 'Cormorant Garamond, serif' }}>
        <div className="text-2xl animate-pulse">✨</div>
      </div>
    </main>
  );
}
