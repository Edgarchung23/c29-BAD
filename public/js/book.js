async function fetchBooks() {
    try {
        let res = await fetch("/chapter/reader", {
            method: "GET"
        });

        let result = await res.json();

        console.log("fetch result:", result.data);


        let homeHTML = "";

        for (let book of result.data) {
            console.log(book.book_cover)
            homeHTML += `
            <div class="card"> 
           <a href="../html/reader.html?book=${book.name}"><img src="${book.book_cover}" id="bookPh" /></a>
        </div>
            `
        }

         // Assuming you have a container in your HTML where you want to display the books
         document.querySelector(".books-container").innerHTML = homeHTML;

        // for (let book of result.data) {
        //     // Create a card element for each book
        //     let card = document.createElement("div");
        //     card.classList.add("card");

        //     // Create elements for book details (you can customize this part)
        //     let title = document.createElement("h2");
        //     title.textContent = book.name;

        //     let cover = document.createElement("img");
        //     cover.src = decodeURIComponent(book.book_cover); // Assuming your book object has a 'cover' property

        //     // Append book details to the card
        //     card.appendChild(title);
        //     card.appendChild(cover);

        //     // Append the card to the books container
        //     booksContainer.appendChild(card);
        // }
    } catch (error) {
        console.error("Error fetching books:", error.message);
    }



}
// Call the fetchBooks function to initiate the fetch and update the HTML
fetchBooks();



