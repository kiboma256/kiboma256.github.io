document.addEventListener('DOMContentLoaded', function() {
    const btnCreate = document.getElementById('btnCreateAccount');
    if (!btnCreate) return;

    btnCreate.addEventListener('click', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('txtFirstName').value.trim();
        const lastName = document.getElementById('txtLastName').value.trim();
        const email = document.getElementById('txtEmail').value.trim();
        const password = document.getElementById('txtPassword').value;
        const confirmPwd = document.getElementById('txtConfirmPassword').value;

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

        btnCreate.disabled = true;
        btnCreate.textContent = 'Creating...';

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await firebase.database().ref('userDetails/' + user.uid).set({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Status: 'active',
                Role: 'student',
                CreatedOn: Date.now()
            });

            alert('Account created successfully!');
            window.location.href = 'index.html';
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