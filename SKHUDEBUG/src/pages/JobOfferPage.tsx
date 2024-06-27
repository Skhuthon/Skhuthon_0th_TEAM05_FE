import baseStyles from "../styles/BaseStyles.module.less";
import styles from "../styles/JobOfferPage.module.less";
import MapComponent from "../components/Map";
const JobOfferPage = () => {
  return (
    <div className={baseStyles.Container}>
      <div className={styles.TopBox}>
        <p>희망 지역</p>
        <div className={styles.inputBox}>
          <div>X</div>
          <input type="text" placeholder="장소입력" />
        </div>
      </div>
      <div className={styles.mapBox}>
        <MapComponent />
      </div>
      <div className={styles.searchBox}>
        <div className={styles.searchInfor}>
          <table>
            <tr>
              <td>벌레 마리수: </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>벌레 크기: </td>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>벌레 종류: </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </table>
          <button className={styles.hunterBtn}>헌터찾기</button>
        </div>
      </div>
    </div>
  );
};

export default JobOfferPage;
