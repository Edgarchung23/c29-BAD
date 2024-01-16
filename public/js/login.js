  
  function openModal() {
    document.querySelector(".custom-modal").style.display = "block";
  }
  

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
        });
        const result= await res.json();

        if(res.status == 200){            
            if (result.isAdmin){
                window.location.href = "localhost:8100/html/";
            } else {
                window.location.href = "/";
                
            }
            return
        }

        alert(result.message)
    })
}
clientLogin()

