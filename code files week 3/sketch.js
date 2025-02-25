// Array of questions for the quiz
let questions = [
  { day: "Sunday", planet: "Sun", explanation: "Sunday (Dimanche): Named after the Sun, \nrepresenting light and vitality." },
  { day: "Monday", planet: "Moon", explanation: "Monday (Lundi): Named after the Moon, \nsymbolizing emotions and cycles." },
  { day: "Tuesday", planet: "Mars", explanation: "Tuesday (Mardi): Named after Mars \n(Tiw in Norse mythology), \nthe god of war and courage." },
  { day: "Wednesday", planet: "Mercury", explanation: "Wednesday (Mercredi): Named after Mercury \n(Odin/Woden in Norse mythology),\nthe god of communication and wisdom." },
  { day: "Thursday", planet: "Jupiter", explanation: "Thursday (Jeudi): Named after Jupiter \n(Thor in Norse mythology), \nthe god of thunder and strength." },
  { day: "Friday", planet: "Venus", explanation: "Friday (Vendredi): Named after Venus \n(Frigg/Freya in Norse mythology), \nthe goddess of love and beauty." },
  { day: "Saturday", planet: "Saturn", explanation: "Saturday (Samedi): Named after Saturn, \nthe Roman god of time and discipline." }
];

// Array of planet objects with their properties
let planets = [
  { name: "Sun", x: -100, y: 600, size: 700, color: '#FF9600', pattern: 'none' },
  { name: "Moon", x: 460, y: 680, size: 22, color: '#D3D3D3', pattern: 'none' },
  { name: "Mercury", x: 350, y: 480, size: 35, color: '#BEBEBE', pattern: 'craters' },
  { name: "Venus", x: 200, y: 300, size: 70, color: '#E6C200', pattern: 'clouds' },
  { name: "Earth", x: 400, y: 700, size: 80, color: '#1E90FF', pattern: 'continents' },
  { name: "Mars", x: 400, y: 300, size: 50, color: '#FF4500', pattern: 'canyons' },
  { name: "Jupiter", x: 640, y: 500, size: 180, color: '#D2691E', pattern: 'curvedBands' },
  { name: "Saturn", x: 550, y: 150, size: 150, color: '#DA70D6', pattern: 'rings' },
  { name: "Uranus", x: 750, y: 715, size: 90, color: '#AFEEEE', pattern: 'rings' },
  { name: "Neptune", x: 740, y: 120, size: 100, color: '#4682B4', pattern: 'waves' }
];

// Variables to keep track of the current question and answer
let currentQuestionIndex = 0;
let correctAnswer;
let feedbackColor = null;
let showPopup = false;

function setup() {
  noLoop(); // Prevent draw() from looping
  createCanvas(800, 800); // Create a canvas of 800x800 pixels
  nextQuestion(); // Load the first question
}

function draw() {
  background(10, 10, 30); // Set the background color
  drawStars(); // Draw stars in the background
  drawOrbits(); // Draw the orbits of the planets
  drawPlanets(); // Draw the planets
  drawQuestion(); // Draw the current question

  if (showPopup) {
    drawPopup(); // Draw the popup if a question is answered correctly
  }
}

function drawStars() {
  for (let i = 0; i < 100; i++) {
    stroke(255); // Set the stroke color to white
    strokeWeight(random(1, 3)); // Set a random stroke weight
    point(random(width), random(height)); // Draw a point at a random position
  }
}

function drawOrbits() {
  noFill(); // Disable fill
  stroke(255, 255, 255, 100); // Set the stroke color to a semi-transparent white
  for (let i = 1; i <= 8; i++) {
    push(); // Save the current transformation matrix
    rotate(radians(-15)); // Rotate by -15 degrees
    ellipse(width / 20 - 100, height / 2 + 150, i * 150 + 400, i * 150 + 200); // Draw an ellipse representing an orbit
    pop(); // Restore the original transformation matrix
  }
}

function drawPlanets() {
  for (let planet of planets) {
    drawPlanet(planet.x, planet.y, planet.size, planet.color, planet.pattern); // Draw each planet
  }
}

