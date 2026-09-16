import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/user",
});

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/register", data, {
    withCredentials: true,
  });

  return res.data;
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}) => {
  const res = await api.post("/login", data, {
    withCredentials: true,
  });

  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/getUser", { withCredentials: true });

  return res.data;
};

export const logOutUser = async () => {
  const res = await api.post("/logout", {}, { withCredentials: true });

  return res.data;
};

export const authUser = async () => {
  const res = await api.get("/auth/me", { withCredentials: true });

  console.log(res.data);
  return res.data;
};
