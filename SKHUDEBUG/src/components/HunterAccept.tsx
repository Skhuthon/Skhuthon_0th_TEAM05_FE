import React from "react";
import styles from "../styles/bugInforModal.module.less";
import { HunterAccept2 } from "../service/UserService";

interface HunterAcceptProps {
  setModalStatus: (ModalStatus: boolean) => void;
}

const HunterAccept: React.FunctionComponent<HunterAcceptProps> = ({
  setModalStatus,
}) => {
  const requestId = window.localStorage.getItem("requestId") || "";
  const senderId = window.localStorage.getItem("senderId") || "";
  const loginid = window.localStorage.getItem("loginId") || "";

  const clickAccept = async () => {
    await HunterAccept2(senderId, loginid, Number(requestId));
    setModalStatus(true);
  };

  return (
    <div className={styles.bugInforModal}>
      <div className={styles.inforBox}>
        <div className={styles.userInfor}>
          <p>아이디</p>
        </div>
        <div className={styles.bugInfor}>
          <div>
            <p>벌레 마리수: </p>
          </div>
          <div>
            <p>벌레 크기: </p>
          </div>
          <div>
            <p>벌레 종류: </p>
          </div>
        </div>
        <button onClick={clickAccept}>수락하기</button>
      </div>
    </div>
  );
};

export default HunterAccept;
