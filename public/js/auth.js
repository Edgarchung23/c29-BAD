function register(){
    let target = document.querySelector("#register_form");
    target.addEventListener("submit", async (e)=>{
        e.preventDefault();
        // console.log("login submit trigged");

        const passwordInput1 = target.passwordInput1.value
        const passwordInput2 = target.passwordInput2.value

        if (passwordInput1 !== passwordInput2) {
            alert("The password is not match")
            return 
        }

        const res = await fetch("/auth/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: target.username.value,
                password: target.passwordInput1.value,
                email: target.email.value,

            })
        });
        const result = await res.json();

        if(res.status == 200){
            console.log(result)
            window.location.href = "/";
            return
        } 

        alert(result.message)
        
    })
}
register()
