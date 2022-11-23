import { ProcessarArquivos } from "./utils.js";

const files = [];
for (let i = 1; i <= 100; i++) {
  files.push({ text: `Arquivo ${i}`, id: i, file: `arquivo_${i}.txt` });
}

files.forEach((x) => {
  let op = document.createElement("option");
  op.value = x.file;
  op.innerText = x.text;
  document.querySelector("#arquivos").appendChild(op);
});

let processar = document.querySelector("#processar");
let totalRejeitado = document.querySelector("#totalArquivosErros");
let totalSucesso = document.querySelector("#totalArquivosSucesso");
let totalDeArquivos = document.querySelector("#totalArquivos");

processar.addEventListener("click", () => {
  let listaSelecao = document.querySelectorAll("option");
  let list = [];
  for (let i = 0; i < listaSelecao.length; i++) {
    if (listaSelecao[i].selected) {
      list.push(listaSelecao[i].value);
    }
  }
  console.log(list);
  let promises = ProcessarArquivos(list);
  let totalArquivos = list.length;
  let contadorRejeitado = 0;

  //Toda promise espera um array de promise.
  Promise.allSettled(promises).then((response) => {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      if (response[i].status == "rejected") {
        contadorRejeitado++;
      }
    }
    totalRejeitado.innerHTML = contadorRejeitado;
    totalSucesso.innerHTML = totalArquivos - contadorRejeitado;
    totalDeArquivos.innerHTML = totalArquivos;
  });
});
