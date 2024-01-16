

window.onload = async ()=>{
    getUsername();
    fetchData();
    init();
  }

async function fetchData() {
    try {
      let res = await fetch("/chapter/reader", {
        method: "GET"
      });

      let result = await res.json();

      console.log("fetch data:", result.data);

      // Return the result.data, not the entire result
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error; // Re-throw the error to handle it at a higher level
    }
  }

  async function init() {
    try {
      const data = await fetchData();

      const queryString = window.location.search;
      console.log(queryString);
      const urlParams = new URLSearchParams(queryString);
      const book = urlParams.get('book');
      console.log(book);
      document.querySelector(".textTitle").innerHTML = book;



      let bookUrl = `https://c29-bad-grp3.yodaandkeungjai.com/${book}.epub`;
      // let bookUrl = `http://localhost:8100/${book}.epub`;
      let epubReader = ePub(bookUrl);
      var rendition = epubReader.renderTo("reader", { flow: "paginated", width: "700", height: "700", allowScriptedContent: true });
      var displayed = rendition.display();

      var prev = document.getElementById("prev");
      prev.addEventListener("click", function (e) {
        rendition.prev()
        e.preventDefault();
      }, false);

      var next = document.getElementById("next");

      next.addEventListener("click", function (e) {
        console.log(epubReader.package.metadata.direction)
        console.log(rendition)
        rendition.next()
        e.preventDefault();
        console.log("123")
      }, false);

    } catch (e) {
      alert("error 1" + e);
    }
  }

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

