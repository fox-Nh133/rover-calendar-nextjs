import React from 'react';
import Button, { ButtonProps } from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface AddEventButtonProps extends ButtonProps {
  // AddEvent固有のプロパティがあれば今後ここに追加
}

export default function AddEventButton({ active, onClick, variant, className, dashed, ...props }: AddEventButtonProps) {
  return (
    <Button
      variant={variant || "default"}
      dashed={dashed ?? true}
      active={active}
      onClick={onClick}
      aria-pressed={active}
      className={className}
      {...props}
    >
      <span className={styles.iconWrap}>
        <ThemeResponsiveImage
          name="plus"
          alt="イベント登録"
          className={styles.icon}
          forceWhite={active}
        />
      </span>
      <span className={styles.label}>イベント登録</span>
    </Button>
  );
}