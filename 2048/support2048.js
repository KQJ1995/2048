function getTop( i,j) {
    return 20+i*120;
}

function getLeft(i,j) {
    return 20+j*120;
}

function getNumberBackgroundColor(number) {
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function getNumberColor(number) {
    if(number<=4) {
        return "#776e65";
    }
    return "white";
}

function noSpace( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}

function noBlockHorizontal(i,k,j,board) {
    for(var d=k+1;d<j;d++) {
        if(board[i][d] !=0)
            return false;
    }
    return true;
}

function noBlockVertical(j,k,i,board) {
    for(var d=k+1;d<i;d++) {
        if(board[d][j] !=0)
            return false;
    }
    return true;
}

function canMoveLeft(board) {
    for(var i=0;i<4;i++) {
        for(var j=1;j<4;j++) {
            if(board[i][j] !=0) {
                if(board[i][j-1] ==0 || board[i][j-1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}
function canMoveRight(board) {
    for(var i=0;i<4;i++) {
        for(var j=2;j>=0;j--) {
            if(board[i][j] !=0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for(var j=0;j<4;j++) {
        for(var i=1;1<4;i++) {
            if(board[i][j] !=0) {
                if (board[i-1][j] == 0 || board[i][j] == board[i-1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for(var j=0;j<4;j++) {
        for(var i=2;i>=0;i--) {
            if(board[i][j] !=0) {
                if (board[i+1][j] == 0 || board[i][j] == board[i+1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noMove(board) {
    if(canMoveLeft(board) ||
    canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board))
        return false;

    return true;
}