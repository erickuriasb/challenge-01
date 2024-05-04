function validate_name(){
    return
}

const input_name = document.querySelector('#name');
const input_email = document.querySelector('#email');
const btn_step_1 = document.querySelector('#btn_step_1');
const btn_step_2 = document.querySelector('#btn_step_2');
const btn_step_3 = document.querySelector('#btn_step_3');
const topics = document.querySelector('#topics');
let row_step_1 = document.querySelector('#row-step-1');
let card_step_1 = document.querySelector('#card-first-step');
let row_step_2 = document.querySelector('#row-step-2');
let row_step_3 = document.querySelector('#row-step-3');
let selected_topics = document.querySelector('#selected-topics');

let data = {
    name: "",
    email: "",
    topics: [],
}


for( let i=0 ; i < topics.childElementCount; i++){
    let currentTopic = topics.children[i].firstElementChild
    currentTopic.addEventListener('click', (event) => {
        if (event.target.classList.contains('option-button-selected')){
            currentTopic.classList.remove('option-button-selected');
        }else{
            currentTopic.classList.add('option-button-selected');
        }
    });
}

btn_step_1.addEventListener('click', (event) => {
    event.preventDefault();
    if (validate_name() && validate_email()){
        row_step_1.classList.add('d-none');
        row_step_2.classList.remove('d-none');
        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        data.name = name.value;
        data.email = email.value;
    }else{
        let message = document.querySelector('#inputs-message');
        if (message.childElementCount == 0){
            const node = document.createElement('div');
            const textNode = document.createTextNode('Please fill required fields.');
            node.classList.add('text-danger','mt-2');
            node.append(textNode);
            message.appendChild(node);
            markRequiredFields();
        }
    }
});

function validate_name(){
    if (input_name.value === ""){
        return false;
    }else{
        return true;
    }
}
function validate_email(){
    if (input_email.value === ""){
        return false;
    }else{
        //const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const validRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (input_email.value.match(validRegex)){
            return true;
        }else{
            return false;
        }
    }
}
function markRequiredFields(){
    let labels = document.querySelectorAll('label');
    for( let i = 0; i < labels.length; i++){
        const node = document.createElement('span');
        node.classList.add('text-danger');
        const char = document.createTextNode(' *');
        node.appendChild(char);
        labels[i].appendChild(node);
    }
}

btn_step_2.addEventListener('click', (event) => {
    event.preventDefault();
    for(let i=0; i < topics.childElementCount; i++ ){
        if (topics.children[i].firstElementChild.classList.contains('option-button-selected')){
            topic = {
                "topic": topics.children[i].firstElementChild.value
            }
            data.topics.push(topic)
        }
    }
    if (data.topics.length == 0){
        const topicsMessage = document.querySelector('#topics-message');
        const node = document.createElement('div');
        const textNode = document.createTextNode('Please select at least one Topic.');
        node.classList.add('text-danger','mt-2');
        node.append(textNode);
        topicsMessage.appendChild(node);
    }else{
        for (let i=0; i < data.topics.length; i++){
            let node = document.createElement('li');
            let textNode = document.createTextNode(data.topics[i].topic);
            node.append(textNode);
            selected_topics.appendChild(node);
        }
        textNode = data.name
        document.querySelector('#res-name').append(textNode);
        textNode = data.email
        document.querySelector('#res-email').append(textNode);
        row_step_2.classList.add('d-none');
        row_step_3.classList.remove('d-none');
    }
});

btn_step_3.addEventListener('click', (event) => {
    event.preventDefault();
    let url = "http://localhost:8000/user/";

    fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
});

function validateSelectedTopics(){
    const topicsSelected = document.querySelector('');
}

