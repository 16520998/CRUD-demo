import axios from "axios";
import { authHeader } from "../../Helper/authHeader";
import Global from "../../global";

const fetchProducts = async (name = "") => {
  let url = `${Global.BASE_API_PATH}/products`;
  if (name !== "") {
    url += `?name=${name}`;
  }
  const { data } = await axios.get(url, authHeader());
  return data.data;
};

const fetchProductById = async (id) => {
  const { data } = await axios.get(`${Global.BASE_API_PATH}/products/${id}`, authHeader());
  return data.data;
};

const createAProduct = async (data) => {
  await axios.post(`${Global.BASE_API_PATH}/products`, data, authHeader());
};

const editAProduct = async (productId, data) => {
  await axios.put(
    `${Global.BASE_API_PATH}/products/${productId}`,
    data,
    authHeader()
  );
};

const deleteAProduct = async (id) => {
  await axios.delete(`${Global.BASE_API_PATH}/products/${id}`, authHeader());
};

export {
  fetchProducts,
  fetchProductById,
  createAProduct,
  editAProduct,
  deleteAProduct,
};
