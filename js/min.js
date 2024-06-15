"use strict";

// Variables
const container = document.querySelector('.container');
const mainVideo = container.querySelector('video');
const progressBar = container.querySelector('.progress-bar');
const playPauseBtn = container.querySelector('.play-pause i');
const skipForward = container.querySelector(".skip-forward i");
const volumeSlider = container.querySelector(".left input");
const volumeBtn = container.querySelector('.volume i');
const skipBackward = container.querySelector(".skip-backward i");
const speedBtn = container.querySelector(".playback-speed span");
const speedOptions = container.querySelector('.speed-options');
const picInPicBtn = container.querySelector('.pic-in-pic span');
const currentVidTime = container.querySelector('.current-time');
const videoDuration = container.querySelector('.video-duration');
const fullscreenBtn = container.querySelector('.fullscreen i');
const videoTimeLine = container.querySelector('.video-timeline');
let timer;

// Hide controls after 3 seconds
const hideControls = () => {
    if(mainVideo.paused) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
        container.classList.remove('show-controls');
    }, 3000);
};

hideControls();

// Show controls on mouse movement
container.addEventListener('mousemove', () => {
    container.classList.add('show-controls');
    hideControls();
});

const formatTime = time => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

mainVideo.addEventListener('timeupdate', e => {
    let { currentTime, duration } = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerHTML = formatTime(currentTime);
});

mainVideo.addEventListener('loadeddata', () => {
    videoDuration.innerHTML = formatTime(mainVideo.duration);
});

videoTimeLine.addEventListener('click', e => {
    let timelineWidth = videoTimeLine.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeLine.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerHTML = formatTime(mainVideo.currentTime);
};

videoTimeLine.addEventListener('mousedown', () => {
    videoTimeLine.addEventListener('mousemove', draggableProgressBar);
});

document.addEventListener('mouseup', () => {
    videoTimeLine.removeEventListener('mousemove', draggableProgressBar);
});

volumeBtn.addEventListener('click', () => {
    if (mainVideo.volume === 0) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace('fa-volume-xmark', "fa-volume-high");
    } else {
        mainVideo.volume = 0;
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener('input', e => {
    mainVideo.volume = e.target.value;
    if (e.target.value == 0) {
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
    } else {
        volumeBtn.classList.replace('fa-volume-xmark', "fa-volume-high");
    }
});

picInPicBtn.addEventListener('click', async () => {
    if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
    } else {
        await mainVideo.requestPictureInPicture();
    }
});

fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        container.requestFullscreen();
    }
    fullscreenBtn.classList.toggle('fa-compress');
    fullscreenBtn.classList.toggle('fa-expand');
});

speedBtn.addEventListener('click', () => {
    speedOptions.classList.toggle('show');
});

speedOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector('.active').classList.remove('active');
        option.classList.add('active');
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.playback-speed')) {
        speedOptions.classList.remove('show');
    }
});

skipBackward.addEventListener('click', () => {
    mainVideo.currentTime -= 10;
});

skipForward.addEventListener('click', () => {
    mainVideo.currentTime += 10;
});

playPauseBtn.addEventListener('click', () => {
    if (mainVideo.paused) {
        mainVideo.play();
    } else {
        mainVideo.pause();
    }
});

videoTimeLine.addEventListener('mousemove', e => {
    const progressTime = videoTimeLine.querySelector('span');
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeLine.clientWidth;
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);
});

mainVideo.addEventListener('play', () => {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener('pause', () => {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
});
