import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/analysis",
});

export const getSingleIngredient = async (id: string) => {
  const res = await api.get(`/getSingleIngredient/${id}`, {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data;
};

export const imageAnalysis = async (data: { thumbnail: File }) => {
  const Data = new FormData();

  Data.append("image", data.thumbnail);

  const res = await api.post("/imageAnalysis", Data, {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data;
};

export const imageAnalysisRes = async (id: string) => {
  const res = await api.get(`/imageAnalysis/${id}`, {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data;
};

export const searchIngredient = async (searchQuery: string) => {
  const res = await api.get(`/searchIngredient?search=${searchQuery}`, {
    withCredentials: true,
  });

  return res.data;
};
