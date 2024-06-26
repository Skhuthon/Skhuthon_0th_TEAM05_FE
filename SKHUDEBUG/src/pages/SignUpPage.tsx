import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/SignUpPage.module.less";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../api/Axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [id, setID] = useState<string>("");
  const [idMsg, setIDMsg] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [checkPasswordMsg, setCheckPasswordMsg] = useState<string>("");
  const [isid, setIsid] = useState<boolean>(false); //is가 붙은 변수들은 유효성 검사 상태 확인
  const [ispassword, setIspassword] = useState<boolean>(false);
  const [isNickName, setIsNickName] = useState<boolean>(false);
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);

  const onChangeNicName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNickname(e.target.value);
    if (e.target.value === "") {
      setNicknameMsg("닉네임: 필수정보입니다.");
    } else {
      setNicknameMsg("");
      setIsNickName(true);
    }
  };
  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setID(e.target.value);
    if (e.target.value === "") {
      setIDMsg("아이디: 필수정보입니다.");
    } else {
      setIDMsg("");
      setIsid(true);
    }
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordMsg("비밀번호: 필수정보입니다.");
    } else {
      setPasswordMsg("");
      setIspassword(true);
    }
  };
  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCheckPassword(e.target.value);
    if (e.target.value === password) {
      setCheckPasswordMsg("비밀번호가 일치합니다.");
    } else {
      setCheckPasswordMsg("비밀번호를 다시 확인해주세요");
      setIsCheckPassword(true);
    }
  };
  const checkInput = (): boolean => {
    if (!id.trim()) {
      setIDMsg("아이디: 필수 정보입니다.");
    }

    if (!password.trim()) {
      setPasswordMsg("비밀번호: 필수 정보입니다.");
    }

    if (!nickname.trim()) {
      setNicknameMsg("닉네임: 필수 정보입니다.");
    }
    if (!checkPassword.trim()) {
      setCheckPasswordMsg("비밀번호를 확인해주세요.");
    }

    if (!isid || !ispassword || !isNickName || !isCheckPassword) {
      return false;
    }

    return true;
  };
  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkInput()) {
      try {
        const response = await CustomAxios.post(
          "/user/join",
          {
            loginId: id,
            password,
            nickname,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={baseStyles.Container}>
      <div className={styles.header}>
        <p className={styles.headerText}>스쿠:디버그</p>
      </div>
      <div className={styles.signupBox}>
        <div className={styles.inforInput}>
          <p>닉네임</p>
          <div>
            <input type="text" value={nickname} onChange={onChangeNicName} />
          </div>
          <p>{nicknameMsg}</p>
        </div>
        <div className={styles.inforInput}>
          <p>아이디</p>
          <div>
            <input type="text" value={id} onChange={onChangeID} />
          </div>
          <p>{idMsg}</p>
        </div>
        <div className={styles.inforInput}>
          <p>비밀번호</p>
          <div>
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <p>{passwordMsg}</p>
        </div>
        <div className={styles.inforInput}>
          <p>비밀번호 확인</p>
          <div>
            <input
              type="password"
              value={checkPassword}
              onChange={onChangeCheckPassword}
            />
          </div>
          <p>{checkPasswordMsg}</p>
        </div>

        <button className={styles.signupBtn} type="submit" onClick={signup}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
