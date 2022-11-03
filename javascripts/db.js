

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

//carregando os produtos do banco de dados

function criaproddivs(produtos){


  let html = "";

  
  produtos.forEach(Element =>{

    html = html.concat(
        "<div class= \"pro\">",
                "<img src=\""+Element.linkImg+"\" alt=\"imagem do produto\">",
                "<div class=\"des\">",
                    "<span>", Element.nome,"</span>",
                    "<h5>", Element.descricao,"</h5>",
                    "<h4>", Element.valor,"</h4>",
                "</div>",
                "<a onclick=\"compra('"+Element.nome+"')\" class=\"botaocompra\"> <i class=\"fa-solid fa-cart-shopping cart\"></i></a>",
        "</div>"
        );
    
  })

    document.getElementById("bancoProd").innerHTML = html;

}


 export async function btnCompra(produto){
    
    auth.onAuthStateChanged((user)=>{
        if(!user){
        location.replace('login.html');
        }
        else{


            const ref = doc(db,"usuariosdb", user.displayName);
            updateDoc(ref,{
                btncompra: produto
            }).then(()=>{
                location.replace("compra.html")
            }).catch((error)=>{
                alert("falha na compra")
            });
        }
    })

}


async function carregaData(){
    const querySnapshot = await getDocs(collection(db,"ProdutosLoja"));

    var produtos = [];

    querySnapshot.forEach(doc => {
        produtos.push(doc.data())
        
    });
    criaproddivs(produtos);

}

window.onload = carregaData;
