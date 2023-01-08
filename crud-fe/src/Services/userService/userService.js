import axios from "axios";
import Global from "../../global";
import {authHeader} from "../../Helper/authHeader";

const login = async (data) => {
    return await axios.post(`${Global.BASE_API_PATH}/login`, data);
};

const getUserInfo = async (token) => {
    const {data} = await axios.get(`${Global.BASE_API_PATH}/get-user`,authHeader())
    return data
}

export {login, getUserInfo}