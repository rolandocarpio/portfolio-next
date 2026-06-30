'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { COMMANDS } from '@/lib/commands';

function findMatch(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return null;
  const keys = Object.keys(COMMANDS);
  if (keys.includes(trimmed)) return trimmed;
  const matches = keys.filter(k => k.startsWith(trimmed));
  return matches.length === 1 ? matches[0] : null;
}

export function useCommandProcessor() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  const process = useCallback((raw: string) => {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return;

    setHistory(prev => [...prev, `> ${raw}`]);

    const key = findMatch(raw);

    if (!key) {
      const suggestions = Object.keys(COMMANDS)
        .filter(k => k.includes(trimmed))
        .slice(0, 3);
      const msg = suggestions.length > 0
        ? `UNKNOWN COMMAND: ${raw}\nDid you mean: ${suggestions.join(', ')}?`
        : `UNKNOWN COMMAND: ${raw}`;
      setHistory(prev => [...prev, msg]);
      return;
    }

    const cmd = COMMANDS[key];

    if (cmd.type === 'navigate') {
      router.push(cmd.path);
    } else if (cmd.type === 'action' && cmd.action === 'clear') {
      setHistory([]);
    } else if (cmd.type === 'output') {
      const out = typeof cmd.output === 'function' ? cmd.output() : cmd.output;
      setHistory(prev => [...prev, out]);
    }
  }, [router]);

  return { history, process };
}
