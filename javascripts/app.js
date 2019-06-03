// Rover Object Goes Here
// ======================

var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  display: "R"
};

var obsticle = {
  x: 0,
  y: 1,
  display: "X"
};

var xBoundary = 10;
var yBoundary = 10;

const boundary = createBoundary(xBoundary,yBoundary);
addObsticleToBoundary([obsticle.x, obsticle.y]);
updatedPosition(roverPosition());
formBoundary();

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
    switch(commands.charAt(i).toLowerCase()) {
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
        console.log(`${commands.charAt(i)} is not a valid command`)
        break;
    }
  }
  return rover.travelLog;
}

// Returns rover cordinates
function roverPosition() {
  return [rover.x, rover.y];
}

function obsticlePostion() {
  return [obsticle.x, obsticle.y];
}

// function updates position in Boundary.
// location is an array with length of 2
function updatedPosition(location) {
  // location[1] is y-axis
  // lcoation[0] is x-axis
  // due to method of boundary created, boundary reads y-axis first, and x-axis second.
  boundary[location[1]][location[0]] = rover.display;
  rover.travelLog.push(roverPosition());
  displayBoundary();
}

// function removes previous position in Boundary.
function removePreviousPosition(location) {
  boundary[location[1]][location[0]] = "_";
}

function addObsticleToBoundary(location) {
  console.log(location[1]);
  console.log(location[0]);
  boundary[location[1]][location[0]] = obsticle.display;
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
  // Any spot that is 'undefined' works with y-axis in regards to Boundary.
  console.log([predictRoverX, predictRoverY]);
  if (predictRoverX < 0 || predictRoverX >= xBoundary 
    || predictRoverY < 0 || predictRoverY >= yBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else if (predictRoverX === obsticle.x && predictRoverY === obsticle.y) {
    console.log(`Obsticle in the way.  Movement aborted`);
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
  // var predictedLocation = boundary[predictRoverX, predictRoverY];
  if (predictRoverX < 0 || predictRoverX >= xBoundary 
      || predictRoverY < 0 || predictRoverY >= yBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else if (predictRoverX === obsticle.x && predictRoverY === obsticle.y) {
    console.log(`Obsticle in the way.  Movement aborted`);
    return false;
  }  else {
    console.log(`In bounds.  Move out!`);
    return true;
  }
}

// Creates boundary using xBoundary & yBoundary.
  // NOTE: Unsure why I had to set 1st for loop using y-axis, and 2nd loop using x-axis.
  // createBoundary function works as intended, but will need to code review.
function createBoundary(x,y) {
  var matrix = [];
  for (let i = 0; i < y; i++) {
    matrix[i] = [];
    // console.log(`creating ${i}`);
    for (let j = 0; j < x; j++) {
      matrix[i][j] = "_";
      // console.log(`DEBUG: creating ${[i,j]}`);

    }
  }
  return matrix;
}

// This function creates the CSS on index.html
function formBoundary() {
  grid = document.querySelector("#grid");
  autoString = "";
  autoCount = 0;
  while(autoCount < xBoundary) {
    autoString += "auto ";
    autoCount++;
  }
  // The autostring is telling the CSS how many columns to make
    // The other CSS attributes were me learning how to implement CSS using Javascript
    // Biggest challenge was learning to use camelCase lettering for css attributes, instead of using the '-' as in a css file
  grid.style.gridTemplateColumns = autoString;
  grid.style.display = "grid";
  grid.style.gridGap = "10px 10px";
  grid.style.margin = "25px";
  grid.style.justifyContent = "center";
  displayBoundary();
}

// displays Boundary on HTML page
function displayBoundary() {
  grid.innerHTML = "";
  for(let i = 0; i < yBoundary; i++) {
    for(let j=0; j < xBoundary; j++) {
      grid.innerHTML += `<div class="grid-item">${boundary[i][j]}</div>`;
    }
  }
}

// DEBUGING FUNCTIONS
function gridLength() {
  console.log(`xBoundary is ${xBoundary}, and x-axis length is ${boundary[0].length}`);
  console.log(`yBoundary is ${yBoundary}, and y-axis length is ${boundary.length}`);
}