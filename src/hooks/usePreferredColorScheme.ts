import { useEffect, useState } from 'react';

export function usePreferredColorScheme() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setScheme(matcher.matches ? 'dark' : 'light');

    update();
    matcher.addEventListener('change', update);
    return () => matcher.removeEventListener('change', update);
  }, []);

  return scheme;
}