import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, GetMyOrderDetails } from "../../action/orderAction";
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
    const { loading, error, order } = useSelector(state => state.orderDetails)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const param = useParams()
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(GetMyOrderDetails(param.id))
    }, [dispatch, error, alert, param.id])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>

                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography component="h1">
                                Order #{order && order._id}
                            </Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{user && user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>
                                        {order.shippingInfo && order.shippingInfo.phoneNo}
                                    </span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order.paymentInfo &&
                                            order.paymentInfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                    </p>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>

                            <Typography>Order Status</Typography>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.orderStatus && order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order.orderStatus && order.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                            <span>
                                                {item.quantity} X ₹{item.price} ={" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default OrderDetails
