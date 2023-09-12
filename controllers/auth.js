const bcrypt = require("bcrypt");
const User = require("../models/user");
const Admin = require("../models/admin");
const Owner = require("../models/restaurantOwner");

exports.getLogin = (req, res, next) => {
  res.render("authentication/auth-login", {
    pageTitle: "User Login Page",
    adminPage: false,
    restaurantPage: false,
    path: "user",
    errorLog: "",
  });
};

exports.getsignup = (req, res, next) => {
  res.render("authentication/auth-signup", {
    pageTitle: "Signup Page",
    restaurantPage: false,
    errorLog: "",
  });
};

exports.postSignup = (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;
  const pattern2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!pattern.test(password)) {
    return res.render("authentication/auth-signup", {
      pageTitle: "User Login Page",
      restaurantPage: false,
      errorLog: "The password should be atleast 8 chars long, atleast one Uppercase , lowercase char and atleast one number.",
    });
  }

  if(!pattern2.test(email)){
    return res.render("authentication/auth-signup", {
      pageTitle: "User Login Page",
      restaurantPage: false,
      errorLog: "Invalid email format",
    });
  }
 
  if (password === confirmPassword) {
    User.findAll({ where: { email: email } })
      .then((user) => {
        if (user.length !== 0) {
          // console.log('12');
          return res.render("authentication/auth-signup", {
            pageTitle: "User Login Page",
            restaurantPage: false,
            errorLog: "Email Already Exist",
          });
        }

        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            return User.create({
              userName: userName,
              email: email,
              password: hashedPassword,
            });
          })
          .then((user) => {
            user.createCart();
            res.redirect("/auth-login");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return res.render("authentication/auth-signup", {
      pageTitle: "User Login Page",
      restaurantPage: false,
      errorLog: "Password and confirm Password do not match"
    });
  }
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(password);

  User.findAll({ where: { email: email } })
    .then((user) => {
      // console.log(user[0].password)
      if (user.length === 0) {
        return res.render("authentication/auth-login", {
          pageTitle: "User Login Page",
          adminPage: false,
          restaurantPage: false,
          path: "user",
          errorLog: "Email Doesn't Exist",
        });
      }
      bcrypt
        .compare(password, user[0].password)
        .then((value) => {
          // console.log(value)

          if (value) {
            req.session.isLoggedIn = true;
            req.session.user = user[0];
            console.log(req.session.user.id);
            return req.session.save((err) => {
              res.redirect("/");
            });
          } else {
            return res.render("authentication/auth-login", {
              pageTitle: "User Login Page",
              adminPage: false,
              restaurantPage: false,
              path: "user",
              errorLog: "Invalid Password",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/auth-login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    // console loggig an error if there was any of it .

    res.redirect("/auth-login");
  });
};

// for authentication and getting the admin path
exports.getAdminLogin = (req, res, next) => {
  const adminPage = true;
  res.render("authentication/auth-login", {
    pageTitle: "Admin Login",
    adminPage: adminPage,
    restaurantPage: false,
    path: "admin",
    errorLog: "",
  });
};

exports.postAdminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findAll({
    where: {
      email: email,
    },
  })
    .then((admin) => {
      if (admin.length === 0) {
        return res.redirect("/auth-admin-login");
      }

      req.session.isAdminLogged = true;
      req.session.admin = admin[0];
      console.log(req.session.admin);
      return req.session.save((err) => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRestaurantLogin = (req, res, next) => {
  const restaurantPage = true;
  res.render("authentication/auth-login", {
    pageTitle: "Owner Login",
    restaurantPage: restaurantPage,
    adminPage: false,
    path: "owner",
    errorLog: "",
  });
};

exports.postRestaurantLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // console.log(password)
  
  Owner.findAll({ where: { email: email } })
    .then((owner) => {
      if (owner.length === 0) {
        return  res.render("authentication/auth-login", {
          pageTitle: "Owner Login",
          restaurantPage: true,
          adminPage: false,
          path: "owner",
          errorLog: "Email Doesn't Exist ",
        });
      }
      
      bcrypt
        .compare(password, owner[0].password)
        .then((value) => {
          console.log("value is" + value);

          if (value) {
            req.session.isOwnerLoggedIn = true;
            req.session.owner = owner[0];

            return req.session.save((err) => {
              res.redirect("/");
            });
          }

          return res.render("authentication/auth-login", {
            pageTitle: "Owner Login",
            restaurantPage: true,
            adminPage: false,
            path: "owner",
            errorLog: "Incorrect Password",
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/auth-restaurant-login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRestaurantSignup = (req, res, next) => {
  const restaurantPage = true;
  res.render("authentication/auth-signup", {
    pageTitle: "Restaurant Register",
    restaurantPage: true,
    errorLog:""
  });
};

exports.postRestaurantSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  
  const pattern1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;
  const pattern2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(!pattern1.test(password)){
     return res.render("authentication/auth-signup", {
      pageTitle: "Restaurant Register",
      restaurantPage: true,
      errorLog:"The password should be atleast 8 chars long, atleast one Uppercase , lowercase char and atleast one number."
    });
  }

  if(!pattern2.test(email)){
    return res.render("authentication/auth-signup", {
      pageTitle: "Restaurant Register",
      restaurantPage: true,
      errorLog:"Invalid Email"
    });
  }

  if (password === confirmPassword) {
    Owner.findAll({ where: { email: email } })
      .then((owner) => {
        if (owner.length !== 0) {
          // console.log('12');
          return res.render("authentication/auth-signup", {
            pageTitle: "Restaurant Registration",
            restaurantPage: true,
            errorLog:"Email already exists"
          });

        }

        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            return Owner.create({
              email: email,
              password: hashedPassword,
            });
          })
          .then((owner) => {
            res.redirect("/auth-restaurant-login");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/auth-restaurant-signup");
  }
};
