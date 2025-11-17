import React from 'react';
import Calendar from '../components/Calendar';
import TodayInfo from '../components/TodayInfo';
import styles from './index.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a className={styles.brand} href="/">
            <h1 className={styles.title}>ローバーカレンダー</h1>
          </a>
          <div className={styles.headerActions}>
            <label className={styles.searchField} htmlFor="global-search">
              <span className={styles.srOnly}>検索</span>
              <input
                id="global-search"
                className={styles.searchInput}
                type="search"
                placeholder="Search"
              />
              <span className={styles.searchIcon} aria-hidden="true">
                🔍
              </span>
            </label>
            <nav className={styles.navLinks} aria-label="主要ナビゲーション">
              <a className={`${styles.navLink} ${styles.navLinkActive}`} href="/">
                ホーム
              </a>
              <a className={styles.navLink} href="/about">
                このサイトについて
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.infoColumn}>
            <TodayInfo />
          </div>

          <div className={styles.calendarColumn}>
            <div className={styles.card}>
              <label className={styles.listToggle} htmlFor="listViewCheckbox">
                <input className={styles.listToggleInput} type="checkbox" id="listViewCheckbox" />
                <span className={styles.listToggleText}>リスト表示</span>
              </label>
              <Calendar />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            <strong>Rover Calendar</strong> by <a href="https://masaya.narita.info">Masaya Narita</a>
          </p>
          <p>Styled with handcrafted SCSS modules.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
