import React from 'react';
import UserButton from './UserButton';
import styles from './HeaderMenu.module.scss';

interface HeaderMenuProps {
  isUserActive?: boolean;
  onUserClick?: () => void;
  // 将来的にi18n切り替えなどのメニュー項目を追加する予定
}

export default function HeaderMenu({ 
  isUserActive = false, 
  onUserClick = () => {} 
}: HeaderMenuProps) {
  return (
    <div className={styles.headerMenu}>
      <UserButton 
        isActive={isUserActive}
        onClick={onUserClick}
        showLabel={true}
        label="マイページ"
        customClassName={styles.userButton}
      />
    </div>
  );
}