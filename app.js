//Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#tasks");
//Load all Event Listners
loadEventListeners();
//load all Listners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks)
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTask);
  filter.addEventListener("keyup", filterTask);
}
//get task from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
tasks.forEach(function(task){
  //create list Elements
  const li = document.createElement("li");
  li.className = "collection-item";
  //create Text node
  li.appendChild(document.createTextNode(task));
  //cretae new link
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //add icon
  link.innerHTML = "<i class='fa fa-remove'></i>";
  //append link
  li.appendChild(link);
  //apend li to ul
  taskList.appendChild(li)
});
}

function addTask(e) {
  if(taskInput.value === null) {
    alert("Add the Task");
  }

  //create list Elements
  const li = document.createElement("li");
  li.className = "collection-item";
  //create Text node
  li.appendChild(document.createTextNode(taskInput.value));
  //cretae new link
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //add icon
  link.innerHTML = "<i class='fa fa-remove'></i>";
  //append link
  li.appendChild(link);
  //apend li to ul
  taskList.appendChild(li);
  // store in LS
storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';
  e.preventDefault();
}
//store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks)
  )};
//remove
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure"))
      e.target.parentElement.parentElement.remove();
  }

  //remove from LS
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);

}
//remove from LS

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index,1)
    }
});
localStorage.setItem('tasks',JSON.stringify(tasks));
}
//clear Task

function clearTask() {
  // taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
//clear from LS
clearTaskFromLocalStorage();
}
//clear Tasks
function clearTaskFromLocalStorage(){
  localStorage.clear();
}
//filter task

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    console.log(item);
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }

  })
}