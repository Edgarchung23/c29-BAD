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
        for(let ironMan of result){

            console.log("answer:",ironMan)
        }
        
        if(res.status == 200){
            alert({massage:Collected})
            return
        }

        }catch(error){}

    }


collectBtn();