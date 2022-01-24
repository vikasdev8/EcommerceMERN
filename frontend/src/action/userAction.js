import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    CLEAR_ERRORS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    SINGLE_USER_REQUEST,
    SINGLE_USER_SUCCESS,
    SINGLE_USER_FAIL,
    RESET_PASSWORD_REQUEST,

} from '../contants/userConstants'
import axios from 'axios'

// log in
export const logIn = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST });
        const cofig = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`api/v1/login`, { email, password }, cofig)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

// register

export const registerUser = (userData) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(`/api/v1/register`, userData, config)


        dispatch({ type: REGISTER_SUCCESS, payload: data.user })


    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message })
    }
}

export const loadUser = () => async (dispatch) => {

    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get(`/api/v1/me`)
        console.log(data)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })


    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

//Logout


export const logout = () => async (dispatch) => {

    try {

        await axios.get(`/api/v1/logout`)

        dispatch({ type: LOGOUT_SUCCESS })


    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

// upate profile

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.put(`/api/v1/me/update`, userData, config)


        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })


    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

//UPDATE PASSWORD

export const updatePassword = (password) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/api/v1/password/update`, password, config)


        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })


    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// foret Password

export const forgetPassword = (email) => async (dispatch) => {

    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/password/forget`, email, config)

        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message })

    } catch (error) {
        dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.response.data.message })
    }


}

// rest password through token
export const resetPassword = (password, token) => async (dispatch) => {

    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, password, config)

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message })
    }


}

export const getAllUsers = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_USER_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users');

        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, user) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, user, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: SINGLE_USER_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({
            type: SINGLE_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: SINGLE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear error

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}
