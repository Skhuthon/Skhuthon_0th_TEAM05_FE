// User 인터페이스 정의
export interface User {
    id: string;
    name: string;
    acceptedRequests: number;
  }
  
  // 예제 유저 데이터
  export const users: User[] = [
    { id: '1', name: '유저1', acceptedRequests: 5 },
    { id: '2', name: '유저2', acceptedRequests: 3 },
    { id: '3', name: '유저3', acceptedRequests: 7 },
    { id: '1', name: '유저4', acceptedRequests: 1 },
    { id: '2', name: '유저5', acceptedRequests: 2 },
    { id: '3', name: '유저6', acceptedRequests: 4 },
  ];
  
 