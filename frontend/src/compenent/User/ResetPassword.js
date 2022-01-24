import React, { Fragment, useState, useEffect } from 'react'
import './ResetPassword.css'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/loader/loader.js'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import { clearErrors, resetPassword } from '../../action/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom"
import MetaData from '../layout/metadata'
import {useParams} from 'react-router-dom'
const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading, success } = useSelector(state => state.forgetPassword)
    const params = useParams()
    const alert = useAlert()
    const [Password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

   
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", Password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword( myForm, params.token))
    console.log(myForm)
}

    useEffect(() => {
    
      if (error) {
          alert.error(error)
          dispatch(clearErrors())
      }

      if (success) {

          alert.success('Password Updated successfully')
          navigate('/login')
      }
  }, [dispatch, error, alert, success, navigate])
    return (
       <Fragment>
         {loading ? (<Loader/>) : 
         (
          <Fragment>
             <MetaData title="Change Password" />
             <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
          <form
              className="updatePasswordForm"
              onSubmit={resetPasswordSubmit}
            >

              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  require
                  value={Password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>


              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  name="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Update" className="resetPasswordBtn" />
            </form>
            </div>
            </div>
      </Fragment>
         )}
       </Fragment>
    ) 
}

export default ResetPassword
