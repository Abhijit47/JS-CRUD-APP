let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
// let tasks = document.getElementById("tasks");
let tasks = document.querySelector("#tasks");
let add = document.getElementById("add");

let taskHeading = document.getElementById('task-heading');

let search = document.querySelector('.search');



form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    // msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    // msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  if (data.length === 0) {
    taskHeading.style.display = "none";
  }
  else {
    taskHeading.style.display = "block";
    tasks.innerHTML = "";
    data.map((item, id) => {

      let htmlElem = `
        <div id=${id}>
          <span class="fw-bold">${item.text}</span>
          <span class="small text-secondary">${item.date}</span>
          <p>${item.description}</p>

          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
      `
      return (tasks.innerHTML += htmlElem);
    });
    resetForm();
  }
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();

const getSearchValue = (e) => {
  // console.log(e.target.value);
  const searchValue = e.target.value;



  data.forEach(item => {
    const isVisible = item.text.includes(searchValue) || item.description.includes(searchValue);

    if (searchValue === "") {
      tasks.classList.remove('hidden', !isVisible);
      searchValue.value = ""
    }

    tasks.classList.toggle('hidden', isVisible);
    searchValue.value = ""
  })
}

search.addEventListener('input', getSearchValue);