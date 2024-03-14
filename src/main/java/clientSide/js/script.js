const code =[];
let currentLevel=1;
let minutes=0;
let seconds=0;
let playing = false;
let gameStarted = false;
let timer;

const level = document.querySelector("#level");
const time = document.querySelector("#timeelapser");
const playPause = document.querySelector("#playpause");



function updatePage(){

    level.value = currentLevel;

    let displayMinutes = minutes;
    let displaySeconds = seconds;

    if(minutes < 10 ){
        displayMinutes = `0${minutes}`;
    }
    if(seconds < 10){
        displaySeconds = `0${seconds}`;
    }

    time.textContent =`${ displayMinutes }:${displaySeconds}`;
}

/**
 * count the time and update minutes and seconds
 */
function timeCounter(){

   if(!gameStarted){
      minutes = 3;
      seconds = 30;
   }

    if(playing){
        timer = setInterval( ()=>{
            if(minutes > 0){
                if( seconds > 0){
                    seconds -=1;
                    updatePage();
                }else{
                    minutes-=1;
                    seconds = 59;
                    updatePage();
                }
            }else if( minutes ===0 && seconds > 0){
                seconds -=1;
                updatePage();
            }

        },1000);

    }else{
        clearInterval(timer);
    }
}
/**
 * pause the current time and update minutes and seconds
 */
function  pauseTime(paused){
    return paused;
}

/**
 * increment current  game level
 */
function updateLevel()
{
    currentLevel +=1;
}

/**
 * update textContent of the play/pause button and pause the time
 */

function playOrPause()
{

    if( playPause.value == "Play"){

        playPause.value ="Pause";
        playing = pauseTime(true);
    } else{
        playPause.value = "Play";
        playing = pauseTime(false)
        
    }

    timeCounter();
    gameStarted = true;

}
playPause.addEventListener('click', playOrPause)

