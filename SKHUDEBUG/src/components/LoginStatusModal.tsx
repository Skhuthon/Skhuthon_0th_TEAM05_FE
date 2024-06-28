import styles from "../styles/LoginStatusModal.module.less";
import { useNavigate } from "react-router-dom";

const LoginStatusModal = () => {
  const navigate = useNavigate();
  const clickLogin = () => {
    navigate("/login");
  };
  const clickSignup = () => {
    navigate("/signup");
  };
  return (
    <div className={styles.popup}>
      <div className={styles.loginInfor}>
        <p>스쿠:디버그</p>
        <p>서비스 사용을 위해 로그인 해주세요!</p>
      </div>
      <div className={styles.navigateBtn}>
        <button className={styles.loginBtn} onClick={clickLogin}>
          로그인
        </button>
        <button className={styles.signupBtn} onClick={clickSignup}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginStatusModal;
