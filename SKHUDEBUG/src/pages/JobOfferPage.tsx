import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/JobOfferPage.module.less";
import MapWithSearch from "../components/Map";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { findHunter, getMaker } from "../service/UserService";
const JobOfferPage = () => {
  const [bugNum, onChangeBugNum] = useForm();
  const [bugSize, onChangeBugSize] = useForm();
  const [bugType, onChangeBugType] = useForm();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [radius, onChangeRadius] = useForm();

  const FindHunter = async () => {
    if (bugNum && bugSize && bugType !== " ")
      if (latitude && longitude && Number(radius) !== 0) {
        try {
          const loginId = window.localStorage.getItem("loginId");
          if (!loginId) {
            console.log("로그인 상태가 아닙니다.");
            return;
          }
          const response = await findHunter(
            loginId,
            latitude,
            longitude,
            Number(bugNum),
            bugSize,
            bugType,
            Number(radius)
          );
          if (response.status === 200) {
            console.log("헌터 호출 성공");
            await getMaker(loginId);
          }
        } catch (error) {
          console.log(error);
        }
      }
  };
  return (
    <div className={baseStyles.Container}>
      <div className={styles.TopBox}>
        <p>희망 지역</p>
      </div>
      <div className={styles.mapBox}>
        <MapWithSearch
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          onChangeRadius={onChangeRadius}
          radius={Number(radius)}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
      <div className={styles.searchBox}>
        <div className={styles.searchInfor}>
          <div className={styles.bugInput}>
            <table>
              <tr>
                <th>벌레 마리수: </th>
                <td>
                  <input type="text" value={bugNum} onChange={onChangeBugNum} />
                </td>
              </tr>
              <tr>
                <th>벌레 크기: </th>
                <td>
                  <input
                    type="text"
                    value={bugSize}
                    onChange={onChangeBugSize}
                  />
                </td>
              </tr>
              <tr>
                <th>벌레 종류: </th>
                <td>
                  <input
                    type="text"
                    value={bugType}
                    onChange={onChangeBugType}
                  />
                </td>
              </tr>
            </table>
          </div>
          <button className={styles.hunterBtn} onClick={FindHunter}>
            헌터찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOfferPage;
