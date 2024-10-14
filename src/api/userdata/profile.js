// import axios from "axios";
import instance from "../../api/config";
// import Cookies from "js-cookie";

const url = "https://localhost:4000";

export const getProfile = async ({ uuid, accessToken }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const res = await instance.get(`${url}/users/${uuid}/`, { headers });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};
