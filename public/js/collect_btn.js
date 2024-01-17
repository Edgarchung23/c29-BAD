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
        // console.log("answer:",result)
        if(res.status == 200){
            // alert(result.message)
            return
        }

        }catch(error){
            
        }

    }


collectBtn();