function register(){
    let target = document.querySelector("#register_form");
    target.addEventListener("submit", async (e)=>{
        e.preventDefault();
        console.log("login submit trigged");

        const res = await fetch("/action_register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: target.username.value,
                password: target.psw.value,
                email: target.email.value,

            })
        });
        if(res.status == 200){
            const result = await res.json();
            console.log(result)

            window.location.href = "/";
        }
    })
}
register()

function clientLogin(){
    let target = document.querySelector('')
}