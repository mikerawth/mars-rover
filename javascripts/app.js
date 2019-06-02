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

const boundary = createBoundary(xBoundary,yBoundary);
updatedPosition(roverPosition());

// ======================

// Turns rover left
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
  return console.log(`Rover has turned left.  Now facing: ${rover.direction}`);
}

// Turns rover right
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
  return console.log(`Rover has turned right.  Now facing: ${rover.direction}`);
}


// Rover moves forward
// preventCrash() is called with this function before move is initiated.
function moveForward(){
  if (preventCrash() == true) {
    removePreviousPosition(roverPosition());
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
    return console.log(`Rover moving forward, heading ${rover.direction}. Now at position ${roverPosition()}`);
  }
}

// Rover moves backwards
// preventBackCrash() is called with this function before move is initiated.
function moveBackward(){
  if (preventBackCrash() == true) {
    removePreviousPosition(roverPosition());
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

// commandLine accepts a string, using each letter as a command.
// "f", "b", "l", and "r" will call other rover functions respectivly.
function commandLine(commands) {
  for(let i = 0; i < commands.length; i++) {
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

// Returns rover cordinates
function roverPosition() {
  return [rover.x, rover.y];
}

// Creates boundary using xBoundary & yBoundary.
  // NOTE: Unsure why I had to set 1st for loop using y-axis, and 2nd loop using x-axis.
  // createBoundary function works as intended, but will need to code review.
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


// function updates position in Boundary.
// location is an array with length of 2
function updatedPosition(location) {
  // location[1] is y-axis
  // lcoation[0] is x-axis
  // due to method of boundary created, boundary reads y-axis first, and x-axis second.
  boundary[location[1]][location[0]] = "R";
  rover.travelLog.push(roverPosition());
}

// function removes previous position in Boundary.
function removePreviousPosition(location) {
  boundary[location[1]][location[0]] = null;
}

// Rover checks spot ahead, makes sure it is in boundary
function preventCrash() {
  // Getting 'predicted' coordinates if Rover moves forward.
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
      break;
  }
  // Now have the predictedLocatoin of Rover
  var predictedLocation = boundary[predictRoverX, predictRoverY];
  // Any spot that is 'undefined' works with y-axis in regards to Boundary.
  // 'undefinded' did not work with xBoundary.  Instead, a predicted move would create a new key in the x-axis.
    // Thus, I had to get the xBoundary to limit movement, as well as make sure it doesn't go negative.
    // I would to only use 'undefined' for this portion.  Need CODE REVIEW.
  if (predictedLocation === undefined || predictRoverX < 0 || predictRoverX >= xBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else {
    console.log(`In bounds.  Move out!`);
    return true;
  }
}

// Rover checks spot behind, makes sure it is in boundary.
// Same as preventCrash(), but directions are reversed.
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
      break;
    }
  var predictedLocation = boundary[predictRoverX, predictRoverY];
  if (predictRoverX < 0 || predictRoverX >= xBoundary 
      || predictRoverY < 0 || predictRoverY >= yBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else {
    console.log(`In bounds.  Move out!`);
    return true;
  }
}