var   bodyParser = require("body-parser"),
      express    = require('express'),
      app        = express(),
      five       = require("johnny-five"),
      socketIo   = require("socket.io"),
      path       = require("path");
const port  = process.env.PORT || 3000;
const board = new five.Board();
var swt = 0;
/////////////CONFIGURATION////////
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded(
    { extended: true }
));
/////////////Routes///////////////////////
app.get("/", home);
//////////////Functions////////////
function home(req, res){
  res.render("index");
};

/////////// LISTENING PORT///////////
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
///////////////////IO////////////////////////////
const io    = socketIo.listen(server);



//////////////Ard////////////////////
board.on("ready", function() {
  console.log("Ready event. Repl instance auto-initialized!");

  var led13 = new five.Led(13);
  led13.on();
  var led12= new five.Led(12);
  led12.on();




  io.on("connection", (socket)=>{
    console.log("new connection");
    socket.on("on-off", (data) =>{
      // console.log(data);
      swt = Number(data);
        if (swt <= 350){
          led13.off();
        } else {
          led13.on()
        };

        if (swt <= 200){
          led12.off();
        } else {
          led12.on()
        };


    });
  });
});
