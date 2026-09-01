numOfOpponents = 3
playersNames = []
allCards = []
piles = []
playMakers = []
feeders = []
frontFive = []
frontFiveMissingIndexes = []
cardsIndex = []
roundScore = []
score = []
const colors = ['', 'blue', 'red', 'green', 'yellow'];

function randCards(numOfOpponents) {
    for (let i = 1; i <= numOfOpponents + 1; i++) {
        initializeCards(i);

        const cardColors = Array.from({ length: 4 }, (_, i) => i + 1);
        const numbers = Array.from({ length: 13 }, (_, i) => i + 1);

        const items = cardColors.flatMap(color =>
            numbers.map(number => ({ color, number }))
        );

        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        const cards = items.map(item =>
            build_card_element("img_front", "", item.number, colors[item.color], false)
        );

        allCards[i] = cards;
        feeders[i] = cards.slice(5, 18);
        playMakers[i] = cards.slice(18, 52);
        frontFive[i] = cards.slice(0, 5);

        // console.log(`Opponent ${i}:`);
        // console.log('All Cards:', allCards[i]);
        // console.log('Cards 13:', feeders[i]);
        // console.log('Cards 3:', playMakers[i]);
        // console.log('Cards 5:', frontFive[i]);
    }
}

function initializeCards(i) {
    allCards[i] = []
    playMakers[i] = []
    feeders[i] = []
    frontFive[i] = []
    cardsIndex[i] = -1
}

function unHighlightAllPiles() {
    for (let i = 0; i < empty_piles.length; i++) {
        piles[empty_piles[i]].style.background = "none";
    }
}

function dropCard(event) {
    const sourceId = event.dataTransfer.getData("sourceId");
    const draggedImg = document.getElementById(sourceId);
    let n;
    switch (draggedImg.number) {
        case 1:
            if (draggedImg.number == event.target.number + 1) {
                para_draggedImg = draggedImg.parentElement;
                draggedImg.id = "from-player-1";
                event.target.number = draggedImg.number;
                event.target.appendChild(draggedImg);
                roundScore[1]++;
                unHighlightAllPiles();
                pile_number = parseInt(event.target.id.replace("pile", ""));
                empty_piles.splice(empty_piles.indexOf(pile_number), 1);
                draggedImg.draggable = false;
                draggedImg.style.position = "absolute";
                break;
            }
        case 2:
            if (draggedImg.number == event.target.parentElement.number + 1) {
                draggedImg.style.position = "absolute";
                para_draggedImg = draggedImg.parentElement;
                event.target.parentElement.color = draggedImg.color;
                event.target.parentElement.number = draggedImg.number;
                draggedImg.id = "from-player-1";
                event.target.parentElement.appendChild(draggedImg);
                roundScore[1]++;
                draggedImg.draggable = false;
            }
            break;
        case 13:
            if (draggedImg.number == event.target.parentElement.number + 1) {
                draggedImg.style.position = "absolute";
                para_draggedImg = draggedImg.parentElement;
                event.target.parentElement.number = 13;
                draggedImg.id = "from-player-1";
                event.target.parentElement.appendChild(draggedImg);
                roundScore[1]++;
                draggedImg.draggable = false;
                // for (let i = 0; i < piles.length; i++)
                //     if (piles[i].number === 13)
                //         explode_finish_pile(i)
            }
            break;
        default:
            if (draggedImg.color == event.target.parentElement.color && draggedImg.number == event.target.parentElement.number + 1) {
                draggedImg.style.position = "absolute";
                event.target.parentElement.color = draggedImg.color;
                event.target.parentElement.number = draggedImg.number;
                para_draggedImg = draggedImg.parentElement;
                draggedImg.id = "from-player-1";
                event.target.parentElement.appendChild(draggedImg);
                roundScore[1]++;
                draggedImg.draggable = false;
            }
    }
}

