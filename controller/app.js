//IMPORT PACKAGES
const express = require('express');
const cors = require('cors');
const gameLogic = require('./gameLogic')
const app = express();
app.use(cors());
// app.use(express.static('views'));
// app.use(express.static("node_modules"));


//get questions
app.get('/question', function (req, res) {
    var questions = [];    
})

//USED TO CATCH ERRORS
app.use(function (err, req, res, next) {
    //err is an instance of Error class or HTTPError class
    const status = err.status || 500;
    const message = err.message || 'Unknown Error!';

    return res.status(status).json({
        error: message,
    });

})

app.listen(8000, function () {
    console.log('App listening on port 8000')
});


module.exports = app;