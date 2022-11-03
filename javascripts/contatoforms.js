

//importaçãodo firebase pra autentificação
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {getFirestore,  doc, setDoc} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

window.enviar = enviar;
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
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();


let nome = document.getElementById("nome");
let email = document.getElementById("email");
let telefone = document.getElementById("telefone");
let mensagem = document.getElementById("mensagem");

// adicionar documentos no banco 
async function enviar(){

    const ref = doc(db, "Contato", nome.value);
    await setDoc(
        ref, {
            nome: nome.value,
            email: email.value,
            telefone: telefone.value,
            mensagem: mensagem.value,
        }
    ).then(()=>{
        location.replace("Index.html")
    }).catch((error)=>{
        alert("erro entrar em contato: \n" + error);
    });

}