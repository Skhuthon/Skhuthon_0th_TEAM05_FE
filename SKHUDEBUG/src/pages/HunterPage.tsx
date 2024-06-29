import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import MapWithSearch from "../components/Map";
import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/HunterPage.module.less";
import { getAll } from "../service/UserService";
import HunterAccept from "../components/HunterAccept";

const HunterPage = observer(() => {
  const userNickName = window.localStorage.getItem("nickName");

  const [bugHunts, setBugHunts] = useState<BugHunt[]>([]);
  const [ModalStatus, setModalStatus] = useState<boolean>(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log("현재위치", latitude, longitude);

              const response = await getAll();

              const bugHunts: BugHunt[] = response.data.data.bughunts;

              const requestId = bugHunts[0];
              const senderId = bugHunts[0].loginId;
              window.localStorage.setItem("requestId", String(requestId));
              window.localStorage.setItem("senderId", String(senderId));
              console.log(senderId);
              console.log(bugHunts);
              setBugHunts(bugHunts);
            },
            (error) => {
              console.error("현재 위치를 가져오는 중 오류 발생:", error);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("데이터 불러오기 중 오류 발생:", error);
      }
    };

    getLocation();
  }, []);

  return (
    <div className={baseStyles.Container}>
      <div className={styles.HunterContainer}>
        <div className={styles.mapBox}>
          {ModalStatus && <HunterAccept setModalStatus={setModalStatus} />}

          <MapWithSearch bugHunts={bugHunts} />
        </div>
        <div className={styles.userInfor}>
          <div className={styles.userImg}>
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className={styles.userNickName}>
            <p>{userNickName}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HunterPage;
