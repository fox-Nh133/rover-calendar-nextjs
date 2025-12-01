import React from 'react';
import Button from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface UserButtonProps {
  isActive: boolean;
  onClick: () => void;
  flex?: string;
}

export default function UserButton({ isActive, onClick, flex }: UserButtonProps) {
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
          name="user"
          alt="ユーザー"
          className={styles.icon}
          forceWhite={isActive}
        />
      </span>
    </Button>
  );
}