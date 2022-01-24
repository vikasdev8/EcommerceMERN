import { ADD_TO_CART, REMOVE_CART_ITEM, SHIPPING_INFO } from '../contants/cartcontant'

export const cartReducer = (state ={ cartItems: [], shippingInfo: {}}, action) =>{

switch (action.type) {
    case ADD_TO_CART:
        const item = action.payload
        const isItemExits = state.cartItems.find(
            (i)=> i.product === item.product
        )

        if (isItemExits) {
            return{
                ...state,
                cartItems: state.cartItems.map((i)=>
                i.product === isItemExits.product ? item : i
                    )
            }
        } else {
           return{
               ...state,
               cartItems: [...state.cartItems, item]
           }

        }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload)
            }

            case SHIPPING_INFO:
                return {
                    ...state,
                    shippingInfo: action.payload
                }


    default:
        return {...state};
}
}