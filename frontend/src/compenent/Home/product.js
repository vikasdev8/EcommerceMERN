import React from "react";
import {Link} from "react-router-dom"
import Rating from 'react-rating-stars-component'


const product = ({product})=>{
  const options={
    edit:false,
    color: "rgba(20,20,20,0,1)",
    activecColor: "tomato",
    value: Number (product.ratings),
    isHalf: true,
    size: window.innerWidth <600 ? 20:25,
}
return ( <Link className="productCard" to={`/product/${product._id}`}>
<img src={product.Images[0].Url} alt={product.name}/>
<p>{product.name}</p>
<div>
  <Rating {...options} />
  <span className="productCardSpan">

    ({product.NoofReview} Reviews)
  </span>
</div>
<span>{`₹${product.price}`}</span>
</Link>)
}

export default product