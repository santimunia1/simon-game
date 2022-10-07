const levelElement = document.getElementById('level-title')
const buttonColors = [ 'green','red','blue','yellow']
let computerPattern =[]
let userPattern =  []
let level = 0
let started = false

function getNextPattern() {
    //generate computer pattern 
    const randomNumber = Math.floor(Math.random()* buttonColors.length)
    const randomColor = buttonColors[randomNumber]
    computerPattern.push(randomColor)
    console.log("Computer Pattern:",computerPattern)

    //play the computer pattern for user 
    // 1. loop through the computer patter for user 
    computerPattern.forEach((color,index)=>{
        //2. play for the user => sound and animation\
        setTimeout(()=> {
            playPatternSound(color)
        animateButton(color)
        },1000*index)
    })



    level += 1
      levelElement.textContent= `level ${level}`;
    //reset user pattern 
    userPattern= [];
}

//increment level and display score



function playPatternSound(color){
    const colorAudio = new Audio(`sounds/${color}.mp3`);
    colorAudio.play();
}

function animateButton(color){
    const buttonElement = document.getElementById(`${color}`)

    buttonElement.classList.add("pressed")

    setTimeout(() => {
        buttonElement.classList.remove("pressed")
    },100)
}
//start game
document.addEventListener('keydown', ()=> {
    if (!started){
        getNextPattern()
        started = true;
    }
})
// get user pattern
const buttonElements = document.querySelectorAll('.btn')

buttonElements.forEach((button)=> {
   button.addEventListener('click', (event) => {
    const userClickedColor = event.target.id;

    userPattern.push(userClickedColor);
    playPatternSound(userClickedColor);
    animateButton(userClickedColor)
    validatePattern(userPattern.length-1)
    console.log("User pattern:",userPattern)
   });
});


function validatePattern(lastUserSelection){
    if ( computerPattern[lastUserSelection]===userPattern[lastUserSelection]){
        if (computerPattern.length===userPattern.length){
            setTimeout(() => {
                getNextPattern();
            },1000)
        }
    }else {
        console.log('wrong Selection');

        const wrongAudio = new Audio ('sounds/wrong.mp3');
        wrongAudio.play();

        levelElement.textContent = ' Game over ! Press Any Key To Restart.'

        document.querySelector('body').classList.add('game-over');
        setTimeout(() => {
            document.querySelector('body').classList.remove('game-over');   
        }, 200)

        restartGame();
    }
}

function restartGame() {
    level = 0;
    computerPattern = [];
    started = false
}