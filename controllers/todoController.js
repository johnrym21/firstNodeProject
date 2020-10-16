let bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
const dbURI = "mongodb+srv://admin:test1234test@todolist.txdig.mongodb.net/toDoList?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('todo', todoSchema);

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req,res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req,res){
        const newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
}
