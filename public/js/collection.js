async function collection() {
  try {
    let res = await fetch("/user/collected", {
      method: "POST",
    });
    let result = await res.json();
    
    let data = result.data;

    let collectionHtml = "";

    for (let batman of data) {
        console.log(batman)
      collectionHtml += `
                <div class="card">
                <a href="../html/reader.html?book=${batman.name}"><img src="${batman.book_cover}" id="bookPh" /></a>
                <a class="cancelCollect"><img src="../assets/multiply.png" id="cancelCollectBtn" onclick="cancelCollect(${batman.book_id})"></a>
                </div>`;
    }
    document.querySelector(".books-container").innerHTML = collectionHtml;
    
  } catch (error) {}
}

collection();

async function cancelCollect(value) {
    // console.log(JSON.stringify(value))
//   try {
    // let target = document.querySelector("#cancelCollect");
    // target.addEventListener("click", async (e)=>{
    //     e.preventDefault();
    //     console.log("123")
    //     console.log("Do you feel the button:",target)
    // })
    
    let result = await fetch("/user/cancelCollect", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: value,
      }),
    });
    if (result.ok) {
        // console.log("123")
        collection()
    }
    // console.log(result);
//   } catch (error) {}
}

cancelCollect();
