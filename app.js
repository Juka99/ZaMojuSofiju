document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('signature-pad');
  var clearButton = document.getElementById('clear');
  var submitButton = document.getElementById('submit');
  var lovePar = document.querySelector('.love-you-par');

  document.getElementById('submit').addEventListener('click', function () {
    for (let i = 0; i < 100; i++) {
      // Create 100 hearts
      const heart = document.createElement('div');
      heart.classList.add('heart');
      document.getElementById('heart-container').appendChild(heart);

      // Randomize the falling duration and delay for each heart
      const duration = Math.random() * 3 + 2; // 2 to 5 seconds
      const delay = Math.random() * 5; // 0 to 5 seconds
      heart.style.animation = `fall ${duration}s linear ${delay}s forwards`;

      // Randomize the start position of each heart
      heart.style.left = `${Math.random() * 100}%`;

      // Remove heart after animation to clean up the DOM
      heart.addEventListener('animationend', function () {
        heart.remove();
      });

      lovePar.classList.add('active');
    }
  });

  // Set up the canvas context for drawing
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 2;

  var drawing = false;
  var lastX = 0;
  var lastY = 0;

  function draw(x, y) {
    if (drawing) {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      submitButton.disabled = false;
    }
  }

  canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener('mousemove', function (e) {
    draw(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mouseup', function () {
    drawing = false;
    ctx.beginPath(); // Begin a new path to not connect the dots
  });

  canvas.addEventListener('mouseout', function () {
    drawing = false;
    ctx.beginPath(); // Begin a new path to not connect the dots
  });

  // Implement the clear button functionality
  clearButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    submitButton.disabled = true;
  });
});
