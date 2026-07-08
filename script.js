const cartas=[
...personagens,
...virtudes,
...acoes,
...missoes
];

let atual=0;

const personagensDiv=document.querySelector("#personagens .gallery");
const virtudesDiv=document.querySelector("#virtudes .gallery");
const acoesDiv=document.querySelector("#acoes .gallery");
const missoesDiv=document.querySelector("#missoes .gallery");

const modal=document.getElementById("modal");
const bigCard=document.getElementById("bigCard");

const nomeCarta=document.getElementById("nomeCarta");
const ordemCarta=document.getElementById("ordemCarta");
const raridadeCarta=document.getElementById("raridadeCarta");
const historiaCarta=document.getElementById("historiaCarta");
const representacaoCarta=document.getElementById("representacaoCarta");
const efeitoCarta=document.getElementById("efeitoCarta");

const closeBtn=document.getElementById("close");
const nextBtn=document.getElementById("next");
const prevBtn=document.getElementById("prev");

const search=document.getElementById("search");
const listaDecks=document.getElementById("listaDecks");

function criarCarta(carta,i){

const div=document.createElement("div");

div.className="card";

div.innerHTML=`
<img src="${carta.imagem}">
<h3>${carta.nome}</h3>
`;

div.onclick=()=>abrir(i);

return div;

}


function limparGaleria(galeria){

galeria.innerHTML="";

}


function carregarColecao(lista,galeria){

limparGaleria(galeria);

lista.forEach(carta=>{

const indice=cartas.indexOf(carta);

galeria.appendChild(

criarCarta(carta,indice)

);

});

}


function filtrarPersonagens(ordem){

limparGaleria(personagensDiv);

personagens.forEach(carta=>{

if(

ordem==="todos"

||

carta.ordem===ordem

){

const indice=cartas.indexOf(carta);

personagensDiv.appendChild(

criarCarta(carta,indice)

);

}

});

}


function filtrarAcoes(categoria){

limparGaleria(acoesDiv);

acoes.forEach(carta=>{

if(

categoria==="todos"

||

carta.categoria===categoria

){

const indice=cartas.indexOf(carta);

acoesDiv.appendChild(

criarCarta(carta,indice)

);

}

});

}

function filtrarVirtudes(categoria){

limparGaleria(virtudesDiv);

virtudes.forEach(carta=>{

if(

categoria==="todos"

||

carta.categoria===categoria

){

const indice=cartas.indexOf(carta);

virtudesDiv.appendChild(

criarCarta(carta,indice)

);

}

});

}

function carregarDecks(){

    listaDecks.innerHTML="";

    decks.forEach(deck=>{

        const div=document.createElement("div");

        div.className="deck";

        div.innerHTML=`

            <h2>${deck.nome}</h2>

            <h3>Personagens (16)</h3>
            <ul>
                ${deck.personagens.map(c=>`<li>${c}</li>`).join("")}
            </ul>

            <h3>Ações (8)</h3>
            <ul>
                ${deck.acoes.map(c=>`<li>${c}</li>`).join("")}
            </ul>

            <h3>Virtudes (6)</h3>
            <ul>
                ${deck.virtudes.map(c=>`<li>${c}</li>`).join("")}
            </ul>

        `;

        listaDecks.appendChild(div);

    });

}

function abrir(i){

atual=i;

const carta=cartas[i];

bigCard.src=carta.imagem;

nomeCarta.textContent=carta.nome;

ordemCarta.textContent=

carta.ordem ||

carta.categoria ||

carta.dificuldade ||

"";

raridadeCarta.textContent=

carta.raridade ||

"";

historiaCarta.textContent =
carta.historia || "";

representacaoCarta.textContent =
carta.representacao || "";

"";

modal.style.display="flex";

}


function fechar(){

modal.style.display="none";

}


function proxima(){

atual++;

if(atual>=cartas.length){

atual=0;

}

abrir(atual);

}


function anterior(){

atual--;

if(atual<0){

atual=cartas.length-1;

}

abrir(atual);

}


function mostrar(id){

document.querySelectorAll("section")

.forEach(sec=>{

sec.classList.remove("active");

});

document.getElementById(id)

.classList.add("active");

}


closeBtn.onclick=fechar;
nextBtn.onclick=proxima;
prevBtn.onclick=anterior;


modal.onclick=(e)=>{

if(e.target===modal){

fechar();

}

};

function abrirRegra(id){

document.querySelectorAll(".regra").forEach(regra=>{

regra.classList.remove("active");

});

document.getElementById(id).classList.add("active");

}

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

fechar();

}

if(e.key==="ArrowRight"){

proxima();

}

if(e.key==="ArrowLeft"){

anterior();

}

});


search.addEventListener("input",(e)=>{

const texto=e.target.value.toLowerCase();

document.querySelectorAll(".card")

.forEach(card=>{

const nome=

card.querySelector("h3")

.textContent

.toLowerCase();

card.style.display=

nome.includes(texto)

?

"block"

:

"none";

});

});


window.addEventListener("load",()=>{

filtrarPersonagens("todos");

filtrarAcoes("todos");

filtrarVirtudes("todos");

carregarColecao(missoes, missoesDiv);

carregarDecks();

mostrar("personagens");

});