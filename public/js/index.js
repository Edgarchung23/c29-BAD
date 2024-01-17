async function logout_account(){
  // let target = document.querySelector("logout-button");
  // target.addEventListener("")
  await fetch("/auth/logout");
  window.location.reload();
}

getUsername()
async function getUsername() {
  // 1. fetch call /user/session
  let getUsernameRes = await fetch("/user/session");

  let getUsernameResult;
  
  if (getUsernameRes.status != 200){
    getUsernameResult = await getUsernameRes.json();
    
  }else {
    getUsernameResult = await getUsernameRes.json();
  }

  if(typeof getUsernameResult.data !== 'undefined'){
    document.querySelector('.guestName').innerHTML = "Hello, "+ getUsernameResult.data;
  }

  const loginButton = document.querySelector('.loginButton')
  const logoutButton = document.querySelector('.logout-button')
  const myCollection = document.querySelector('.w3-bar-item sideBarBtn')
  
  if(getUsernameResult.data){
    logoutButton.classList.remove('hidden');
    loginButton.classList.add('hidden');
    myCollection.classList.add('hidden');
  } else {
    logoutButton.classList.add('hidden');
    loginButton.classList.remove('hidden');
    myCollection.classList.remove('hidden');
  }
  // 2. if success => get response data 
  // 3. print the username into html   
}