function drawPlanet(x, y, size, color, pattern) {
  noStroke(); // Disable stroke

  // Sun
  if (pattern === 'none' && color === '#FF9600') {
    // Create sun's corona effect
    for (let i = 0; i < 20; i++) {
      fill(255, 150, 0, 50 - i * 2);
      ellipse(x, y, size + i * 10, size + i * 10);
    }
    // Main sun body with gradient-like effect
    fill(255, 150, 0);
    ellipse(x, y, size, size);
    fill(255, 200, 0);
    ellipse(x, y, size * 0.8, size * 0.8);
  }
  
  // Mercury
  else if (pattern === 'craters') {
    // Base planet
    fill(190, 190, 190);
    ellipse(x, y, size, size);
    
    // Add craters
    fill(150, 150, 150);
    let craterPositions = [
      { x: -0.2, y: -0.3, size: 0.3 },
      { x: 0.3, y: 0.2, size: 0.25 },
      { x: -0.1, y: 0.2, size: 0.2 },
      { x: 0.2, y: -0.1, size: 0.15 }
    ];
    
    for (let crater of craterPositions) {
      ellipse(
        x + crater.x * size,
        y + crater.y * size,
        size * crater.size,
        size * crater.size
      );
    }
  }
  // Earth  
  else if (pattern === 'continents') { 
    fill(color); 
    ellipse(x, y, size, size); 
    fill(34, 139, 34); // Set the fill color for continents 
    ellipse(x - 11, y + 22, size / 2, size / 3); // Draw a continent 
    ellipse(x - 18, y - 14, size / 3.5, size / 2); // Draw another continent 
    ellipse(x + 25, y + 10, size / 3, size / 4); // Draw another continent 
    ellipse(x + 22, y - 20, size / 4, size / 4); // Draw another continent 
  }
  // Venus
  else if (pattern === 'clouds') {
    // Base planet
    fill('#E6C200');
    ellipse(x, y, size, size);
    
    // Cloud patterns
    fill(255, 255, 200, 100);
    for (let i = 0; i < 5; i++) {
      push();
      translate(x, y);
      rotate(i * PI / 3);
      ellipse(0, size * 0.2, size * 0.8, size * 0.2);
      pop();
    }
  }
  
  // Mars
  else if (pattern === 'canyons') {
    // Base planet
    fill('#FF4500');
    ellipse(x, y, size, size);
    
    // Surface features
    fill(200, 80, 50);
    for (let i = 0; i < 4; i++) {
      push();
      translate(x, y);
      rotate(i * PI / 2);
      ellipse(size * 0.25, 0, size * 0.3, size * 0.1);
      pop();
    }
    
    // Dark spots
    fill(150, 50, 30);
    ellipse(x - size * 0.2, y - size * 0.1, size * 0.2, size * 0.2);
    ellipse(x + size * 0.1, y + size * 0.2, size * 0.15, size * 0.15);
    ellipse(x + size * 0.3, y + size * 0, size * 0.2, size * 0.15);
    ellipse(x + size * 0.15, y + size * -0.3, size * 0.15, size * 0.15);
    ellipse(x + size * -0.2, y + size * 0.32, size * 0.3, size * 0.25);
  }
  
  // Jupiter
  else if (pattern === 'curvedBands') {
    // Base planet
    fill('#D2691E');
    ellipse(x, y, size, size);
    
    // Bands
    let bandColors = [
      { color: '#A0522D', height: 0.7 },
      { color: '#8B4513', height: 0.5 },
      { color: '#CD853F', height: 0.2 }
    ];
    
    for (let band of bandColors) {
      fill(band.color);
      ellipse(x, y, size, size * band.height);
    }
    
    // Great Red Spot
    fill('#FF4500');
    ellipse(x + size * 0.2, y - size * -0.15, size * 0.2, size * 0.1);
  }
  
  // Saturn
  else if (pattern === 'rings' && color === '#DA70D6') {
    // Base planet
    fill('#DA70D6');
    ellipse(x, y, size, size);
    
    // Rings
    push();
    translate(x, y);
    rotate(PI / - 5);
    
    // Outer ring
    noFill();
    strokeWeight(4);
    stroke(200, 180, 220, 200);
    ellipse(0, 0, size * 2.2, size * 0.8);
    
    // Inner ring
    strokeWeight(6);
    stroke(180, 160, 200, 180);
    ellipse(0, 0, size * 1.8, size * 0.6);
    
    // Inner most ring
    strokeWeight(4);
    stroke(160, 140, 180, 160);
    ellipse(0, 0, size * 1.5, size * 0.4);
    
    pop();
  }
  
  // Uranus
  else if (pattern === 'rings' && color === '#AFEEEE') {
    // Base planet
    fill('#AFEEEE');
    ellipse(x, y, size, size);
    
    // Add some subtle bands
    noStroke();
    fill(175, 238, 238, 150);
    for (let i = 0; i < 3; i++) {
      ellipse(x, y, size * (0.8 - i * 0.2), size);
    }
    
    // Ring system
    push();
    translate(x, y);
    rotate(-PI / 2);
    noFill();
    strokeWeight(3);
    stroke(200, 255, 255, 180);
    ellipse(0, 0, size * 1.8, size * 0.2);
    strokeWeight(2);
    stroke(180, 255, 255, 160);
    ellipse(0, 0, size * 1.6, size * 0.15);
    pop();
  }
  
  // Neptune
  else if (pattern === 'waves') {
    // Base planet
    fill('#4682B4');
    ellipse(x, y, size, size);
    
    // Add dynamic wave-like bands
    noFill();
    stroke(100, 149, 237, 150);
    strokeWeight(2);
    for (let i = 0; i < 5; i++) {
      push();
      translate(x, y);
      rotate(i * PI / 3);
      beginShape();
      for (let j = -size/2; j < size/2; j += 10) {
        let xoff = j / size;
        let yoff = cos(xoff * PI) * size * 0.1;
        curveVertex(j, yoff);
      }
      endShape();
      pop();
    }
  }
  // Default planet drawing
  else {
    fill(color);
    ellipse(x, y, size, size);
  }
}

