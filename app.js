document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('signature-pad');
  var clearButton = document.getElementById('clear');
  var submitButton = document.getElementById('submit');
  var lovePar = document.querySelector('.love-you-par');
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 2;

  var isAnimating = false; // Flag to track animation state

  submitButton.addEventListener('click', function () {
    if (isAnimating) return; // Exit if an animation is already in progress
    isAnimating = true; // Set flag to true as animation starts

    var heartsCount = 0; // Counter to track the number of hearts removed

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
        heartsCount++;
        if (heartsCount === 100) {
          isAnimating = false; // Reset flag when all hearts have finished animating
        }
      });
    }

    lovePar.classList.add('active');
  });

  var drawing = false;

  function draw(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    // Adjust for touch events
    if (e.touches) {
      e.preventDefault();
      var touch = e.touches[0];
      var rect = canvas.getBoundingClientRect();
      ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    } else {
      ctx.moveTo(e.offsetX, e.offsetY);
    }
    submitButton.disabled = false;
  }

  function move(e) {
    if (!drawing) return;
    var x, y;
    // Adjust for touch events
    if (e.touches) {
      e.preventDefault();
      var touch = e.touches[0];
      var rect = canvas.getBoundingClientRect();
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = e.offsetX;
      y = e.offsetY;
    }
    draw(x, y);
    // For smooth continuous drawing
    ctx.beginPath();
    ctx.moveTo(x, y);
    submitButton.disabled = false;
  }

  function stopDrawing() {
    drawing = false;
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', stopDrawing);

  // Adjusted touch event listeners
  canvas.addEventListener('touchstart', startDrawing, {passive: false});
  canvas.addEventListener('touchmove', move, {passive: false});
  canvas.addEventListener('touchend', stopDrawing, {passive: false});

  clearButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    submitButton.disabled = true;
  });

  // Prevent scrolling and zooming on iOS while drawing
  document.body.addEventListener(
    'touchstart',
    function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    },
    {passive: false}
  );
  document.body.addEventListener(
    'touchend',
    function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    },
    {passive: false}
  );
  document.body.addEventListener(
    'touchmove',
    function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    },
    {passive: false}
  );
});
