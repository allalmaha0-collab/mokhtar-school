'use client';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function BreakingNewsTicker() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/api/news?breaking=true')
      .then(r => r.json())
      .then(d => setNews(d.news || []))
      .catch(() => {});
  }, []);

  if (!news.length) return null;

  const text = news.map(n => n.title).join('   ●   ');

  return (
    <div className="bg-red-600 text-white text-sm font-bold overflow-hidden h-9 flex items-center">
      <div className="flex-shrink-0 bg-red-800 px-4 h-full flex items-center gap-2 z-10">
        <Zap size={14} className="fill-current animate-pulse" />
        <span className="text-xs tracking-wider">عاجل</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <div
          className="whitespace-nowrap inline-block"
          style={{
            animation: 'ticker 25s linear infinite',
          }}
        >
          {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
