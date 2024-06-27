import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/MainPage.module.less";
import AuthStore from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName } = AuthStore;
  useEffect(() => {
    const loginCheck = async () => {
      try {
        await AuthStore.checkLoginStatus();
        if (AuthStore.isLoggedIn) {
        }
      } catch (error) {
        console.log(error);
      }
    };

    loginCheck();
  }, []);

  const clickBugJobOffer = () => {
    navigate("/joboffer");
  };
  return (
    <div className={baseStyles.Container}>
      <div className={styles.TopPage}>
        <div className={styles.nameBox}>
          <p>스쿠:디버그</p>
        </div>
        <div className={styles.inforBox}>
          <p>벌레퇴치 구인</p>
          <p>도움!! 집에 벌레가 있는 당신</p>
        </div>
        <div className={styles.btnBox}>
          <button className={styles.bugBtn} onClick={clickBugJobOffer}>
            <p>버그헌터 구인</p>
          </button>
          <button className={styles.bugBtn}>
            <p>버그 헌팅하기</p>
          </button>
        </div>
      </div>
      <div className={styles.BottomPage}>
        <div className={styles.inforBox}>
          <p>버그헌터 랭킹</p>
          <p>당신이 잡은 벌레를 전시하고 랭킹을 올려보세요!</p>
        </div>
        <button className={styles.bugBtn}>
          <p>버그헌터 랭킹</p>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
