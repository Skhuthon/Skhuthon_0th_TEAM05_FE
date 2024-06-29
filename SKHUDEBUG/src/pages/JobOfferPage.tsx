import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/JobOfferPage.module.less";
import MapWithSearch from "../components/Map";
import { useForm } from "../hooks/useForm";
import { useState, useEffect } from "react";
import {
  findHunter,
  getMarker,
  hunterConnection,
} from "../service/UserService";
import BugInforModal from "../components/bugInforModal";
import { observer } from "mobx-react-lite";
import mapStore from "../stores/MapStore";

const JobOfferPage = observer(() => {
  const [bugNum, onChangeBugNum] = useForm();
  const [bugSize, onChangeBugSize] = useForm();
  const [bugType, onChangeBugType] = useForm();
  const [responseLoginId, setResponseLoginId] = useState<string>("");
  const [responseBugSize, setResponseBugSize] = useState<string>("");
  const [responseBugNum, setResponseBugNum] = useState<number>(0);
  const [responseBugType, setResponseBugType] = useState<string>("");
  const [findHunterStatus, setFindHunterStatus] = useState<boolean>(false);

  const FindHunter = async () => {
    if (bugNum && bugSize && bugType !== "")
      if (mapStore.latitude && mapStore.longitude && mapStore.radius !== 0) {
        try {
          const loginId = window.localStorage.getItem("loginId");
          if (!loginId) {
            console.log("로그인 상태가 아닙니다.");
            return;
          }

          const response = await findHunter(
            loginId,
            mapStore.latitude,
            mapStore.longitude,
            Number(bugNum),
            bugSize,
            bugType,
            mapStore.radius
          );

          if (response.status === 200) {
            setResponseLoginId(response.data.loginId);
            setResponseBugNum(response.data.bugNum);
            setResponseBugType(response.data.bugType);
            setResponseBugSize(response.data.bugSize);
            setFindHunterStatus(true);
            await hunterConnection(loginId);
          }
        } catch (error) {
          console.log(error);
        }
      }
  };

  useEffect(() => {
    const loginId = window.localStorage.getItem("loginId");
    if (findHunterStatus && loginId !== null) {
      getMarker(loginId);
    }
  }, [findHunterStatus]);

  return (
    <div className={baseStyles.Container}>
      <div className={styles.TopBox}>
        <p>희망 지역</p>
      </div>
      <div className={styles.mapBox}>
        {mapStore.bugModalStatus && (
          <BugInforModal
            responseLoginId={responseLoginId}
            responseBugNum={responseBugNum}
            responseBugSize={responseBugSize}
            responseBugType={responseBugType}
          />
        )}
        <MapWithSearch findHunterStatus={findHunterStatus} />
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
});

export default JobOfferPage;
