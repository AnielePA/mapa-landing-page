
//função para abrir o menu dropdown e fechar:

let menuList = document.getElementById("menuList")
menuList.style.maxHeight = "0px";


function toggleMenu() {
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "300px";
    } else {
        menuList.style.maxHeight = "0px";
    }
}



//encontrar todas as curiosidades e os botões de próximo e anterior:
const curiosidades = document.querySelectorAll('.curiosity-item');
const botaoProximo = document.getElementById('botaoProximo');
const botaoAnterior = document.getElementById('botaoAnterior');

//contador para ver qual curiosidade está sendo mostrada no momento:
let indiceAtual = 0;


//função que passa para próxima curiosidade:
function mostrarProximaCuriosidade() {
    curiosidades[indiceAtual].classList.remove('active');
    indiceAtual++;

    if (indiceAtual >= curiosidades.length) {
        indiceAtual = 0;
    }

    curiosidades[indiceAtual].classList.add('active');
}

//função que passa para a curiosidade anterior:
function mostrarCuriosidadeAnterior() {
    curiosidades[indiceAtual].classList.remove('active');

    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = curiosidades.length - 1;
    }

    curiosidades[indiceAtual].classList.add('active');
}

//para os botões chamarem suas funções quando forem clicados:
botaoProximo.addEventListener('click', mostrarProximaCuriosidade);
botaoAnterior.addEventListener('click', mostrarCuriosidadeAnterior);



//função para saber o ano atual e atualizar o texto interno do <span> (encontrado pelo id) no footer:

function atualAno() {
    const anoAtual = new Date().getFullYear();
    return anoAtual;
}

document.addEventListener('DOMContentLoaded', () => {
    const elementoAno = document.getElementById('ano-copyright');

    if (elementoAno) {
        elementoAno.textContent = atualAno();
    }
});