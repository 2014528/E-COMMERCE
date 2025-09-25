//installed all the packages

//with the help of this we can send json data from frontend to backend
//using this our react js proj will connect to express app on 4000 port

//now initializing the database

//database connection with mongodb 

//API CREATION  creating api endpoint

//creating one api app.get in the get property i am passing the path and in arrow func i will get two objects req and response
  

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://abhishekgautam6115:Anjali6115@cluster0.u1bqkov.mongodb.net/e-commerce?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get("/", (req,res) => {
    res.send("Express app is running");
});

//schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image : {
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }, 
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    try{
        const product = new Product({
            id:id,
            name:req.body.name,
            image:req.body.image,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("saved");
        res.json({
            success:true,
            name:req.body.name,
        })
    }catch(err){
        console.error(err);
        res.status(500).json({success:false, error:err.message});
    }
})


//creating api for delete the product
app.post('/removeproduct', async(req,res)=>{
await Product.findOneAndDelete({id:req.body.id});
console.log("Removed");
res.json({
    success:true,
    name:req.body.name,
})
})


//creating api for getting all products

app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched Abhi");
    res.send(products);
})


//schema creating for user model

const Users =mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,

    }

})

//creating api for registering the user

app.post('/signup', async (req,res)=>{

   let check = await Users.findOne({
    email:req.body.email
   });
   if(check){
    return res.status(400).json({success:false,errors:"existing user found with same emailId"})
   }
   let cart ={};
    for(let i=0; i<300; i++){
        cart [i]=0;
    }

    const user = new Users ({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

   
    //saving the user in the database

    await user.save();
    //after creating the user i will use the jwt authentication to use it i will create one data

    const data ={
        user:{
            id:user.id
        }
    }
   
    //after getting this data i am creating now token

    const token = jwt.sign(data, 'secret_ecom');
    
    //after generating the token i am creating the response

    res.json({success:true, token})

})

//creating end point for userlogin using this statement we will get the user related to the particular emailid and it will be stored in user variable.
//we are finding the user then we are comparing the pasword and if the password is correct then we generate the token other wise display wrong password.
app.post('/login',async(req, res)=>{
    let user= await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password; 
        if(passCompare){
            const data = {
                user : {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false,error:"wrong Password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong EmailId"});
    }
})

//adding stripe API 
// Stripe Checkout API
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body; // products sent from frontend

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
        },
        unit_amount: product.new_price * 100, // Stripe works in cents
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, (error) => {
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port " + port);
    }
    else{
        console.log("Error occurred, server can't start", error);
    }
});

//image store engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)  //fieldname is the name of the field and originalname is the name of the file
    }
})

const upload = multer({storage:storage})

// creating upload endpoint for images 

app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})




