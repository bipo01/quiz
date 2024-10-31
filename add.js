document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const pergunta = document.querySelector("#pergunta");
    const resposta1 = document.querySelector("#resposta1");
    const resposta2 = document.querySelector("#resposta2");
    const resposta3 = document.querySelector("#resposta3");
    const respostacerta = document.querySelector("#respostacerta");

    console.log(pergunta.value);

    if (
        pergunta.value.trim() &&
        resposta1.value.trim() &&
        resposta2.value.trim() &&
        resposta3.value.trim() &&
        respostacerta.value.trim()
    ) {
        fetch(
            `https://quizapi-mauve.vercel.app/add?pergunta=${encodeURIComponent(
                pergunta.value
            )}&resposta1=${encodeURIComponent(
                resposta1.value
            )}&resposta2=${encodeURIComponent(
                resposta2.value
            )}&resposta3=${encodeURIComponent(
                resposta3.value
            )}&respostacerta=${encodeURIComponent(respostacerta.value)}`
        );

        pergunta.value = "";
        resposta1.value = "";
        resposta2.value = "";
        resposta3.value = "";
        respostacerta.value = "";

        pergunta.blur();
        resposta1.blur();
        resposta2.blur();
        resposta3.blur();
        respostacerta.blur();
    } else {
        alert("Preencha todos os campos");
        pergunta.blur();
        resposta1.blur();
        resposta2.blur();
        resposta3.blur();
        respostacerta.blur();
    }
});

document.querySelector("#voltar").addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "./index.html";
});
