'use client';

import { useState, useEffect } from 'react';

const BOOT_LINES = [
  'INITIALIZING VAULT-TEC INTERFACE...',
  'AUTHENTICATING USER................. OK',
  'LOADING PERSONNEL FILES............. OK',
  'SYSTEM READY.',
];

export function useBootSequence() {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const type = () => {
      if (lineIdx >= BOOT_LINES.length) {
        timerId = setTimeout(() => setNavVisible(true), 200);
        return;
      }
      const line = BOOT_LINES[lineIdx];
      if (charIdx < line.length) {
        setCurrentLineText(line.slice(0, charIdx + 1));
        charIdx++;
        timerId = setTimeout(type, 8);
      } else {
        setTypedLines(prev => [...prev, line]);
        setCurrentLineText('');
        lineIdx++;
        charIdx = 0;
        timerId = setTimeout(type, 60);
      }
    };

    timerId = setTimeout(type, 100);
    return () => clearTimeout(timerId);
  }, []);

  return { typedLines, currentLineText, navVisible };
}
