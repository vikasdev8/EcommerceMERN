import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 
import './cartitems.css'

const Cart_items = ({item, deleteCartItems}) => {
    return (
        <Fragment className="CartItemCard">
            <img src={item.image} alt="ssa" style={ {width: '10vmax'} }/>
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`price ${item.price}`}</span>
                <p  onClick={() => deleteCartItems(item.product)}>Remove</p>
               
            </div>
        </Fragment>
    )
}

export default Cart_items
