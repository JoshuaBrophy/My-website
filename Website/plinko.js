document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("plinkoCanvas");
    const ctx = canvas.getContext("2d");

    const rows = 7;
    const cols = 8;
    const cellSize = canvas.width / cols;
    const ballRadius = 10;

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw pegs
        for (let row = 0; row < rows; row++) {
            for (let col = row % 2; col < cols; col += 2) {
                ctx.beginPath();
                ctx.arc(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2, 10, 0, Math.PI * 2);
                ctx.fillStyle = "#00FF00";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    function drawBall(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        ctx.closePath();
    }

    function dropBall(startCol) {
        let row = 0;
        let col = startCol;
        const startX = col * cellSize + cellSize / 2;
        const startY = row * cellSize + cellSize / 2;

        function animate() {
            drawBoard();

            const currentY = row * cellSize + cellSize / 2;
            drawBall(startX, currentY);

            // Move the ball down
            row++;

            // Check if the ball reaches the bottom
            if (row < rows) {
                requestAnimationFrame(animate);
            } else {
                // Implement scoring logic here
                // Example: You can check which column the ball landed in and assign scores accordingly
                console.log("Ball landed in column:", col);
            }
        }

        animate();
    }

    // Handle click event to drop a ball
    canvas.addEventListener("click", function (event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const col = Math.floor(mouseX / cellSize);
        dropBall(col);
    });

    drawBoard();
});