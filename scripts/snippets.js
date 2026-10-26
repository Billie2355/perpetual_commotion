// אילוסטרציה מהירה של דפדוף הפוך: קלפים "עפים" בחזרה מהערימה הפתוחה לערימה הסגורה
function flipPlayMakersRecycleAnimation() {
    const closePileImg = document.getElementById("user_close_game_cards").querySelector("#card-back1").getElementsByTagName("img")[0];
    const openPile = document.getElementById("user_open_game_cards");
    const openCards = Array.from(openPile.children);
    const startRect = openPile.getBoundingClientRect();
    const endRect = closePileImg.getBoundingClientRect();
    const deltaX = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
    const deltaY = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);

    const flourishCount = Math.min(3, openCards.length) || 1;
    for (let i = 0; i < flourishCount; i++) {
        const sourceCard = openCards[openCards.length - 1 - i];
        const frontSrc = sourceCard ? sourceCard.src : closePileImg.src;

        const wrapper = document.createElement("div");
        wrapper.style.cssText = `position:fixed; left:${startRect.left}px; top:${startRect.top}px; width:${startRect.width}px; height:${startRect.height}px; z-index:${1000 + i}; perspective:1000px; pointer-events:none;`;

        const flipper = document.createElement("div");
        flipper.style.cssText = `position:relative; width:100%; height:100%; transform-style:preserve-3d;`;

        const front = document.createElement("img");
        front.src = frontSrc;
        front.style.cssText = `position:absolute; top:0; left:0; bottom:auto; width:100%; height:100%; backface-visibility:hidden; border-radius:3px; transform:none;`;

        const back = document.createElement("img");
        back.src = closePileImg.src;
        back.style.cssText = `position:absolute; top:0; left:0; bottom:auto; width:100%; height:100%; backface-visibility:hidden; border-radius:3px; transform:rotateY(180deg);`;

        flipper.appendChild(front);
        flipper.appendChild(back);
        wrapper.appendChild(flipper);
        document.body.appendChild(wrapper);

        gsap.timeline({
            delay: i * 0.03,
            onComplete: () => wrapper.remove()
        })
            .to(wrapper, { x: deltaX, y: deltaY, duration: 0.18, ease: "power1.in" }, 0)
            .to(flipper, { rotateY: 180, duration: 0.18, ease: "power1.in" }, 0);
    }
}