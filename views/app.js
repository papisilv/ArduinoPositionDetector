console.log("hello its me ");
var socket = io();

let value = document.getElementById("value");
let btn = document.getElementById("btn");

btn.addEventListener("click", function (){
  console.log(value.value);
  // var val = value.value;
  // socket.emit("on-off", val);
});

let video;
let poseNet;
let rwx = 319;
let rwy = 239;
let elx = 319;
let ely = 239;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPose);
}

function modelReady(){
  console.log("model ready");
}

function gotPose(poses){
  // console.log(poses);
  if(poses.length > 0){
    let newRwx =poses[0].pose.rightWrist.x;
    let newRwy =poses[0].pose.rightWrist.y;
    rwx = lerp(rwx, newRwx, 0.6);
    rwy = lerp(rwy, newRwy, 0.6);
    let newElx =poses[0].pose.rightElbow.x;
    let newEly =poses[0].pose.rightElbow.y;
    elx = lerp(elx, newElx, 0.6);
    ely = lerp(ely, newEly, 0.6);
    var val = ely;
    // console.log(ely);

    socket.emit("on-off", val);
  }
}


function draw() {
  background(220);
  image(video, 0, 0);
  fill(255, 0, 0);
  ellipse(rwx, rwy, 20);
  fill(255, 255, 0);
  ellipse(elx, ely, 20);
}





























// var video;
// // Previous Frame
// var prevFrame;
// // How different must a pixel be to be a "motion" pixel
// var threshold = 50;
//
// function setup() {
//   createCanvas(160, 120);
//   pixelDensity(1);
//   video = createCapture(VIDEO);
//   video.size(width, height);
//   video.hide();
//   // Create an empty image the same size as the video
//   prevFrame = createImage(video.width, video.height, RGB);
// }
//
// function draw() {
//   image(prevFrame, 0, 0);
//
//   loadPixels();
//   video.loadPixels();
//   prevFrame.loadPixels();
//
//   // Begin loop to walk through every pixel
//   for (var x = 0; x < video.width; x++) {
//     for (var y = 0; y < video.height; y++) {
//
//       // Step 1, what is the location into the array
//       var loc = (x + y * video.width) * 4 ;  ///* 4
//
//       // Step 2, what is the previous color
//       var r1 = prevFrame.pixels[loc   ];
//       var g1 = prevFrame.pixels[loc + 1];
//       var b1 = prevFrame.pixels[loc + 2];
//
//       // Step 3, what is the current color
//       var r2 = video.pixels[loc   ];
//       var g2 = video.pixels[loc + 1];
//       var b2 = video.pixels[loc + 2];
//
//       // Step 4, compare colors (previous vs. current)
//       var diff = dist(r1, g1, b1, r2, g2, b2);
//       let val = 50;
//       let noVal = 0;
//       // Step 5, How different are the colors?
//       // If the color at that pixel has changed, then there is motion at that pixel.
//       if (diff > threshold) {
//         socket.emit("on-off", val);
//         // If motion, display black
//         pixels[loc] = 0;
//         pixels[loc+1] = 0;
//         pixels[loc+2] = 0;
//         pixels[loc+3] = 255;
//       } else {
//         // If not, display white
//         pixels[loc] = 255;
//         pixels[loc+1] = 255;
//         pixels[loc+2] = 255;
//         pixels[loc+3] = 255;
//       }
//     }
//   }
//   updatePixels();

//   // Save frame for the next cycle
//   //if (video.canvas) {
//     prevFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height); // Before we read the new frame, we always save the previous frame for comparison!
//   //}
// }
//
//
// // socket.emit("on-off", val);
