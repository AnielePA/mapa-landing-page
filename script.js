let menuList = document.getElementById("menuList")
menuList.style.maxHeight = "0px";


function toggleMenu() {
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "300px";
    } else {
        menuList.style.maxHeight = "0px";
    }
}



// 1. Encontrar todas as nossas "curiosidades" (que agora são articles).
// O detetive agora procura por '.curiosity-item'
const curiosidades = document.querySelectorAll('.curiosity-item');

// 2. Encontrar o botão "Próximo" e o botão "Anterior".
const botaoProximo = document.getElementById('botaoProximo');
const botaoAnterior = document.getElementById('botaoAnterior');

// 3. Nosso contador para saber qual curiosidade está aparecendo.
let indiceAtual = 0;

// 4. A função para ir para a PRÓXIMA curiosidade.
function mostrarProximaCuriosidade() {
    // Esconde a curiosidade atual.
    curiosidades[indiceAtual].classList.remove('active');

    // Avança para o próximo número.
    indiceAtual++;

    // Se chegou no final, volta para a primeira.
    if (indiceAtual >= curiosidades.length) {
        indiceAtual = 0;
    }

    // Mostra a nova curiosidade.
    curiosidades[indiceAtual].classList.add('active');
}

// 5. A função para ir para a curiosidade ANTERIOR.
function mostrarCuriosidadeAnterior() {
    // Esconde a curiosidade atual.
    curiosidades[indiceAtual].classList.remove('active');

    // Volta para o número anterior.
    indiceAtual--;

    // Se tentou ir antes da primeira, volta para a última.
    if (indiceAtual < 0) {
        indiceAtual = curiosidades.length - 1;
    }

    // Mostra a nova curiosidade.
    curiosidades[indiceAtual].classList.add('active');
}

// 6. Dizer aos botões para chamar suas funções quando forem clicados.
botaoProximo.addEventListener('click', mostrarProximaCuriosidade);
botaoAnterior.addEventListener('click', mostrarCuriosidadeAnterior);