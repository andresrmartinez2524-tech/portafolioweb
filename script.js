let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = document.getElementById("puntuacion")

// Snake como array de segmentos
let snake = [{x: 200, y: 200}];
let size = 20;

// Direccion inicial
let dx = 0;
let dy = 0;

// Comida
let comida = {
    x: Math.floor(Math.random() * (canvas.width / size)) * size,
    y: Math.floor(Math.random() * (canvas.height / size)) * size
};

puntos = 0;
score.innerHTML = "puntos : " +  puntos;




// Movimiento automatico
function update() {

    // Nueva cabeza
    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    // Si come
    if (head.x === comida.x && head.y === comida.y) {
        comida.x = Math.floor(Math.random() * (canvas.width / size)) * size;
        comida.y = Math.floor(Math.random() * (canvas.height / size)) * size;
        puntos += 1;
        score.innerHTML = "puntos: " + puntos;
       
      

    } else {
        snake.pop()
        // elimina cola si no comio
    }

    // Si choca con pared → reinicia
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        alert("PERDISTE!!!!!");
        snake = [{x: 200, y: 200}];
        dx = 0;
        dy = 0;
        puntos = 0;
        score.innerHTML = "puntos: " + puntos;
      
    }
}




function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida
    ctx.fillStyle = "green";
    ctx.fillRect(comida.x, comida.y, size, size);

    // Dibujar snake
    ctx.fillStyle = "red";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, size, size);
    });
}



// Loop del juego
function gameLoop() {
    update();
    draw();
}
setInterval(gameLoop, 120);




// Controles
document.addEventListener("keydown", (e) => {

    switch (e.key.toLowerCase()) {
        case "w":
            dx = 0;
            dy = -size;
            break;

        case "s":
            dx = 0;
            dy = size;
            break;

        case "a":
            dx = -size;
            dy = 0;
            break;

        case "d":
            dx = size;
            dy = 0;
            break;
    }

});

