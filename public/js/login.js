function clientLogin(){
    let target = document.querySelector('#loginFrom');
    target.addEventListener("submit", async (e)=>{
        e.preventDefault();
        console.log("login submit trigged")

        const res = await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                username:target.uname.value,
                password:target.psw.value,
            }),
        });
        if(res.status == 200){
            const result= await res.json();
            
            if (result.isAdmin){
                window.location.href = "private/dashboard.html";
            } else {
                window.location.href = "/";
            }
        }
    })
}
clientLogin()