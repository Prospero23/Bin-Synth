export default function sketch(p5) {
    let countdown = 10;
    let startTime;
    let photoTaken = false;
    let canvasMain;
    let canvasTimer;
  
    p5.setup = function () {
      canvasMain = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0)
      startTime = p5.second();
      
    };
  
    p5.draw = function () {
      // calc elapsed time
      let elapsedTime = p5.second() - startTime;
  
      // calc remaining time
      let remainingTime = countdown - elapsedTime;
  
      if (p5.mouseIsPressed) {
        p5.fill(255);
        p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
      }
  
      if (remainingTime <= 0 && !photoTaken) {
        photoTaken = true;
        //console.log(remainingTime);
        p5.noLoop();
        //console.log("STOP");
  
        //show modal
        window.newPost.showModal()
        // Call the function to save the canvas to Cloudinary
        saveCanvasToCloudinary(canvasMain.canvas);

      }
    };
  
    p5.windowResized = function () {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  }
  
  async function saveCanvasToCloudinary(canvas) {
    // Convert the canvas to an image data URL
    const imageDataURL = canvas.toDataURL("image/png");
  
    // Upload the image to Cloudinary
    const url = "https://api.cloudinary.com/v1_1/<cloud_name>/image/upload";
    const apiKey = "<api_key>";
    const formData = new FormData();
    formData.append("file", imageDataURL);
    formData.append("upload_preset", "<upload_preset>");

    //console.log(imageDataURL);
  
  }