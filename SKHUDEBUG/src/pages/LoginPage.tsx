import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/LoginPage.module.less";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../service/UserService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [idMessage, setIDMessage] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [isid, setIsid] = useState<boolean>(false);
  const [ispassword, setIspassword] = useState<boolean>(false);

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isid && ispassword) {
      try {
        const response = await login(id, password);

        if (response.status === 200) {
          navigate("/");
          console.log("로그인 성공!");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setLoginMessage("아이디 또는 비밀번호를 잘못 입력했습니다.");
      }
    } else {
      if (!isid) setIDMessage("아이디를 입력해주세요.");
      if (!ispassword) setPasswordMessage("비밀번호를 입력해주세요.");
    }
  };

  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setID(e.target.value);
    if (e.target.value === "") {
      setIDMessage("아이디: 필수 정보입니다.");
      setIsid(false);
    } else {
      setIDMessage("");
      setIsid(true);
    }
  };

  const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordMessage("비밀번호: 필수 정보입니다.");
      setIspassword(false);
    } else {
      setPasswordMessage("");
      setIspassword(true);
    }
  };

  return (
    <div className={baseStyles.Container}>
      <div className={styles.TopPage}>
        <div className={styles.logo}>
          <img src="/images/logo.png" />
          <p className={styles.logoName}>스쿠: 디버그</p>
        </div>
      </div>
      <div className={styles.BottomPage}>
        <div className={styles.loginInput}>
          <div className={styles.idInput}>
            <input
              type="text"
              value={id}
              placeholder="아이디"
              onChange={onChangeID}
            />
          </div>
          <div className={styles.passwordInput}>
            <input
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={onChangePW}
            />
          </div>
        </div>
        <div className={styles.loginBtn} onClick={loginSubmit}>
          <p>로그인</p>
        </div>
        <ul className={styles.messagebox}>
          {idMessage && <li>•{idMessage}</li>}
          {passwordMessage && <li>•{passwordMessage}</li>}
          {loginMessage && <li>•{loginMessage}</li>}
        </ul>
        <div className={styles.signupBtn} onClick={() => navigate("/signup")}>
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
