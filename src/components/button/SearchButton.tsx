import React from 'react';
import Button, { ButtonProps } from '@/components/common/Button';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from '@/components/common/Button.module.scss';

interface SearchButtonProps extends ButtonProps {
  // Search固有のプロパティがあれば今後ここに追加
}

export default function SearchButton({ active, onClick, variant, className, dashed, ...props }: SearchButtonProps) {
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
          name="search"
          alt="検索"
          className={styles.icon}
          forceWhite={active}
        />
      </span>
      <span className={styles.label}>検索</span>
    </Button>
  );
}