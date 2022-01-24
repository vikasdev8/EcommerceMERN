import React, {Fragment, useEffect} from "react";
import { CgMouse } from "react-icons/all";
import './home.css'
import Product from './product'
import Metadata from "../layout/metadata";
import { clearErrors , getProductf} from '../../action/Productaction'
import { useSelector, useDispatch} from "react-redux";
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, products, error} = useSelector((state) => state.products);
 


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
   dispatch(getProductf());
  }, [dispatch, error, alert]);


    return (
      <Fragment> 
       {loading ? <Loader/>:  
        <Fragment>
          <Metadata title="Ecommerce"/>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <p>Find Amazing Products</p>
           
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
           { products  && products.map((product) => <Product product={product}/>)}
          

          </div>
        </Fragment>
}
        </Fragment>
    )
}

export default Home