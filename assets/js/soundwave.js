// Sound wave JS

var playBtn = document.getElementById("pause-play");

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'gray',
    progressColor: 'green',
    barWidth: 3,
    responsive: true,
    height: 200,
    barRadius: 4,
    cursorColor: 'blue'
});

wavesurfer.load('../assets/media/Frozen_Let_It_Go.mp3');

playBtn.onclick = function(){
    wavesurfer.playPause();
};

