var playBtn = document.getElementById("pause-play");

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'gray',
    progressColor: 'green',
    barWidth: 4,
    responsive: true,
    height: 90,
    barRadius: 4
});

wavesurfer.load('../assets/media/Frozen_Let_It_Go.mp3');

playBtn.onclick = function(){
    wavesurfer.playPause();
};