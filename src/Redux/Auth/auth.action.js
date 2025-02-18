// import axios from "axios"
// import {API_BASE_URL} from "./config/api.js"
// import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./auth.actionType"

// export const loginUserAction = (loginData) => async (dispatch) => {
//     try {
//         const { data } = await axios.post('${API_BASE_URL}/auth/signin', loginData.data)

//         if (data.jwt) {
//             localStorage.setItem("jwt", data.jwt)
//         }
//         console.log("login success", data)
//         dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })

//     } catch (error) {
//         console.log("---------", error)
//         dispatch({ type: LOGIN_FAILURE, payload: error })
//     }

//     export const registerUserAction = (loginData) => async (dispatch) => {
//         try {
//             const { data } = await axios.post('${API_BASE_URL}/auth/signup', loginData.data)

//             if (data.jwt) {
//                 localStorage.setItem("jwt", data.jwt)
//             }
//             console.log("register", data)
//             dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })

//         } catch (error) {
//             console.log("---------", error)
//             dispatch({ type: REGISTER_FAILURE, payload: error })
//         }
//     }