const BASE_URL = "https://665ca31f3e4ac90a04da3167.mockapi.io/api/hw9/user";

const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const emailInput = document.getElementById("email");
const form = document.querySelector("form");

function getUserList() {
  try {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          console.log(error);
        }
        return response.json();
      })
      .then((data) => renderUserList(data))
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function postNewUser(newName, newJob, newEmail) {
  try {
    let created = {
      name: newName,
      Job: newJob,
      Email: newEmail,
    };
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(created),
    })
      .then((response) => {
        console.log("Created!");
        getUserList();
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function deleteUser(id) {
  try {
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("Deleted!");
        getUserList();
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function putData(id, updatedName, updatedEmail, updatedJob) {
  let updated = {
    name: updatedName,
    Email: updatedEmail,
    Job: updatedJob,
  };
  try {
    fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((response) => {
        console.log("Updated!");
        getUserList();
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
    imgUser.alt = "user avatar";
    const tDataJob = document.createElement("td");
    tDataJob.innerText = user.Job;
    const tDataEmail = document.createElement("td");
    tDataEmail.innerText = user.Email;
    const tDataBtn = document.createElement("td");
    const tDataBtnDiv = document.createElement("div");
    tDataBtnDiv.classList.add("btn-td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => deleteUserBtnHandler(user.id));
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";

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

function formSubmitHandler() {
  let userName = nameInput.value;
  let userJob = jobInput.value;
  let userEmail = emailInput.value;
  console.log(userEmail);
  if (userName && userJob && userEmail) {
    postNewUser(userName, userJob, userEmail);
  }
}

form.addEventListener("submit", formSubmitHandler);

function deleteUserBtnHandler(userId) {
  deleteUser(userId);
}

getUserList();
