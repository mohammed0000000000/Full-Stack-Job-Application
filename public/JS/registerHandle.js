const submitBtnDom = document.getElementById('submit-form-btn');
const userFormDOM = document.querySelector(".register-form");
const userNameDom = document.getElementById("name");
const userEmailDom = document.getElementById("email");
const userPasswordDom = document.getElementById("password");



userFormDOM.addEventListener("submit", async (e) =>{
    submitBtnDom.textContent = "Loading...";
    e.preventDefault();
    try{
        const userName = userNameDom.value;
        const userEmail = userEmailDom.value;
        const userPassword = userPasswordDom.value;

        // console.log(userName,userPassword, userEmail);
        const data = await axios.post(`/api/v1/auth/register`,{
            name:userName,
            email:userEmail,
            password:userPassword,
        });
    }
    catch (err) {
        console.log(err)
    }
})