let canvas = document.getElementById('scratch-card');
let context = canvas.getContext('2d');
let carImage = document.getElementById('carImage').querySelector('img');
let scratchText = document.getElementById('scratchText');

// Make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const init = () => {
    // Cover canvas with dark blue
    context.fillStyle = "darkblue";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

let isDragging = false;
let scratched = false; // Track if scratching has started

canvas.addEventListener("mousedown", () => {
    isDragging = true;
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        scratch(event.clientX, event.clientY);
    }
});

const scratch = (x, y) => {
    context.globalCompositeOperation = "destination-out"; // Erase instead of drawing
    context.beginPath();
    context.arc(x, y, 50, 0, Math.PI * 2); // Larger circle for full-screen effect
    context.fill();

    if (!scratched) {
        carImage.style.filter = "blur(0px)"; // Remove blur when scratching starts
        scratchText.style.display = "none"; // Hide text when scratching starts
        scratched = true;
    }
};

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reapply overlay
});

init();
