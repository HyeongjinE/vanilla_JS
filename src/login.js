const logInForm = document.querySelector("#login-form")
const logInInput = document.querySelector("#login-form input");
const logOutBtn = document.querySelector("#logout-button");
const logInBtn = document.querySelector("#login-button");
const toDoForm = document.querySelector("#todo-form");
const toDoList = document.querySelector("#todo-list");
const toDoInput = document.querySelector("#todo-form input")
const toDoButton = document.querySelector("#todo-button")

const TODOS_KEY = "todos"
const title = document.querySelector(".title");

console.log(title.innerText);

const CLASS_HIDDEN = "hidden";
const USERNAME_KEY = "username";

function onLogInSubmit(event) {
    event.preventDefault();
    const userName = logInInput.value;
    logInForm.classList.add(CLASS_HIDDEN);
    paintTitle(userName);
    localStorage.setItem(USERNAME_KEY,userName);
    logOutBtn.classList.remove(CLASS_HIDDEN);
    toDoForm.classList.remove(CLASS_HIDDEN);
    toDoList.classList.remove(CLASS_HIDDEN);
    loadToDo();
}

function paintTitle(userName) {
    title.classList.remove(CLASS_HIDDEN);
    title.innerText = `${userName}'s plans for today!`;
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null){
    logInForm.classList.remove(CLASS_HIDDEN);
    logInForm.addEventListener("submit", onLogInSubmit);
} else {
    paintTitle(savedUserName);
    logOutBtn.classList.remove(CLASS_HIDDEN);
    toDoForm.classList.remove(CLASS_HIDDEN);
    toDoList.classList.remove(CLASS_HIDDEN);
}

function handleLogOut(event) {
    event.preventDefault();
    localStorage.removeItem(USERNAME_KEY);
    logInForm.classList.remove(CLASS_HIDDEN);
    title.innerText = "What's your plan!"
    logOutBtn.classList.add(CLASS_HIDDEN);
    toDoForm.classList.add(CLASS_HIDDEN);
    toDoList.classList.add(CLASS_HIDDEN);
    location.reload();
}

logOutBtn.addEventListener("click", handleLogOut);

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newToDo) {
    const newLi = document.createElement("li");
    newLi.id = newToDo.id;
    const newSpan = document.createElement("span");
    const newBtn = document.createElement("button");
    
    if (newToDo.name === localStorage.getItem(USERNAME_KEY)) {
        newSpan.innerText = newToDo.text;
        newSpan.style.marginRight = "10px";
        newBtn.innerText = "Delete";
        newBtn.addEventListener("click",deleteToDo);

        newLi.appendChild(newSpan);
        newLi.appendChild(newBtn);
        
        toDoList.appendChild(newLi);
    }
}

function handleToDo(event) {
    event.preventDefault();
    if (toDoInput.value !== "") {
        const newToDo = toDoInput.value;
        toDoInput.value = "";
        const newToDoObj = {
            text: newToDo,
            id: Date.now(),
            name: localStorage.getItem(USERNAME_KEY)
        };
        toDos.push(newToDoObj);
        paintToDo(newToDoObj);
        saveToDos();
    }
}

toDoButton.addEventListener("click", handleToDo);

const savedToDos = localStorage.getItem(TODOS_KEY);

function loadToDo() {
    if (savedToDos !== null){
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(paintToDo);
    }
}
loadToDo();
logInForm.addEventListener("submit", onLogInSubmit);