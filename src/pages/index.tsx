import React from 'react';
import Calendar from '../components/Calendar';

const Home: React.FC = () => {
  return (
    <>
      {/* ヘッダー */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1 className="title">ローバーカレンダー</h1>
            </a>
            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="control has-icons-left">
                  <input className="input is-rounded" type="email" placeholder="Search" />
                  <span className="icon is-left">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
              <a className="navbar-item is-active is-size-5 has-text-weight-semibold" href="/">
                ホーム
              </a>
              <a className="navbar-item is-size-5 has-text-weight-semibold" href="/about">
                このサイトについて
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* メインビュー */}
      <section className="section">
        <div className="container">
          <div className="columns">
            {/* 今日の情報 */}
            <div className="column is-one-third">
              <div className="box">
                <div className="has-text-centered">
                  <h1 className="title" id="currentDate">current date</h1>
                  <p className="subtitle" id="currentDay">current day</p>
                </div>
                <hr />
                <div className="block">
                  <p id="closestEvent">直近のイベント</p>
                </div>
                <div className="block has-text-centered">
                  <strong id="closestEventTitle"></strong>
                </div>
                {/* 日時・場所・説明などは省略。必要なら移植可能 */}
              </div>
            </div>

            {/* カレンダー */}
            <div className="column">
              <div className="box">
                <label className="checkbox is-flex" id="isListView">
                  <input type="checkbox" id="listViewCheckbox" />
                  <div>リスト表示</div>
                </label>
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Rover Calendar</strong> by <a href="https://masaya.narita.info">Masaya Narita</a>
          </p>
          <p>
            Powered by <a href="https://bulma.io">Bulma</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
