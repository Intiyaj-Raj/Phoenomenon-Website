document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("video").forEach(video => {
        video.muted = true;
        video.playsInline = true;

        video.play().catch(err => {
            console.log(err);
        });
    });
});