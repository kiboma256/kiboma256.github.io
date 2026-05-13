<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register - KIBU Attendance</title>
    <link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>

<div class="main">
    <div class="logo">
        <img src="assets/logo.png" alt="logo" width="100%">
    </div>
    <div class="card">
        <h2>Create Your Account</h2>
        <form id="registerForm">
            <div class="form-group">
                <label>Enter First Name:</label>
                <input type="text" placeholder="First Name" id="txtFirstName" required>
            </div>
            <div class="form-group">
                <label>Enter Last Name:</label>
                <input type="text" placeholder="Last Name" id="txtLastName" required>
            </div>
            <div class="form-group">
                <label>Enter Email:</label>
                <input type="email" placeholder="example@gmail.com" id="txtEmail" required>
            </div>
            <div class="form-group">
                <label>Enter password:</label>
                <input type="password" placeholder="******" id="txtPassword" required>
            </div>
            <div class="form-group">
                <label>Confirm Password:</label>
                <input type="password" placeholder="******" id="txtConfirmPassword" required>
            </div>
            <button type="submit" class="btn-primary" id="btnCreateAccount">Create Account</button>
            <button type="button" class="btn-register"><a href="index.html">Back to Login</a></button>
        </form>
    </div>
</div>

<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-database.js"></script>

<!-- Your Firebase config (make sure this file exists and initializes firebase) -->
<script src="JS/config.js"></script>

<script>
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        const btnCreate = document.getElementById('btnCreateAccount');
        
        btnCreate.addEventListener('click', async (e) => {
            e.preventDefault();  // prevent form submission reload
            
            // Get values
            const firstName = document.getElementById('txtFirstName').value.trim();
            const lastName = document.getElementById('txtLastName').value.trim();
            const email = document.getElementById('txtEmail').value.trim();
            const password = document.getElementById('txtPassword').value;
            const confirmPwd = document.getElementById('txtConfirmPassword').value;
            
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPwd) {
                alert('All fields are required');
                return;
            }
            if (password !== confirmPwd) {
                alert('Passwords do not match');
                return;
            }
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            // Disable button to prevent double submission
            btnCreate.disabled = true;
            btnCreate.textContent = 'Creating...';
            
            try {
                // 1. Create user in Firebase Authentication
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                
                // 2. Save additional user data to Realtime Database using user.uid as key
                await firebase.database().ref('userDetails/' + user.uid).set({
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Status: 'active',
                    Role: 'student',      // or 'admin' if you prefer
                    CreatedOn: Date.now()
                });
                
                alert('Account created successfully!');
                window.location.href = 'index.html';  // redirect to login page
                
            } catch (error) {
                console.error(error);
                let errorMsg = error.message;
                if (error.code === 'auth/email-already-in-use') {
                    errorMsg = 'This email is already registered. Please login.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = 'Please enter a valid email address.';
                }
                alert(errorMsg);
                btnCreate.disabled = false;
                btnCreate.textContent = 'Create Account';
            }
        });
    });
</script>

</body>
</html>