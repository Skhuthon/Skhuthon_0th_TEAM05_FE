import { action, makeAutoObservable } from "mobx";
import CustomAxios from "../api/Axios.tsx";

class AuthStore {
  isLoggedIn: boolean = false;
  userLoginId: string | "" = "";
  userNickName: string | "" = "000";
  constructor() {
    makeAutoObservable(this, {
      login: action,
      logout: action,
      checkLoginStatus: action,
    });
    this.checkLoginStatus();
  }
  async checkLoginStatus() {
    try {
      const response = await CustomAxios.get("/user/confirm");
      if (response.status === 200) {
        const userLoginId = response.data.loginId;
        const userNickName = response.data.nickname;
        this.login(userLoginId, userNickName);
      }
    } catch (error) {
      this.logout();
    }
  }
  login = (userNickName: string, userLoginId: string) => {
    this.isLoggedIn = true;
    this.userNickName = userNickName;
    this.userLoginId = userLoginId;
  };

  logout = async () => {
    try {
      const response = await CustomAxios.get("/user/logout");
      if (response.status === 200) {
        this.setLoggedOut();
      }
    } catch (error) {
      console.log("AuthStore 로그아웃 호출에러", error);
    }
  };

  setLoggedOut() {
    this.isLoggedIn = false;
    this.userNickName = "000";
    this.userLoginId = "";
  }
}

export default new AuthStore();
