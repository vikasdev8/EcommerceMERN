import React, { Fragment, useState, useEffect } from 'react'
import './PasswordUpdate.css'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/loader/loader.js'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { clearErrors, updatePassword } from '../../action/userAction'
import { UPDATE_PASSWORD_RESET } from '../../contants/userConstants'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom"
import MetaData from '../layout/metadata'

const PasswordUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading, isUpdated } = useSelector(state => state.profile)
    const alert = useAlert()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

   
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm))
}

    useEffect(() => {
    
      if (error) {
          alert.error(error)
          dispatch(clearErrors())
      }

      if (isUpdated) {

          alert.success('Profile Updated successfully')
          navigate('/account')
      }
      dispatch({
          type: UPDATE_PASSWORD_RESET,

      })
  }, [dispatch, error, alert, isUpdated, navigate])
    return (
       <Fragment>
         {loading ? (<Loader/>) : 
         (
          <Fragment>
             <MetaData title="Change Password" />
             <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
          <form
              className="updatePasswordForm"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >

              <div className="loginPassword">
                <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  name="password"
                  value={oldPassword}
                  onChange={(e)=>setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  name="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
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
              <input type="submit" value="Change" className="updatePasswordBtn" />
            </form>
            </div>
            </div>
      </Fragment>
         )}
       </Fragment>
    )
}

export default PasswordUpdate
