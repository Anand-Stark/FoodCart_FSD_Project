const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// aquiring from all the routes
const userShop = require("./routes/shop");
const adminProducts = require("./routes/admin");
const restaurants = require("./routes/restaurant");
const authentication = require("./routes/auth");

const MONGO_URI = 'mongodb+srv://tonysrule:jKLKh3bkD5pLbdDx@cluster0.fvc9sga.mongodb.net/sessions';
const store = new MongoDbStore({
  uri:MONGO_URI,
  collection:'sessions'
});

// using Sequelize for connecting databases :
const sequelize = require("./util/database");

//Requiring all the models:
const Admin = require("./models/admin");
const User = require("./models/user");
const Product = require("./models/productAdmin");
const Cart = require('./models/cart');
const cartItems = require('./models/cartItems');
const { default: mongoose } = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
      secret:'My Secret',
      resave: false,
      saveUninitialized:false,
      store:store
    })
)
app.use(flash());

app.set("view engine", "ejs");
app.set("views", "views");

// storing the newly made user and the admin in the req.user format in the body of the document .
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.hasOne(User);
Cart.belongsToMany(Product, {through: 'cartItems'});
Product.belongsToMany(Cart,{through:'cartItems'});


app.use((req, res, next) => {
  
    if(!req.session.user){
       return next();
    }

    User.findByPk(req.session.user.id)
        .then(user =>{
            req.user = user;
        })

});
app.use((req,res,next) =>{

     res.locals.isAuthenticated = req.session.isLoggedIn;

     next();
})


app.use((req,res,next)=>{
      Admin.findByPk(1)
      .then(admin =>{
                  req.admin = admin ;
                  next();

      })
      .catch(err=>{
            console.log(err);
      })
})

// writing all the routes for getting the shop,admin and Vendors:

app.use("/admin", adminProducts);
app.use(userShop);
app.use("/restaurant", restaurants);
app.use(authentication);
// establishing the relations user - adminProducts:

mongoose.connect(MONGO_URI);

// synchronizing all the models :
sequelize
  // .sync({force:true})
  .sync()
  .then((result) => {
  
      // if no admin exits then create one
      Admin.findByPk(1).then((admin) => {
        if (!admin) {
          Admin.create({
            adminName: "Anand",
            email: "anand.s21@iiits.in",
          });
        }
      });

      app.listen(3000, () => {
        console.log("Running on port number 3000 and database connected");
      });
    })
  
  .catch((err) => {
    console.log(err);
  });
