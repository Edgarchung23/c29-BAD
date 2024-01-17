

function clientLogin(){
    let target = document.querySelector('#login-form');
    target.addEventListener("submit", async (e)=>{
        e.preventDefault();
        console.log("login submit trigged")

        const res = await fetch("/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:e.target.email.value,
                password:e.target.password.value,
            }),
        }
        );
        
        const result= await res.json();

        if(res.status == 200){     
            swal.fire("Hello ~", result.message)   
            if (result.isAdmin){
                window.location.href = "https://c29-bad-grp3.yodaandkeungjai.com/";
            } else {
                window.location.href = "/";
                swal.fire("Error... ", result.message);
            }
            return
        }
        swal.fire("Error...", result.message,"error");

    })
}
clientLogin()

