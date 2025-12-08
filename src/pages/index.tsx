import React from 'react';
import MainContent from '../components/MainContent';
import TodayInfo from '../components/TodayInfo';
import MainMenu from '../components/MainMenu';
import HeaderMenu from '../components/HeaderMenu';
import Image from 'next/image';
import styles from './index.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a className={styles.brand} href="/">
            <span className={styles.logoWrapper}>
              <Image
                className={styles.logo}
                src="/favicon/icon-160x160.png"
                alt="ローバーカレンダーのアイコン"
                fill
                priority
              />
            </span>
            <h1 className={styles.title}>ローバーカレンダー</h1>
          </a>
          <HeaderMenu />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.infoColumn}>
            <TodayInfo />
            <MainMenu />
          </div>

          <MainContent />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            <strong>Rover Calendar</strong> by <a href="https://www.masaya.info">Masaya Narita</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
