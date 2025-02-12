window.addEventListener('load', () => {
  fetchBooks();
})
async function fetchBooks() {
  try {
    let res = await fetch("/chapter/books", {
      method: "GET",
    });

    let result = await res.json();
    let data = result.data;

    let homeHTML = "";
    for (let book of data) {
      homeHTML += `
            <div class="card"> 
           <a href="../html/reader.html?book=${book.name}"><img src="${book.book_cover}" id="bookPh" /></a>
        </div>
            `;
    }

    // Assuming you have a container in your HTML where you want to display the books
    document.querySelector(".books-container").innerHTML = homeHTML;
    if (res.ok) {
      const body = document.querySelector(".body-container")
      body.classList.add('body-container-visible')
      console.log(body)
    }
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
}
// Call the fetchBooks function to initiate the fetch and update the HTML
