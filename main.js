function validate_name(){
    return
}

const input_name = document.querySelector('#name');
const input_emain = document.querySelector('#email');
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
    if (input_name.value === ""){
        const node = document.createElement('div');
        const textNode = document.createTextNode('Please Fill out required fields!');
        node.classList.add('text-danger','mt-2');
        node.append(textNode);
        card_step_1.appendChild(node);
    }else{
        row_step_1.classList.add('d-none');
        row_step_2.classList.remove('d-none');
        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        data.name = name.value;
        data.email = email.value;
    }


});

btn_step_2.addEventListener('click', (event) => {
    event.preventDefault();
    row_step_2.classList.add('d-none');
    row_step_3.classList.remove('d-none');
    for(let i=0; i < topics.childElementCount; i++ ){
        if (topics.children[i].firstElementChild.classList.contains('option-button-selected')){
            data.topics.push(topics.children[i].firstElementChild.value)
        }
    }
    for (let i=0; i < data.topics.length; i++){
        let node = document.createElement('li');
        let textNode = document.createTextNode(data.topics[i]);
        node.append(textNode);
        selected_topics.appendChild(node);
    }
    textNode = data.name
    document.querySelector('#res-name').append(textNode);
    textNode = data.email
    document.querySelector('#res-email').append(textNode);
});

btn_step_3.addEventListener('click', (event) => {
    //event.preventDefault();
});

