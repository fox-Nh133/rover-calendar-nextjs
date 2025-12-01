import React from 'react';
import Button from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface AddEventButtonProps {
  isActive: boolean;
  onClick: () => void;
  flex?: string;
}

export default function AddEventButton({ isActive, onClick, flex }: AddEventButtonProps) {
  return (
    <Button
      variant="dashed"
      active={isActive}
      onClick={onClick}
      aria-pressed={isActive}
      style={flex ? { flex } : undefined}
    >
      <span className={styles.iconWrap}>
        <ThemeResponsiveImage
          name="plus"
          alt="イベント登録"
          className={styles.icon}
          forceWhite={isActive}
        />
      </span>
      <span className={styles.label}>イベント登録</span>
    </Button>
  );
}