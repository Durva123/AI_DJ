function setup() {
    canvas = createCanvas(350, 350);
    canvas.position(650, 300)
    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
    PoseNet = ml5.poseNet(video, modelLoaded);
    PoseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Initialized");
}

function gotPoses(results) {
    console.log(results);
}

function draw() {
    image(video, 0, 0, 350, 300);
    fill("red");
    stroke("beige");
    if (score_right_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        number_right_wrist_y = number(right_wrist_y);
        remove_decimal = floor(number_right_wrist_y);
        volume = remove_decimal / 300;
        sound.setVolume(volume);
        document.getElementById("vol").innerHTML = "Volume: " + volume;
    }
    circle(left_wrist_x, left_wrist_y, 20);
    if(score_left_wrist>0.2){

    if(left_wrist_y>0&& left_wrist_y<=75){
        document.getElementById("speed").innerHTML="Speed: 0.5x";
        song.rate(0.5);

    }
    else if(left_wrist_y>75&& left_wrist_y<=150){
        document.getElementById("speed").innerHTML="Speed: 1x";
        song.rate(1);

    }
    else if(left_wrist_y>150&& left_wrist_y<=225){
        document.getElementById("speed").innerHTML="Speed: 1.5x";
        song.rate(1.5);

    }
    else if(left_wrist_y>225&& left_wrist_y<=300){
        document.getElementById("speed").innerHTML="Speed: 2x";
        song.rate(2);

    }
    else if(left_wrist_y>300&& left_wrist_y<=350){
        document.getElementById("speed").innerHTML="Speed: 2.5x";
        song.rate(2.5);

    }
    

}}

var song = "";
function preload() {
    song = loadSound("https://durva123.github.io/Ai-DJ-Music/music.mp3?raw=true");

}

function playmusic() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_x = 0;
left_wrist_y = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function gotPoses(results) {
    console.log(results);
    if (results.length > 0) {
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
    }
}