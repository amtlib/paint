$(document).ready(function () {
    var clickX = [];
    var clickY = [];
    var clickDrag = [];
    var clickColor = [];
    var clickSize = [];
    var undoArray = [];
    var undoCounter = 0;
    var canvas = $('#canvas');
    canvas.attr('width', $(window).width() - 2); //initial canvas width
    canvas.attr('height', $(window).height() - 36); //initial canvas height
    var context = canvas[0].getContext('2d');
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

    function redraw()  {
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

    canvas.mousedown(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        paint = true;
        undoCounter++;
        addClick(mouseX, mouseY);
        redraw();
    });
    canvas.mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            undoCounter++;
            redraw();
        }
    });
    canvas.mouseup(function () {
        paint = false;
        undoArray.push(undoCounter);
        undoCounter = 0;
    });
    canvas.mouseleave(function () {
        if(paint){
            undoCounter--;
        }
        paint = false;
        undoArray.push(undoCounter);

    });
    $('#color').change(function () {
        currentColor = $('#color').val();
    });
    $('#size').change(function () {
        currentSize = $('#size').val();
    });
    $(window).resize(function () {
        canvas.attr('width', $(window).width() - 2);
        canvas.attr('height', $(window).height() - 36);
        redraw();
    });
    $('#clear').click(function () {
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
        clickSize = [];
        redraw();
    });
    $('#undo').click(function () {
        var moves_to_undo = undoArray.pop();
        while (moves_to_undo !== 0) {
            clickX.pop();
            clickY.pop();
            clickDrag.pop();
            clickColor.pop();
            clickSize.pop();
            moves_to_undo--;
        }
        redraw();
    });

});
