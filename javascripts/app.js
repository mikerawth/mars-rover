// Rover Object Goes Here
// ======================

var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};

var xBoundary = 5;
var yBoundary = 5;

var boundary = createBoundary(xBoundary,yBoundary);
updatedPosition(roverPosition());

// ======================
function turnLeft(){
  switch(rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
        rover.direction = "E";
        break;
    case "E":
        rover.direction = "N";
        break;                 
  }
  return console.log(`Now facing: ${rover.direction}`);
}

function turnRight(){
  switch(rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;                 
  }
  return console.log(`Now facing: ${rover.direction}`);
}

function moveForward(){
  if (preventCrash() == true) {
    removePreviousPosition(roverPosition());
    rover.travelLog.push(roverPosition());
    switch(rover.direction) {
      case "N":
        rover.y--;
        break;
      case "E":
        rover.x++;
        break;
      case "S":
        rover.y++;
        break;
      case "W":
        rover.x--;
        break;
    }
    updatedPosition(roverPosition());
    return console.log(`Heading ${rover.direction}, now at position ${roverPosition()}`);
  }
}

function moveBackward(){
  if (preventBackCrash() == true) {
    removePreviousPosition(roverPosition());
    rover.travelLog.push(roverPosition());
    switch(rover.direction) {
      case "N":
        rover.y++;
        break;
      case "E":
        rover.x--;
        break;
      case "S":
        rover.y--;
        break;
      case "W":
        rover.x++;
        break;
    }
    updatedPosition(roverPosition());
    return console.log(`Looking ${rover.direction}, rover doing a 'Michael Jackson', now at position ${roverPosition()}`);
  }
}

function commandLine(commands) {
  // console.log("function has been called");
  for(let i = 0; i < commands.length; i++) {
    // console.log("loop has been called");
    // console.log(`Currently at ${commands.charAt(i)}`);
    switch(commands.charAt(i)) {
      case "f":
        moveForward();
        break;
      case "b":
        moveBackward();
        break;
      case "r":
        turnRight();
        break;
      case "l":
        turnLeft();
        break;
      default:
        break;
    }
  }
  rover.travelLog.push(roverPosition());
  return rover.travelLog;
}

function createBoundary(x,y) {
  var matrix = [];
  for (let i = 0; i < y; i++) {
    matrix[i] = [];
    for (let j = 0; j < x; j++) {
      matrix[i][j] = null;
    }
  }
  return matrix;
}

function updatedPosition(location) {
  boundary[location[1]][location[0]] = "R";
}

function removePreviousPosition(location) {
  boundary[location[1]][location[0]] = null;
}

function preventCrash() {
  var predictRoverX = rover.x;
  var predictRoverY = rover.y;
  switch(rover.direction) {
    case "N":
      predictRoverY--;
      break;
    case "E":
      predictRoverX++;
      break;
    case "S":
      predictRoverY++;
      break;
    case "W":
      predictRoverX--;
      console.log(predictRoverX);
      break;
    }
  var predictedLocation = boundary[predictRoverX, predictRoverY];
  if (predictedLocation === undefined || predictRoverX < 0 || predictRoverX >= xBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else {
    console.log(`In bounds.  Move out!`);
    return true;
  }
}

function preventBackCrash() {
  var predictRoverX = rover.x;
  var predictRoverY = rover.y;
  switch(rover.direction) {
    case "N":
      predictRoverY++;
      break;
    case "E":
      predictRoverX--;
      break;
    case "S":
      predictRoverY--;
      break;
    case "W":
      predictRoverX++;
      console.log(predictRoverX);
      break;
    }
  var predictedLocation = boundary[predictRoverX, predictRoverY];
  if (predictedLocation === undefined || predictRoverX < 0 || predictRoverX >= xBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else {
    console.log(`In bounds.  Move out!`);
    return true;
  }
}

function roverPosition() {
  return [rover.x, rover.y];
}