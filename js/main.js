const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const scoreDisplay = document.querySelector("#score")
const timeDisplay =  document.querySelector("#time")
const messageDisplay = document.querySelector("#message")



let words = ["banana", "key", "car", "javascript", "scalper"]
let score = 0;
let time = 0;
let timeInterval;
let isPlaying = false;

const GAME_TIME = 5;
const API_URL = "https://random-word-api.herokuapp.com/word?number=10";

init()

function init(){
    const res = fetch(API_URL).then(res=> res.json()).then((data)=> words = data);
}

wordInput.addEventListener("input", (e)=>{ 
    const typedText = e.target.value;
    const currentText = currentWord.innerText;
    if(typedText.toUpperCase() === currentText.toUpperCase()){
       addScore();
       setNewWord();
    }
    })


    // 게임 종료
    
    function gameover() {
        clearInterval(timeInterval)
        isPlaying= false;
        messageDisplay.innerText = "Game Over!";
        timeInterval = null;
        score = 0;
    }

    //시간 카운트다운
    function countDown(){
        console.log(time);
        time = time - 1;
        timeDisplay.innerText = time;
        if(time===0){
            gameover();
        }
    }


    function setNewWord(){
        time = GAME_TIME;
        wordInput.value = "";
        messageDisplay.innerText = "Now Playing!!!"
        const randomIndex = Math.floor(Math.random()*words.length);
        currentWord.innerText = words[randomIndex]
  
        if(!isPlaying) {
            isPlaying = true;
            timeInterval = setInterval(countDown, 1000)
        }

    }

    function addScore(){
        score = score + 1;
        scoreDisplay.innerText = score;
    }

