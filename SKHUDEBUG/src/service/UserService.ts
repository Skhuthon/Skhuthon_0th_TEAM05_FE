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
