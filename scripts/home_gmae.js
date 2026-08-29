let div_head = document.getElementById("div_head");

let choose_num_of_opp = document.createElement("p");
choose_num_of_opp.textContent = "בחר כמות יריבים:"
choose_num_of_opp.id = "choose_num_of_opp"
choose_num_of_opp.className = "choose_num_of_opp";
div_head.appendChild(choose_num_of_opp);
let form = document.createElement("form");
form.className = "form";

let label1 = document.createElement("label");
label1.className = "label";
label1.setAttribute("for", "input1");
label1.id = "label1"
label1.innerText = "יריב אחד";
form.appendChild(label1);
let input1 = document.createElement("input");
input1.className = "input";
input1.setAttribute("name", "radio")
input1.setAttribute("type", "radio");
input1.setAttribute("id", "input1");
input1.setAttribute("value", "יריב אחד");
form.appendChild(input1);
let label2 = document.createElement("label");
label2.className = "label";
label2.setAttribute("for", "input2");
label2.id = "label2"
label2.innerText = "שני יריבים";
form.appendChild(label2);
let input2 = document.createElement("input");
input2.className = "input";
input2.setAttribute("name", "radio");
input2.setAttribute("type", "radio");
input2.setAttribute("id", "input2");
input2.setAttribute("value", "שני יריבים");
form.appendChild(input2);
let label3 = document.createElement("label");
label3.className = "label";
label3.setAttribute("for", "input3");
label3.id = "label3"
label3.innerText = "שלושה יריבים";
form.appendChild(label3);
let input3 = document.createElement("input");
input3.className = "input";
input3.setAttribute("name", "radio")
input3.setAttribute("type", "radio");
input3.setAttribute("id", "input3");
input3.setAttribute("value", "שלושה יריבים");
let btn_instruction = document.createElement("img");
btn_instruction.src = "images/הוראות משחק.png";
btn_instruction.className = "btn_instruction";
form.appendChild(btn_instruction);
form.appendChild(input3);

btn_instruction.setAttribute("onclick", "move_to_instruction()");
div_head.appendChild(form)
btn = document.createElement("button");
btn.className = "button";
btn.textContent = "להתחלת המשחק";
form.appendChild(btn);
btn.setAttribute("onclick", "move_to_play()");
function move_to_play() {
    let radioButtons = document.querySelectorAll('input[name="radio"]');
    let valueSelect = null;
    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            valueSelect = radioButton.value;
        }
    });
    if (valueSelect) {
        let url = `./game.html?value=${valueSelect}`;
        window.open(url, "_blank");
    } else {
        alert("עליך לבחור מספר יריבים  למשחק");
        return;
    }
}

function move_to_instruction() {
    window.open("./instruction.html", "_blank");
}

