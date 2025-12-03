import React from 'react';
import Button, { ButtonProps } from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface UserButtonProps extends ButtonProps {
  showLabel?: boolean;
  label?: string;
}

export default function UserButton({ 
  active, 
  onClick, 
  showLabel = false, 
  label = "マイページ", 
  variant,
  className,
  dashed,
  ...props
}: UserButtonProps) {
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
          name="user"
          alt="ユーザー"
          className={styles.icon}
          forceWhite={active}
        />
      </span>
      {showLabel && (
        <span className={styles.label}>{label}</span>
      )}
    </Button>
  );
}