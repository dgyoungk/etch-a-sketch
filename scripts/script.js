// get reference to drawing area for appending
const grid = document.querySelector('.grid-container');

// function that returns a reference to the grid
function getGrid() {
    return document.querySelectorAll('.grid-square');
}

// flag for color changes
let changed = false;

// function that populates the container with squares, default layout is 16x16 so 256 squares
function createGrid(squares = 16) {
    
    const currentGrid = getGrid();
    for (const gridItem of currentGrid) {
        grid.removeChild(gridItem);
        grid.classList.toggle('.grid-square');
    };
    
    // dimension calculation
    let containerWidth = grid.clientWidth;
    let containerHeight = grid.clientHeight;

    let containerArea = containerWidth * containerHeight;

    let gridSize = Math.pow(squares, 2);

    // debugging
    console.log(gridSize);

    // populating the grid with the number of squares specified
    for (let i = 0; i < gridSize; i++) {
        // div creation
        const divItem = document.createElement('div');
        let divLength = Math.sqrt(containerArea / gridSize);
        divLength = divLength + "px";
        divItem.style.width = divLength;
        divItem.style.height = divLength;
        divItem.classList.toggle('grid-square');

        grid.appendChild(divItem);
    }

    if (changed) {
        changeSquareColor();
    } else {
        attachDrawingEvent();   
    }
}

window.addEventListener('load', createGrid());


function getRandomNum() {
    return Math.floor(Math.random() * 255) + 1;
}


// the 'drawing' functionality
function attachDrawingEvent() {
    const pads = getGrid();
    for (const pad of pads) {
        pad.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'black';
        });
    };
}

// function that changes the color from black to random
function changeSquareColor() {
    const gridItems = getGrid();
    for (const item of gridItems) {
        item.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
        })
    }
}

// create container to put the button in
const btnContainer = document.createElement('div');
btnContainer.classList.toggle('btn-container');

// create button that lets user set custom number of squares on drawing pad
const squareNumBtn = document.createElement('button');
squareNumBtn.classList.toggle('custom-btn');
squareNumBtn.innerText = "Set squares per side";

// create button that lets user clear the drawing pad
const clearBtn = document.createElement('button');
clearBtn.classList.toggle('clear-btn');
clearBtn.innerText = "Clear";

// create button that lets user choose between random color and black color
const colorBtn = document.createElement('button');
colorBtn.classList.toggle('color-btn');
colorBtn.innerText = 'Rainbow';

// event handler that prompts for number of squares, then creates a new grid with the value
squareNumBtn.addEventListener('click', (e) => {
    let newValue = parseInt(prompt('Enter the number of squares per side '));
    while (newValue > 100) {
        alert('A grid that big cannot be created without problems, choose a smaller grid size');
        newValue = parseInt(prompt('Enter the number of squares per side '));
    }
    console.log(newValue);
    createGrid(newValue);
});

// event handler that clears the drawing pad
clearBtn.addEventListener('click', (e) => {
    const board = getGrid();
    for (const piece of board) {
        piece.style.backgroundColor = "white";
    };
});

// event handler that changes the color 
colorBtn.addEventListener('click', (e) => {
    if (e.target.innerText === "Rainbow") {
        changeSquareColor();
        changed = true;
        e.target.innerText = "Black";
    } else if (e.target.innerText === "Black") {
        attachDrawingEvent();
        changed = false;
        e.target.innerText = "Rainbow";
    }
});

btnContainer.appendChild(squareNumBtn);
btnContainer.appendChild(clearBtn);
btnContainer.appendChild(colorBtn);


// insert btnContainer into the container div
const container = document.querySelector('.container');
container.insertBefore(btnContainer, grid);