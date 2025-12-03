import React, { useState, useEffect } from 'react';
import UserButton from './button/UserButton';
import InternetStatusButton from './button/InternetStatusButton';
import styles from './HeaderMenu.module.scss';

interface HeaderMenuProps {
  isUserActive?: boolean;
  onUserClick?: () => void;
}

export default function HeaderMenu({ 
  isUserActive = false, 
  onUserClick = () => {}
}: HeaderMenuProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={styles.headerMenu}>
      {isOnline && (
        <InternetStatusButton
          active={true}
          onClick={() => {}}
          className={styles.internetStatusButton}
        />
      )}
      <UserButton 
        active={isUserActive}
        onClick={onUserClick}
        showLabel={true}
        label="マイページ"
        className={styles.userButton}
      />
    </div>
  );
}