import React, { Fragment, useState, useEffect } from 'react'
import './UpdateProfile.css'
import Loader from '../layout/loader/loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../action/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../contants/userConstants'
import Metadata from '../layout/metadata'
const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const { error, loading, isUpdated } = useSelector(state => state.profile)
    const alert = useAlert()
    const [avatar, setAvatar] = useState("/logo192.png");//take image frompublic folder under frontend
    const [avatarPreview, setAvatarPreview] = useState("");  //take image frompublic folder under frontend
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const registerDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);


    };


    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm))
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.Url)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {

            alert.success('Profile Updated successfully')
            dispatch(loadUser())
            navigate('/account')
        }
        dispatch({
            type: UPDATE_PROFILE_RESET,

        })
    }, [dispatch, error, alert, user, isUpdated, navigate])

    return (
       <Fragment>
           { loading ? (<Loader/>):
        ( <Fragment>
            <Metadata Title={'Profile Update'}  />
           <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Update Profile" className="updateProfileBtn" />
              </form>
                </div>
            </div>
        </Fragment>)   
        }
       </Fragment>
    )
}

export default UpdateProfile


