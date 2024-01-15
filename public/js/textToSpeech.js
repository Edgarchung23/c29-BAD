function playAudio() {
    var audio = document.getElementById('audioPlayer');
    audio.src = '/textToSpeech';
    audio.play();
}

fetch('/textToSpeech')
    .then(function (response) {
        return response.blob();
    })
    .then(function (blob) {
        var audio = document.getElementById('audioPlayer');
        audio.src = URL.createObjectURL(blob);
    });