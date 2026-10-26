const arena = document.getElementById("arena");
const cofres = document.querySelectorAll(".cofre");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const cofreFujao = document.querySelector(".fujão");
const botaoNovamente = document.getElementById("TN");
const botaoZerar = document.getElementById("zerar");
const mensagem = document.getElementById("mensagem");
const textoTentativas = document.getElementById("tentativas");
const textoVitorias = document.getElementById("vitorias");

let premio = 0;
let tentativas = 0;
let vitorias = 0;
let rodadaEncerrada = false;
let fugas = 0;

// Sorteia qual cofre guarda o prêmio nesta rodada.
function sortearPremio() {
    premio = Math.floor(Math.random() * 3) + 1;
}

// Executa quando o jogador escolhe um cofre.
// O Cofre 3 foge quando o mouse chega perto, como no Botão Maluco.
function fazerCofreFugir() {
    if (rodadaEncerrada || cofreFujao.disabled) return;

    fugas++;

    const largura = arena.clientWidth - cofreFujao.offsetWidth;
    const altura = arena.clientHeight - cofreFujao.offsetHeight;

    const x = Math.random() * Math.max(0, largura);
    const y = Math.random() * Math.max(0, altura);

    cofreFujao.style.left = x + "px";
    cofreFujao.style.top = y + "px";

    if (fugas === 67) {
        mensagem.textContent = "OMG OMG OMG 67 FUGAS — ABSOLUTE AURA! Agora tenta pegar o cofre!";
    } else {
        mensagem.textContent = "O Cofre 3 está fugindo! Fugas: " + fugas;
    }
}

function abrirCofre(evento) {
    if (rodadaEncerrada) return;

    const escolhido = Number(evento.currentTarget.dataset.cofre);
    tentativas++;
    rodadaEncerrada = true;

    mensagem.className = "mensagem";
    mensagem.textContent = `Você abriu o cofre ${escolhido}!`;

    cofres.forEach((cofre) => {
        cofre.disabled = true;
        const numero = Number(cofre.dataset.cofre);

        if (numero === premio) {
            cofre.classList.add("premiado");
            cofre.textContent = "💎 Cofre " + numero;
        } else {
            cofre.classList.add("vazio");
        }
    });

    if (escolhido === premio) {
        vitorias++;
        mensagem.textContent += " 🎉 Você encontrou o prêmio! Vitória!";
        mensagem.classList.add("vitoria");
    } else {
        mensagem.textContent += " 😢 Esse cofre está vazio! O prêmio estava no cofre " + premio + ".";
        mensagem.classList.add("derrota");
    }

    atualizarPlacar();
}

// Atualiza os contadores que aparecem na página.
function atualizarPlacar() {
    textoTentativas.textContent = tentativas;
    textoVitorias.textContent = vitorias;
}

// Começa uma nova rodada sem apagar os totais.
function jogarNovamente() {
    rodadaEncerrada = false;
    fugas = 0;
    sortearPremio();

    cofres.forEach((cofre) => {
        cofre.disabled = false;
        cofre.classList.remove("premiado", "vazio");
        cofre.style.left = "";
        cofre.style.top = "";
        cofre.innerHTML = `${cofre.dataset.cofre === "1" ? "🟩" : cofre.dataset.cofre === "2" ? "🟨" : "🟦"}<span>Cofre ${cofre.dataset.cofre}</span>`;
    });

    mensagem.className = "mensagem";
    mensagem.textContent = "Nova rodada! Escolha um cofre.";
}

function zerarContadores() {
    tentativas = 0;
    vitorias = 0;
    atualizarPlacar();
    jogarNovamente();
}

c1.addEventListener("click", abrirCofre);
c2.addEventListener("click", abrirCofre);
c3.addEventListener("click", abrirCofre);
c3.addEventListener("mouseenter", fazerCofreFugir);
botaoNovamente.addEventListener("click", jogarNovamente);
botaoZerar.addEventListener("click", zerarContadores);

// Prepara a primeira rodada ao abrir a página.
sortearPremio();
