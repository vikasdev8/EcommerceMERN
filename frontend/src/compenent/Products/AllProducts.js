import React ,{Fragment, useEffect, useState}from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getProduct, clearErrors } from '../../action/Productaction'
import { useAlert } from 'react-alert'
import Loader from '../layout/loader/loader'
import ProductCard from '../Home/product'
import './AllProducts.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'


const AllProducts = () => {
    const dispatch = useDispatch();
    const {loading, error,products, productCount, resultPerPage, filteredProductsCount} = useSelector((state) => state.products)
    const alert = useAlert()
    const params = useParams()
    let keyword = params.keyword
    let count = filteredProductsCount;
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 100000])
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(0)
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
        console.log(e)
    }
    const priceHandler = (event, newPrice)=>{
        setPrice(newPrice)
    }

    const categories = [
        "Laptop",
        "apperal",
        "mobile",
        "Tops",
        "Hair Accessories",
        "Necklace",
        "Earring",
      ];

    useEffect(() => {
        if (error) {
           alert.error(error)
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, rating))
    }, [dispatch, error,alert, keyword, currentPage, price, category, rating])
    return (

        <Fragment>
            {loading ? <Loader/>: <Fragment>
             <h2 className="productsHeading">Products</h2>
             <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

                <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={100000}
                />
                

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {
                        categories.map((category)=>
                        <li
                            className="category-link"
                            key={category}
                            onClick={()=> 
                                setCategory(category)
                                
                            
                            }
                            >
                                {category}
                        </li>
                        
                        )
                    }
                </ul>
               

                <Typography component="legend">Rating</Typography>
                <Slider
                 value={rating}
                 onChange={(e, newRating) => {
                   setRating(newRating);
                 }}
                 aria-labelledby="continuous-slider"
                 valueLabelDisplay="auto"
                 min={0}
                 max={5}
                />
                </div>



                {resultPerPage < count && 
                (<div className='paginationBox'>
                <Pagination
                 activePage={currentPage}
                 itemsCountPerPage={resultPerPage}
                 totalItemsCount={productCount}
                 onChange={setCurrentPageNo}
                 nextPageText="Next"
                 prevPageText="Prev"
                 firstPageText="1st"
                 lastPageText="Last"
                 itemClass="page-item"
                 linkClass="page-link"
                 activeClass="pageItemActive"
                 activeLinkClass="pageLinkActive"
                />
                 </div> )}
        

         
        </Fragment>}
        </Fragment>
    )
}

export default AllProducts
