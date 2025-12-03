import React from 'react';
import Button, { ButtonProps } from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface CalendarButtonProps extends ButtonProps {
  // Calendar固有のプロパティがあれば今後ここに追加
}

export default function CalendarButton({ active, onClick, variant, className, dashed, ...props }: CalendarButtonProps) {
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
          name="calendar"
          alt="カレンダー"
          className={styles.icon}
          forceWhite={active}
        />
      </span>
      <span className={styles.label}>カレンダー</span>
    </Button>
  );
}