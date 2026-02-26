'use client';

import { useEffect, useState, useRef } from 'react';

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

export function TextScramble({
  children,
  duration = 1.5,
  speed = 0.03,
  characterSet = defaultChars,
  className,
  delay = 0,
}: {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  className?: string;
  delay?: number;
}) {
  const text = children;
  const [displayText, setDisplayText] = useState(() => {
    // Start fully scrambled
    return text.split('').map(c => (c === ' ' || c === '•') ? c : characterSet[Math.floor(Math.random() * characterSet.length)]).join('');
  });
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      const steps = Math.ceil(duration / speed);
      let step = 0;

      const interval = setInterval(() => {
        let scrambled = '';
        const progress = step / steps;

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ' || text[i] === '•') {
            scrambled += text[i];
            continue;
          }
          if (progress * text.length > i) {
            scrambled += text[i];
          } else {
            scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
          }
        }

        setDisplayText(scrambled);
        step++;

        if (step > steps) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed * 1000);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <p className={className}>
      {displayText}
    </p>
  );
}
