// get reference to container for appending
const container = document.querySelector('.grid-container');


// function that populates the container with squares, default layout is 16x16 so 256 squares
function createGrid(squares = 256) {
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    let containerArea = containerWidth * containerHeight;

    console.log(containerHeight);
    console.log(containerWidth);

    // populating the grid with the number of squares specified
    for (let i = 0; i < squares; i++) {
        // div creation
        const divItem = document.createElement('div');
        divItem.style.width = `${Math.sqrt(containerArea / squares)}px`;
        divItem.style.height = `${Math.sqrt(containerArea / squares)}px`;
        divItem.classList.toggle('grid-square');

        container.appendChild(divItem);
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