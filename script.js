const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass');
const textStart = document.querySelector('#text-start');
const audioStart = new Audio('./audio/theme.mp3');
const audioGameOver = new Audio('./audio/gameover.mp3');
const floor1 = document.querySelector('.floor-1');
const floor2 = document.querySelector('.floor-2');
const floor3 = document.querySelector('.floor-3');

//09/07/2023: como os valores não variam, chamei-os de constantes

let gameOver = false; //09/07/2023: booleana para recomeçar o jogo após o game over (ela reaparece como true mais abaixo e está relacionada com a função document.addEventListener('keydown', function (event))
let score = 0; //09/07/2023: criei um score de pontuação relacionado com a função if (!gameOver) { score++;  updateScore(); }
let jumping = false; // Adicionada variável "jumping" e definida como false

/*================ Função Start ===================*/
const start = () => {

    //document.getElementById("text-start").style.color = "rgb(236, 236, 236)"; //09/07/2023: substituido pela linha abaixo
    textStart.style.color = "rgb(236, 236, 236)";  //09/07/2023: acrescentado
    pipe.classList.add('pipe-animation');
    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '50px';

    function grassAnimation() {
        grass.classList.add('grass-animation');
    }
    setInterval(grassAnimation, 8000);

    function floorAnimation1() {
        floor1.classList.add('floor-animation-1');
    }
    setInterval(floorAnimation1, 0);

    function floorAnimation2() {
        floor2.classList.add('floor-animation-2');
    }
    setInterval(floorAnimation2, 0);

    function floorAnimation3() {
        floor3.classList.add('floor-animation-3');
    }
    setInterval(floorAnimation3, 3100);

    audioStart.play();

    document.addEventListener('keydown', jump);  //09/07/2023: acrescentado 
};

document.addEventListener('keydown', start);

/*================ Função Pulo ===================*/
let isJumping = false;

const jump = () => {
    if (!isJumping) {
        isJumping = true;
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
            isJumping = false;
        }, 1500);

        if (!gameOver) {
            score++;
            updateScore();
        }
    }
};

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Verifica se a tecla pressionada é a barra de espaço
        jump();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === ' ') { // Verifica se a tecla solta é a barra de espaço
        isJumping = false;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
        isJumping = false;
    }
});


/*================ Código para acabar o jogo ===================*/
const checkGameOver = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const grassPosition = grass.offsetLeft;
    const floorPosition1 = floor1.offsetLeft;
    const floorPosition2 = floor2.offsetLeft;
    const floorPosition3 = floor3.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './images/game-over.png';
        mario.style.width = '90px';
        mario.style.marginLeft = '50px';
        grass.style.animation = 'none';
        grass.style.left = `${grassPosition}px`;
        floor1.style.animation = 'none';
        floor1.style.left = `${floorPosition1}px`;
        floor2.style.animation = 'none';
        floor2.style.left = `${floorPosition2}px`;
        floor3.style.animation = 'none';
        floor3.style.left = `${floorPosition3}px`;

        //document.getElementById("text-start").style.color = "black";   //substituídos pelas duas linhas abaixo
        //document.getElementById("text-start").innerHTML="<strong>GAME OVER</strong>";
        textStart.style.color = "black"; //09/07/2023: acrescentado
        textStart.innerHTML = "<strong>GAME OVER</strong>"; //09/07/2023: acrescentado

        function stopAudioStart() {
            audioStart.pause();
        }
        stopAudioStart();

        audioGameOver.play();

        function stopAudio() {
            audioGameOver.pause();
        }
        setTimeout(stopAudio, 8000);

        gameOver = true; //09/07/2023: acima tem gameOver = false e está relacionado com a função abaixo document.addEventListener('keydown', function (event)

        clearInterval(checkGameOver);
    }
}, 10);

/*================ Função para atualizar o contador de pontos ===================*/
const updateScore = () => {
    const scoreElement = document.querySelector('#score');
    scoreElement.textContent = `Score: ${score}`;
};

/*================ Reiniciar o jogo ap´pos o game over com qualquer botão ===================*/
document.addEventListener('keydown', function (event) {
    if (gameOver) {
        location.reload(); // Recarrega a página
    }
});
