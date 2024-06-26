import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../utlis/users';
import '../styles/Ranking.css';

interface RankingProps {
  initialUsers: User[];
}

const Ranking: React.FC<RankingProps> = ({ initialUsers }) => {
  const [users] = useState<User[]>(initialUsers);
  const navigate = useNavigate();

  const sortedUsers = [...users].sort((a, b) => b.acceptedRequests - a.acceptedRequests);

  return (
    <div className="ranking-container">
      <div className="header">
        <span className="material-symbols-outlined back-button" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M360-200 80-480l280-280 56 56-183 184h647v80H233l184 184-57 56Z"/>
          </svg>
        </span>
        <h2>버그헌터 랭킹</h2>
      </div>
      <div className="ranking-list">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="ranking-item">
            <span className="rank">{index + 1}등</span>
            <span className="username">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
