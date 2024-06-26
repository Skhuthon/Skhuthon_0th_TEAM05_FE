import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/LoginPage.module.less";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className={baseStyles.Container}>
      <div className={styles.TopPage}>
        <div className={styles.logo}>
          <img src="/images/logo.png" />
          <p className={styles.logoName}>스쿠: 디버그</p>
        </div>
      </div>
      <div className={styles.BottomPage}>
        <div className={styles.loginBtn} onClick={() => navigate("/")}>
          <p>로그인</p>
        </div>
        <div className={styles.signupBtn} onClick={() => navigate("/signup")}>
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
