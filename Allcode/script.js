const welcomeScreen = document.getElementById('welcome-screen');
const stepOne = document.getElementById('step-one');
const stepTwo = document.getElementById('step-two');
const stepThree = document.getElementById('step-three');
const startButton = document.getElementById('start-button');
const imageUpload = document.getElementById('image-upload');
const nextButton1 = document.getElementById('next-button-1');
const nextButton2 = document.getElementById('next-button-2');
const imageCanvas = document.getElementById('image-canvas');
const ctx = imageCanvas.getContext('2d');
const circleColor = document.getElementById('circle-color');
const circleSize = document.getElementById('circle-size');
const circleOpacity = document.getElementById('circle-opacity');

let image = new Image();
let clicks = [];

startButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    stepOne.style.display = 'block';
});

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.onload = () => {
                imageCanvas.width = image.width;
                imageCanvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            };
            image.src = e.target.result;
            nextButton1.disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

nextButton1.addEventListener('click', () => {
    stepOne.style.display = 'none';
    stepTwo.style.display = 'block';
});

imageCanvas.addEventListener('click', (event) => {
  const rect = imageCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  clicks.push({x, y});
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
  if (clicks.length === 2) {
      nextButton2.disabled = false;
  }
});

nextButton2.addEventListener('click', () => {
  stepTwo.style.display = 'none';
  stepThree.style.display = 'block';
});

function drawCircles() {
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = circleColor.value;
    ctx.globalAlpha = circleOpacity.value;
    clicks.forEach(click => {
      ctx.beginPath();
      ctx.arc(click.x, click.y, circleSize.value, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
}

circleColor.addEventListener('input', drawCircles);
circleSize.addEventListener('input', drawCircles);
circleOpacity.addEventListener('input', drawCircles);