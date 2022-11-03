
//importaçãodo firebase pra autentificação
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth ,GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";


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
const accountheader = document.getElementById("loginheader");
const account = document.getElementById("car");



function checklogin(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        location.replace('conta.html');
      }
      else{
        location.replace('login.html');
      }
    })
}


//clique do botão icone usuario no header
accountheader.addEventListener('click',(e) =>{

    checklogin();
})
account.addEventListener('click',(e) =>{

    checklogin();
})
