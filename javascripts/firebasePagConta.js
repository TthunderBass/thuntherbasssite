
//importaçãodo firebase pra autentificação
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth ,GoogleAuthProvider, signOut} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";


// inicializando firebase
const firebaseConfig = {
    apiKey: "AIzaSyB1WdQN7XNUbQPBSx_Blr7Wn_q55iTF9JI",
    authDomain: "thunderbassdatas.firebaseapp.com",
    projectId: "thunderbassdatas",
    storageBucket: "thunderbassdatas.appspot.com",
    messagingSenderId: "1022447070081",
    appId: "1:1022447070081:web:648fe00601e99f44ed1680",
    measurementId: "G-TWJKPB37W8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);


//todos os get elements by ids
const btnlogout = document.getElementById("logginbuutton");
const insertuserhtml = document.getElementById("h1home");



auth.onAuthStateChanged((user)=>{
    if(!user){
    location.replace('login.html');
    }
    else{
        const username = user.displayName;
        insertuserhtml.innerText = username;
    }
})

function deslogar(){
    signOut(auth).then(() => {
        location.replace('Index.html');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage);
      });
}

btnlogout.addEventListener('click',(e) =>{

    deslogar();
})