function drawQuestion() {
  textSize(24); // Set the text size to 24
  fill(255); // Set the text color to white
  textAlign(CENTER); // Center align the text
  text(`What planet is ${questions[currentQuestionIndex].day} named after?`, width / 2 -160, 100); // Display the current question
}

function nextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0; // Restart the quiz if all questions have been asked
  }
  correctAnswer = questions[currentQuestionIndex].planet; // Set the correct answer for the current question
  feedbackColor = null; // Reset the feedback color
  showPopup = false; // Hide the popup
  resetPlanets(); // Reset the colors of the planets
  redraw(); // Redraw the canvas to update the display
}

function mousePressed() {
  if (showPopup) {
    // Check if the "Next" button is clicked
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 50 && mouseY < height / 2 + 90) {
      currentQuestionIndex++; // Move to the next question
      nextQuestion(); // Load the next question
    }
    return; // Exit the function to avoid further checks
  }

  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    let d = dist(mouseX, mouseY, planet.x, planet.y); // Calculate the distance between the mouse and the planet
    if (d < planet.size / 2) { // Check if the mouse is over the planet
      if (planet.name === correctAnswer) {
        showPopup = true; // Show the popup if the correct planet is clicked
      } else {
        planets.splice(i, 1); // Remove the planet from the array if it is clicked incorrectly
      }
      redraw(); // Redraw the canvas to update the display
      break; // Exit the loop once a planet is clicked
    }
  }
}

function drawPopup() {
  fill(0, 0, 0, 200); // Set the fill color to a semi-transparent black
  rect(width / 2 - 200, height / 2 - 100, 400, 200, 10); // Draw the popup background
  fill(255); // Set the text color to white
  textSize(18); // Set the text size to 18
  textAlign(CENTER); // Center align the text
  text(questions[currentQuestionIndex].explanation, width / 2, height / 2 - 20); // Display the explanation for the current question
  fill(100, 255, 100); // Set the fill color for the "Next" button
  rect(width / 2 - 50, height / 2 + 50, 100, 40, 10); // Draw the "Next" button
  fill(0); // Set the text color to black
  textSize(20); // Set the text size to 20
  text("Next", width / 2, height / 2 + 75); // Display the "Next" button text
}

function resetPlanets() {
  planets = [
    { name: "Sun", x: -100, y: 600, size: 700, color: '#FF9600', pattern: 'none' },
    { name: "Moon", x: 460, y: 680, size: 22, color: '#D3D3D3', pattern: 'none' },
    { name: "Mercury", x: 350, y: 480, size: 35, color: '#BEBEBE', pattern: 'craters' },
    { name: "Venus", x: 200, y: 300, size: 70, color: '#E6C200', pattern: 'clouds' },
    { name: "Earth", x: 400, y: 700, size: 80, color: '#1E90FF', pattern: 'continents' },
    { name: "Mars", x: 400, y: 300, size: 50, color: '#FF4500', pattern: 'canyons' },
    { name: "Jupiter", x: 640, y: 500, size: 180, color: '#D2691E', pattern: 'curvedBands' },
    { name: "Saturn", x: 550, y: 150, size: 150, color: '#DA70D6', pattern: 'rings' },
    { name: "Uranus", x: 750, y: 715, size: 90, color: '#AFEEEE', pattern: 'rings' },
    { name: "Neptune", x: 740, y: 120, size: 100, color: '#4682B4', pattern: 'waves' }
  ];
}


