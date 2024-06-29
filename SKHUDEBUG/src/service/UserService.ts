import CustomAxios from "../api/Axios";

export const signup = async (
  id: string,
  password: string,
  nickname: string
) => {
  try {
    const response = await CustomAxios.post(
      "/user/join",
      {
        loginId: id,
        password,
        nickname,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (id: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append("loginId", id);
    formData.append("password", password);
    const response = await CustomAxios.post("/user/login", formData);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findHunter = async (
  loginId: string,
  latitude: number,
  longitude: number,
  bugNum: number,
  bugSize: string,
  bugType: string,
  radius: number
) => {
  try {
    const response = await CustomAxios.post(
      "/bughunt",
      {
        loginId: loginId,
        latitude: latitude,
        longitude: longitude,
        bugNum: bugNum,
        bugSize: bugSize,
        bugType: bugType,
        radius: radius,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMaker = async (loginId: string) => {
  const response = await CustomAxios.get(`/bughunt/user?loginId=${loginId}`);
  return response;
};
