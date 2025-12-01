import React from 'react';
import Button from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface FavoritesButtonProps {
  isActive: boolean;
  onClick: () => void;
  flex?: string;
}

export default function FavoritesButton({ isActive, onClick, flex }: FavoritesButtonProps) {
  return (
    <Button
      variant="default"
      active={isActive}
      onClick={onClick}
      aria-pressed={isActive}
      style={flex ? { flex } : undefined}
    >
      <span className={styles.iconWrap}>
        <ThemeResponsiveImage
          name="star"
          alt="お気に入り"
          className={styles.icon}
          forceWhite={isActive}
        />
      </span>
      <span className={styles.label}>お気に入り</span>
    </Button>
  );
}