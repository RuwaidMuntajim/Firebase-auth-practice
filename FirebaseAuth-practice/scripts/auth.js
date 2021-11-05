// reference
const signUp = document.querySelector('#signup');
const logIn = document.querySelector('#login');
const logOut = document.querySelector('.logout-btn');
const logOutDiv = document.querySelector('.logoutbtn')
// auth state 
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        renderUI(user);
        logOutDiv.style.display = 'block';
        dreamFormInteraction(user);
    } else {
        renderUI();
        logOutDiv.style.display = 'none';
    }
})

// sign up
signUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signUp['email-input'].value;
    const password = signUp['password-input'].value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
    })
    signUp['email-input'].value = "";
    signUp['password-input'].value = "";
})
// log in
logIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = logIn['email-input'].value;
    const password = logIn['password-input'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
    })
    logIn['email-input'].value = "";
    logIn['password-input'].value = "";
})

logOut.addEventListener('click', () => {
    auth.signOut();
})
