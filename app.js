let targetVisible = false;
let started = false;
let currentStage = "poster";
let posterTimer;
let greetingTimer;
let quoteTimer;
let projectStarted = false;

window.onload = function () {

    console.log("APP STARTED");

    const target = document.querySelector("#target");

    const poster = document.getElementById("poster");
    const greeting = document.getElementById("greeting");
    const gift = document.getElementById("gift");

    const videoContainer = document.getElementById("videoContainer");
    const birthdayVideo = document.getElementById("birthdayVideo");

    const specialVideo = document.getElementById("specialVideo");
    const specialVideoContainer = document.getElementById("specialVideoContainer");
    const quote = document.getElementById("quote");
    const heart = document.getElementById("heart");
    const replay = document.getElementById("replay");
    const heartMusic = document.getElementById("heartMusic");
    const bgMusic = document.getElementById("bgMusic");
    const loveMusic = document.getElementById("loveMusic");
    const skipSpecialVideo = document.getElementById("skipSpecialVideo");
    let lostTimer = null;

    target.addEventListener("targetFound", () => {

        targetVisible = true;
        if (!projectStarted) {

            projectStarted = true;

            startPoster();

            return;
        }

        switch (currentStage) {

            case "poster":

                if (bgMusic.paused) {

                    bgMusic.play();

                }

                break;

            case "birthdayVideo":

                birthdayVideo.play();

                break;

            case "specialVideo":

                specialVideo.play();

                break;

            case "quote":

                loveMusic.play();

                break;

            case "heart":

                heartMusic.play();

                break;

        }

    });

    if (gift.style.display == "none" &&
        birthdayVideo.paused &&
        videoContainer.style.display == "block") {

        birthdayVideo.play();

    }

    target.addEventListener("targetLost", () => {

        targetVisible = false;

        bgMusic.pause();

        birthdayVideo.pause();

        specialVideo.pause();

        loveMusic.pause();

        heartMusic.pause();

    });
    function startPoster() {

        if (!targetVisible) return;
        if (bgMusic.paused) {

            bgMusic.play().catch(() => { });

        }
        poster.style.display = "flex";

        document.getElementById("posterImg").src =
            "assets/birthdaypic.jpg";

        posterTimer = setTimeout(() => {

            if (!targetVisible) return;

            document.getElementById("posterImg").src =
                "assets/birthdaypic1.jpg";
            posterImg.style.opacity = "0";

            setTimeout(() => {

                posterImg.src = "assets/birthdaypic1.jpg";

                posterImg.style.opacity = "1";

            }, 500);

            posterTimer = setTimeout(() => {

                if (!targetVisible) return;

                poster.style.display = "none";
                currentStage = "greeting";

                startGreeting();

            }, 5000);

        }, 5000);

    }


    function startGreeting() {

        if (!targetVisible) return;
        console.log("GREETING");

        greeting.style.display = "block";

        greetingTimer = setTimeout(() => {

            if (!targetVisible) return;

            greeting.style.display = "none";
            currentStage = "gift";

            gift.style.display = "block";

        }, 5000);

    }
    gift.onclick = function () {

        if (!targetVisible) return;
        currentStage = "birthdayVideo";
        gift.style.display = "none";

        videoContainer.style.display = "block";
        bgMusic.pause();
        bgMusic.currentTime = 0;
        birthdayVideo.play();

    };
    birthdayVideo.onended = function () {
        currentStage = "specialVideo";
        if (!targetVisible) return;

        videoContainer.style.display = "none";

        specialVideoContainer.style.display = "flex";

        specialVideo.play();
        skipSpecialVideo.style.display = "block";

    }

    function showQuote() {
        skipSpecialVideo.style.display = "none";

        specialVideoContainer.style.display = "none";

        currentStage = "quote";

        loveMusic.play().catch(() => { });

        quote.style.display = "block";

        quoteTimer = setTimeout(() => {

            quote.style.display = "none";

            currentStage = "heart";

            heart.style.display = "block";

        }, 12000);

    }
    specialVideo.onended = function () {

        showQuote();

    };
    skipSpecialVideo.onclick = function () {

        specialVideo.pause();

        specialVideo.currentTime = 0;

        showQuote();

    };

    heart.onclick = function () {

        if (!targetVisible) return;
        // Stop romantic music
        currentStage = "heart";
        let fade = setInterval(() => {

            if (loveMusic.volume > 0.05) {

                loveMusic.volume -= 0.05;

            } else {

                clearInterval(fade);

                loveMusic.pause();

                loveMusic.currentTime = 0;

                loveMusic.volume = 1;

            }

        }, 100);
        heartMusic.play().catch(() => { });

        heart.innerHTML = `
    <div class="love-heart">❤️</div>

    <div class="love-title">
        I Like You
    </div>

    <div class="love-subtitle">
        Forever
    </div>

    <div class="love-message">
        ✨ Loving you is the best decision
my heart has ever made,<br>
        You are the reason my ordinary days
feel like the most beautiful. ✨
    </div>

    <div class="love-heart">❤️</div>
    `;

        replay.style.display = "block";

    };
}

replay.onclick = function () {

    bgMusic.pause();
    bgMusic.currentTime = 0;
    loveMusic.pause();
    loveMusic.currentTime = 0;
    heartMusic.pause();
    heartMusic.currentTime = 0;
    specialVideo.pause();
    specialVideo.currentTime = 0;
    projectStarted = false;
    started = false;
    bgMusic.currentTime = 0;

    location.reload();

};

