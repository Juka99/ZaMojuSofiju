document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('signature-pad');
  var clearButton = document.getElementById('clear');
  var submitButton = document.getElementById('submit');
  var lovePar = document.querySelector('.love-you-par');

  submitButton.addEventListener('click', function () {
    for (let i = 0; i < 100; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      document.getElementById('heart-container').appendChild(heart);

      const duration = Math.random() * 3 + 2; // 2 to 5 seconds
      const delay = Math.random() * 5; // 0 to 5 seconds
      heart.style.animation = `fall ${duration}s linear ${delay}s forwards`;

      heart.style.left = `${Math.random() * 100}%`;

      heart.addEventListener('animationend', function () {
        heart.remove();
      });
    }

    // Make the paragraph visible
    lovePar.style.opacity = '1';
    lovePar.style.display = 'block'; // Adjust this to fit how you want the paragraph to show
  });

  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 2;

  var drawing = false;

  function draw(x, y, isTouch = false) {
    if (!drawing) return;
    if (isTouch) {
      var rect = canvas.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    submitButton.disabled = false;
  }

  function startDrawing(e) {
    drawing = true;
    var {offsetX, offsetY} = e;
    if (e.touches) {
      e.preventDefault(); // Prevent scrolling on touch devices
      var rect = canvas.getBoundingClientRect();
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
    }
    draw(offsetX, offsetY);
  }

  function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Begin a new path to not connect the dots
  }

  // Mouse events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', function (e) {
    draw(e.offsetX, e.offsetY);
  });
  window.addEventListener('mouseup', stopDrawing);

  // Touch events
  canvas.addEventListener('touchstart', function (e) {
    startDrawing(e);
  });
  canvas.addEventListener('touchmove', function (e) {
    var rect = canvas.getBoundingClientRect();
    var offsetX = e.touches[0].clientX - rect.left;
    var offsetY = e.touches[0].clientY - rect.top;
    draw(offsetX, offsetY, true);
  });
  canvas.addEventListener('touchend', stopDrawing);

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
