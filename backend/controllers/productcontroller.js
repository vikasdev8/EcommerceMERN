const Product = require('../model/productmodel.js');
const ErrorHandler = require('../utils/errorhandel.js');
const asyncfun = require('../middelware/catchasyncerror.js')
const ApiFeatures = require('../utils/apifeatures.js')
const User = require('../model/usermodel.js')
const cloudinary = require('cloudinary')

exports.createProduct = asyncfun(async (req, res, next) => {

    let images = []
    if (typeof req.body.Images === "string") {
        images.push(req.body.Images)
    } else {
        images = req.body.Images
    }

    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i],
             { folder: 'products' });

        imagesLinks.push({
            Public_id: result.public_id,
            Url: result.secure_url,
        })
    };

    
    req.body.Images = imagesLinks;
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})
exports.getAllProdut = asyncfun(async (req, res, next) => {
    const resultperpage = 8;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let product = await apiFeatures.query;
    let filteredProductsCount = product.length;
    console.log(productCount)

    apiFeatures.pagination(resultperpage);

    let products = await apiFeatures.query.clone()


    res.status(200).json({
        success: true,
        products,
        productCount,
        resultperpage,
        filteredProductsCount

    })
})

exports.updateproduct = asyncfun(async (req, res) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product does not found"
        })

    }

    let images = []

    if (typeof req.body.Images === "string") {
        images.push(req.body.Images)
    } else {
        images = req.body.Images
    }
    

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.Images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.Images[i].Public_id);
        }
    
        const imagesLinks = [];
    
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });
    
          imagesLinks.push({
            Public_id: result.public_id,
            Url: result.secure_url,
          });
        }
    
        req.body.Images = imagesLinks;
      }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runvalidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteproduct = asyncfun(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(500).json({
            success: false,
            message: "product not found for delete"
        })
    }

    for (let i = 0; i < product.Images.length; i++) {
       await cloudinary.v2.uploader.destroy(product.Images[i].Public_id)
    }

    await Product.deleteOne();
    res.status(200).json({
        success: true,
        message: "product was deleted"
    })
})

exports.getproductdetails = asyncfun(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,

    })
})

// Create New Review or Update the review
exports.productReview = asyncfun(async (req, res, next) => {

    const { rating, comment, productId } = req.body
    const user = await User.findById(req.user._id)

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: rating,
        comment: comment
    }
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user == req.user._id);

    if (isReviewed) {
        product.reviews.forEach(
            (rev) => {
                if (rev.user.toString() === req.user._id.toString()) {
                    (rev.rating = rating),
                        (rev.comment = comment)
                }

            })

    } else {

        product.reviews.push(review)
        product.NoofReview = product.reviews.length

    }


    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length
    console.log("product");
    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "You reviewwd successfully"
    })
})


//get review of product
exports.getReviews = asyncfun(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("You enter incorrect product id", 404))
    }

    const NoofReview = await product.NoofReview
    const ratings = await product.ratings

    res.status(200).json({
        success: true,
        reviews: product.reviews,
        NoofReview,
        ratings

    })
})


exports.deleteReviews = asyncfun(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler("You enter incorrect product id", 404))
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    };

    let NoofReview = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            NoofReview
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })



    res.status(200).json({
        success: true,
        message: "Review Deleted"

    });

})

exports.getAdminProducts = asyncfun(async (req, res, next) => {
    const allProducts = await Product.find();

    res.status(200).json({
        success: true,
        allProducts,
    });
});

