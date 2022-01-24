import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    MY_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS
} from '../contants/orderContant'

import axios from 'axios'

export const createOrder = (order) => async (dispatch, getstate) => {
        console.log(order)
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        const { data } = await axios.post('/api/v1/order/new', order, config);
        console.log(data)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.data.response.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getstate) => {

    try {
        dispatch({ type: MY_ORDER_REQUEST })

        const { data } = await axios.get('/api/v1/order/me');

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.data.response.message
        })
    }
}

export const GetMyOrderDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/order/me/${id}`);

        console.log(data.order)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.data.response.message
        })
    }
}


export const getAllOrders = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_ORDER_REQUEST })

        const { data } = await axios.get('/api/v1/admin/order');

        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const updateOrder = (id, status) => async (dispatch) => {
    console.log("status:",status)

    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        const { data } = await axios.put(`/api/v1/admin/order/status/${id}`, status, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}