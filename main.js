Webcam.set({
    height: 300,
    width: 400,
    image_format:'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lj0-qL_XN/model.json',modelLoded);

function modelLoded()
{
    console.log('modelLoded');
}

function check(){
  img =  document.getElementById("capture_image");

  classifier.classify(img,got_result);
}

function got_result(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        var synth = window.speechSynthesis;

    var speakData = "This Is A"+ result[0].label;

    var utter_this = new SpeechSynthesisUtterance(speakData);

    synth.speak(utter_this);
        document.getElementById("resultobjectname").innerHTML = result[0].label;
        document.getElementById("resultobjectaccuracy").innerHTML = result[0].confidence.toFixed(2);
    }
}