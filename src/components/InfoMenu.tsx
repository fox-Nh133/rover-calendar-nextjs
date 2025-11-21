import React, { useState } from 'react';
import styles from './InfoMenu.module.scss';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import { MenuItem } from '@/types/MenuItem';
import { defaultMenuItems } from './InfoMenuConfig';

interface InfoMenuProps {
  items?: MenuItem[];
  initialActive?: string | null;
  onChange?: (key: string) => void;
}

export default function InfoMenu({
  items,
  initialActive = 'calendar',
  onChange,
}: InfoMenuProps) {
  const scheme = usePreferredColorScheme();
  const [active, setActive] = useState<string | null>(initialActive);

  const list = items ?? defaultMenuItems;

  const handleClick = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <nav className={styles.container} aria-label="info menu">
      {list.map((item) => {
        const isActive = active === item.key;
        const cls = [
          styles.button,
          isActive ? styles.active : '',
          item.variant === 'primary' ? styles.primary : '',
          item.variant === 'dashed' ? styles.dashed : '',
        ].join(' ');

        return (
          <button
            key={item.key}
            type="button"
            className={cls}
            onClick={() => handleClick(item.key)}
            aria-pressed={isActive}
            style={item.flex ? { flex: item.flex } : undefined}
          >
            <span className={styles.iconWrap}>
              <ThemeResponsiveImage name={item.icon} alt={item.label} className={styles.icon} forceWhite={isActive} />
            </span>
            {item.label ? <span className={styles.label}>{item.label}</span> : null}
          </button>
        );
      })}
    </nav>
  );
}