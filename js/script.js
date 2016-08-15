var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var canvas = document.getElementById('canvas');
canvas.setAttribute('width', $(window).width());
canvas.setAttribute('height', $(window).height()-5);
var context = canvas.getContext('2d');
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}


$('#canvas').mousedown(function (e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});
$('#canvas').mousemove(function (e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});
$('canvas').mouseup(function () {
    paint = false;
});
$('canvas').mouseleave(function () {
    paint = false;
});
