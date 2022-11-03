

//importaçãodo firebase pra autentificação
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {getFirestore, doc, getDocs,  setDoc, collection} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

import { QrCodePix } from "https://cdn.skypack.dev/qrcode-pix@5.0.0";

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
let uidconta, nomeProduto, valorProduto;
let clickbtn = false;


function criahtml(nome, valor, desc, linkA,linkB,linkC){

    let html = "";

    html = html.concat(
        

        "<div  id=\"tituloProd\" class=\"pro-container\">",
        nome,
        "<br>",
        "VALOR: R$ ",
        valor,
        "</div>",

        "<div id=\"descricao\">",
            "<h4>",
                desc,
            "</h4>",
        "</div>",

    );

    document.getElementById("conteudopagcompra").innerHTML = html;


    let imgprincipal = "";

    imgprincipal = imgprincipal.concat(
        

        "<img  id=\"imgprincipalmuda\" class=\"imagemcompras\" src=\""+linkA+"\">",

    );

    document.getElementById("imagemprincipal").innerHTML = imgprincipal;



    let htmlimg = "";

    htmlimg = htmlimg.concat(
        

        "<div id=\"imagemA\">",
            "<img onclick=\"mudaImg('"+linkA+"')\" class=\"imagemcompras imagensABC\" src=\""+linkA+"\">",
        "</div>",

        "<div id=\"imagemB\">",
            "<img onclick=\"mudaImg('"+linkB+"')\" class=\"imagemcompras imagensABC\" src=\""+linkB+"\">",
        "</div>",

        "<div id=\"imagemC\">",
            "<img onclick=\"mudaImg('"+linkC+"')\" class=\"imagemcompras imagensABC\" src=\""+linkC+"\">",
        "</div>",


    );

    document.getElementById("imagemABC").innerHTML = htmlimg;


    const qrCodePix = QrCodePix({
        version: '01',
        key: '119c8e19-df79-4eb4-9823-c9d30bdfdad8',
        name: 'Guilherme Reis Queiroz de Souza',
        city: 'SAO PAULO',
        message: nome,
        value: parseFloat(valor),
    });
    
    qrCodePix.base64().then((res) => {
        console.log(res);
        document.getElementById('codigoQR').innerHTML =  '<img id="codigoPagamento" src="'+res+'" />';
    });
}

async function puxaDadosProdutos(nome){

    let nomeprod = nome;
    let valor,desc,linkA,linkB,linkC;

    const prod = await getDocs(collection(db,"ProdutosLoja"));

    prod.forEach(doc => {

        if(doc.id == nomeprod){
            valor = doc.data().valor;
            linkA = doc.data().linkImg;
        }

    });

    const descprod = await getDocs(collection(db,"ComprasLojaDesc"));

    descprod.forEach(doc => {

        if(doc.id == nomeprod){
            desc = doc.data().descricaoCompra;
        }

    });

    const imagemBCprod = await getDocs(collection(db,"ComprasLojaImg"));

    imagemBCprod.forEach(doc => {

        if(doc.id == nomeprod){
            linkB = doc.data().linkImgB;
            linkC = doc.data().linkImgC;
        }

    });

    criahtml(nomeprod,valor,desc,linkA,linkB,linkC);
    nomeProduto = nomeprod;
    valorProduto = valor;
}

async function confirmaCompra(){

    if (clickbtn){
        
        const ref = doc(collection(db,"pedidos"));

        const docref = await setDoc(
            ref, {
                nome: nomeProduto,
                valor: valorProduto,
                mensagem: "",
                status: "aprovacao",
                uid: uidconta,
                nomeContaPix: document.getElementById("nomeContaPix").value
            }
        ).then(()=>{
            location.replace("conta.html");
        }).catch((error)=>{
            clickbtn = false;
            alert("erro ao Processar pagamento, tente novamente mais tarde");
        });
    }
}

document.getElementById("botaoCompra").addEventListener('click',(e) =>{
    clickbtn = true;
    confirmaCompra();
})

document.getElementById("codigoQR").addEventListener('click',(e) =>{
        
        // Get the text field
        var copyText = "119c8e19-df79-4eb4-9823-c9d30bdfdad8";
      
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText);
      
        // Alert the copied text
        document.getElementById("mensagemcopiaQR").innerHTML= "Chave Aleatória pix Copiada!";
        document.getElementById("mensagemcopiaQR").classList.add("copiou");
})


async function carregaData(){

    auth.onAuthStateChanged(async (user)=>{
        if(user){

            const buttonCompra = await getDocs(collection(db,"usuariosdb"));
            uidconta = user.uid;

            buttonCompra.forEach(doc => {

                if(doc.data().username == user.displayName){
                    puxaDadosProdutos(doc.data().btncompra);
                }
        
            });
    
        }
        else{
          location.replace('login.html');
        }
    })

}

window.onload = carregaData;
