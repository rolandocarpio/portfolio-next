'use client';

import useSound from 'use-sound';

export function useSounds() {
  const [playHighlight] = useSound('/sounds/ui_pipboy_highlight.wav', { volume: 0.25 });
  const [playEnter] = useSound('/sounds/ui_hacking_charenter_01.wav', { volume: 0.25 });
  return { playHighlight, playEnter };
}
