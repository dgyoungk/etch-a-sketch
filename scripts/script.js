// get reference to drawing area for appending
const grid = document.querySelector('.grid-container');


// function that populates the container with squares, default layout is 16x16 so 256 squares
function createGrid(squares = 16) {
    const grid = document.querySelector('.grid-container');
    
    const currentGrid = document.querySelectorAll('.grid-square');
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

    attachDrawingEvent();
}

window.addEventListener('load', createGrid());


function getRandomNum() {
    return Math.floor(Math.random() * 255) + 1;
}


// the 'drawing' functionality
function attachDrawingEvent() {
    const pads = document.querySelectorAll('.grid-square');
    for (const pad of pads) {
        pad.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;
        });
    };
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
    const board = document.querySelectorAll('.grid-square');
    for (const piece of board) {
        piece.style.backgroundColor = "white";
    };
});

btnContainer.appendChild(squareNumBtn);
btnContainer.appendChild(clearBtn);

// insert btnContainer into the container div
const container = document.querySelector('.container');
container.insertBefore(btnContainer, grid);