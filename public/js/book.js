window.onload = async ()=>{
  getUsername();
  fetchBooks();
}

async function fetchBooks() {
  try {
    let res = await fetch("/chapter/reader", {
      method: "GET",
    });

    let result = await res.json();
    let data = result.data;

    console.log("fetch result:", data);

    let homeHTML = "";

    for (let book of data) {
      console.log(book.book_cover);
      homeHTML += `
            <div class="card"> 
           <a href="../html/reader.html?book=${book.name}"><img src="${book.book_cover}" id="bookPh" /></a>
        </div>
            `
        }

         // Assuming you have a container in your HTML where you want to display the books
         document.querySelector(".books-container").innerHTML = homeHTML;

    } catch (error) {
        console.error("Error fetching books:", error.message);
    }
}
// Call the fetchBooks function to initiate the fetch and update the HTML

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
  if(getUsernameResult.data){
    logoutButton.classList.remove('hidden');
    loginButton.classList.add('hidden')
  } else {
    logoutButton.classList.add('hidden');
    loginButton.classList.remove('hidden')
  }
  // 2. if success => get response data 
  // 3. print the username into html   
}