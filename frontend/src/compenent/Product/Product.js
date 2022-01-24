import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom';
import './Product.css'
import { useSelector, useDispatch } from 'react-redux'
import { GetProductDetails, clearErrors, newReview } from '../../action/Productaction'
import Loader from '../layout/loader/loader';
import { useAlert } from "react-alert";
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './reviewcard.js'
import { adtoItemsCart } from '../../action/cartAction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'

// import { Rating } from '@material-ui/lab'
import Rating from '@mui/material/Rating';




const ProductDetails = () => {

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector(
        (state) => state.reviews
      );
    const [quantity, setQuantity] = useState(1)
    const alert = useAlert()
    let { id } = useParams()
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const options = {
        edit: false,
        color: "rgba(20,20,20,0,1)",
        activecColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    }

    const IncreHandler = () => {
        if (product.stock <= quantity) {
            return
        }
        const qty = quantity + 1
        setQuantity(qty)
    }

    const DcresHandler = () => {
        if (1 >= quantity) {
            return
        }
        const qty = quantity - 1
        setQuantity(qty)
    }

    const cartHandler = () => {
        dispatch(adtoItemsCart(id, quantity))
        alert.success("Product successfully added on cart")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm ={
            rating : Number(rating),
            comment: comment,
            productId: id
        }
        // const myForm = new FormData();

        // myForm.set("rating", rating);
        // myForm.set("comment", comment);
        // myForm.set("productId", id);
        
        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted");
          
        }
        dispatch(GetProductDetails(id))
    }, [dispatch, alert, error, id, reviewError, success])

    return (

        <Fragment >
            {loading ? <Loader /> : <Fragment>
                <div className='ProductDetails'>
                    <div>

                        <Carousel className='Carousel'>
                            {

                                product.Images &&
                                product.Images.map((item, i) => (
                                    <img className='CarouselImage'
                                        key={item._id}
                                        src={item.Url}
                                        alt='Images'
                                    />

                                ))

                            }

                        </Carousel>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name} </h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options} />
                            <span> {product.NoofReview} Reviews </span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1> {`RS ${product.price}`} </h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={DcresHandler}> - </button>
                                    <input type="number" readOnly value={quantity} />
                                    <button onClick={IncreHandler}>+</button>
                                </div>
                                <button disabled={product.stock < 1 ? true : false} onClick={cartHandler}>Add to Cart</button>
                            </div>

                            <p>
                                Status:
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "Out Of Stock" : "In Stock"}


                                </b>
                            </p>
                        </div>
                        <div className="detailsBloack-4">
                            Description : <p> {product.Description} </p>
                        </div>
                        <button className="submitReview" onClick={submitReviewToggle} >
                            Submit Reviews
                        </button>

                    </div>
                </div>
                <h3 className='reviewsHeading'>REVIEWs</h3>
                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            name="half-rating"
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />

                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (

                    <div className="reviews">
                        {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                    </div>
                ) : (
                    <p className='noReviews'> No Reviews Yet</p>
                )
                }

            </Fragment>}

        </Fragment>

    )
}

export default ProductDetails
