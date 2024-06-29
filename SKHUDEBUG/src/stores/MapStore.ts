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
