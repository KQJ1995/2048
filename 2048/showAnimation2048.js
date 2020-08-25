function showNumberWithAnimation(i,j,randNum) {
    var animaNum = $('#number-cell-'+i+"-"+j);
    animaNum.css("background-color",getNumberBackgroundColor(randNum));
    animaNum.css("color",getNumberColor(randNum));
    animaNum.text(randNum);

    animaNum.animate({
        width:"100px",
        height:"100px",
        top:getTop(i,j),
        left:getLeft(i,j)
    },50);
}

function showMoveAnimation(from_x,from_y,to_x,to_y) {
    var numberCell = $("#number-cell-" + from_x + "-" + from_y);
    numberCell.animate( {
        top:getTop(to_x,to_y),
        left:getLeft(to_x,to_y)
    },200);

}

function updateScore(score) {
    $('#score').text(score);
}