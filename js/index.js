const arena = document.getElementById("arena");
const cofres = document.querySelectorAll(".cofre");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const botaoNovamente = document.getElementById("TN");
const botaoZerar = document.getElementById("zerar");
const mensagem = document.getElementById("mensagem");
const textoTentativas = document.getElementById("tentativas");
const textoVitorias = document.getElementById("vitorias");

let premio = 0;
let tentativas = 0;
let vitorias = 0;
let rodadaEncerrada = false;


function sortearPremio() {
    premio = Math.floor(Math.random() * 3) + 1;
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

        if (numero == premio) {
            cofre.classList.add("premiado");
            cofre.textContent = "💎 Cofre " + numero;
        } else {
            cofre.classList.add("vazio");
        }
    });

    if (escolhido == premio) {
        vitorias++;
        mensagem.textContent += " 🎉 Você encontrou o prêmio! Vitória!";
        mensagem.classList.add("vitoria");
    } else {
        mensagem.textContent += " 😢 Esse cofre está vazio! O prêmio estava no cofre " + premio + ".";
        mensagem.classList.add("derrota");
    }

    atualizarPlacar();
}


function atualizarPlacar() {
    textoTentativas.textContent = tentativas;
    textoVitorias.textContent = vitorias;
}

function jogarNovamente() {
    rodadaEncerrada = false;
    sortearPremio();

    cofres.forEach((cofre) => {
        cofre.disabled = false;
        cofre.classList.remove("premiado", "vazio");
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
botaoNovamente.addEventListener("click", jogarNovamente);
botaoZerar.addEventListener("click", zerarContadores);


sortearPremio();
