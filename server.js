// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   console.log("sanity check");
   var term = req.query.q.toUpperCase();
   console.log("term:", term);
   var returnArray = [];
   todos.forEach(function(list){
     if((list.task).toUpperCase().match(term) || (list.description).toUpperCase().match(term)){
       returnArray.push(list);
     }
   })
   res.json({'data':returnArray});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({ data: todos });

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
    var newObj = {};
    //  newObj["45"] = todos._id;
    //  newObj["task"] = req.query.task;
    //  newObj["description"] = req.query.description;
    newObj["_id"] = todos[todos.length-1]._id+1;
    newObj["task"] = req.body.task;
    newObj["description"] = req.body.description;
     todos.push(newObj);
    console.log(newObj);

   res.json(todos[todos.length-1]);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var result;
   for(i=0; i<todos.length; i++){
     var choice = parseInt(req.params.id);
    //  console.log(req.params.id);
      if(todos[i]._id === choice){
        result= todos[i];
        console.log(result);
      }
    }
      res.json(result);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   console.log("inside put")
   var idReq = parseInt(req.params.id);
   for(var i=0; i <todos.length; i++){
     if(todos[i]._id === idReq){
       todos[i].task = req.body.task;
       todos[i].description = req.body.description;
       res.send(todos[i]);
       break;
     }
   }
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var idReq = parseInt(req.params.id);
   for(var i=0; i <todos.length; i++){
     if(todos[i]._id === idReq){
       var removedList = todos.splice(i,1);

       res.send(`Removed: ${removedList}`);
       break;
     }
   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
