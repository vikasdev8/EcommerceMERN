import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { ProductDetailsReducers, ProductReducers, newReviewReducer, adminProductReducer, newProductReducer, deleteProductReducer, productReviewsReducers, deleteReviewsReducers } from './Reducers/Productrducers';
import { profileReducer, userReducer, forgetPasswordReducer, allUsers, userUpdateAndDeleteReducer, getUserDetails } from './Reducers/userReducers';
import {cartReducer} from "./Reducers/cartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, OrdersDetailsReducer, updateOrdersReducer } from './Reducers/orderReducer';

const reducer = combineReducers({
    products: ProductReducers,
    productDetails : ProductDetailsReducers,
    user:userReducer,
    profile: profileReducer,
    forgetPassword: forgetPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails : OrdersDetailsReducer,
    reviews: newReviewReducer,
    allUsers: allUsers,
    allOrders: allOrdersReducer,
    allProducts: adminProductReducer,
    newProduct: newProductReducer,
    deleteProduct: deleteProductReducer,
    order: updateOrdersReducer,
    updateUser: userUpdateAndDeleteReducer,
    singleUser: getUserDetails,
    Productreviews:productReviewsReducers,
    Deletereview:deleteReviewsReducers
})

let initialState = {
    cart:   {
        cartItems: localStorage.getItem("cartitems") ? JSON.parse(localStorage.getItem("cartitems")) : [],
    },
};

const middleware  = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools( applyMiddleware(...middleware)))


export default store