function click_user_cards3() {
    let back_img = document.getElementById("user_close_game_cards").querySelector("#card-back1").getElementsByTagName("img")[0];
    index_cards3[1] += 3;
    if (is_move_first_card[1]) {
        is_move_first_card[1] = false;
        index_cards3[1] = 3;
    }
    if (index_cards3[1] > cards3[1].length - 1)
        index_cards3[1] = cards3[1].length - 1;
    if (index_cards3[1] === 0 && back_img.hidden === true)
        return;
    let images = {};
    let countCards = 0;
    for (let i = 2; i >= 0; i--) {
        if (index_cards3[1] === 0)
            i = 0;
        else
            if (index_cards3[1] === 1)
                i = 1;
        countCards++;
        images[i] = `images/${colors[cards3[1][index_cards3[1] - i].color]}/${cards3[1][index_cards3[1] - i].number}.jpg`
        const game_img_front = document.createElement("img");
        game_img_front.draggable = true;
        game_img_front.className = "img_front";
        game_img_front.id = "img_user_card3" + cards3[1][index_cards3[1] - i].number + "/" + colors[cards3[1][index_cards3[1] - i].color];
        game_img_front.number = cards3[1][index_cards3[1] - i].number;
        game_img_front.color = colors[cards3[1][index_cards3[1] - i].color];
        game_img_front.alt = "card";
        game_img_front.src = `images/${colors[cards3[1][index_cards3[1] - i].color]}/${cards3[1][index_cards3[1] - i].number}.jpg`;
        user_open_game_cards.appendChild(game_img_front);
        game_img_front.setAttribute("ondragstart", "dragStart(event)");
        game_img_front.setAttribute("onclick", "click_user_open_cards()")
    }
    flip3cards(images, countCards)
    let close_cards = document.querySelector("#user_close_game_cards")
    let arrFlip = Array.from(close_cards.children)
    for (let index = 1; index < arrFlip.length; index++) {
        arrFlip[index].remove();
    }
    if (index_cards3[1] === cards3[1].length - 1) {
        back_img.hidden = true
        index_cards3[1] = 0;
        let temp = cards3[1][0];
        cards3[1].splice(0, 1);
        cards3[1].push(temp);
        is_move_first_card[1] = true;
    }
}

function clickPlayMakers() {
    
}

function flipPlayMakers(i) {
    cardsToFlip = 3
    if (playMakers[i].length - (cardsIndex[i]+1) < cardsToFlip) 
        cardsToFlip = playMakers[i].length - (cardsIndex[i]+1)
         
    cardsIndex[i] += cardsToFlip
}

function placePlayMakers(i) {
    if (cardsIndex[i] != -1) {
        playMakers[i].splice(cardsIndex[i], 1)
        cardsIndex[i] += 1
    }
}

function moveTopCardToBottom(i) {
    playMakers[i].push(playMakers[i].shift())
    cardsIndex[i] = -1
}

function popCardFromFrontFive(i, cardIndex) {
    if (frontFive[i][cardIndex] )
        frontFive[i][cardIndex] = null
}

function usersFeedersClick() {
    if (feeders[1].length > 0) {
        feedFrontFive(1, frontFiveMissingIndexes.pop());
    }
    else {
        // round win of user
    } 
}

function feedFrontFive(i, cardIndex) {
    if (feeders[i].length > 0) {
        const card = feeders[i].pop();
        card.id = `from-five${cardIndex}`;
        card.draggable = true;

        const cardDiv = document.getElementById(`user_five_cards${cardIndex}`).children[1];
        cardDiv.appendChild(card);
    }
}

function build_card_element(className, id, number, color, draggable) {
    const card = document.createElement("img");
    card.className = className;
    card.id = id;
    card.src = `images/${color}/${number}.jpg`;
    card.number = number;
    card.color = color;
    card.draggable = draggable;
    return card;
}

function flipFrontFiveAnumation(){
    cards_to_flip = []
    cards_to_flip[1] = document.querySelectorAll(".user_five_cards");
    for (let i = 2; i <= numOfOpponents + 1; i++) {
        opp_div = document.getElementById(`hold_five_cards${i}`);
        cards_to_flip[i] = Array.from(opp_div.children);
    }
    setTimeout(() => {
        for (let i = 1; i <= numOfOpponents + 1; i++)
            for (let j = 0; j < 5; j++) {
                cards_to_flip[i][j].style.transform = 'rotateY(180deg)';
            }
    }, 500);
}

