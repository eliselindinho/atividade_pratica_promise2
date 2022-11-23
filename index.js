/*
1) A Mach1 foi contratada para fazer uma função que deve enviar uma mensagem para 
vários servidores ao mesmo tempo, e o primeiro que responder deve informar ao 
usuário o qual foi o retorno obtido. A função de EnviarMensagemServers já foi 
desenvolvida e se encontra no arquivo “12 – promise pt2/exercício/utils.js”. Segue 
especificações para o desenvolvimento. 
a. A função deve ser executada ao clicar no botão enviar da tela. 
b. A função EnviarMensagemServers retorna uma lista de promises que são 
as chamadas para os múltiplos servidores, então faça com que quando a 
primeira promise responder com sucesso ou erro esse retorno seja exibido 
ao usuário. 
c. A mensagem a ser enviada deve ser obtida da tela do usuário, do INPUT de 
id mensagem.
d. Só pode permitir enviar a mensagem caso o input esteja preenchido, caso 
não esteja preenchido o input deve disparar um alert com a mensagem 
“Campo mensagem é obrigratório”.
e. Caso a promise retornada seja de sucesso exiba a mensagem no DIV de id 
primeiraResposta e coloque a cor da letra em verde. 
f. Caso a promise retornada seja de erro exiba a mensagem no DIV de id 
primeiraResposta e coloque a cor da letra em vermelho.

2) A Mach1 está desenvolvendo um sistema que fará o processamento de diversos 
arquivos financeiros que não dependem um do processamento do outro. Após o 
processamento é preciso informar ao cliente os totais dos arquivos que foram 
processados com sucesso e os que retornaram erro. A função de processar arquivos 
já foi desenvolvido e se encontra no local “12 – promise pt2/exercício/utils.js”,
função ProcessarArquivos. A função espera receber um array com o nome dos 
arquivos a serem processados e retornará um array de promises referente aos 
arquivos que foram enviados a devem ser processados. Com base nas informações 
segue a especificação para o desenvolvimento. 
a. A tela possui uma lista de arquivos a serem processados, deve ser enviado 
somente os arquivos que o usuário selecionar na lista. 
b. Ao clicar em processar, o sistema deve enviar os arquivos selecionados para 
a função ProcessarArquivos, e ao término exibir as seguintes informações. 
i. No H2 com id totalArquivos exibir a quantidade de arquivos 
enviados para serem processados 
ii. No H2 com id totalArquivosSucesso exibir a quantidade de arquivos 
enviados para serem processados 
iii. No H2 com id totalArquivosErros exibir a quantidade de arquivos 
enviados para serem processados 
c. O HTML da tela já está disponível no caminho “12 – promise 
pt2/exercício/arquivo.html” e o arquivo Javascript referente ao arquivo no 
caminho “12 – promise pt2/exercício/arquivo.js"
*/

import { EnviarMensagemServers } from "./utils.js";

let enviar = document.querySelector("#enviar");
let mensagem = document.querySelector("#mensagem");
let primeiraResposta = document.querySelector("#primeiraResposta");

enviar.addEventListener("click", () => {
  if (mensagem.value == "") {
    return alert("Campo mensagem é obrigatório");
  }

  let lista = EnviarMensagemServers(mensagem.value);
  Promise.race(lista)
    .then((response) => {
      primeiraResposta.innerText = response;
      primeiraResposta.style.color = "green";
    })
    .catch((response) => {
      primeiraResposta.innerText = response;
      primeiraResposta.style.color = "red";
    });
});
