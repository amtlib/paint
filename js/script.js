var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var canvas = document.getElementById('canvas');
canvas.setAttribute('width', $(window).width() - 2); //initial canvas width
canvas.setAttribute('height', $(window).height() - 36); //initial canvas height
var context = canvas.getContext('2d');
var paint;
var currentColor = '#000'; //sample color - black
var currentSize = '5'; //sample size - 5px
function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(currentColor);
    clickSize.push(currentSize);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); //Clear canvas
    context.lineJoin = "round"; //Connections are smooth
    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        }
        else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.lineWidth = clickSize[i];
        context.strokeStyle = clickColor[i];
        context.stroke();
    }
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
$('#canvas').mouseup(function () {
    paint = false;
});
$('#canvas').mouseleave(function () {
    paint = false;
});
$('#color').change(function () {
    currentColor = $('#color').val();
});
$('#size').change(function () {
    currentSize = $('#size').val();
});
$(window).resize(function () {
    canvas.setAttribute('width', $(window).width() - 2);
    canvas.setAttribute('height', $(window).height() - 36);
    redraw();
});
$('#clear').click(function () {
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickColor = new Array();
    clickSize = new Array();
    redraw();
});
$('#undo').click(function () {
    var count = 0;
    for (var i = 0; clickDrag[clickDrag.length - 1 - i]; i++) {
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
        clickSize.pop();
    }
    clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
        clickSize.pop();
    redraw();
});
