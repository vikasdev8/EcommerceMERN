const Order = require('../model/ordermodel.js')
const ErrorHandler = require('../utils/errorhandel.js')
const asyncfun = require('../middelware/catchasyncerror.js')
const Product = require('../model/productmodel.js')


exports.newOrder = asyncfun(async (req, res, next)=>{
    const {shippingInfo, 
        orderItems, 
        paymentInfo,
        itmesPrice,
        taxPrice,
        shippingPrice,
        totalPrice
        } = req.body
        console.log("ddg")

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo,
        itemsPrice : itmesPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    if (order.orderStatus === "Processing") {
        console.log("object")
        order.orderItems.forEach(async(o)=>{
            await updateStock(o.product, o.quantity)
            
        })
    }

    res.status(200).json({
        success:true,
        order 
    })

})

async function updateStock(id, qty){
    const product = await Product.findById(id);

    product.stock -= qty
     await product.save({ validateBeforeSave: false }) 
}

// Get all order

exports.getAllOrder = asyncfun( async (req,res,next)=>{
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success:true,
        orders,
        message:"Your orders display successfully"
    })
})


//get order by ---Admin

exports.getAllOrders = asyncfun( async(req,res,next)=>{
    const orders = await Order.find();

    let totalOrders = orders.length;

    let toalAmount = 0;
    orders.forEach((o)=>{
        toalAmount += o.totalPrice
    })

    res.status(200).json({
        success:true,
        orders,
        totalOrders,
        toalAmount
    })
})

// update orders status --Admin

exports.updateOrderStatus = asyncfun( async(req,res,next)=>{
    console.log(req.body)
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next( new ErrorHandler("Order not found", 400))
    }

    if (order.orderStatus == "delivered") {
        return next( new ErrorHandler("Order is already delivered", 400))
    }


  

    order.orderStatus = req.body.orderStatus

    if ( order.orderStatus === "delivered") {
        order.deliveredAt = Date.now()
    }

   await order.save({ validateBeforeSave: false })

   res.status(200).json({
       success:true
   })
    
})




// Delete Order 

exports.deleteOrder = asyncfun( async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

   await order.remove()

   res.status(200).json({
       success:true,
   })
})


// Single Order Details

exports.GetsingleOrder = asyncfun (async (req, res, next)=>{
    const order = await Order.findById(req.params.id)

    res.status(200).json({
        success:true,
        order
    })
})
