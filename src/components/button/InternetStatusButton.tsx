import React from 'react';
import Button, { ButtonProps } from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface InternetStatusButtonProps extends ButtonProps {
  isOnline?: boolean;
}

export default function InternetStatusButton({ 
  active, 
  onClick, 
  className,
  isOnline,
  dashed,
  ...props
}: InternetStatusButtonProps) {
  return (
    <Button
      variant="default"
      dashed={dashed}
      active={active}
      onClick={onClick}
      aria-pressed={active}
      className={className}
      {...props}
    >
      <span className={styles.iconWrap}>
        <ThemeResponsiveImage
          name="offline"
          alt="オフライン"
          className={styles.icon}
          forceWhite={active}
        />
      </span>
    </Button>
  );
}