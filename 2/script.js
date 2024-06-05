const BASE_URL = "http://localhost:3000";

const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const emailInput = document.getElementById("email");
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let appStatus = {
  editingUserId: null,
  isEditMode: false,
};

let page = 1;
function getUserList() {
  try {
    fetch(`${BASE_URL}/Users?_page=${page}&_per_page=20`)
      .then((response) => {
        if (!response.ok) {
          console.log(error);
        }
        return response.json();
      })
      .then((data) => renderUserList(data.data))
      .catch((e) => console.log(e));
    page++;
  } catch (error) {
    console.error(error);
  }
}

function postNewUser(newName, newJob, newEmail) {
  try {
    let created = {
      name: newName,
      job: newJob,
      email: newEmail,
    };
    fetch(`${BASE_URL}/Users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(created),
    })
      .then((response) => {
        getUserList();
        Toastify({
          text: "Created!",
          className: "info",
          duration: 4000,
          position: "right",
          gravity: "up",
          style: {
            color: "white",
            background: "#6fcf97",
          },
        }).showToast();
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function deleteUser(id) {
  try {
    fetch(`${BASE_URL}/Users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        getUserList();
        Toastify({
          text: "Deleted!",
          className: "info",
          duration: 4000,
          position: "right",
          gravity: "up",
          style: {
            color: "white",
            background: "#6fcf97",
          },
        }).showToast();
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function putData(id, updatedName, updatedEmail, updatedJob) {
  let updated = {
    name: updatedName,
    email: updatedEmail,
    job: updatedJob,
  };
  try {
    fetch(`${BASE_URL}/Users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`);
        }
        getUserList();
        Toastify({
          text: "Updated!",
          className: "info",
          duration: 4000,
          position: "right",
          gravity: "up",
          style: {
            color: "white",
            background: "#6fcf97",
          },
        }).showToast();
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

//------------------

function renderUserList(data) {
  tableBody.innerText = "";
  data.forEach((user) => {
    const tRow = document.createElement("tr");

    const tDataId = document.createElement("td");
    tDataId.innerText = user.id;
    const tDataUser = document.createElement("td");
    const tDataImgDiv = document.createElement("div");
    tDataImgDiv.innerText = user.name;
    tDataImgDiv.className = "img-td";
    const imgUser = document.createElement("img");
    imgUser.src = user.avatar;
    imgUser.alt = "avatar";
    const tDataJob = document.createElement("td");
    tDataJob.innerText = user.job;
    const tDataEmail = document.createElement("td");
    tDataEmail.innerText = user.email;
    const tDataBtn = document.createElement("td");
    const tDataBtnDiv = document.createElement("div");
    tDataBtnDiv.classList.add("btn-td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => deleteUserBtnHandler(user.id));
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.addEventListener("click", () =>
      updateUserBtnHandler(user.id, user.name, user.email, user.job)
    );

    tDataImgDiv.appendChild(imgUser);
    tDataUser.appendChild(tDataImgDiv);
    tDataBtnDiv.appendChild(updateBtn);
    tDataBtnDiv.appendChild(deleteBtn);
    tDataBtn.appendChild(tDataBtnDiv);

    tRow.appendChild(tDataId);
    tRow.appendChild(tDataUser);
    tRow.appendChild(tDataJob);
    tRow.appendChild(tDataEmail);
    tRow.appendChild(tDataBtn);

    tableBody.appendChild(tRow);
  });
}

function formSubmitHandler(event) {
  event.preventDefault();
  let userName = nameInput.value;
  let userJob = jobInput.value;
  let userEmail = emailInput.value;

  if (appStatus.isEditMode) {
    putData(appStatus.editingUserId, userName, userEmail, userJob);
    submitBtn.innerText = "Add User";
    appStatus.isEditMode = false;
    appStatus.userId = null;
  } else {
    if (userName && userJob && userEmail) {
      postNewUser(userName, userJob, userEmail);
    }
  }
  nameInput.value = "";
  jobInput.value = "";
  emailInput.value = "";
}

form.addEventListener("submit", formSubmitHandler);

function deleteUserBtnHandler(userId) {
  deleteUser(userId);
}

function updateUserBtnHandler(id, name, email, job) {
  appStatus.editingUserId = id;
  appStatus.isEditMode = true;
  nameInput.value = name;
  jobInput.value = job;
  emailInput.value = email;
  submitBtn.innerText = "Update";
}

function nextPageButtonHandler() {
  try {
    fetch(`${BASE_URL}/Users?_page=${page}&_per_page=20`)
      .then((response) => {
        if (!response.ok) {
          console.log(error);
        }
        return response.json();
      })
      .then((data) => {
        if (data.last >= page - 1) {
          renderUserList(data.data);
        }
        if (data.next === null) {
          nextButton.style.display = "none";
        }
      })
      .catch((e) => console.log(e));
    page++;
  } catch (error) {
    console.error(error);
  }
}

getUserList();