function get_board() {
    console.log("get_board")
    let players = document.getElementById("players");
    players.className = `players${numOfOpponents}`
    arrPlayers_board = Array.from(document.querySelector("#players").children);
    // ********** יצירת השחקנים מולם משחק המשתמש **********   
    for (let i = 2; i <= numOfOpponents+ 1; i++) {
        playersNames[i] = `שחקן מחשב ${i - 1}`
        roundScore[i] = 0;
        const opp_board = document.createElement("div");
        opp_board.id = "opp_board" + i;
        opp_board.className = "opp_board";
        
        const hold_five_cards = document.createElement("div");
        hold_five_cards.id = "hold_five_cards" + i;
        hold_five_cards.className = "hold_five_cards";
        for (let j = 0; j < 5; j++) {
            const img_front = frontFive[i][j];
            img_front.alt = "card";
            const front = document.createElement("div");
            front.className = "card-front";
            front.id = "card-front" + i;
            front.appendChild(img_front);

            const img_back = document.createElement("img");
            img_back.class = "img_back";
            img_back.alt = "card-back";
            img_back.src = `images/backCards/${colors[i - 1]}.png`;
            img_back.draggable = false;
            const back = document.createElement("div");
            back.id = "card-back" + i;
            back.className = "card-back";
            back.appendChild(img_back);

            const five_cards = document.createElement("div");
            five_cards.id = `five_cards${j}_opp${i}`;
            five_cards.className = "five_cards";
            five_cards.appendChild(front);
            five_cards.appendChild(back);

            hold_five_cards.appendChild(five_cards);

        }
        opp_board.appendChild(hold_five_cards);
        const img_back = document.createElement("img");
        img_back.class = "img_back";
        img_back.alt = "card-back";
        img_back.src = `images/backCards/${colors[i - 1]}.png`;
        img_back.draggable = false;

        const back = document.createElement("div");
        back.id = "card-back1"
        back.className = "card-back";
        back.appendChild(img_back);
        const img_front = feeders[i][feeders[i].length - 1];
        img_front.alt = "card-front";

        const front = document.createElement("div");
        front.id = "card-front1"
        front.className = "card-front";
        front.appendChild(img_front);

        let num_of_close_13 = document.createElement("p");
        num_of_close_13.textContent = "13";

        const thirteen = document.createElement("div");
        thirteen.id = `thirteen${i}`;
        thirteen.className = "thirteen";
        thirteen.appendChild(front);
        thirteen.appendChild(back);
        thirteen.appendChild(num_of_close_13);

        opp_board.append(thirteen);

        const open_game_cards = document.createElement("div");
        open_game_cards.id = `open_game_cards${i}`;
        open_game_cards.className = "open_game_cards";


        const close_game_cards = document.createElement("div");
        close_game_cards.id = `close_game_cards${i}`;
        close_game_cards.className = "close_game_cards";

        const cards = document.createElement("div");
        cards.id = `game_cards${i}`;
        cards.className = "game_cards";
        cards.appendChild(open_game_cards);
        cards.appendChild(close_game_cards);

        const opponent = document.createElement("div");
        opponent.id = `opp${i}`;
        opponent.className = "opponent";
        opponent.appendChild(opp_board);
        opponent.appendChild(cards);

        const opponents_div = document.getElementById("players");
        opponents_div.appendChild(opponent);
        // הצגת הקלפים של ה 3 
        const img_back2 = document.createElement("img");
        img_back2.className = "img_back";
        img_back2.id = "img_back3";
        img_back2.alt = "card-back";
        img_back2.src = `images/backCards/${colors[i - 1]}.png`;
        let back2 = document.getElementById(`close_game_cards${i}`);
        img_back2.draggable = false;

        back2.appendChild(img_back2);
        const img_front2 = document.createElement("img");
        img_front2.className = "img_front";
        img_front2.id = "img_front3";
        img_front2.alt = "card-front";
        img_front2.hidden = true;
        img_front2.number = 0;
        img_front2.color = 0
        img_front2.draggable = false;

        let back3 = document.getElementById(`open_game_cards${i}`);
        back3.appendChild(img_front2);
    }

    // ********** יצירת לוח המשחק **********   
    const board = document.getElementById("board");

    for (let i = 0; i < 16; i++) {
        const pile = document.createElement("div");
        pile.id = `pile${i}`;
        pile.className = "pile";
        pile.number = 0;
        pile.setAttribute("ondrop", "dropCard(event)");
        pile.setAttribute("ondragover", "allowDrop(event)");

        rot = Math.ceil(Math.random() * 50);
        zero = Math.floor(Math.random() * 2);
        if (zero)
            rot = 'rotate(' + rot + 'deg)';
        else
            rot = 'rotate(' + -rot + 'deg)';
        pile.style.transform = rot;
        board.appendChild(pile);
    }


    // ********** יצירת לוח הקלפים של המשתמש **********   
    const user_board = document.createElement("div");
    playersNames[1] = "אני";
    roundScore[1] = 0
    user_board.id = "user_board";
    user_board.className = "user_board";

    const hold_user_front_five = document.createElement("div");
    hold_user_front_five.id = "hold_user_front_five";
    hold_user_front_five.className = "hold_user_front_five";

    for (let j = 0; j < 5; j++) {
        const img_back = document.createElement("img");
        img_back.class = "img_back";
        img_back.alt = "card-back";
        img_back.src = `images/backCards/${colors[4]}.png`;
        const back = document.createElement("div");
        back.id = "card-back1";
        back.className = "card-back";
        back.appendChild(img_back);

        const img_front = frontFive[1][j];
        img_front.id = `from-five${j}`;
        img_front.draggable = true;
        img_front.alt = "card";
        // Add dragstart event listener
        img_front.setAttribute("ondragstart", "dragStart(event)");
        img_front.setAttribute("ondragend", "dragEnd(event)");

        const front = document.createElement("div");
        front.className = "card-front";
        front.id = "card-front1"
        front.appendChild(img_front);


        const user_five_cards = document.createElement("div");
        user_five_cards.id = `user_five_cards${j}`;
        user_five_cards.className = "user_five_cards";
        user_five_cards.appendChild(back);
        user_five_cards.appendChild(front);

        hold_user_front_five.appendChild(user_five_cards);
    }

    user_board.appendChild(hold_user_front_five);

    const img_back = document.createElement("img");
    img_back.class = "img_back";
    img_back.alt = "card-back";
    img_back.src = `images/backCards/${colors[4]}.png`;
    img_back.draggable = false;

    const back = document.createElement("div");
    back.id = "card-back1"
    back.className = "card-back";
    back.appendChild(img_back);

    let num_of_close_13 = document.createElement("p");
    num_of_close_13.textContent = "13";

    const user_thirteen = document.createElement("div");
    user_thirteen.id = "user_thirteen";
    user_thirteen.className = "user_thirteen";
    user_thirteen.appendChild(back);
    user_thirteen.appendChild(num_of_close_13)
    user_board.append(user_thirteen);

    const user_open_game_cards = document.createElement("div");
    user_open_game_cards.id = "user_open_game_cards";
    user_open_game_cards.className = "user_open_game_cards";


    const game_img_back = document.createElement("img");
    game_img_back.class = "img_back";
    game_img_back.alt = "card-back";
    game_img_back.src = `images/backCards/${colors[4]}.png`;
    game_img_back.draggable = false;


    const game_back = document.createElement("div");
    game_back.id = "card-back1";
    game_back.className = "card-back";
    game_back.appendChild(game_img_back);
    game_img_back.setAttribute("onclick", "clickPlayMakers()");
    game_img_back.setAttribute("ondragstart", "dragStart(event)");


    const user_close_game_cards = document.createElement("div");
    user_close_game_cards.id = "user_close_game_cards";
    user_close_game_cards.className = "user_close_game_cards";
    user_close_game_cards.appendChild(game_back);
    const user_cards = document.createElement("div");
    user_cards.id = "user_game_cards";
    user_cards.className = "user_game_cards";
    user_cards.appendChild(user_open_game_cards);
    user_cards.appendChild(user_close_game_cards);

    const user_div = document.getElementById("user");
    user_div.appendChild(user_board);
    user_div.appendChild(user_cards);

}

function round() {
    randCards(numOfOpponents)
    get_board()
    flipFrontFiveAnumation()
}

function game() {
    round()
}

game()