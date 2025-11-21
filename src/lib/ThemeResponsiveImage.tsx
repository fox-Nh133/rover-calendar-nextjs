import React from 'react';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';

interface ThemeResponsiveImageProps {
  name: string; // ベースファイル名（例: "clock"）
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  forceWhite?: boolean; // activeな状態など、強制的にwhiteアイコンを使用する場合
}

export default function ThemeResponsiveImage({
  name,
  alt = '',
  width,
  height,
  className = '',
  forceWhite = false,
}: ThemeResponsiveImageProps) {
  const scheme = usePreferredColorScheme();

  const color = forceWhite ? 'white' : (scheme === 'dark' ? 'white' : 'black');

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
