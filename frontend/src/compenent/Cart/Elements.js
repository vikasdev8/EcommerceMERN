import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import Payment from './payment'

const Element = ({stripe}) => {
    return (
        <Elements stripe={stripe}>
        <Payment/>
        </Elements>
    )
}

export default Element
