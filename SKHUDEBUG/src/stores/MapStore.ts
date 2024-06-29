// stores/MapStore.ts
import { makeAutoObservable } from "mobx";

class MapStore {
  latitude = 0;
  longitude = 0;
  radius = 300;
  bugModalStatus: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  setLatitude(latitude: number) {
    this.latitude = latitude;
  }

  setLongitude(longitude: number) {
    this.longitude = longitude;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }
  setBugModalStatus(bugModalStatus: boolean) {
    this.bugModalStatus = bugModalStatus;
  }
}

const mapStore = new MapStore();
export default mapStore;
