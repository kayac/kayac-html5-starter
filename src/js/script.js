import Sample from './lib/Sample';
import $ from 'jquery';

const sample = new Sample({
    name: 'world'
});

$('.wrapper').on('click', () => {
    console.log(`hello, ${sample.name}.`);
});

let localVideo = document.getElementById('local_video');
let localStream;

// start local localVideo
document.getElementById('start').onclick = function startVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function (stream) { // success
    localStream = stream;
    console.log(localVideo)
    localVideo.src = window.URL.createObjectURL(localStream);
  }).catch(function (error) { // error
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
  });
}
