const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a task!');
    } else {
        const li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        const span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);

}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

const container = document.querySelector('.container');
    container.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        container.style.background = `linear-gradient(to right, 
            rgb(${Math.floor(0 + 255 * x)},170,255), 
            rgb(0,${Math.floor(255 * y)},204))`;
    });
    container.addEventListener('mouseleave', function() {
        container.style.background = 'linear-gradient(to right, #00aaff, #00ffcc)';
    });


// function deleteRandomTodo() {
//             const element = document.querySelector("h4");
//             const parentElement = element.parentNode;
//             parentElement.removeChild(element);
//     }

// const btn = document.querySelector("#b");

// btn.addEventListener("click",function() {
//   let input = document.querySelector("input");
//   let todos = document.querySelectorAll("h4");
//   let newTodo = document.createElement("h4");
//   newTodo.className = "todo";
//   newTodo.innerText = `${todos.length + 1}. ${input.value}`;
//   document.querySelector("#d").appendChild(newTodo);
//   input.value = "";  
// }) 

