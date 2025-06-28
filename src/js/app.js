
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


//---------Botões da seção de curiosidade---------


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




//---------Validações do forumlário de contato---------

function validarFormulario() {
    let nome = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mensagem = document.getElementById('message').value;

    let erroNome = document.getElementById('erro-nome');
    let erroEmail = document.getElementById('erro-email');
    let erroMensagem = document.getElementById('erro-mensagem');

    //para limpar mensagens de erros anteriores
    erroNome.textContent = '';
    erroEmail.textContent = '';
    erroMensagem.textContent = '';

    let formValido = true;


    //validando nome para que tenha 2 palavras com no mínimo 2 letras cada, e sem caracteres diferentes
    const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
    if (nome.length < 4 || !nomeValido.test(nome)) {
        erroNome.textContent = 'Por favor, insira seu nome completo (mínimo de 4 caracteres e duas palavras).';
        formValido = false;
    }

    //validando formato de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
        erroEmail.textContent = 'Por favor, insira um endereço de e-mail válido (ex: seuemail@dominio.com).';
        formValido = false;
    }

    //validando mensagem para que tenha o tamanho mínimo de 10 caracteres
    if (mensagem.length < 10) {
        erroMensagem.textContent = 'A mensagem deve ter no mínimo 10 caracteres.';
        formValido = false;
    }

    //se o formulário não estiver de acordo com essas regras, não é enviado
    if (!formValido) {
        return false;
    }

    //se estiver ok, permite o envio do formulário
    alert('Formulário enviado com sucesso!');
    return true;
}




//---------Animações--------- 

//essa linha: document.addEventListener('DOMContentLoaded', function ()) 
//serve para garantir que o código só será executado quando todo o HTML já tiver sido carregado
document.addEventListener('DOMContentLoaded', function () {
    const containerHero = document.querySelector('.container-hero');
    const mainNav = document.querySelector('nav');

    setTimeout(() => {
        //adicionando a classe active para o container do hero

        if (containerHero) {
            containerHero.classList.add('active');
        }

        //adcionando a classe active para a barra de navegação
        if (mainNav) {
            mainNav.classList.add('active');
        }
    }, 50);




    //função para criar pontinhos de luz em movimento como background 
    function criarParticulaDeAnimacao(containerId, canvasId) {
        const containerElement = document.getElementById(containerId);
        const canvasElement = document.getElementById(canvasId);

        //se não achar os elementos, mostra um erro
        if (!containerElement || !canvasElement) {
            console.error(`Elementos #${containerId} ou #${canvasId} não encontrados. A animação de partículas não será iniciada para esta seção.`);
            return;
        }

        const ctx = canvasElement.getContext('2d');

        //variáveis para guardar a largura e altura do canvas, e um array para guardar os pontinhos
        let width, height;
        let particles = [];

        //para configurar os pontinhos
        const numParticles = 60;
        const particleColor = 'rgba(255, 255, 255, 0.24)';
        const particleMinSize = 1.5;
        const particleMaxSize = 4;
        const particleSpeed = 0.2;

        //função para ajustar o tamanho do canvas de acordo com seu elemento pai
        function resizeCanvas() {
            width = containerElement.offsetWidth;
            height = containerElement.offsetHeight;
            canvasElement.width = width;
            canvasElement.height = height;
            initializeParticles();
        }

        //função pra criar apenas um pontinho em posição aleatória
        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * (particleMaxSize - particleMinSize) + particleMinSize,
                vx: (Math.random() - 0.5) * particleSpeed,
                vy: (Math.random() - 0.5) * particleSpeed
            };
        }

        //função para criar os primeiros pontinhos e apagar os antigos
        function initializeParticles() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(createParticle());
            }
        }

        //função que vai desenhar os pontinhos 
        function drawParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                //para fazer os pontinhos aparecerem do outro lado dela, se eles saírem
                if (p.x < 0 - p.radius) p.x = width + p.radius;
                if (p.x > width + p.radius) p.x = 0 - p.radius;
                if (p.y < 0 - p.radius) p.y = height + p.radius;
                if (p.y > height + p.radius) p.y = 0 - p.radius;
            });

            requestAnimationFrame(drawParticles);
        }

        // inicia a animação
        resizeCanvas();
        initializeParticles();
        drawParticles();

        //para redimensionar o canvas se a janela mudar de tamanho
        window.addEventListener('resize', resizeCanvas);
    }

    //chamando a função para as seções que quero adicionar as partículas
    criarParticulaDeAnimacao('contato', 'particle-canvas');
    criarParticulaDeAnimacao('main-footer', 'footer-particle-canvas');



    //animação dos elementos das seções ao rolar a página
    const mainAnimatedItems = document.querySelectorAll('.animated-main-item');


    const regrasParaAparecer = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.02
    };


    const observador = new IntersectionObserver((entries, observadorCallback) => {
        observadorCallback
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observadorCallback.unobserve(entry.target);
            }
        });
    }, regrasParaAparecer);


    //regra para cada item que tem a classe de animação receber a classe active
    //para fazer o efeito da animação funcionar 
    mainAnimatedItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 150}ms`;
        observador.observe(item);
    });
});




