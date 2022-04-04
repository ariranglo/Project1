var canvas;



function setup() {

    canvas = createCanvas(600, 400);



    canvas.parent('myContainer');

    canvas.position(10, 10);



    //listener

    canvas.mouseOver(hideImg);

    canvas.mouseOut(showImg);

    canvas.mouseMoved(incDiameter);

    canvas.mouseClicked(mouseClick);



    //createDiv

    text = createDiv('This is an <a href="#">HTML</a> string');

    text.parent('myContainer');

    text.position(100,70);

    text.class('lemon');



    //createImg

    img = createImg("http://th07.deviantart.net/fs70/PRE/i/2011/260/3/5/dash_hooray_by_rainbowcrab-d49xk0d.png");

    img.parent('myContainer');

    img.position(450, 50);

    img.size(200, 200);



    //createElement

    h1 = createElement('h1','this is some heading text');

    h1.parent('myContainer');



    //Searching

    myDiv0 = createDiv('this is div 0');

    myDiv0.class('selectTest');

    myDiv1 = createDiv('this is div 1');

    myDiv2 = createDiv('this is div 2');

    myDiv2.class('selectTest');



    //Setting style

    text1 = createP("This is an HTML string with style");

    text1.position(100,250);

    /*text1.style("font-family","monospace");

    text1.style("background-color", "#FF0000");

    text1.style("color", "#FFFFFF");

    text1.style("font-size", "18pt");

    text1.style("padding", "10px");*/

    text1.style("font-family:monospace; background-color:#FF0000; color:#FFFFFF; font-size:18pt; padding:10px;");

}



function draw() {

    fill(255)

    ellipse(width/2, height/2, 100, 100);

    fill(gray)

    ellipse(width/4, height/2, diameter, diameter);



    stroke(180,100,240);

    for(var i=0;i<width;i+=15){

        line(i,height/2,i,height);

    }

}

function hideImg() {

    img.hide();

}

function showImg() {

    img.show();

}

//global

function mouseMoved() {

    gray -= 1;

}

//canvas local

function incDiameter() {

    diameter += 1;

}

function mouseClick() {

    var donkeys = selectAll('.selectTest');

    // We can then iterate through the array and hide all the elements.

    for (var i = 0; i < donkeys.length; i++) {

        donkeys[i].hide();

    }

    text.remove();

}

