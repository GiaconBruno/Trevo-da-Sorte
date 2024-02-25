function Gerar() {
  //variaveis
  // var round = document.getElementById("round").value;
  // var num = document.getElementById("num").value;
  // var ent = document.getElementById("de").value;
  // var out = document.getElementById("ate").value;
  // var res = document.getElementById("res");
  var dup = 0;
  roda = 0;
  t = 0;
  res.innerHTML = "";
  var dados = [];
  more = [];

  // Gera varias rodadas
  for (y = 0; y < round; y++) {
    // Gera os numeros automaticos
    while (roda < num) {
      var n = Math.random() * (max - min) + min;
      // Verifica se o numero aleatorio esta entre o min e max
      if ((n >= ent) && (n <= out)) {
        // Confere se o numero ja foi sorteado
        for (c = 0; c < roda; c++) {
          if (n == dados[c]) {
            dup++;
          }
        }
        // Salva se o numero for unico
        if (dup == 0) {
          if (n < 10) {
            n = "0" + n;
          }
          dados[roda] = n;
          roda++;
          more[t] = n;
          t++;
        }
        dup = 0;
      }
    }
    roda = 0;
    // Ordenas os numeros e exibe
    res.innerHTML = res.innerHTML + "<b>Rodada " + (y + 1) + ": ";
    res.innerHTML = res.innerHTML + dados.sort() + "<br>";
    res.innerHTML = res.innerHTML.replace(/,/g, " ");
  }

  //Gera os mais sorteados
  m = 1;
  s = 0;
  mord = [];
  mcont = [];
  mfull = [];
  //if (luck==1){

  //Procura repeditos e conta
  for (i = ent; i <= out; i++) {
    for (c = 0; c < (round * num); c++) {
      if ((more[c].valueOf()) == i) {
        m++;
        mord[c] = m;
      }
    }
    m = 0;
  }
  //Guarda a posicao dos mais sorteados
  for (b = round; b >= 0; b--) {
    for (z = 0; z <= (round * num); z++) {
      if (b == mord[z]) {
        mcont[s] = z;
        s++;
      }
    }
  }
  //Recebe valor dos mais sorteados
  a = 0;
  mf = 0;
  for (y = 0; y < num;) {
    for (h = 0; h <= y; h++) {
      if (mfull[h] == more[mcont[a]]) {
        mf++;
      }
    }
    if (mf == 0) {
      mfull[y] = (more[mcont[a]]);
      y++;
    }
    a++;
    mf = 0;
  }

  // Ordenas os numeros e exibe
  mfull.sort();
  rod.innerHTML = "<br><b>Mais sorteados: <br>" + mfull;
  rod.innerHTML = rod.innerHTML.replace(/,/g, " ");
  More();
  //}
}

function More() {
  var luck = document.getElementById("luck").checked;
  var color = document.getElementById("res");
  var num = document.getElementById("num").value;
  var rod = document.getElementById("rod").innerHTML;
  var c = "";

  if (luck == 1) {
    for (i = 27; i < (num * 3) + 27; i = (i + 3)) {
      c = rod.substring(i, i + 2);
      // console.log(" I: " + i + " C: " + c );
      var re = new RegExp(c, 'g');
      color.innerHTML = color.innerHTML.replace(re, "<ii style=background-color:lightgreen;>" + c + "</ii> ");
      document.getElementById("rod").style.display = 'block';
    }
  } else {
    document.getElementById("rod").style.display = 'none';
    color.innerHTML = color.innerHTML.replace(/<ii style="background-color:lightgreen;">/g, "");
    color.innerHTML = color.innerHTML.replace(/<\ii>/g, "");
    color.innerHTML = color.innerHTML.replace(/  /g, " ");
  }
}