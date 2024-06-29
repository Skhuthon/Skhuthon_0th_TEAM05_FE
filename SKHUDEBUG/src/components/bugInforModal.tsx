import React from "react";
import styles from "../styles/bugInforModal.module.less";

interface bugInforProps {
  responseLoginId: string;
  responseBugSize: string;
  responseBugNum: number;
  responseBugType: string;
}

const BugInforModal: React.FunctionComponent<bugInforProps> = ({
  responseLoginId,
  responseBugSize,
  responseBugType,
  responseBugNum,
}) => {
  console.log(responseBugNum, responseBugSize, responseBugType);

  return (
    <div className={styles.bugInforModal}>
      <div className={styles.inforBox}>
        <div className={styles.userInfor}>
          <p>아이디: </p>
          {responseLoginId}
        </div>
        <div className={styles.bugInfor}>
          <div>
            <p>벌레 마리수: </p>
            {responseBugNum}
          </div>
          <div>
            <p>벌레 크기: </p>
            {responseBugSize}
          </div>
          <div>
            <p>벌레 종류: </p>
            {responseBugType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugInforModal;
