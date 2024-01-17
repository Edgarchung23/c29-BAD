async function collection(){
    try {
        let res = await fetch("/user/collected",{
            method:"POST",
        })
        let result = await res.json();
        let data = result.data

        let collectionHtml =  "";

        for (let batman of data){
        console.log("i am goog people",batman)
                collectionHtml += `
                <div class="collection_div">
                    <div>${batman.name}</div>
                </div>`
            
        console.log("u a not bat man:",collectionHtml)
        }
        document.querySelector("").innerHTML = collectionHtml;

    }catch(error){
        
    }
}

collection()