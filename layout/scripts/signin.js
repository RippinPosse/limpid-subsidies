let inputEmail = document.querySelector("#email");
let inputPassword = document.querySelector("#password");
let submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let data = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  window.location.href = "./account.html";

  // fetch("https://localhost/users/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json;charset=utf-8",
  //   },
  //   body: JSON.stringify(data),
  // }).then((res) => {
  //   if (res.ok) {
  //     let data = await response.json();
  //     localStorage.setItem("token", data.token);
  //     window.location.href = "./account.html";
  //   }
  // });
});
