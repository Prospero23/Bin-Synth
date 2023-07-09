export function drawFunction(p5, x, y, px, py){
    p5.fill(255)
    p5.stroke(0); // Set the border color to white
    p5.strokeWeight(1)
    let length = 10;
    let velocity = p5.dist(x, y, px, py);
    length = p5.map(velocity, 10, p5.width, 20, 900);
    p5.ellipse(x, y, length, length);
}




//size of ellipse are relative 

//takes instance, time elapsed, mouse action array, type: 'click, release, dragged'
export function recordAction(p5, elapsedTime, mouseActions, actionType){ 
    let action = {
          event: actionType,
          x: p5.mouseX / p5.width, //current positions of mouse NORMALIZED
          y: p5.mouseY / p5.height,
          prevX: p5.pmouseX / p5.width, //prev positions of mouse
          prevY: p5.pmouseY / p5.height,
          time: elapsedTime, //time of action
        };
        mouseActions.push(action);
}