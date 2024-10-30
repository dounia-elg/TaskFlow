
let currentSection = "";

function openModal(section) {
  currentSection = section;
  document.getElementById("taskModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("taskModal").classList.add("hidden");
  document.getElementById("taskTitle");
  document.getElementById("taskDescription");
  document.getElementById("taskDeadline");
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const deadline = document.getElementById("taskDeadline").value
  const task = document.createElement("div");
  task.classList.add("bg-white", "border", "border-gray-300", "p-3", "mb-2", "rounded", "shadow");

  task.innerHTML = `
    <h3 class="font-bold text-lg">${title}</h3>
    <p class="text-sm text-gray-600">${description}</p>
    <p class="text-xs text-gray-600">${deadline}</p>

  `;

  closeModal();
}