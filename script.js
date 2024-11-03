let currentSection = "";
let tasks = []; 

function openModal(section) {
    currentSection = section;
    document.getElementById("taskModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("taskModal").classList.add("hidden");
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDeadline").value = "";
    document.getElementById("taskPriority").value = "P1"; 

    const addButton = document.querySelector("#taskModal button");
    addButton.innerText = "Add Task";
    addButton.onclick = addTask;
}

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const deadline = document.getElementById("taskDeadline").value;
    const taskPriority = document.getElementById("taskPriority").value;


    let task = {
        title,
        description,
        deadline,
        priority: taskPriority,
        section: currentSection,
    };

    console.log("Current Section:", currentSection);

    tasks.push(task); 
    displayTask(task); 
    Counter();
    closeModal();
}

function displayTask(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("border", "border-gray-300", "p-3", "mb-2", "rounded-lg", "shadow");


    if (task.priority === "P1") {
        taskElement.classList.add("bg-red-400");
    } else if (task.priority === "P2") {
        taskElement.classList.add("bg-orange-300");
    } else if (task.priority === "P3") {
        taskElement.classList.add("bg-green-300");
    }

    taskElement.innerHTML = `
        <h3 class="font-bold text-lg">${task.title}</h3>
        <p class="text-sm text-gray-600">${task.description}</p>
        <p class="text-xs text-gray-600">${task.deadline}</p>
    `;

    

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("w-16", "bg-green-500", "text-white", "rounded", "p-2", "mt-2", "ml-2");
    editButton.addEventListener("click", () => editTask(task, taskElement));
    taskElement.appendChild(editButton);

  
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn", "bg-red-500", "text-white", "rounded", "p-2", "mt-2", "ml-64");
    deleteButton.addEventListener("click", () => {
        taskElement.remove();
        tasks = tasks.filter(t => t !== task);
        Counter(); 
    });
    taskElement.appendChild(deleteButton);

    if (task.section === "To-Do") {
        let moveButton = document.createElement("button");
        moveButton.innerText = "Next >>";
        moveButton.classList.add("bg-yellow-500", "text-white", "rounded", "p-2", "mt-2");
        moveButton.addEventListener("click", () => {
            moveTask(task, "In Progress", taskElement);
        });
        taskElement.appendChild(moveButton);
    } else if (task.section === "In Progress") {
        let moveButton = document.createElement("button");
        moveButton.innerText = "Next >>";
        moveButton.classList.add("bg-yellow-500", "text-white", "rounded", "p-2", "mt-2");
        moveButton.addEventListener("click", () => {
            moveTask(task, "Done", taskElement);
        });
        taskElement.appendChild(moveButton);
    }

  
    if (task.section === "To-Do") {
        document.getElementById("todoTasks").appendChild(taskElement);
    } else if (task.section === "In Progress") {
        document.getElementById("inProgressTasks").appendChild(taskElement);
    } else if (task.section === "Done") {
        document.getElementById("doneTasks").appendChild(taskElement);
    }
}



function editTask(task, taskElement) {
  
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDeadline").value = task.deadline;
    document.getElementById("taskPriority").value = task.priority;

  
    const addButton = document.querySelector("#taskModal button");
    addButton.innerText = "Update Task";
    addButton.onclick = () => updateTask(task, taskElement);

    openModal(task.section);
}

function updateTask(task, taskElement) {
    task.title = document.getElementById("taskTitle").value;
    task.description = document.getElementById("taskDescription").value;
    task.deadline = document.getElementById("taskDeadline").value;
    task.priority = document.getElementById("taskPriority").value;


    taskElement.querySelector("h3").innerText = task.title;
    taskElement.querySelector("p:nth-of-type(1)").innerText = task.description;
    taskElement.querySelector("p:nth-of-type(2)").innerText = task.deadline;

  
    taskElement.className = "border border-gray-300 p-3 mb-2 rounded-lg shadow"; 
    if (task.priority === "P1") {
        taskElement.classList.add("bg-red-400");
    } else if (task.priority === "P2") {
        taskElement.classList.add("bg-orange-300");
    } else if (task.priority === "P3") {
        taskElement.classList.add("bg-green-300");
    }

    closeModal();
}

function moveTask(task, newSection, taskElement) {
    task.section = newSection
    taskElement.remove();
    displayTask(task);
    Counter();
}


function Counter() {
    const todoCount = document.getElementById("todoTasks").children.length;
    const inProgressCount = document.getElementById("inProgressTasks").children.length;
    const doneCount = document.getElementById("doneTasks").children.length;

    console.log("To-Do Count:", todoCount);
    console.log("In Progress Count:", inProgressCount);
    console.log("Done Count:", doneCount);

    document.getElementById("todoCounter").innerText = todoCount;
    document.getElementById("inProgressCounter").innerText = inProgressCount;
    document.getElementById("doneCounter").innerText = doneCount;
}


