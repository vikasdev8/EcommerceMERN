import React, { useEffect, Fragment } from 'react'
import Sidebar from "./Sidebar.js";
import { useNavigate } from 'react-router-dom'
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';
import { getAllOrders } from '../../action/orderAction'
import { getAdminProduct } from '../../action/Productaction'
import { getAllUsers } from '../../action/userAction'
import Loader from '../layout/loader/loader'

const Dashboard = ({user, loading}) => {


  const dispatch = useDispatch();

  const alert = useAlert()

  const navigate = useNavigate()

  const { allProducts, loading: Ploading } = useSelector((state) => state.allProducts);

  const { orders} = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);


  useEffect(() => {
    if (!loading) {
      if (user.role === "user") {
           alert.info("Your not allowed")
          navigate('/')
        }
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, alert, navigate, user, loading]);
  
  // const Stock = ()=>{
  //   let outOfStock = 0;
  //   allProducts &&
  //   allProducts.forEach((item) => {
  //   if (item.stock === 0) {
  //     outOfStock += 1;
  //   }
  // });
  // return outOfStock
  // }

// let outOfStock = Stock();

const Amount = ()=>{
  let totalAmount = 0;
  orders &&
  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });
  return totalAmount
}
let totalAmount = Amount();


 
  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["tomato"],
  //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ["Out of Stock", "InStock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4", "#6800B4"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock, allProducts.length - outOfStock],
  //     },
  //   ],
  // };


  return (
    <Fragment>
    {
      Ploading ? (<Loader/>) : 
    (
      <Fragment>
      <div className="dashboard">
  
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{allProducts && allProducts.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
          <div className="lineChart">
            {/* <Line data={lineState} /> */}
            
          </div>
  
          <div className="doughnutChart">
            {/* <Doughnut data={doughnutState} /> */}
          </div>
        </div>
      </div>
      </Fragment>
    )
    }
     </Fragment> 
  )
 
}

export default Dashboard
