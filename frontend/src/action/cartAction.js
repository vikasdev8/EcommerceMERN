import { ADD_TO_CART, REMOVE_CART_ITEM, SHIPPING_INFO } from '../contants/cartcontant'
import axios from 'axios'

export const adtoItemsCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/products/${id}`)
    console.log(data)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.Images[0].Url,
            price: data.product.price,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartItems))

}
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    })

    localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartItems))
}

export const saveshippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SHIPPING_INFO,
        payload: data,
    })

    localStorage.setItem("shippingInfo", JSON.stringify(data))

}