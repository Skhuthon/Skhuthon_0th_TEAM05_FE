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
  return (
    <div className={styles.bugInforModal}>
      <div className={styles.inforBox}>
        <div className={styles.userInfor}>{responseLoginId}</div>
        <div className={styles.bugInfor}>
          <div>{responseBugNum}</div>
          <div>{responseBugSize}</div>
          <div>{responseBugType}</div>
        </div>
      </div>
    </div>
  );
};

export default BugInforModal;
