import React from 'react';
import Button from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface CalendarButtonProps {
  isActive: boolean;
  onClick: () => void;
  flex?: string;
}

export default function CalendarButton({ isActive, onClick, flex }: CalendarButtonProps) {
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
          name="calendar"
          alt="カレンダー"
          className={styles.icon}
          forceWhite={isActive}
        />
      </span>
      <span className={styles.label}>カレンダー</span>
    </Button>
  );
}