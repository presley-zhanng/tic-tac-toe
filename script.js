//HTML elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const winMsgDiv = document.querySelector('.win-msg');
const popupDiv = document.querySelector('.gameEnd-popup');

//game constants
const xSym = '×';
const oSym = '○';

//game variables
let gameIsLive = true;
let xIsNext = true;

//Functions
const letterToSym = (letter) => (letter === 'x' ? xSym : oSym);

const handleWin = (letter) => {
	gameIsLive = false;
	popupDiv.classList.toggle('show');
	console.log(popupDiv.classList);
	if (letter === 'x') {
		winMsgDiv.innerHTML = `${letterToSym(letter)} has won!`;
	} else {
		winMsgDiv.innerHTML = `<span>${letterToSym(letter)} has won!</span>`;
	}
};

const checkGameStatus = () => {
	const topLeft = cellDivs[0].classList[1];
	const topMid = cellDivs[1].classList[1];
	const topRight = cellDivs[2].classList[1];
	const midLeft = cellDivs[3].classList[1];
	const midMid = cellDivs[4].classList[1];
	const midRight = cellDivs[5].classList[1];
	const botLeft = cellDivs[6].classList[1];
	const botMid = cellDivs[7].classList[1];
	const botRight = cellDivs[8].classList[1];
	// Win Condition Checker
	if (topLeft && topLeft === topMid && topLeft === topRight) {
		handleWin(topLeft);

		cellDivs[0].classList.add('won');
		cellDivs[1].classList.add('won');
		cellDivs[2].classList.add('won');
	} else if (midLeft && midLeft === midMid && midLeft === midRight) {
		handleWin(midLeft);

		cellDivs[3].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[5].classList.add('won');
	} else if (botLeft && botLeft === botMid && botLeft === botRight) {
		handleWin(botLeft);

		cellDivs[6].classList.add('won');
		cellDivs[7].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topLeft && topLeft === midLeft && topLeft === botLeft) {
		handleWin(topLeft);

		cellDivs[0].classList.add('won');
		cellDivs[3].classList.add('won');
		cellDivs[6].classList.add('won');
	} else if (topMid && topMid === midMid && topMid === botMid) {
		handleWin(topMid);

		cellDivs[1].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[7].classList.add('won');
	} else if (topRight && topRight === midRight && topRight === botRight) {
		handleWin(topRight);

		cellDivs[2].classList.add('won');
		cellDivs[5].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topLeft && topLeft === midMid && topLeft === botRight) {
		handleWin(topLeft);

		cellDivs[0].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topRight && topRight === midMid && topRight === botLeft) {
		handleWin(topRight);

		cellDivs[2].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[6].classList.add('won');
	} else if (
		topLeft &&
		topMid &&
		topRight &&
		midLeft &&
		midMid &&
		midRight &&
		botLeft &&
		botMid &&
		botRight
	) {
		gameIsLive = false;
		popupDiv.classList.toggle('show');
		winMsgDiv.innerHTML = `Game is Tied!`;
	} else {
		xIsNext = !xIsNext;
		if (xIsNext) {
			statusDiv.innerHTML = `${xSym} is next`;
		} else {
			statusDiv.innerHTML = `<span>${oSym} is next</span>`;
		}
	}
};

//Event Handlers
const handleReset = () => {
	xIsNext = true;
	statusDiv.innerHTML = `${xSym} is next`;
	popupDiv.classList.toggle('show');
	for (const cellDiv of cellDivs) {
		cellDiv.classList.remove('x');
		cellDiv.classList.remove('o');
		cellDiv.classList.remove('won');
	}
	gameIsLive = true;
};

const handleCellClick = (e) => {
	const classList = e.target.classList;

	console.log(popupDiv.classList);
	if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
		return;
	}

	if (xIsNext) {
		e.target.classList.add('x');
		checkGameStatus();
	} else {
		e.target.classList.add('o');
		checkGameStatus();
	}
};

//Event Listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
	cellDiv.addEventListener('click', handleCellClick);
}
