import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilepng from '../images/Profile.png'

const Reviewcard = ({review}) => {

    const options={
        edit:false,
        color: "rgba(20,20,20,0,1)",
        activecColor: "tomato",
        value: Number(review.rating),
        isHalf: true,
        size: window.innerWidth <600 ? 20:25,
    }
    return (
        <div className='reviewCard'>
            <img src={profilepng} alt="user"/>
            <ReactStars {...options}/>
            <span > {review.comment} </span>
        </div>
    );
}

export default Reviewcard
