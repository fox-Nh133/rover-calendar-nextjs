import React from 'react';
import Calendar from './Calendar';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import styles from './MainContent.module.scss';

const MainContent: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <ThemeResponsiveImage name="calendar" className={styles.calendarIcon} />
          <h2 className={styles.title}>カレンダー</h2>
        </div>
      </header>
      <div className={styles.card}>
        <Calendar />
      </div>
    </div>
  );
};

export default MainContent;