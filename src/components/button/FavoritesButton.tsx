import React from 'react';
import Button, { ButtonProps } from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface FavoritesButtonProps extends ButtonProps {
  // Favorites固有のプロパティがあれば今後ここに追加
}

export default function FavoritesButton({ active, onClick, variant, className, dashed, ...props }: FavoritesButtonProps) {
  return (
    <Button
      variant={variant || "default"}
      dashed={dashed}
      active={active}
      onClick={onClick}
      aria-pressed={active}
      className={className}
      {...props}
    >
      <span className={styles.iconWrap}>
        <ThemeResponsiveImage
          name="star"
          alt="お気に入り"
          className={styles.icon}
          forceWhite={active}
        />
      </span>
      <span className={styles.label}>お気に入り</span>
    </Button>
  );
}