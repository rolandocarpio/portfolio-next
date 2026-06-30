'use client';

import { useState, useEffect, useRef } from 'react';

export function useTerminalInput(onSubmit: (value: string) => void) {
  const [input, setInput] = useState('');
  const inputRef = useRef('');
  const submitRef = useRef(onSubmit);

  useEffect(() => { submitRef.current = onSubmit; }, [onSubmit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitRef.current(inputRef.current);
        inputRef.current = '';
        setInput('');
      } else if (e.key === 'Backspace') {
        setInput(prev => {
          const next = prev.slice(0, -1);
          inputRef.current = next;
          return next;
        });
      } else if (e.key === 'Escape') {
        inputRef.current = '';
        setInput('');
      } else if (e.key.length === 1) {
        setInput(prev => {
          const next = prev + e.key;
          inputRef.current = next;
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { input };
}
