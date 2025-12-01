import React from 'react';
import Button from './Button';
import styles from './MyPageButton.module.scss';

interface MyPageButtonProps {
  onClick?: () => void;
}

export default function MyPageButton({ onClick }: MyPageButtonProps) {
  return (
    <Button onClick={onClick} className={styles.myPageButton}>
      <span className={styles.label}>マイページ</span>
    </Button>
  );
}