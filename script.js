// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.myButton');

// set up our canvas for drawing
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

const MOVE_AMOUNT = 10;
let xTarget,yTarget;
let hue=0;
ctx.strokeStyle = `hsl( {100, 100%, 50% )`;
const { width, height } = canvas;

// begin path
function startPath(){
    ctx.beginPath();
    //const { width, height } = canvas;
    function randNum(axis){
        return Math.floor(Math.random() * axis);
    }
    let x = randNum(width);
    let y = randNum(height);
    xTarget = x;
    yTarget = y;
    // ctx.strokeStyle = `hsl( 100, 100%, 50% )`;
    ctx.moveTo(x,y);
    ctx.lineTo(x, y);
    ctx.stroke();
};

//draw function
//accepts an object as parameter and destructures object into variables composing repsective fields passed
function draw ({key}){
    console.log(key)
    hue+=10;
    ctx.strokeStyle = `hsl( ${hue}, 100%, 50% )`;
    ctx.moveTo(xTarget,yTarget);
    switch(key){
        case 'ArrowUp':
            yTarget -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            yTarget += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            xTarget -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            xTarget += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(xTarget,yTarget);
    ctx.stroke();
}

// write a handler for the keys
function handlekey(e){
    if ( e.key.includes('Arrow') ){
        draw( {key: 
            e.key} )
        e.preventDefault();
    }
}

// clear or shake function
shakebutton.addEventListener('click',clearCanvas);
function clearCanvas(){
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener("animationend", function() {
        console.log("done the shake!");
        canvas.classList.remove("shake");
      },
      { once: true }
    );
    startPath();
}

startPath();
// listen for arrow keys
window.addEventListener('keydown',handlekey);
const about = document.querySelector('.aboutButton');
about.addEventListener('click', ()=>{
    alert(`Etch a sketch project from the Wes Bos' Beginner JavaScript course. 
This exercise was part of module 6 from the course.
Background image from Ruben Garcia via unsplash.com in agreement with licensing.
Currently only available on desktop devices.
Beginning point on canvas is selected randomly per exercise instructions.`);
})