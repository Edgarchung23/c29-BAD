async function collection() {
  try {
    let res = await fetch("/user/collected", {
      method: "POST",
    });
    let result = await res.json();
    
    let data = result.data;

    let collectionHtml = "";

    for (let batman of data) {
      console.log("i am goog people", batman);
      collectionHtml += `
                <div class="collection_div">
                <a href="../html/reader.html?book=${batman.name}"><img src="${batman.book_cover}" id="bookPh" /></a>
                <div class="cancelCollect"><button>collect<button></div>
                </div>`;

      console.log("u a not bat man:", collectionHtml);

    }
    document.querySelector(".books-container").innerHTML = collectionHtml;
    
  } catch (error) {}
}

collection();

async function cancelCollect (){
    try{
        
        let res = await fetch("/user/cancelCollect",{
            method:"DELETE",
        })
        if(res.ok) {
          Swal.fire("Success", "Book has been uncollected", "success");
        } else {
          Swal.fire("Error", "Failed to uncollect book", "error");
        }
    }catch(error){
        console.error(error);
    }
}