var path = require('path');
var express = require('express');
// var bodyParser = require('body-parser');
var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

app.set('port', 3002);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
})

app.get('/api/interview', function(req, res){
  var data = {question:"", answers:[]};
  console.log(req.query.q_num);
  switch(req.query.q_num){
    case "1":
      data.question = "好きな単語を選んでね";
      data.answers = ["情熱", "叙情", "叙述"];
      break
    case "2":
      data.question = "好きなの選んで";
      data.answers = ["いたいけ", "無邪気"];
      break
  }
  res.json(data);  
});

app.get('/api/diagnosis', function(req, res){
  var texts = req.query.user_answer_values;
  var data = {}
  data.result_text = "なんと！　あなたは"+texts[0]+"的で"+texts[1]+"な人です！"
  res.json(data);  
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
