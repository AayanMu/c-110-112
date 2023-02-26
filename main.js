Webcam.set({
    width:300 , height:300, image_format:'png', png_quality: 90
});
camera= document.getElementById('camera');
Webcam.attach('#camera');


function take_snapshot(){
    Webcam.snap(function (data_uri){
    document.getElementById('result').innerHTML="<img id='pic' src="+data_uri+">"
    });
}

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fBDBy9UDH/model.json", modelloaded)

function speak(){
    var synth= window.speechSynthesis;
    var speakdata= "The first prediction is "+ prediction1 + "The second prediction is "+ prediction2;
    var Utterthis=new SpeechSynthesisUtterance(speakdata);
    synth.speak(Utterthis);

}

function get_emotion(){
    img= document.getElementById("pic");
    classifier.classify(img, gotResults);
}


function gotResults(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById('emoji_name1').innerHTML= results[0].label;
    document.getElementById('emoji_name2').innerHTML= results[1].label;
    prediction1= results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label== "Happy"){
        document.getElementById("emoji").innerHTML="&#128522";
    }

    if(results[0].label== "Sad"){
        document.getElementById("emoji").innerHTML="&#128532";
    }

    if(results[0].label== "Angry"){
        document.getElementById("emoji").innerHTML="&#128545";
    }
    if(results[1].label== "Happy"){
        document.getElementById("emoji2").innerHTML="&#128522";
    }

    if(results[1].label== "Sad"){
        document.getElementById("emoji2").innerHTML="&#128532";
    }

    if(results[1].label== "Angry"){
        document.getElementById("emoji2").innerHTML="&#128545";
    }
}
}

function modelloaded(){
    console.log("model has been loaded successfully")
}