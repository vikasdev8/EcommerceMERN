import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REST,
    DELET_PRODUCT_REQUEST,
    DELET_PRODUCT_SUCCESS,
    DELET_PRODUCT_FAIL,
    DELET_PRODUCT_REST,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REST,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REST,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    PRODUCT_DETAILS_SUCCESS
} from '../contants/Productcontant'

export const ProductReducers = (state = { product: {} }, action) => {


    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultperpage,
                filteredProductsCount: action.payload.filteredProductsCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };


        default:
            return state;

    }

}

export const ProductDetailsReducers = (state = { product: [] }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,

            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };


        default:
            return state;

    }

}


export const newReviewReducer = (state = { review: {} }, action) => {

    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,

            };

        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false
            };

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };


        default:
            return state;

    }

}

export const adminProductReducer = (state = { allProducts: [] }, action) => {


    switch (action.type) {
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                allProducts: []
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                allProducts: action.payload,
            };
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };


        default:
            return state;

    }

}

export const newProductReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case NEW_PRODUCT_REQUEST:

            return {
                loading: true,
                ...state
            };

        case NEW_PRODUCT_SUCCESS:

            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };


        case NEW_PRODUCT_REST:

            return {
                ...state,
                success: false
            };

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };


        default:
            return state;

    }

}

export const deleteProductReducer = (state = {}, action) => {

    switch (action.type) {
        case DELET_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            };

        case DELET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,

            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,

            };

        case DELET_PRODUCT_REST:
            return {
                ...state,
                isDeleted: false
            };

        case UPDATE_PRODUCT_REST:
            return {
                ...state,
                isUpdated: false
            };

        case DELET_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };


        default:
            return state;

    }

}

export const productReviewsReducers = (state = { reviews: [] }, action) => {

    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload

            };
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;

    }


}

export const deleteReviewsReducers = (state = {}, action) => {

    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload

            };
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DELETE_REVIEW_REST:
            return {
                ...state,
                isDeleted: false

            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;

    }

}