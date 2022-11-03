//importaçãodo firebase pra autentificação
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {getFirestore,  doc, getDocs, setDoc, collection, updateDoc} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
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
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore();

function criaproddivs(produtos){


    let htmlaprovado = "";
    let htmlrecusado = "";
    let htmlaprovacao = "";
  
    
    produtos.forEach(Element =>{

        if(Element.status == "aprovacao"){
            htmlaprovacao = htmlaprovacao.concat(
                "<div class=\"pro\">",
                    "<h4 id=\"nomepix\">",Element.nome,"</h4>",
                    "<div class=\"des\">",
                        "<h4 id=\"valor\">",Element.valor,"</h4>",
                        "<h4 id=\"mensagem\">",Element.mensagem,"</h4>",
                    "</div>",
                "</div>"
            );
        }

        else if(Element.status == "aprovado"){
            htmlaprovado = htmlaprovado.concat(
                "<div class=\"pro\">",
                    "<h4 id=\"nomepix\">",Element.nome,"</h4>",
                    "<div class=\"des\">",
                        "<h4 id=\"valor\">",Element.valor,"</h4>",
                        "<h4 id=\"mensagem\">",Element.mensagem,"</h4>",
                    "</div>",
                "</div>"
            );
        }
        else if(Element.status == "recusado"){
            htmlrecusado = htmlrecusado.concat(
                "<div class=\"pro\">",
                    "<h4 id=\"nomepix\">",Element.nome,"</h4>",
                    "<div class=\"des\">",
                        "<h4 id=\"valor\">",Element.valor,"</h4>",
                        "<h4 id=\"mensagem\">",Element.mensagem,"</h4>",
                    "</div>",
                "</div>"
            );
        }
      
    })
  
    document.getElementById("aprovacao").innerHTML = htmlaprovacao;
    document.getElementById("aprovado").innerHTML = htmlaprovado;
    document.getElementById("recusado").innerHTML = htmlrecusado;
  
  }


  async function carregaData(){

    auth.onAuthStateChanged(async (user)=>{
        if(user){

            const querySnapshot = await getDocs(collection(db,"pedidos"));
            let uidconta = user.uid;
            let produtos = [];

            querySnapshot.forEach(doc => {

                if(doc.data().uid == uidconta){
                    produtos.push(doc.data());
                }
                
            });
            criaproddivs(produtos);
    
        }
        else{
          location.replace('login.html');
        }
    })

}

window.onload = carregaData;