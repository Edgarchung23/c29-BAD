async function fetchBooks() {
    try {
        let res = await fetch("/chapter/books", {
            method: "GET"
        });

        let result = await res.json();
        let data = result.data;

        console.log("fetch result:", data);


        let homeHTML = "";

        for (let book of data) {
            if(book.category == "文學"){
            console.log(book.category)
            console.log(book.book_cover)
            homeHTML += `
            <div class="card"> 
           <a href="../html/reader.html?book=${book.name}"><img src="${book.book_cover}" id="bookPh" /></a>
        </div>
            `}
        }

         // Assuming you have a container in your HTML where you want to display the books
         document.querySelector(".books-container").innerHTML = homeHTML;

    } catch (error) {
        console.error("Error fetching books:", error.message);
    }



}
// Call the fetchBooks function to initiate the fetch and update the HTML
fetchBooks();