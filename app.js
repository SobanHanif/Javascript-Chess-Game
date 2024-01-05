const ChessBoard = document.querySelector("#chessboard")
const PlayerUsername = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const length = 8
let playerGo = 'black'
PlayerUsername.textContent = 'black'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', i)

        const row = Math.floor((63 - i)/8) + 1
        if(row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        }
        else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }

        if(i <= 15) {
            square.firstChild.firstChild.classList.add('black')
        } 

        if(i >= 48) {
            square.firstChild.firstChild.classList.add('white')
        } 

        ChessBoard.append(square)
    })
}

createBoard()

const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})


let startPstid 
let draggedElement

function dragStart(e) {
    startPstid = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const oppGo = playerGo === 'white' ? 'black' : 'white'
    const takenOpp = e.target.firstChild?.classList.contains(oppGo)

    if(correctGo) {
        if(takenOpp && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkWin()
            changePlayer()
            return
        }
        if(taken && !takenOpp) {
            infoDisplay.textContent = "Invalid Move"
            setTimeout(() => infoDisplay.textContent = "", 2000)
            return
        }
        if(valid) {
            e.target.append(draggedElement)
            checkWin()
            changePlayer()
            return
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPstid)
    const piece = draggedElement.id

    switch(piece) {
        case 'pawn' :
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
            if(starterRow.includes(startId) && startId + length*2 === targetId 
            || startId + length === targetId
            || startId + length - 1 === targetId && document.querySelector(`[square-id = "${startId + length - 1}"]`).firstChild
            || startId + length + 1 === targetId && document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild) 
            {
                return true
            }
            break;
        case 'knight' :
            if(
                startId + length*2 + 1 === targetId ||
                startId + length*2 - 1 === targetId ||
                startId + length + 2 === targetId ||
                startId + length - 2 === targetId ||
                startId - length*2 + 1 === targetId ||
                startId - length*2 - 1 === targetId ||
                startId - length + 2 === targetId ||
                startId - length - 2 === targetId 
            ) {
                return true
            }
            break;
        case 'bishop' :
            if(
                startId + (length + 1) === targetId ||
                startId + 2*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild ||
                startId + 3*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild||
                startId + 4*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild||
                startId + 5*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length + 1)}"]`).firstChild||
                startId + 6*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length + 1)}"]`).firstChild||
                startId + 7*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6*(length + 1)}"]`).firstChild
                ||
                startId - (length + 1) === targetId ||
                startId - 2*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild ||
                startId - 3*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild||
                startId - 4*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild||
                startId - 5*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length + 1)}"]`).firstChild||
                startId - 6*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length + 1)}"]`).firstChild||
                startId - 7*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6*(length + 1)}"]`).firstChild
                ||
                startId - (length - 1) === targetId ||
                startId - 2*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild ||
                startId - 3*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild||
                startId - 4*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild||
                startId - 5*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length - 1)}"]`).firstChild||
                startId - 6*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length - 1)}"]`).firstChild||
                startId - 7*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6*(length - 1)}"]`).firstChild
                ||
                startId + (length - 1) === targetId ||
                startId + 2*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild ||
                startId + 3*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild||
                startId + 4*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild||
                startId + 5*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length - 1)}"]`).firstChild||
                startId + 6*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length - 1)}"]`).firstChild||
                startId + 7*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6*(length - 1)}"]`).firstChild
            ) {
                return true
            }
            break;
        case 'rook' :
            if(
                startId + length === targetId ||
                startId + 2*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild ||
                startId + 3*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild ||
                startId + 4*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild||
                startId + 5*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*length}"]`).firstChild ||
                startId + 6*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*length}"]`).firstChild ||
                startId + 7*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6*length}"]`).firstChild 
                ||
                startId - length === targetId ||
                startId - 2*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild ||
                startId - 3*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild ||
                startId - 4*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild||
                startId - 5*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*length}"]`).firstChild ||
                startId - 6*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*length}"]`).firstChild ||
                startId - 7*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6*length}"]`).firstChild 
                ||
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6}"]`).firstChild 
                ||
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6}"]`).firstChild 
            ) {
                return true
            }
            break;
        case 'queen' :
            if(
                startId + (length + 1) === targetId ||
                startId + 2*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild ||
                startId + 3*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild||
                startId + 4*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild||
                startId + 5*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length + 1)}"]`).firstChild||
                startId + 6*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length + 1)}"]`).firstChild||
                startId + 7*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId + length + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6*(length + 1)}"]`).firstChild
                ||
                startId - (length + 1) === targetId ||
                startId - 2*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild ||
                startId - 3*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild||
                startId - 4*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild||
                startId - 5*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length + 1)}"]`).firstChild||
                startId - 6*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length + 1)}"]`).firstChild||
                startId - 7*(length + 1) === targetId && !document.querySelector(`[square-id = "${startId - (length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length + 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6*(length + 1)}"]`).firstChild
                ||
                startId - (length - 1) === targetId ||
                startId - 2*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild ||
                startId - 3*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild||
                startId - 4*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild||
                startId - 5*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length - 1)}"]`).firstChild||
                startId - 6*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length - 1)}"]`).firstChild||
                startId - 7*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId - (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6*(length - 1)}"]`).firstChild
                ||
                startId + (length - 1) === targetId ||
                startId + 2*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild ||
                startId + 3*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild||
                startId + 4*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild||
                startId + 5*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length - 1)}"]`).firstChild||
                startId + 6*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length - 1)}"]`).firstChild||
                startId + 7*(length - 1) === targetId && !document.querySelector(`[square-id = "${startId + (length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*(length - 1)}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6*(length - 1)}"]`).firstChild
                ||
                startId + length === targetId ||
                startId + 2*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild ||
                startId + 3*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild ||
                startId + 4*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild||
                startId + 5*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*length}"]`).firstChild ||
                startId + 6*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*length}"]`).firstChild ||
                startId + 7*length === targetId && !document.querySelector(`[square-id = "${startId + length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6*length}"]`).firstChild 
                ||
                startId - length === targetId ||
                startId - 2*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild ||
                startId - 3*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild ||
                startId - 4*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild||
                startId - 5*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*length}"]`).firstChild ||
                startId - 6*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*length}"]`).firstChild ||
                startId - 7*length === targetId && !document.querySelector(`[square-id = "${startId - length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5*length}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6*length}"]`).firstChild 
                ||
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild||
                startId + 5 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + 6}"]`).firstChild 
                ||
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild||
                startId - 5 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId - 6}"]`).firstChild
            ) {
                return true
            }
            break;
        case 'king' :
            if(
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + length === targetId ||
                startId - length === targetId ||
                startId + length + 1 === targetId ||
                startId - length + 1 === targetId ||
                startId + length - 1 === targetId ||
                startId - length - 1 === targetId 
            ) {
                return true
            }
    } 
}

function checkWin() {
    const kings = Array.from(document.querySelectorAll('#king'))
    console.log(kings)
    if(!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML = "Black Player Wins"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }

    if(!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = "White Player Wins"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }
}

function changePlayer() {
    if(playerGo === "black") {
        reverseId()
        playerGo = "white"
        PlayerUsername.textContent = 'white'
    }
    else {
        revertId()
        playerGo = "black"
        PlayerUsername.textContent = 'black'
    }
}

function reverseId() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => 
    square.setAttribute('square-id', ((length * length - 1) - i)))
}

function revertId() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}