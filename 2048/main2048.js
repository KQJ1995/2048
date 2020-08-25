var board = new Array();
var score = 0;
var hasConflicted = new Array();
$(document).ready(function() {
    newGame();
})

function newGame() {
    init();

    //随机两个各自生成数
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getTop(i,j));
            gridCell.css("left",getLeft(i,j));
        }
    }

    for( var i=0;i<4;i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0) {
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getTop(i,j)+50);
                theNumberCell.css("left",getLeft(i,j)+50);
            }
            else {
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");
                theNumberCell.css("top",getTop(i,j));
                theNumberCell.css("left",getLeft(i,j));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.css("backgroundColor",getNumberBackgroundColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    if(noSpace(board)) {
        return false;
    }


    //在一个随机位置显示随机数字
    var randX = parseInt(Math.floor(Math.random()*4));
    var randY = parseInt(Math.floor(Math.random()*4));

    var times = 0;

    while(times++ < 50) {
        if(board[randX][randY]  == 0) {
            break;
        }
         randX = parseInt(Math.floor(Math.random()*4));
         randY = parseInt(Math.floor(Math.random()*4));
    }
    if(times == 50) {
        for(var i=0;i<4;i++) {
            for(var j=0;j<4;j++) {
                if(board[i][j] == 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }
    //随机生成一个数字
    var randNum = Math.random()<0.5? 2:4;
    board[randX][randY] = randNum;
    showNumberWithAnimation(randX,randY,randNum);
    return true;
}

$(document).keydown(function(event) {
    switch(event.keyCode) {
        case 37:
            if(moveLeft()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 38:
            if(moveUp()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 39:
            if(moveRight()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 40:
            if(moveDown()) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        default:
            break;
    }
});

function moveLeft() {
    if(!(canMoveLeft(board))) {
        return false;
    }

    for(var i=0;i<4;i++) {
        for(var j=1;j<4;j++) {
            if(board[i][j] !=0) {
                for(var k=0;k<j;k++) {
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][j] == board[i][k] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}



function moveRight() {
    if(!(canMoveRight(board))) {
        return false;
    }

    for(var i=0;i<4;i++) {
        for(var j=2;j>=0;j--) {
            if(board[i][j] !=0) {
                for(var k=3;k>j;k--) {
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][j] == board[i][k] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp() {
    if(!(canMoveUp(board))) {
        return false;
    }

    for(var j=0;j<4;j++) {
        for(var i=1;i<4;i++) {
            if(board[i][j] !=0) {
                for(var k=0;k<i;k++) {
                    if(board[k][j]==0 && noBlockVertical(j,k,i,board)) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if(!(canMoveDown(board))) {
        return false;
    }

    for(var j=0;j<4;j++) {
        for(var i=2;i>=0;i--) {
            if(board[i][j] !=0) {
                for(var k=3;k>i;k--) {
                    if(board[k][j]==0 && noBlockVertical(j,i,k,board)) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][j] == board[k][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function isOver() {
    if(noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert('Game Over!');
}