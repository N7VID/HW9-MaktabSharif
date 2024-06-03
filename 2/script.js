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

getUserList();
