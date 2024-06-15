const container = document.querySelector('.container');
const mainVideo = container.querySelector('video');
const progressBar = container.querySelector('.progress-bar');
const playPauseBtn = container.querySelector('.play-pause i');
const skipForward = container.querySelector(".skip-forward i");
const volumeSlider = container.querySelector(".left input");
const volumeBtn = container.querySelector('.volume i');
const skipBackward = container.querySelector(".skip-backward i");
const speedBtn = container.querySelector(".playback-speed span");
const speedOnptions = container.querySelector('.speed-options')

mainVideo.addEventListener('timeupdate', e => {
    let { currentTime, duration } = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
});

volumeBtn.addEventListener('click', () => {
    if (!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace('fa-volume-xmark', "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
    }
});

volumeSlider.addEventListener('input', e => {
    mainVideo.volume = e.target.value;
    if (e.target.value == 0) {
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
    } else {
        volumeBtn.classList.replace('fa-volume-xmark', "fa-volume-high");
    }
    volumeSlider.value = mainVideo.volume
});

speedBtn.addEventListener('click', () => {
    speedOnptions.classList.toggle('show');
})

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

mainVideo.addEventListener('play', () => {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener('pause', () => {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
});
