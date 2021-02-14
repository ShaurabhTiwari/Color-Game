//**************************************
//Helper function
//**************************************
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length)
    return colors[random];
}

const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const generateRandomColors = (num) => {
    let output = [];
    for(let i=0; i<num; i++) {
        output.push(generateRandomColor());
    }
    return output;
}

const changeColors = (color) => {
    squares.forEach ( (square) => {
        square.style.backgroundColor = color;
    })
}

const reset = () => {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    colorDisplay.textContent = pickedColor;
    for(let i=0; i<squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    title.style.backgroundColor = "steelblue";
    message.textContent = "";
}

colors = generateRandomColors(6);

//**************************************
//Init Variables
//**************************************

//State
let numSquares = 6;

// Select Elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton");
const modeButtons = document.querySelectorAll(".mode");

//**************************************
// Main Code
//**************************************

// Choose winning color
let pickedColor = pickColor();

//Update colorDisplay
colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", reset);

//Mode Buttons
modeButtons.forEach((button) => {
    button.addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Easy") {
            numSquares = 3;
        } else {
            numSquares = 6;
        }
        reset();
    });
});


for(let i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        //Get color of the clicked square
        const clickedColor = this.style.backgroundColor;
        //Compare that color to the picked color
        if(clickedColor === pickedColor) {
            message.textContent = "You Win!";
            changeColors(pickedColor);
            resetButton.textContent = "Play Again";
            title.style.backgroundColor = pickedColor;
        }
        else{
            this.style.backgroundColor = "black";
            message.textContent = "Try Again";
        }
    });
};

