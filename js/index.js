const perguntaH1 = document.querySelector("#pergunta");
const respostasDiv = document.querySelector("#respostas");
const proximaQuestao = document.querySelector("#proxima-questao");
const perguntaRespostasDiv = document.querySelector("#pergunta-respostas-div");
const scoreDiv = document.querySelector("#score-div");
const scoreSpan = document.querySelector("#score");
const novoJogo = document.querySelector("#novo-jogo");
const novaPergunta = document.querySelector("#nova-pergunta");
const recordSpan = document.querySelector("#record");
const btnDeletar = document.querySelector("#btnDeletar");

const perguntasFeitas = [];

let score = 0;
let randomArr = [];
let randomAns = [];
let record = localStorage.getItem("record");

getData();

proximaQuestao.addEventListener("click", () => {
    proximaQuestao.classList.add("hidden");
    getData();
});
novoJogo.addEventListener("click", () => location.reload());
novaPergunta.addEventListener(
    "click",
    () => (location.href = "../html/add.html")
);

async function getData() {
    randomArr = [];
    randomAns = [];

    for (let i = 0; randomArr.length < 4; i++) {
        const randomNum = Math.floor(Math.random() * 4);

        if (!randomArr.includes(randomNum)) {
            randomArr.push(randomNum);
        }
    }

    const response = await fetch(`https://quizapi-mauve.vercel.app/random`);
    const data = await response.json();
    const { pergunta, respostas, l } = data;
    const { pergunta: p } = pergunta;
    const r = respostas.map((el) => el);
    const { id } = pergunta;

    putData(p, r, l, id);
}

function putData(p, r, l, id) {
    if (!perguntasFeitas.includes(p)) {
        perguntasFeitas.push(p);

        randomArr.forEach((el, i) => {
            randomAns[el] = r[i];
        });

        perguntaH1.innerHTML = "";
        respostasDiv.innerHTML = "";

        randomAns.forEach((el) => {
            const html = `<p class='resposta' status='${el.status}'>${el.resposta}</p>`;
            respostasDiv.insertAdjacentHTML("afterbegin", html);
        });

        perguntaH1.textContent = p;
        perguntaH1.setAttribute("id-pergunta", id);

        const respostaP = document.querySelectorAll(".resposta");
        respostaP.forEach((el) => {
            el.addEventListener("click", () => {
                proximaQuestao.classList.remove("hidden");
                if (el.getAttribute("status") === "Correta") score++;

                console.log(perguntasFeitas.length);
                console.log(l);
                if (perguntasFeitas.length == l) {
                    proximaQuestao.textContent = "Ver resultado";
                }

                respostaP.forEach((el) => {
                    if (el.getAttribute("status") === "Correta") {
                        el.classList.add("certo");
                    } else {
                        el.classList.add("errado");
                    }
                });
            });
        });
    } else if (perguntasFeitas.length < l) {
        getData();
    } else {
        if (!record) {
            localStorage.setItem("record", score);
            console.log(record);
        } else if (score > record) {
            localStorage.setItem("record", score);
        }

        record = localStorage.getItem("record");

        perguntaRespostasDiv.classList.add("hidden");
        scoreDiv.classList.remove("hidden");
        scoreDiv.classList.add("score-div-shown");
        scoreSpan.textContent = score;
        recordSpan.textContent = record;
    }
}
