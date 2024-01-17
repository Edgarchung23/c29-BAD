async function collectBtn (){
    try{
        const queryString = window.location.search

        const urlParams = new URLSearchParams(queryString);

        const book = urlParams.get('book');

        const res = await fetch("/user/collection",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                book_id: book
            })
        })
        const result = await res.json();
        // for(let batman of result){
        //     console.log("answer:",batman.id)
        //     if(batman.id == batman.id){
        //         alert("Collected")
            
        //         }
        //     }
        //     console.log("1213")
            
        
        if(res.status == 200){
            return
        }

        }catch(error){}
    }


collectBtn();

function alert() {
    swal.fire("Success", "Book has been collected", "success");
}