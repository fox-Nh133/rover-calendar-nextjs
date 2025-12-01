import React, { useState } from 'react';
import styles from './InfoMenu.module.scss';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import { getCssVariable } from '@/lib/cssUtils';
import CalendarButton from './CalendarButton';
import FavoritesButton from './FavoritesButton';
import SearchButton from './SearchButton';
import AddEventButton from './AddEventButton';
import UserButton from './UserButton';

interface InfoMenuProps {
  initialActive?: string | null;
  onChange?: (key: string) => void;
}

function getFlexBasisWithGap(percentage: string): string {
  const menuGap = getCssVariable('--menu-gap');
  if (menuGap) {
    return `calc(${percentage} - ${menuGap})`;
  }
  return `calc(${percentage} - 0.75rem)`;
}

export default function InfoMenu({
  initialActive = 'calendar',
  onChange,
}: InfoMenuProps) {
  const scheme = usePreferredColorScheme();
  const [active, setActive] = useState<string | null>(initialActive);

  const handleClick = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <nav className={styles.container} aria-label="info menu">
      <CalendarButton
        isActive={active === 'calendar'}
        onClick={() => handleClick('calendar')}
        flex={`1 1 ${getFlexBasisWithGap('50%')}`}
      />
      <FavoritesButton
        isActive={active === 'favorites'}
        onClick={() => handleClick('favorites')}
        flex={`1 1 ${getFlexBasisWithGap('50%')}`}
      />
      <SearchButton
        isActive={active === 'search'}
        onClick={() => handleClick('search')}
        flex="3 1"
      />
      <AddEventButton
        isActive={active === 'add'}
        onClick={() => handleClick('add')}
        flex="5 1"
      />
      <UserButton
        isActive={active === 'me'}
        onClick={() => handleClick('me')}
        flex="2 1"
      />
    </nav>
  );
}