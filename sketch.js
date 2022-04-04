let webcam;
let detector;

let detectedObjects = [];

let img_ratio;

let count = 0;
let state = 0; // 0: main. 1: recording 2:Ended 3:paused


let startButton;
let stopButton;
let pauseButton;

let saveButton;

let startTime=0;

let writerState=0; // 0: do not write. 1: write
let myWriter;

let recordingTime = '00:00:00';
let recordingStartTime;
let backImg;
let stopImg;
let pauseImg;


function preload() {  
  detector = ml5.objectDetector('cocossd');
  backImg = loadImage('back.png');
  stopImg = loadImage('stop.png');
  pauseImg = loadImage('pause.png');
 
}

function setup() {
  createCanvas(375, 812);
  
  //webcam = createCapture(VIDEO);
  webcam = createVideo('test.mp4', playVideo); //비디오 파일을 분석하고자 할 때.
  //webcam.size(375, 600);
  webcam.hide();
  detector.detect(webcam, gotDetections);
  
}


function draw(){
  background(0);
  image(webcam,0,75,375,600);
  
  drawObjectBox();
  drawButton(state);


}

function drawButton(state){
  
  let yy = year();
  let mm = month();
  let dd = day();
  let ho = hour();
  let mi = minute();
  let se = second();
  
  let realTime = ''+yy+'/'+nf(mm,2,0)+'/'+nf(dd,2,0)+'/'+nf(ho,2,0)+':'+nf(mi,2,0)+':'+nf(se,2,0);
  let trynumber = count;
  
  if(state == 0){
    startButton = createImg('main.png');
    startButton.position(157.5, 725, 50, 50);
    startButton.mousePressed(startLog);
  
    //image(main_button,157.5, 725, 50, 50);
    
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text(recordingTime, 182.5, 64);
    textSize(15);
    textAlign(RIGHT);
    text(realTime, 370, 695);
    textAlign(LEFT);
    text('Try Number: '+trynumber,5, 695)
  }else if(state == 1){
    
    startButton = createImg('recording.png');
    startButton.position(157.5, 725, 50, 50);
    startButton.mousePressed(startLog);
    
    
    stopButton = createImg('stop.png');
    stopButton.position(237.5, 725, 50, 50);
    stopButton.mousePressed(saveLog);
    
    pauseButton = createImg('pause.png');
    pauseButton.position(77.5, 725, 50, 50);
    
    
    recordingTimeSec = (millis() - startTime)/1000;
    
    recordingTimemin = int(recordingTimeSec / 60);
    recordingTimehour = int(recordingTimemin / 60);
    recordingTimeSec = int(recordingTimeSec % 60);
    recordingTimemin = int(recordingTimemin % 60);
    recordingTime = ''+nf(recordingTimehour,2,0)+':'+nf(recordingTimemin,2,0)+':'+nf(recordingTimeSec,2,0);
    
    image(backImg,135.5, 45, 95, 28);
    
    
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text(recordingTime, 182.5, 64);
    textSize(15);
    textAlign(RIGHT);
    text(realTime, 370, 695);
    textAlign(LEFT);
    text('Try Number: '+trynumber,5, 695)
    
    
  }else if(state == 2){
    
    stopButton.hide();
    pauseButton.hide();
    
    startButton = createImg('main.png');
    startButton.position(157.5, 725, 50, 50);
    startButton.mousePressed(startLog);
  
    //image(main_button,157.5, 725, 50, 50);
    
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text(recordingTime, 182.5, 64);
    textSize(15);
    textAlign(RIGHT);
    text(realTime, 370, 695);
    textAlign(LEFT);
    text('Try Number: '+trynumber,5, 695)
    
   
  }else if(state == 3){
    

   
  }
}


function drawObjectBox(){
  
  
  let xyPositions = '';

  count = 0;
  
  for (let i = 0; i < detectedObjects.length; i++) {
    let object = detectedObjects[i];
    
    if(object.label == 'person'){
      count = count + 1;
      
      stroke(0, 255, 0);
      strokeWeight(3);
      noFill();
      rect(object.x/webcam.width*375,     object.y/webcam.height*600+75, object.width/webcam.width*375, object.height/webcam.height*600)+75;

      
      let centerX = object.x + (object.width/2);
      let centerY = object.y + (object.height/2);
      strokeWeight(12);
      stroke(0,255,0);
      point(centerX/webcam.width*375, centerY/webcam.height*600+75);
      
      xyPositions = xyPositions + ',' + count + ',' + centerX + ',' + centerY +',';
    }
  }
}


function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  
  detectedObjects = results;
  detector.detect(webcam, gotDetections);
}

function playVideo(){
  webcam.loop();
}

function startLog(){
  
  let mm = month();
  let dd = day();
  let ho = hour();
  let mi = minute();
  let se = second();
  
  let fileName = 'data_'+ mm + dd +'_'+ ho + mi + se+'.txt';
  

  myWriter = createWriter(fileName);
  
  state = 1;
  
  writerState = 1; //이제부터 로그를 시작해라
  startTime = millis(); //Start 버튼을 누른 시간을 기록
}

function saveLog(){
  myWriter.close();
  myWriter.clear();
  state = 2;
  writerState = 0; //이제 로그를 멈춰라
  recordingTime = '00:00:00';
}
