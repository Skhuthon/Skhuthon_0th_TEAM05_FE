import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.less';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>스쿠:디버그</h1>
      <section>
        <h3>벌레퇴치 구인</h3>
        <p>도움! 집에 벌레가 있는 당신</p>
        <Link to="/recruit" className="button button-recruit">버그헌터 구인 &gt;</Link> <br />
        <Link to="/hunt" className="button button-hunt">버그 헌팅하기 &gt;</Link> <br />
        <hr />
        <h2>버그헌터 랭킹</h2>
        <p>당신이 잡은 벌레를 전시하고 등급을 레벨업 하세요!</p>
        <Link to="/ranking" className="button button-ranking">버그헌터 랭킹 &gt;</Link>
      </section>
    </div>
  );
};

export default Home;
