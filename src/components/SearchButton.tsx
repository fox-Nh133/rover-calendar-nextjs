import React from 'react';
import Button from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface SearchButtonProps {
  isActive: boolean;
  onClick: () => void;
  flex?: string;
}

export default function SearchButton({ isActive, onClick, flex }: SearchButtonProps) {
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
          name="search"
          alt="検索"
          className={styles.icon}
          forceWhite={isActive}
        />
      </span>
      <span className={styles.label}>検索</span>
    </Button>
  );
}