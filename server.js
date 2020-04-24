const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/getData', (req, res) => {
  console.log('here');
  const name = req.query.name;
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://alanmongo:alanmongo@cluster0-pjmpv.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    var dbo = client.db("test");
    var coll = dbo.collection("Users")
    coll.find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
      // db.close();
    });
    // perform actions on the collection object
    client.close();
  });
});

app.get('/getAnalytics', (req, res) => {
  console.log('here');
  const name = req.query.name;
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://alanmongo:alanmongo@cluster0-pjmpv.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    var dbo = client.db("test");
    var coll = dbo.collection("Classification")
    coll.find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
      // db.close();
    });
    // perform actions on the collection object
    client.close();
  });
});

app.get('/getProducts', (req, res) => {
    console.log('here');
    const name = req.query.name;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://alanmongo:alanmongo@cluster0-pjmpv.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      var dbo = client.db("test");
      var coll = dbo.collection("Products")
      coll.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
        // db.close();
      });
      // perform actions on the collection object
      client.close();
    });
  });

  app.get('/getFeature', (req, res) => {
    console.log('here');
    const name = req.query.name;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://alanmongo:alanmongo@cluster0-pjmpv.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      var dbo = client.db("test");
      var coll = dbo.collection("feature")
      coll.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
        // db.close();
      });
      // perform actions on the collection object
      client.close();
    });
  });

  app.get('/getTimeBasedProducts', (req, res) => {
    console.log('here');
    const name = req.query.name;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://alanmongo:alanmongo@cluster0-pjmpv.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      var dbo = client.db("test");
      var coll = dbo.collection("TimeOfDaySales")
      coll.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
        // db.close();
      });
      // perform actions on the collection object
      client.close();
    });
  });

  app.get('/getConfusionMatrix', (req, res) => {
    console.log('here');
    const name = req.query.name;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://alanmongo:alanmongo@cluster0-pjmpv.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      var dbo = client.db("test");
      var coll = dbo.collection("confusion_matrix")
      coll.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
        // db.close();
      });
      // perform actions on the collection object
      client.close();
    });
  });
  
console.log("App is now listening to the port 8080!");
app.listen(process.env.PORT || 8080);