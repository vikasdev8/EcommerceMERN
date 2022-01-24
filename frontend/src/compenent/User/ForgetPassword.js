import React, { Fragment, useState, useEffect } from 'react'
import './ForgetPassword.css'
import Loader from '../layout/loader/loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, forgetPassword } from '../../action/userAction'
import { useAlert } from 'react-alert'
import Metadata from '../layout/metadata'

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading, error, message} = useSelector(state => state.forgetPassword)
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
      
        myForm.set("email", email);
       
        dispatch(forgetPassword(myForm))
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        }
      }, [dispatch, error, alert, message]);

    return (
        <Fragment>
        { loading ? (<Loader/>):
     ( <Fragment>
        <Metadata title="Forgot Password" />
        <div className="forgotPasswordContainer">
         <div className="forgotPasswordBox">
         <h2 className="forgotPasswordHeading">Forgot Password</h2>
             <form
             className="forgotPasswordForm"
             onSubmit={forgotPasswordSubmit}
           >
             <div className="forgotPasswordEmail">
               <MailOutlineIcon />
               <input
                 type="email"
                 placeholder="Email"
                 required
                 name="email"
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
               />
             </div>

             <input type="submit" value="Send" className="forgotPasswordBtn" />
           </form>
             </div>
         </div>
     </Fragment>)
     }
    </Fragment>
    )
}

export default ForgetPassword
