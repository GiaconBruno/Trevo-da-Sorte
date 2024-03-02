let game = [];
let rounds = [];
let luck = [];

const validate = () => {
  start.classList.remove('border-danger');
  end.classList.remove('border-danger');
  qtdNum.classList.remove('border-danger');
  return ((parseInt(end.value) + 1) - parseInt(start.value)) >= parseInt(qtdNum.value);
}

const Gerar = () => {
  const valid = validate();
  if (!valid) {
    start.classList.add('border-danger');
    end.classList.add('border-danger');
    qtdNum.classList.add('border-danger');
    return
  };
  result.innerHTML = '';
  prepare.classList.remove('d-none');
  load.classList.remove('d-none');
  showData.classList.add('d-none');
  gerar.setAttribute('disabled', true);

  setTimeout(() => {
    mount();
    plus();
    show();
    load.classList.add('d-none');
  }, 10);
  gerar.removeAttribute('disabled');
}

const mount = () => {
  const nStart = parseInt(start.value)
  const nEnd = parseInt(end.value)
  const nNum = parseInt(qtdNum.value)
  const nRound = parseInt(qtdRound.value)
  game = [];
  rounds = [];
  // Gera os numeros automaticos
  while (game.length < nRound) {
    while (rounds.length < nNum) {
      const num = parseInt(Math.random() * ((nEnd + 1) - nStart) + nStart);
      const find = rounds.find(n => num == n);
      if (find == undefined) rounds.push(num);
    }
    rounds.sort((a, b) => a - b);
    game.push(rounds);
    rounds = [];
  }
}

const plus = () => {
  luck = [];
  const group = game.flat()
  const plus = [];
  group.map((num, x) => {
    if (x == 0) plus.push({
      num,
      count: 1
    })
    else {
      const pos = plus.findIndex(lNum => lNum.num == num);
      if (pos != -1) plus[pos].count++;
      else plus.push({
        num,
        count: 1
      })
    }
  })

  plus.sort((a, b) => {
    if (a.count < b.count) return 1
    if (a.count > b.count) return -1
    return 0
  })

  luck = plus.map(p => p.num).slice(0, parseInt(qtdNum.value))
}

const show = () => {
  result.innerHTML = '';
  const cG = Math.max(String(game.length).length, 2)
  const cN = Math.max(String(end.value.length).length, 2)
  const icon = '<i class="bi small bi-lightning-charge-fill w-auto px-0"></i>';
  luck.sort((a, b) => a - b)

  result.innerHTML =
    `<div id="visibleLuck" class="row mx-0 my-3 align-items-center justify-content-center ${(!ckLuck.checked) ? 'd-none' : ''}">` +
    `${(luck.includes(luck[0] + luck[1])) ? icon : ''}<div class="col-auto d-ruby px-0">${better(luck.map(l => `<p class="px-1 fw-bold">${String(l).padStart(cN, 0)}</p>`), '|')}</div></div>`;
  result.innerHTML += `<div id="shoots"></div>`;
  shoots.innerHTML += better(game.map((r, x) =>
    `<div class="row mx-0 align-items-center justify-content-center">` +
    `<div class="col-auto px-0 fw-bold" style="min-width:calc(86px + ${cG*11}px);">Rodada ${String(x + 1).padStart(cG, 0)}:${(r.includes(r[0] + r[1])) ? icon : '<b style="padding-right:14px;"></b>'}</div>` +
    `<div class="col-auto d-ruby px-0">${better(r.map(n => `<span class="${luck.includes(n) ? 'plus' : ''}${!ckLuck.checked?' clear':''}"><p class="px-1">${String(n).padStart(cN, 0)}</p></span>`), '')}</div></div>`), '')
}

const Clear = () => {
  start.classList.remove('border-danger');
  end.classList.remove('border-danger');
  qtdNum.classList.remove('border-danger');
  showData.classList.remove('d-none');

  start.removeAttribute('disabled');
  end.removeAttribute('disabled');
  qtdNum.removeAttribute('disabled');
  qtdRound.removeAttribute('disabled');
  gerar.removeAttribute('disabled');

  prepare.classList.add('d-none');
  result.innerHTML = '';
}

const showLuck = () => {
  if (!document.querySelector('#visibleLuck')) return;
  const pLuck = Array.from(document.querySelectorAll('.plus'));
  gerar.focus();
  if (ckLuck.checked) [visibleLuck.classList.remove('d-none'), pLuck.map(p => p.classList.remove('clear'))];
  else[visibleLuck.classList.add('d-none'), pLuck.map(p => p.classList.add('clear'))];
}

const better = (payload, simble = '') => {
  return String(payload).replace(/,/g, simble)
}