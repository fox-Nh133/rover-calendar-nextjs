import React from 'react';
import Button from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface UserButtonProps {
  isActive: boolean;
  onClick: () => void;
  flex?: string;
  showLabel?: boolean;
  label?: string;
  customClassName?: string;
}

export default function UserButton({ 
  isActive, 
  onClick, 
  flex, 
  showLabel = false, 
  label = "マイページ", 
  customClassName = "" 
}: UserButtonProps) {
  return (
    <Button
      variant="default"
      active={isActive}
      onClick={onClick}
      aria-pressed={isActive}
      style={flex ? { flex } : undefined}
      className={customClassName}
    >
      <span className={styles.iconWrap}>
        <ThemeResponsiveImage
          name="user"
          alt="ユーザー"
          className={styles.icon}
          forceWhite={isActive}
        />
      </span>
      {showLabel && (
        <span className={styles.label}>{label}</span>
      )}
    </Button>
  );
}