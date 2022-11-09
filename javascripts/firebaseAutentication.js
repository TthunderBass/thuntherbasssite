
//importaçãodo firebase pra autentificação
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth ,GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {getFirestore,  doc, setDoc} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";


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
const db = getFirestore();


//todos os get elements by ids
const btnlogin = document.getElementById("logginbuutton");


async function criadbUser(usuario){

  const ref = doc(db, "usuariosdb", usuario);
  const usuariodb = await setDoc(
      ref, {
        btncompra: "Thunder Bass Fest Gold Premium",
        username: usuario,
      }
  ).then(()=>{
      location.replace("Index.html");
  }).catch((error)=>{
      alert("erro ao criar usuario: \n" + error);
  });
}

//todas as funções do site com firebase
function login(){
  signInWithPopup(auth, provider).then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    

    criadbUser(user.displayName);

  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    alert(errorMessage);
  });
}

//todos os eventlistener que utilizam firebase

//clique do botão logar com o google
btnlogin.addEventListener('click',(e) =>{

  login();
})


