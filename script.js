// Eleman Seçme

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");

let todos;


eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener("submit", addNewItem);
    //delete an item
    taskList.addEventListener("click", deleteItem);
    //delete all item
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

//load items

loadItems();

function loadItems() {
    todos = getItemsFromLocalStorage();
    todos.forEach(function (item) {
        createItem(item);
    })
}

//get items from local storage
function getItemsFromLocalStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //array hale getirmek için
    }
    return todos;
}


//set item to local storage
function setItemToLocalStorage(newToDo) {
    todos = getItemsFromLocalStorage();
    todos.push(newToDo);
    localStorage.setItem("todos", JSON.stringify(todos)); //yukarıda array haline getirdiğimiz todos'u yollarken tekrar string haline döndürmek için kullanırız.
}

function deleteItemFromLocalStorage(deletetodos){
    let todos = getItemsFromLocalStorage();

    todos.forEach(function (todo,index){
        if(todo === deletetodos){
            todos.splice(index,1); //bulunduğu andan itibaren sadece 1 adet silecek yani seçildiğini silecek.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}


function createItem(newToDo) {
    //li oluşturma

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newToDo));

    //a oluşturma

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>'

    li.appendChild(a);
    taskList.appendChild(li);
}


function addNewItem(e) {
    if (input.value === '') {
        alert("Bir Eleman Eklemelisiniz.")
    }

    createItem(input.value); //kullanıcının girdiği veriyi eklemesi için input.value kullanılır.

    setItemToLocalStorage(input.value);

    e.preventDefault();

    input.value = "";
}


function deleteItem(d) {
    if (d.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            d.target.parentElement.parentElement.remove(); //listeyi silmek için en üst parentine gitmeliyiz yoksa sadece css kodunu da silebilir.
            deleteItemFromLocalStorage(d.target.parentElement.parentElement.textContent);
        }
    }
    d.preventDefault();
}


function deleteAllItems(dA) {
    if (confirm("Silmek istediğinize emin misiniz=")) {

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }


}
