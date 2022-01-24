import React, { Fragment, useRef, useEffect } from "react";
import CheckoutSteps from "./CheckoutStep";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors, createOrder } from '../../action/orderAction'



const Payment = () => {

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.newOrder)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const payBtn = useRef(null)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const alert = useAlert()
    const stripes = useStripe()
    const element = useElements()
    const paymentdata = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo, 
        orderItems: cartItems,
        itmesPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }



    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const { data } = await axios.post('/api/v1/payment/process', paymentdata, config)

            const client_secret = data.client_secret

            if (!stripes || !element) return;

            const result = await stripes.confirmCardPayment(client_secret, {
                payment_method: {
                    card: element.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country
                        }
                    }
                }

            })

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo ={
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    navigate('/success')
                    localStorage.removeItem("cartitems")
                    
                }
                else {
                    alert.error('There is any issue while doing payment')
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }

    }, [dispatch, alert, error])
    return (

        <Fragment>
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>

    )
}

export default Payment
