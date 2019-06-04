// Rover Object Goes Here
// ======================

var rover1 = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  display: "R1",
};

var rover2 = {
  direction: "N",
  x: 9,
  y: 9,
  travelLog: [],
  display: "R2"
};

var obsticle1 = {
  x: 0,
  y: 1,
  display: "X"
};

var obsticle2 = {
  x: 3,
  y: 2,
  display: "X"
};

var obsticle3 = {
  x: 4,
  y: 6,
  display: "X"
};

var obsticle4 = {
  x: 2,
  y: 7,
  display: "X"
};

var obsticle5 = {
  x: 9,
  y: 8,
  display: "X"
};

var xBoundary = 10;
var yBoundary = 10;

const boundary = createBoundary(xBoundary,yBoundary);
addObsticleToBoundary(obsticle1);
addObsticleToBoundary(obsticle2);
addObsticleToBoundary(obsticle3);
addObsticleToBoundary(obsticle4);
addObsticleToBoundary(obsticle5);
updatedPosition(rover1, roverPosition(rover1));
updatedPosition(rover2, roverPosition(rover2));
formBoundary();

// ======================

// Turns rover left
function turnLeft(rover){
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
  console.log(`Rover has turned left.  Now facing: ${rover.direction}`);
}

// Turns rover right
function turnRight(rover){
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
  console.log(`Rover has turned right.  Now facing: ${rover.direction}`);
}


// Rover moves forward
// preventCrash(rover) is called with this function before move is initiated.
function moveForward(rover){
  if (preventCrash(rover) == true) {
    removePreviousPosition(roverPosition(rover));
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
    updatedPosition(rover, roverPosition(rover));
    console.log(`Rover moving forward, heading ${rover.direction}. Now at position ${roverPosition(rover)}`);
  }
}

// Rover moves backwards
// preventBackCrash(rover) is called with this function before move is initiated.
function moveBackward(rover){
  if (preventBackCrash(rover) == true) {
    removePreviousPosition(roverPosition(rover));
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
    updatedPosition(rover, roverPosition(rover));
    console.log(`Looking ${rover.direction}, rover doing a 'Michael Jackson', now at position ${roverPosition(rover)}`);
  }
}

// commandLine accepts a string, using each letter as a command.
// "f", "b", "l", and "r" will call other rover functions respectivly.
function commandLine(rover, commands) {
  for(let i = 0; i < commands.length; i++) {
    switch(commands.charAt(i).toLowerCase()) {
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      default:
        console.log(`${commands.charAt(i)} is not a valid command`)
        break;
    }
  }
  return rover.travelLog;
}

// Returns rover cordinates
function roverPosition(rover) {
  return [rover.x, rover.y];
}

// function obsticlePostion() {
//   return [obsticle.x, obsticle.y];
// }

// function updates position in Boundary.
// location is an array with length of 2
function updatedPosition(rover, location) {
  // location[1] is y-axis
  // lcoation[0] is x-axis
  // due to method of boundary created, boundary reads y-axis first, and x-axis second.
  boundary[location[1]][location[0]] = rover.display;
  rover.travelLog.push(roverPosition(rover));
  displayBoundary();
}

// function removes previous position in Boundary.
function removePreviousPosition(location) {
  boundary[location[1]][location[0]] = "_";
}

function addObsticleToBoundary(obsticle) {
  boundary[obsticle.y][obsticle.x] = obsticle.display;
}

// Rover checks spot ahead, makes sure it is in boundary
function preventCrash(rover) {
  // console.log(rover.x);
  // console.log(rover.y);
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
  // console.log([predictRoverX, predictRoverY]);
  // console.log(boundary[predictRoverY][predictRoverX]);
  if (predictRoverX < 0 || predictRoverX >= xBoundary 
    || predictRoverY < 0 || predictRoverY >= yBoundary) {
    console.log(`Out of bounds.  Movement aborted`);
    return false;
  } else if (boundary[predictRoverY][predictRoverX] !== "_") {
    console.log(`Obsticle in the way.  Movement aborted`);
    return false;
  } else {
    console.log(`In bounds.  Move out!`);
    return true;
  }
}

// Rover checks spot behind, makes sure it is in boundary.
// Same as preventCrash(rover), but directions are reversed.
function preventBackCrash(rover) {
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
  }  else if (boundary[predictRoverY][predictRoverX] !== "_") {
    console.log(`Obsticle in the way.  Movement aborted`);
    return false;
  } else {
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
    // Biggest challenge was learning to use camelCase lettering for css attributes, instead of using the '-' as in a css file
  grid.style.gridTemplateColumns = autoString;
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