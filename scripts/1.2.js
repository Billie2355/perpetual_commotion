numOfOpponents = 3

allCards = []
playMakers = []
feeders = []
frontFive = []
cardsIndex = []
score = []

function randCards(numOfOpponents) {
    for (let i = 0; i <= numOfOpponents; i++) {

        initializeCards(i); 

        const colors = Array.from({ length: 4 }, (_, i) => i + 1);
        const numbers = Array.from({ length: 13 }, (_, i) => i + 1);

        const items = colors.flatMap(color => 
            numbers.map(number => ({ color, number }))
        );
        
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        allCards[i] = items;
        feeders[i] = items.slice(5, 18);
        playMakers[i] = items.slice(18, 52);
        frontFive[i] = items.slice(0, 5);

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

function get_board() {
    let players = document.getElementById("players");
    players.className = `players${opp_num}`
    arrPlayers_board = Array.from(document.querySelector("#players").children);
    // ********** יצירת השחקנים מולם משחק המשתמש **********   
    for (let i = 2; i <= opp_num + 1; i++) {
        playersNames[i] = `שחקן מחשב ${i - 1}`
        is_move_first_card[i] = false;
        score_this_round[i] = 0;
        const opp_board = document.createElement("div");
        opp_board.id = "opp_board" + i;
        opp_board.className = "opp_board";
        
        const hold_five_cards = document.createElement("div");
        hold_five_cards.id = "hold_five_cards" + i;
        hold_five_cards.className = "hold_five_cards";
        for (let j = 0; j < 5; j++) {
            const img_front = document.createElement("img");
            img_front.alt = "card";
            img_front.src = `images/${colors[cards5[i][j].color]}/${cards5[i][j].number}.jpg`;
            img_front.number = cards5[i][j].number;
            img_front.color = colors[cards5[i][j].color];
            img_front.draggable = false;
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
        const img_front = document.createElement("img");
        img_front.class = "img_front";
        img_front.alt = "card-front";
        img_front.src = `images/${colors[cards13[i][cards13[i].length - 1].color]}/${cards13[i][cards13[i].length - 1].number}.jpg`;
        img_front.draggable = false;

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
        if(opp_num == 3 && i == 2)
            opponent.style.transform = 'rotate(-25deg)';
        if(opp_num == 3 && i == 4)
            opponent.style.transform = 'rotate(25deg)';

        opponent.appendChild(opp_board);
        opponent.appendChild(cards);

        const opponents_div = document.getElementById("players");
        opponents_div.appendChild(opponent);
        // הצגת הקלפים של ה 3 חדשששששששששש
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
        pile.setAttribute("ondrop", "dropImage(event)");
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
    is_move_first_card[1] = false;
    score_this_round[1] = 0
    user_board.id = "user_board";
    user_board.className = "user_board";
    for (let j = 0; j < 5; j++) {
        const img_back = document.createElement("img");
        img_back.class = "img_back";
        img_back.alt = "card-back";
        img_back.src = `images/backCards/${colors[0]}.png`;
        const back = document.createElement("div");
        back.id = "card-back1";
        back.className = "card-back";
        back.appendChild(img_back);

        const img_front = document.createElement("img");
        img_front.id = `from-five${j}`;
        img_front.draggable = true;
        img_front.number = cards5[1][j].number;
        img_front.color = colors[cards5[1][j].color];
        img_front.className = "img_front";
        img_front.alt = "card";
        img_front.src = `images/${colors[cards5[1][j].color]}/${cards5[1][j].number}.jpg`;
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
        user_board.appendChild(user_five_cards);
    }


    const img_back = document.createElement("img");
    img_back.class = "img_back";
    img_back.alt = "card-back";
    img_back.src = `images/backCards/${colors[0]}.png`;
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
    game_img_back.src = `images/backCards/${colors[0]}.png`;
    game_img_back.draggable = false;


    const game_back = document.createElement("div");
    game_back.id = "card-back1";
    game_back.className = "card-back";
    game_back.appendChild(game_img_back);
    game_img_back.setAttribute("onclick", "click_user_cards3()");
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
    get_board()
}


function game() {
    round()
}

game()