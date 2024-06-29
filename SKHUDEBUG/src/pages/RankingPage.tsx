import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRanking } from "../api/rankingApi";
import "../styles/Ranking.less";

interface User {
  nickname: string;
  times: number;
}

const Ranking: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRankingData = async () => {
      try {
        const data = await fetchRanking();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("예기치 않은 데이터 형식:", data);
        }
      } catch (error) {
        console.error("순위 데이터를 가져오지 못함", error);
      }
    };

    getRankingData();
  }, []);

  return (
    <div className="ranking-container">
      <div className="header">
        <span
          className="material-symbols-outlined back-button"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z" />
          </svg>
        </span>
        <h2>버그헌터 랭킹</h2>
      </div>
      <div className="ranking-list">
        {users.map((user, index) => (
          <div key={index} className="ranking-item">
            <span className="rank">{index + 1}등</span>
            <span className="username">{user.nickname}</span>
            <span className="times">{user.times}회</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
