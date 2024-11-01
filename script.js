
let currentSection = "";

function openModal(section) {
  currentSection = section;
  document.getElementById("taskModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("taskModal").classList.add("hidden");
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("taskPriority").value = "";
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const deadline = document.getElementById("taskDeadline").value;
  const taskPriority = document.getElementById("taskPriority").value;

  console.log("Task Priority:", taskPriority);

  let task = document.createElement("div");
  task.classList.add( "border", "border-gray-300", "p-3", "mb-2", "rounded", "shadow");

  if (taskPriority === "P1") {
    task.classList.add("bg-red-400");
  } else if (taskPriority === "P2") {
    task.classList.add("bg-orange-300");
  } else if (taskPriority === "P3") {
    task.classList.add("bg-green-300");
  }

  task.innerHTML = `
    <h3 class="font-bold text-lg ">${title}</h3>
    <p class="text-sm text-gray-600">${description}</p>
    <p class="text-xs text-gray-600">${deadline}</p>

  `;

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  deleteButton.classList.add("delete-btn", "bg-red-500", "text-white", "rounded" , "p-2", "mt-2");

  deleteButton.addEventListener("click",function(){
    task.remove();
  })

  task.appendChild(deleteButton);

  
    if(currentSection === "To-Do"){
    document.getElementById("todoTasks").appendChild(task);
  } else if(currentSection === "In Progress"){
    document.getElementById("inProgressTasks").appendChild(task);
  } else if(currentSection === "Done"){
    document.getElementById("doneTasks").appendChild(task);
  }
  
  



  closeModal();
}