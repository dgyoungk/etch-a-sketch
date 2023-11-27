// get reference to container for appending
const grid = document.querySelector('.grid-container');


// function that populates the container with squares, default layout is 16x16 so 256 squares
function createGrid(squares = 256) {
    let containerWidth = grid.clientWidth;
    let containerHeight = grid.clientHeight;

    let containerArea = containerWidth * containerHeight;

    console.log(Math.sqrt(containerArea / squares));

    // populating the grid with the number of squares specified
    for (let i = 0; i < squares; i++) {
        // div creation
        const divItem = document.createElement('div');
        divItem.style.width = `${Math.sqrt(containerArea / squares)}px`;
        divItem.style.height = `${Math.sqrt(containerArea / squares)}px`;
        divItem.classList.toggle('grid-square');

        grid.appendChild(divItem);
    }
}

window.addEventListener('load', createGrid());


// the 'drawing' functionality
const pads = document.querySelectorAll('.grid-square');
for (const pad of pads) {
    pad.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'black';
    });
};


/*
    TODO: 
    -fix the rendering issue when a new value is given for the number of squares
    -add buttons to clear the board
*/

// create container to put the button in
const btnContainer = document.createElement('div');
btnContainer.classList.toggle('btn-container');

// create button that lets user set custom number of squares on drawing pad
const squareNumBtn = document.createElement('button');
squareNumBtn.classList.toggle('custom-btn');
squareNumBtn.innerText = "Change grid size";

// event handler that prompts for number of squares, then creates a new grid with the value
squareNumBtn.addEventListener('click', (e) => {
    let newValue = parseInt(prompt('Enter the number of squares per side '));
    while (newValue > 100) {
        alert('A grid that big cannot be created without problems, choose a smaller grid size');
        newValue = parseInt(prompt('Enter the number of squares per side '));
    }
    createGrid(newValue ** 2);
    for (const pad of pads) {
        pad.style.backgroundColor = 'white';
    }
});

btnContainer.appendChild(squareNumBtn);

// insert btnContainer into the container div
const container = document.querySelector('.container');
container.insertBefore(btnContainer, grid);