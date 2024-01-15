window.onload = async ()=>{
  getUsername();
}


async function getUsername() {
  // 1. fetch call /user/session
  let getUsernameRes = await fetch("/user/session");
  console.log("heelp:",getUsernameRes)

  let getUsernameResult;
  if (getUsernameRes.status != 200){
    getUsernameResult = await getUsernameRes.json();
    console.log("fuch",getUsernameResult)
  }else{
    getUsernameResult = await getUsernameRes.json();
    console.log("ioioioioio:",getUsernameResult)
  }
  // 2. if success => get response data 
  // 3. print the username into html   
}
async function getRole() {
  let res = await fetch("/user/session");
  if (res.status == 401) {
    return {
      role: "guest",
    };
  }
  let json = await res.json();
  if (json.error) {
    alert(json.error);
    return;
  }
  return {
    role: "admin",
    ...json.admin,
  };
}
async function loadRole() {
  let json = await getRole();
  loginForm.hidden = json.role != "guest";
  logoutForm.hidden = json.role == "guest";

  document.body.dataset.role = json.role;
  if (json.role == "user") {
    logoutForm.querySelector(".username").textContent = json.username;
  }
}
loadRole();



  
function openModal() {
  document.querySelector(".custom-modal").style.display = "block";
}