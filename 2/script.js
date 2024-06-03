const BASE_URL = "https://665ca31f3e4ac90a04da3167.mockapi.io/api/hw9/user";

const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");

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
  let created = {
    name: newName,
    Job: newJob,
    Email: newEmail,
  };
  try {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(created),
    })
      .then((response) => console.log("Created!"))
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
      .then((response) => console.log("Deleted!"))
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
      .then((response) => console.log("Updated!"))
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
    table.appendChild(tableBody);
  });
}
getUserList();
