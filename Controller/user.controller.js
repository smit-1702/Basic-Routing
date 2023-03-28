const jwt = require('jsonwebtoken');
const User = require('../mongo/mongodata');
const response  = require('../utils/response.function');

const register = async (req, res) => {

    try {
        const { firstname, lastname, email, password } = req.body;


        if (!(email && password && firstname && lastname)) {
            return res.status(401).json(response.errorResponse({
                displayMessage: "All input is required"},401));
        }


        const alreadyUser = await User.findOne({ email });
        if (alreadyUser) {
            return res.status(400).send(response.errorResponse({displayMessage: 'User already exists'}, 400));
        }


        const regex =/^[a-z0-9]+[\.]{0,1}[a-z0-9]+[_\%\-]{0,1}[\.]{0,1}[a-z0-9]*[@][a-z]+[\.][a-z]{2,3}$/
        if (!(email.match(regex))){
            return res.status(400).json(response.errorResponse({
                displayMessage:'Enter valid email address'}, 400));
        }
        

        const pregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!(password.match(pregex))) {
            return res.status(400).json(response.errorResponse({
                displayMessage: "Password is not strong enough",
                description:"Please enter atleast one latter one symbol and one number"},400))
        } 


        const newuser = await User.create({ 
            firstname,
            lastname,
            email, 
            password});

        const token = jwt.sign({email,password} , 'abcd');

        return res.status(201).json(response.sucessResponse({
            email: newuser.email,
            fname: newuser.firstname,
            lname: newuser.lastname,
            access_token: token
          }))

    } catch (err) {
        res.status(500).json(response.errorResponse({
            displayMessage: 'Internel server error'},500));
        console.error(err);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {

        if (!(email && password )) {
            return res.status(400).json(response.errorResponse({
                displayMessage:"Enter email and password both.."},400));
        }

        const user = await User.findOne({ email , password });
        
        if ((user.email == email && user.password == password)) {

            const token = jwt.sign({ email }, 'abc');
            res.status(200).json(response.sucessResponse({
                email: user.email ,
                fname: user.firstname,
                lname: user.lastname,
                access_token :  token }));
        }


    } catch (err) {
      res.status(404).json(response.errorResponse({
        displayMessage:'Enter valid email or password'},404 ));
        console.error(err)
    }
  }

  module.exports={ register , login}