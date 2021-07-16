// GETTING ALL THE DIV ELEMENTS FROM THE HTML DOM.
const score = document.querySelector('.score');
const maxScore = document.querySelector('.max-score');
const popup = document.querySelector('.popup');
const gamearea = document.querySelector('.gamearea');

// TO SET THE MAX-SCORE 0 IN LOCAL-STORAGE FOR TESTING PURPOSE.
// localStorage.setItem('finalScore', JSON.stringify(0));

// DEFINING FINALSCORE AND A FLAG VARIABLE TO UPDATE THE MAXSCORE IN LOCALSTORAGE.
let finalScore = 0;
let newScore = false;

let flag = true;

// DEFINING ALL THE KEY FOR CONTROLLING THE CAR.
let keys = { ArrowUp: false, ArrowDown: false, 
            ArrowLeft: false, ArrowRight: false };

// DEFINING THE SPEED, SCORE AND MAX-SCORE OF THE PLAYER.
let player = { speed : 5, score : 0, maxScore: 0 };

// FETCHING THE GAME AUDIO AND GAME-OVER AUDIO TO PLAY IN BACKGROUND.
const audio = new Audio('../images_audio/drivingRelaxingly.mp3');
const gameOver = new Audio('../images_audio/gameOver.wav');

// ADDING EVENT LISTENER TO LISTEN THE EVENT WHEN A KEY IS PRESSED.
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    keys[e.key] = true;    // SUPPOSE ARROW-UP KEY IS PRESSED THEN, ARROW-UP KEY
});                        // WILL SET AS TRUE.

// ADDING EVENT LISTENER WHEN THE SAME IS RELEASED.
document.addEventListener('keyup', (e) => {
    e.preventDefault();
    keys[e.key] = false;    // AGAIN SET THE SAME KEY FALSE.
});

// FUNCTION RESPONSIBLE FOR MOVING THE LINES ON THE ROAD.
const moveLines = () => {
    let lines = document.querySelectorAll('.lines');    // FETCH ALL THE LINES.

    lines.forEach(function(item){   // FOR EACH AND EVERY LINE.

        if(item.y >= 700){      // IF THE LINE GETS OUT OF THE SCREEN
            item.y -= 760;      // SET IT'S VERTICAL POSITION AGAIN ABOVE. 
        }

        item.y += player.speed;     // KEEP UPDATING THE SPEED OF THE LINE SO AS TO GIVE US AN 
                                    // ILLUSION THAT THE LINES ARE MOVING.
        item.style.top = item.y + "px";     // HERE THE STYLE AND CSS WILL SHOW THE EFFECT.
    })                                      // OF LINE NO. 41.
}

// FUNCTION WHICH CHECKS WHETHER OUR CAR AND ENEMY CAR GET COLLIDES OR NOT.
const isCollide = (myCar, enemyCar) => {
    a = myCar.getBoundingClientRect();      // GET THE BOUNDARY POSITION OF OUR CAR
    b = enemyCar.getBoundingClientRect();   // AND OF ENEMY'S CAR.

    // THIS FUNCTION RETURN US AN OBJECT OF THE CURRENT ELEMENT'S BOUNDARY POSITION.
    // ACCORDING TO THE BOUNDARY POSITION OF OUR CAR AND ENEMY-CAR CHECK FOR COLLISION.
    return !((a.bottom < b.top) || (a.top > b.bottom) || (a.right < b.left) || (a.left > b.right));
}


