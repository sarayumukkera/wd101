let formSubmit = (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let accept = document.getElementById("acceptedterms").checked;

  let dob = document.getElementById("dob").value;

  console.log(dob);

  let data = {
    name,
    email,
    password,
    accept,
    dob,
  };

  let users = fetchData();
  users.push(data);

  //localStorage.setItem("users", "sddsfdsfsdfsf");

  localStorage.setItem("users", JSON.stringify(users));

  displayData();
};

const fetchData = () => {
  let users = localStorage.getItem("users");

  if (users) {
    users = JSON.parse(users);
  } else {
    users = [];
  }

  return users;
};

const displayData = () => {
  let users = fetchData();

  let user_entries = users
    .map((user) => {
      return `<tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.accept}</td>
      </tr>`;
    })
    .join("\n");

  let table_data = `
        <table border="1">
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>DOB</th>
        <th>Accept Terms?</th>
        </tr>
        ${user_entries}
        </table>`;

  document.getElementById("user-table").innerHTML = table_data;
};

let summitButton = document.getElementById("registrationForm");

summitButton.addEventListener("submit", formSubmit);

displayData();

const dobElement = document.getElementById("dob");

let users = fetchData();

dobElement.addEventListener("input", (e) => {
  let dob = e.target.value;

  let dobDate = new Date(dob);

  let today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();

  if (age < 18 || age > 55) {
    dobElement.setCustomValidity("Age must be between 18 and 55");
    dobElement.reportValidity();
  } else {
    dobElement.setCustomValidity("");
  }
});
