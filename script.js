document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. BINTANG GALAXY RANDOM
       ========================================================= */
    const pinkStarsLayer = document.getElementById("pink-galaxy-stars");

    function createGalaxyStars() {
        if (!pinkStarsLayer) return;

        pinkStarsLayer.innerHTML = "";

        const count = window.innerWidth < 700 ? 100 : 185;

        const colors = [
            "pink",
            "cyan",
            "violet",
            "blue",
            "white"
        ];

        for (let i = 0; i < count; i++) {
            const star = document.createElement("span");

            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];

            const isBig = Math.random() < 0.035;

            star.className =
                "pink-galaxy-star " +
                randomColor +
                (isBig ? " big" : "");

            // Posisi benar-benar random
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            // Ukuran bintang
            const size = isBig
                ? 3 + Math.random() * 2
                : 1 + Math.random() * 2;

            star.style.width = size + "px";
            star.style.height = size + "px";

            // Kecepatan gerak tiap bintang berbeda
            star.style.animationDuration =
                7 + Math.random() * 13 + "s";

            // Supaya tidak mulai bersamaan
            star.style.animationDelay =
                -Math.random() * 15 + "s";

            pinkStarsLayer.appendChild(star);
        }
    }

    createGalaxyStars();

    window.addEventListener(
        "resize",
        createGalaxyStars,
        { passive: true }
    );


    /* =========================================================
       2. GALAXY SPACE STARS
       ========================================================= */
    const space = document.getElementById("space-scene");

    if (space) {

        const starCount =
            window.innerWidth < 700 ? 75 : 135;

        for (let i = 0; i < starCount; i++) {

            const star = document.createElement("span");

            let type = "";

            if (i % 17 === 0) {
                type = " pink";
            } else if (i % 13 === 0) {
                type = " violet";
            }

            star.className =
                "space-star" + type;

            const size =
                0.6 + Math.random() * 2.1;

            star.style.width = size + "px";
            star.style.height = size + "px";

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            star.style.animationDuration =
                1.6 + Math.random() * 4.5 + "s";

            star.style.animationDelay =
                -Math.random() * 5 + "s";

            space.appendChild(star);
        }
    }


    /* =========================================================
       3. CANVAS GALAXY BACKGROUND
       ========================================================= */
    const canvas = document.getElementById("cyber-bg");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const glow =
        document.getElementById("cursor-glow");

    const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;

    let time = 0;

    let mouseX =
        window.innerWidth * 0.5;

    let mouseY =
        window.innerHeight * 0.45;

    let smoothMouseX = mouseX;
    let smoothMouseY = mouseY;

    let tinyStars = [];


    /* =========================================================
       4. RESIZE
       ========================================================= */
    function resizeCanvas() {

        W = window.innerWidth;
        H = window.innerHeight;

        canvas.width =
            Math.floor(W * dpr);

        canvas.height =
            Math.floor(H * dpr);

        canvas.style.width =
            W + "px";

        canvas.style.height =
            H + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        const count =
            W < 700 ? 45 : 90;

        tinyStars =
            Array.from(
                { length: count },
                () => ({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    radius:
                        0.3 + Math.random() * 1.2,
                    phase:
                        Math.random() * Math.PI * 2,
                    speed:
                        0.008 + Math.random() * 0.025
                })
            );
    }

    window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
    );


    /* =========================================================
       5. MOUSE
       ========================================================= */
    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );


    /* =========================================================
       6. GALAXY BACKGROUND
       ========================================================= */
    function drawGalaxy() {

        ctx.clearRect(
            0,
            0,
            W,
            H
        );


        /* -----------------------------------------------------
           NEBULA
           ----------------------------------------------------- */

        for (let i = 0; i < 4; i++) {

            const nebulaX =
                W * (0.15 + i * 0.23) +
                Math.sin(time * 0.004 + i) * 90;

            const nebulaY =
                H * (0.22 + i * 0.18) +
                Math.cos(time * 0.003 + i) * 70;

            const radius =
                150 +
                Math.sin(time * 0.006 + i) * 30;

            const gradient =
                ctx.createRadialGradient(
                    nebulaX,
                    nebulaY,
                    0,
                    nebulaX,
                    nebulaY,
                    radius
                );

            let color;

            if (i % 3 === 0) {
                color = "57,217,255";
            } else if (i % 3 === 1) {
                color = "198,107,255";
            } else {
                color = "255,92,180";
            }

            gradient.addColorStop(
                0,
                `rgba(${color},.04)`
            );

            gradient.addColorStop(
                0.5,
                `rgba(${color},.014)`
            );

            gradient.addColorStop(
                1,
                `rgba(${color},0)`
            );

            ctx.fillStyle = gradient;

            ctx.beginPath();

            ctx.arc(
                nebulaX,
                nebulaY,
                radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }


        /* -----------------------------------------------------
           MOUSE LIGHT
           ----------------------------------------------------- */

        const mouseGradient =
            ctx.createRadialGradient(
                smoothMouseX,
                smoothMouseY,
                0,
                smoothMouseX,
                smoothMouseY,
                Math.max(W, H) * 0.8
            );

        mouseGradient.addColorStop(
            0,
            "rgba(57,217,255,.045)"
        );

        mouseGradient.addColorStop(
            0.35,
            "rgba(198,107,255,.018)"
        );

        mouseGradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle =
            mouseGradient;

        ctx.fillRect(
            0,
            0,
            W,
            H
        );


        /* -----------------------------------------------------
           TINY STARS
           ----------------------------------------------------- */

        tinyStars.forEach((star) => {

            star.phase += star.speed;

            const opacity =
                0.12 +
                (Math.sin(star.phase) + 1) * 0.18;

            const size =
                star.radius *
                (
                    0.8 +
                    Math.sin(star.phase) * 0.2
                );

            ctx.fillStyle =
                `rgba(190,230,255,${opacity})`;

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                size,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });


        /* -----------------------------------------------------
           VERY SOFT GALAXY SCAN
           ----------------------------------------------------- */

        const scanY =
            (time * 0.18) %
            (H + 240) -
            120;

        const scanGradient =
            ctx.createLinearGradient(
                0,
                scanY - 35,
                0,
                scanY + 35
            );

        scanGradient.addColorStop(
            0,
            "rgba(57,217,255,0)"
        );

        scanGradient.addColorStop(
            0.5,
            "rgba(57,217,255,.025)"
        );

        scanGradient.addColorStop(
            1,
            "rgba(57,217,255,0)"
        );

        ctx.fillStyle =
            scanGradient;

        ctx.fillRect(
            0,
            scanY - 35,
            W,
            70
        );


        /* -----------------------------------------------------
           UPDATE
           ----------------------------------------------------- */

        time += 1;

        requestAnimationFrame(
            drawGalaxy
        );
    }


    /* =========================================================
       7. CURSOR GLOW
       ========================================================= */
    function animateCursorGlow() {

        smoothMouseX +=
            (mouseX - smoothMouseX) * 0.07;

        smoothMouseY +=
            (mouseY - smoothMouseY) * 0.07;

        if (glow) {

            glow.style.left =
                smoothMouseX + "px";

            glow.style.top =
                smoothMouseY + "px";

        }

        requestAnimationFrame(
            animateCursorGlow
        );
    }


    /* =========================================================
       8. HERO PARALLAX
       ========================================================= */
    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    if (
        heroVisual &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) * 2;

                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) * 2;

                heroVisual.style.transform =
                    `translate3d(
                        ${x * 8}px,
                        ${y * 8}px,
                        0
                    )`;

            },
            { passive: true }
        );
    }


    /* =========================================================
       9. START ANIMATION
       ========================================================= */
    resizeCanvas();

    drawGalaxy();

    animateCursorGlow();

});