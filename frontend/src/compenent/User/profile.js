import React, { Fragment, useEffect } from 'react'
import Metadata from '../layout/metadata'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/loader'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './profile.css'

const Profile = () => {
    const { user, loading, isAuthentication } = useSelector(state => state.user)
    const Push = useNavigate()
    useEffect(() => {
        if (isAuthentication === false) {
            Push("/login")
        }

    }, [ isAuthentication, Push])

    return (
        <Fragment>
            {
                loading ? (<Loader />) :
                    (<Fragment>
                        <Metadata Title={`${user.name} Profile`} />
                        <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.Url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{new Date().toLocaleDateString()}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>

                    </Fragment>)
            }
        </Fragment>
    )
}

export default Profile
