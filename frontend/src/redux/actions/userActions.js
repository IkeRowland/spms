import { userLoginFail, userLoginStart, userLoginSuccess } from "../slices/userSlices"
import axios from "redaxios"

export const login = (userData) => async (dispatch) => {
    try{
        dispatch(userLoginStart());

        const {data}= await axios.post(
          "http://127.0.0.1:8000/api/v1/users/login/", userData
        );

        console.log(data)
        dispatch(userLoginSuccess(data));
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(err){
        const errMsg = err?.data ? err.data.message : err.statusText;
        dispatch(userLoginFail(errMsg))
    }
}