// END-GAME FUNCTION WHICH GETS CALLED WHEN THE USER'S CAR GETS COLLIDE,
// THEN WE HAVE TO STOP THE GAME.
const endGame = async () => {
    player.start = false;   // SET THE PLAYER.START AS "FALSE" TO END THE GAME.
    player.speed = 5;       // SET IT'S SPEED BACK TO NORMAL.

    maxScore.style.background = 'darkblue';
    boxShadow = '0 5px 15px rgb(49, 49, 190)';

    if(newScore){       // IF ANYTIME THE PLAYER SCORED MORE THAN MAX-SCORES, UPDATE THE MAX-SCORE IN THE LOCALSTORAGE.
        localStorage.setItem('finalScore', JSON.stringify(player.maxScore + 1));
        newScore = false;
    }

    audio.pause();      // PAUSE THE BACKGROUND MUSIC OF RUNNING CAR.
    gameOver.play();    // AND PLAY THE GAME-OVER SOUND.
    
    popup.classList.remove('hide');     // REMOVE THE "HIDE" CLASS FROM POPUP SO THAT IT GETS SHOWED AGAIN.
    popup.innerHTML = "Game Over!";     // SET IT'S TEST AS GAME-OVER!
    popup.style.lineHeight = "140px";

    await new Promise(resolve => {      // WAIT FOR 2 SECONDS.
        setTimeout(() => {
            resolve() }, 2000);
    });
    
    popup.style.lineHeight = "70px";    // SHOW THE PLAYER HIS/HER FINAL-SCORE.
    popup.innerHTML = `Your Score: ${player.score}` + "<br> Click again to restart the game!";
}

// MOVE_ENEMY_CAR FUNCTION.
const moveEnemyCar = (myCar) => {
    let enemyCar = document.querySelectorAll('.enemyCar');  // FETCH ALL THE ENEMY CARS DIV.

    enemyCar.forEach(function(item){    // ITERATE OVER THEM.

        if(isCollide(myCar, item)){     // KEEP CHECKING WHETHER CARS COLLIDE OR NOT.
            console.log("Boom Hit!");
            endGame();                  // IF YES, END THE GAME, ELSE CONTINUE.
        }

        if(item.y >= 750){      // BASICALLY HERE THE CARS RANDOM PROPERTIES ARE BEING SET.
            item.y = -300;      // IF A CAR GETS OUT OF THE SCREEN SET IT'S POSITION -300.
            item.style.left = Math.floor(Math.random() * 350) + "px";   // RANDOM MARGIN-LEFT.
            let imageNumber = Math.floor(Math.random() * 6);    // RANDOM CAR IMAGE CHOOSEN.
            item.style.backgroundImage = `url("../images_audio/car${imageNumber}.png")`;
        }

        item.y += player.speed;     // CONTINUOUSLY CHANGING POSITION OF CAR WHICH WILL GIVE US ILLUSION LIKE THEY ARE MOVING.
        item.style.top = item.y + "px"; // CSS STYLE WILL LITERALLY DO THIS ILLUSION.
    })
};

