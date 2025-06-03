import React from 'react';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';

interface ThemeResponsiveImageProps {
  name: string; // ベースファイル名（例: "clock"）
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ThemeResponsiveImage({
  name,
  alt = '',
  width,
  height,
  className = '',
}: ThemeResponsiveImageProps) {
  const scheme = usePreferredColorScheme();

  const color = scheme === 'dark' ? 'white' : 'black';

  const src = `/icons/${name}-${color}.svg`;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
