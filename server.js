const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Bear = require('./app/models/bear')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
const router = express.Router()

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
})

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
})


router.route('/bears')

  .post(function(req, res) {
  var bear = new Bear()
  bear.name = req.body.name
  bear.save(function(err) {
    if (err)
      res.send(err)
    res.json({message: 'Bear created!'})
  })
 })

 .get(function(req, res) {
   Bear.find(function (err, bears) {
     if (err)
      res.send(err)
     res.json(bears)
   })
 })

 router.route("/bears/:bear_id")

 .get(function(req, res) {
   Bear.findById(req.params.bear_id, function(err, bear) {
     if (err)
      res.send(err)
     res.json(bear)
   })
 })

 .put(function(req, res) {
   Bear.findById(req.params.bear_id, function(err, bear) {
     if (err)
      res.send(err)
     bear.name = req.body.name
     bear.save(function(err) {
       if (err)
        res.send(err)
       res.json({message: "Bear named!"})
     })
   })
 })

 .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err)
      res.json({message: "Bear deleted!"})
    })
 })


app.use('/api', router)
app.listen(port)
console.log('Port ' + port + ' is a magical place!')
mongoose.connect('mongodb://localhost:27017/bears_api', {useNewUrlParser: true})



//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