// GAME-PLAY FUNCTION WHICH IS RESPONSIBLE FOR RUNNING GAME, 
// IF THIS FUNCTION WILL STOP, WHOLE GAME WILL STOP.
const gameplay = () => {
    let car = document.querySelector('.car');   // FETCH OUR MAIN CAR.
    let road = gamearea.getBoundingClientRect();    // FETCH THE BOUNDARY POSITION OF ROAD.

    if(player.start){   // IF PLAYER IS PLAYING THEN CONTINUE. ELSE THIS FUNCTION WILL GET COMPLETED.

        moveLines();    // KEEP MOVING THE LINES BY CALLING THE MOVE-LINES FUNCTION.
        moveEnemyCar(car);  // KEEP MOVING THE ENEMY CARS BY CALLING THE MOVE-ENEMY-CAR FUNCTION.

        if(player.score === 300){
            player.speed++;
        }

        if(player.score === 600){
            player.speed++;
        }

        if(player.score === 1100){
            player.speed++;
        }

        if(player.score === 1600){
            player.speed++;
        }

        if(player.score === 2100){
            player.speed++;
        }

        if(player.score === 3000){
            player.speed++;
        }

        if(player.score === 3800){
            player.speed++;
        }

        if(player.score === 4600){
            player.speed++;
        }

        if(player.score === 5500){
            player.speed++;
        }

        if(player.score === 6500){
            player.speed++;
        }

        if(player.score === 8000){
            player.speed++;
        }

        if(player.score === 9500){
            player.speed++;
        }

        if(player.score === 11000){
            player.speed++;
        }

        if(player.score === 13000){
            player.speed++;
        }

        // THESE ARE THE FOUR DIRECTIONS IN WHICH OUR CAN MOVE.

        // UP-DIRECTION.
        if(keys.ArrowUp && player.y > (road.top + 100))    {
            player.y -= player.speed;
        }
        
        // DOWN-DIRECTION.
        if(keys.ArrowDown && player.y < road.bottom - 115)    {
            player.y += player.speed;
        }
        
        // LEFT-DIRECTION.
        if(keys.ArrowLeft && player.x > 0)    {
            player.x -= player.speed;
        }
        
        // RIGHT-DIRECTION.
        if(keys.ArrowRight && player.x < (road.width - 70)){
            player.x += player.speed;
        }

        // SET THE CSS STYLE ACCORDING TO ABOVE POSITION WHICH WAS CHANGED BY PLAYER.
        car.style.top = player.y + "px";    // BY SETTING THESE TWO, OUR CAR WILL MAKE
        car.style.left = player.x + "px";   // AN ILLUSION LIKE IT IS ACTUALLY MOVING.

        window.requestAnimationFrame(gameplay); // KEEP CALLING GAME-PLAY FUNCTION TO CONTINUE THE GAME.
        
        // IF THE CURRENT SCORE GETS EQUAL TO MAX-SCORE INCREASE MAX-SCORE ALSO.
        if(parseInt(player.maxScore) === parseInt(player.score)){
            newScore = true;
            player.maxScore++;

            if(player.maxScore % 20 === 0){
                flag = !flag;
                if(flag){
                    maxScore.style.background = 'darkblue';
                    boxShadow = '0 5px 15px rgb(49, 49, 190)';
                }
                else{
                    maxScore.style.background = 'blueviolet';
                    boxShadow = '0 5px 15px blueviolet';
                }
            }
        }
        
        // ELSE INCREASE CURRENT SCORE ONLY.
        player.score++;
        score.innerText = "Score: " + player.score;     // ACCORDINGLY SET THE CURRENT AND
        maxScore.innerText = "Max. Score: " + (player.maxScore);    // MAX-SCORE ON SCREEN.
    }
};


// ADDING EVENT LISTENER ON POPUP-BOX TO GIVE THE USER A FUNCTIONALITY, HE/SHE CAN
// PLAY THE GAME BY CLICKING ON THE POP-UP BOX.
popup.addEventListener('click', () => {
    audio.play();   // START PLAYING BACKGROUND MUSIC.
    gamearea.innerHTML = "";    // REMOVE EVERTHING FROM THE AREA.
    popup.classList.add('hide');    // HIDE THE POPUP-BOX SO THAT PLAYER CAN PLAY.
    player.start = true;    // SET THE PLAYER.START AS "TRUE".
    player.score = 0;   // AND INITIAL SCORE = 0. 

    // GET THE MAX-SCORE FROM THE LOCAL-STORAGE.

    if(localStorage.getItem('finalScore') === null){
        player.maxScore = 0;
    }
    else{
        player.maxScore = JSON.parse(localStorage.getItem('finalScore'));
    }

    // CALL REQUEST_ANIMATION_FRAME FUNCTION.
    window.requestAnimationFrame(gameplay);

    // CREATE 5 DIV'S FOR LINES.
    for(let i = 0; i < 5; i++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = i * 150;
        roadLine.style.top = roadLine.y + "px";
        gamearea.appendChild(roadLine);
    }

    // CREATE 3 ENEMY CARS.
    for(let i = 0; i < 3; i++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemyCar');
        enemyCar.y = (i + 1) * -350;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        let imageNumber = Math.floor(Math.random() * 6);
        enemyCar.style.backgroundImage = `url("../images_audio/car${imageNumber}.png")`;
        console.log(imageNumber);
        gamearea.appendChild(enemyCar);
    }

    // CREATE OUR MAIN-CAR.
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gamearea.appendChild(car);
    car.style.backgroundImage = "url('../images_audio/myCar.png')";

    // SET 2 PROPERTIES, HORIZONTAL AND VERTICAL POSITION OF OUR MAIN_CAR.
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
});