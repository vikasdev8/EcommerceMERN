import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom'
import  {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../action/userAction';
import Backdrop from "@material-ui/core/Backdrop";
import "./header.css"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Useroption = ({user}) => {
    const [open, setOpen] = useState(false)
    const history = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {cartItems} = useSelector(state => state.cart)
    

    const option = [
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {icon: <ShoppingCartIcon/>, name: `Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser}
      
    ]

    if (user.role ==='admin') {
        option.unshift( {icon: <DashboardIcon/>, name: "Dashboard", func: dashboard})
    }

    function dashboard() {
        history('/admin/dashboard')
    }

    function orders() {
        history('/orders')
    }

    function account() {
        history('/account')
    }

    function cart() {
        history('/cart')
    }


    function logoutUser() {
        dispatch(logout())
        alert.success("Log Out Successfully")
      
    }

    return (
        <Fragment>
             <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={()=> setOpen(false)}
            style={{ zIndex: "11" }}
            onOpen={()=> setOpen(true)}
            open={open}
            className="speedDial"
            direction='down'
            icon={ <img  className='speedDialIcon' src={user.avatar.Url ? user.avatar.Url : "/logo512.png" } alt="Profile" /> }
            >
               {
                   option.map((item)=>(
                       <SpeedDialAction  
                       key={item.name} 
                       icon={item.icon} 
                       tooltipTitle={item.name} 
                       onClick={item.func}  
                       tooltipOpen={window.innerWidth <= 600 ? true : false} />
                   ))
               }
            </SpeedDial>
        </Fragment>
    );
}

export default Useroption
