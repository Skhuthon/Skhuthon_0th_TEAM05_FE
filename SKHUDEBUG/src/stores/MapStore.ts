// // stores/MapStore.ts
// import { makeAutoObservable } from "mobx";

// class MapStore {
//   latitude = 0;
//   longitude = 0;
//   radius = 300;
//   bugModalStatus: boolean = false;
//   constructor() {
//     makeAutoObservable(this);
//   }

//   setLatitude(latitude: number) {
//     this.latitude = latitude;
//   }

//   setLongitude(longitude: number) {
//     this.longitude = longitude;
//   }

//   setRadius(radius: number) {
//     this.radius = radius;
//   }
//   setBugModalStatus(bugModalStatus: boolean) {
//     this.bugModalStatus = bugModalStatus;
//   }
// }

// const mapStore = new MapStore();
// export default mapStore;

import { makeAutoObservable } from "mobx";

interface ResponseData {
  loginId: string;
  bugSize: string;
  bugNum: number;
  bugType: string;
}

class MapStore {
  bugModalStatus: boolean = false;
  latitude: number = 0;
  longitude: number = 0;
  radius: number = 500;
  responseLoginId: string = "";
  responseBugSize: string = "";
  responseBugNum: number = 0;
  responseBugType: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setBugModalStatus(status: boolean) {
    this.bugModalStatus = status;
  }

  setLatitude(lat: number) {
    this.latitude = lat;
  }

  setLongitude(lon: number) {
    this.longitude = lon;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  setResponseData({ loginId, bugSize, bugNum, bugType }: ResponseData) {
    this.responseLoginId = loginId;
    this.responseBugSize = bugSize;
    this.responseBugNum = bugNum;
    this.responseBugType = bugType;
  }
}

const mapStore = new MapStore();
export default mapStore;
