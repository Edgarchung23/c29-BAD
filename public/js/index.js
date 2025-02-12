window.addEventListener('load', ()=> {
  getUsername()
})

async function logout_account(){
  // let target = document.querySelector("logout-button");
  // target.addEventListener("")
  await fetch("/auth/logout");
  window.location.reload();
}

async function getUsername() {
  // 1. fetch call /user/session
  let getUsernameRes = await fetch("/user/username");

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
  const logoutButton = document.querySelector('#logout_area')
  const myCollection = document.querySelector('.abc')
  const collectBtn = document.querySelector('.collect_button')
  
  if(getUsernameResult.data){
    logoutButton.classList.remove('hidden');
    loginButton.classList.add('hidden')
    myCollection.classList.remove('hidden')
    collectBtn.classList.remove('hidden')

  } else {
    logoutButton.classList.add('hidden');
    loginButton.classList.remove('hidden')
    myCollection.classList.add('hidden')
    collectBtn.classList.add('hidden')

  }
  // 2. if success => get response data 
  // 3. print the username into html   

}
