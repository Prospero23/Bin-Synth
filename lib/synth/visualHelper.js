export function drawFunction(p5, buffer, x, y, px, py, scale) {
  // Scale the coordinates and dimensions
  const scaledX = x * scale;
  const scaledY = y * scale;
  const scaledPX = px * scale;
  const scaledPY = py * scale;

  buffer.fill(255);
  buffer.stroke(0); // Set the border color to white
  buffer.strokeWeight(1 * scale);
  let length = 10;
  const velocity = p5.dist(scaledX, scaledY, scaledPX, scaledPY);
  length = p5.map(
    velocity,
    10 * scale,
    p5.width * scale,
    20 * scale,
    900 * scale,
  );
  buffer.ellipse(scaledX, scaledY, length, length);
}

// size of ellipse are relative

// takes instance, time elapsed, mouse action array, type: 'click, release, dragged'
export function recordAction(p5, elapsedTime, mouseActions, actionType) {
  const action = {
    event: actionType,
    x: p5.mouseX / p5.width, // current positions of mouse NORMALIZED
    y: p5.mouseY / p5.height,
    prevX: p5.pmouseX / p5.width, // prev positions of mouse
    prevY: p5.pmouseY / p5.height,
    time: elapsedTime, // time of action
  };
  mouseActions.push(action);
}

export function drawFunctionSynth(p5, x, y, px, py, scale) {
  // Scale the coordinates and dimensions
  const scaledX = x * scale;
  const scaledY = y * scale;
  const scaledPX = px * scale;
  const scaledPY = py * scale;

  p5.fill(255);
  p5.stroke(0); // Set the border color to white
  p5.strokeWeight(1 * scale);
  let length = 10;
  const velocity = p5.dist(scaledX, scaledY, scaledPX, scaledPY);
  length = p5.map(
    velocity,
    10 * scale,
    p5.width * scale,
    20 * scale,
    900 * scale,
  );
  p5.ellipse(scaledX, scaledY, length, length);
}
