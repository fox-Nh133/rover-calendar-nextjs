import React, { useState } from 'react';
import styles from './MainMenu.module.scss';
import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import CalendarButton from './button/CalendarButton';
import FavoritesButton from './button/FavoritesButton';
import SearchButton from './button/SearchButton';
import AddEventButton from './button/AddEventButton';
import UserButton from './button/UserButton';

interface MainMenuProps {
  initialActive?: string | null;
  onChange?: (key: string) => void;
}

export default function MainMenu({
  initialActive = 'calendar',
  onChange,
}: MainMenuProps) {
  const scheme = usePreferredColorScheme();
  const [active, setActive] = useState<string | null>(initialActive);

  const handleClick = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <nav className={styles.container} aria-label="main menu">
      <CalendarButton
        active={active === 'calendar'}
        onClick={() => handleClick('calendar')}
        className={styles.calendarButton}
        variant="nav"
      />
      <FavoritesButton
        active={active === 'favorites'}
        onClick={() => handleClick('favorites')}
        className={`${styles.favoritesButton} ${styles.hideOnMobile}`}
        variant="nav"
      />
      <SearchButton
        active={active === 'search'}
        onClick={() => handleClick('search')}
        className={styles.searchButton}
        variant="nav"
      />
      <AddEventButton
        active={active === 'add'}
        onClick={() => handleClick('add')}
        className={`${styles.addEventButton} ${styles.hideOnMobile}`}
        variant="nav"
      />
      <UserButton
        active={active === 'me'}
        onClick={() => handleClick('me')}
        className={styles.userButton}
        variant="nav"
      />
    </nav>
  );
}