let btnCreate=document.getElementById("btnCreateAccount");
btnCreate.addEventListener('click', () => {
    let txtFirstName=document.getElementById("txtFirstName").value;
    let txtLastName=document.getElementById("txtLastName").value;
    let txtEmail=document.getElementById("txtEmail").value;
    let txtPassword=document.getElementById("txtPassword").value;
    let txtConfirmPassword=document.getElementById("txtConfirmPassword").value;

    if(txtFirstName=="" || txtEmail=="" || txtPassword=="" || txtConfirmPassword==""){
        alert("Name and Email must be filled")
    }
    else{
        if(txtPassword==txtConfirmPassword){
            let emailid = txtEmail.replace(/\./g, "_dot_").replace(/@/g, "_at_");
            let status = "active"
            let timenow = Date.now();
            let role = "admin"
            firebaseConfig.auth().createUserWithEmailAndPassword(txtEmail, txtPassword)
            .then((userCredential) => {
                firebase.database().ref('userDetails/' + emailid).set({
                    FirstName:txtFirstName,
                    LastName:txtLastName,
                    Email:txtEmail,
                    Status:status,
                    CreatedBy:txtEmail,
                    CreatedOn:timenow
                })

            })
            .catch((error) => {
                console.log(error)
                alert(error.message)
            });
        }
        else
            {
            alert("Password do not match")
        }
    }

});