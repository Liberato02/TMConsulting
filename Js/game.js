const botao = document.getElementById("btnEntrar")

botao.addEventListener("click", function(){

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const mensagem = document.getElementById("mensagem")

    if(email.includes("@") && email.includes(".com") && senha.length >= 6){
        
        // Se a página estiver na mesma pasta (paginas):
        window.location.href = "./dashboard.html" // ou "./demonstracao.html"

    } else {

        mensagem.innerText = "Digite um email válido e uma senha com pelo menos 6 caracteres"

    }
})