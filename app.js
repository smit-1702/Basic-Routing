const express = require('express');
const app = express();
const userRoute = require('./Route/user.route');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/route',userRoute);

app.listen(3232,()=>{
    console.log('you are on port 3232..');
});
