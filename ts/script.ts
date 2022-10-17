const container = <HTMLElement>document.querySelector('.container-fluid');
const inputPlayer1 = (<HTMLInputElement>document.getElementById("giocatore1"));
const inputPlayer2 = (<HTMLInputElement>document.getElementById("giocatore2"));
var player1: string, player2 = '';
var counter1 = 0, counter2 = 0;


for (var i = 0; i < 14; i++) {
  let div = document.createElement('div');
  div.setAttribute('class', 'row');
  div.setAttribute('id', 'row' + i);
  container.append(div);
  let row = <HTMLElement>document.querySelector('#row' + i);
  for (var b = 0; b < 14; b++) {
    row.innerHTML += '<div class="col p-3 fs-3 "><i class="bi bi-plus-lg"></i></div>'
  }
}

function playersTable() {
  savePlayers();
  disable();
  createTable();
}

function savePlayers() {
  player1 = inputPlayer1.value;
  player2 = inputPlayer2.value;
  console.log('player 1 ' + player1 + ' player 2  ' + player2);
}

function disable() {
  inputPlayer1.setAttribute('disabled', 'true');
  inputPlayer2.setAttribute('disabled', 'true');
  document.getElementById('saveButton')?.setAttribute('disabled', 'true')
}

function createTable() {
  savePlayers()
  var flag = 0;
  var table = document.createElement('table');
  table.setAttribute('id', 'tablePlayers');
  table.setAttribute('class', 'm-2 table table-striped');
  document.getElementById('tableDiv')?.append(table);
  const tableTag = <HTMLElement>document.getElementById('tablePlayers');
  for (var i = 0; i < 2; i++) {
    var tr = document.createElement('tr');
    tableTag.append(tr);
    for (let j = 0; j < 3; j++) {
      var td = document.createElement('td');
      if (i == 1) {
        td.setAttribute('id', 'td' + (j + 3));
        td.setAttribute('class', 'fw-bold fs-3');
        tr.append(td);
      }
      else {
        td.setAttribute('id', 'td' + j);
        td.setAttribute('class', 'fw-bold fs-3');
        tr.append(td);
      }
    }
    if (flag == 1) {
      (<HTMLElement>document.getElementById('td3')).innerHTML += player2;
      (<HTMLElement>document.getElementById('td4')).innerHTML = String(counter2);
      (<HTMLElement>document.getElementById('td5')).innerHTML += '<button class="btn btn-success fs-3" type="button" onclick="plus2()">+</button> <button class="btn btn-danger fs-3" type="button" onclick="minus2()">-</button>';
    }
    if (flag == 0) {
      (<HTMLElement>document.getElementById('td0')).innerHTML += player1;
      (<HTMLElement>document.getElementById('td1')).innerHTML = String(counter1);
      (<HTMLElement>document.getElementById('td2')).innerHTML += '<button class="btn btn-success fs-3" type="button" onclick="plus1()">+</button> <button class="btn btn-danger fs-3" type="button" onclick="minus1()">-</button>';
      flag = 1;
    }
  }
}

function plus1() {
  counter1++;
  (<HTMLElement>document.getElementById('td1')).innerHTML = String(counter1);
}

function plus2() {
  counter2++;
  (<HTMLElement>document.getElementById('td4')).innerHTML = String(counter2);
}

function minus1() {
  if (counter1 == 0) {
    return
  }
  counter1--;
  (<HTMLElement>document.getElementById('td1')).innerHTML = String(counter1);
}

function minus2() {
  if (counter2 == 0) {
    return
  }
  counter2--;
  (<HTMLElement>document.getElementById('td4')).innerHTML = String(counter2);
}

function reset() {
  let max = document.getElementById('tableDiv')?.children.length;
  if (max == undefined) {
    return
  }
  counter1 = counter2 = 0;
  inputPlayer1.removeAttribute('disabled');
  inputPlayer2.removeAttribute('disabled');
  inputPlayer1.value = '';
  inputPlayer2.value = '';
  document.getElementById('saveButton')?.removeAttribute('disabled');
  for (let i = 0; i < max; i++) {
    document.getElementById('tableDiv')?.children[i].remove()
  }
}

function restart() {
  document.querySelectorAll('i').forEach(element => {
    element.setAttribute('class', 'bi bi-plus-lg')
  });
}

function checkWinner(){
  add();
  verticalWin();
}

var indexBlue = new Array();
var indexRed = new Array();


function add() {
  let nodiI = document.querySelectorAll('i');
  nodiI.forEach((nodo, i: number) => {
    if (nodo.classList.contains('blue')) {
      if (indexBlue.includes(i) == false) {
        indexBlue.push(i);
        console.log('index blue:' + indexBlue)
      }
    }
    else if (nodo.classList.contains('red')) {
      if (indexRed.includes(i) == false) {
        indexRed.push(i);
        console.log('index red: ' + indexRed)
      }
    }
  });
}

var verticalWinBlue = 1;
var verticalWinRed = 1;

function verticalWin() {
  indexBlue.forEach(i => {
    indexBlue.forEach(j => {
      if (i == j + 14) {
        verticalWinBlue++;
        console.log(verticalWinBlue)
      }
    })
  });
  indexRed.forEach(i => {
    indexRed.forEach(j => {
      if (i == j + 14) {
        verticalWinRed++;
      }
    })
  });
  if(verticalWinBlue == 5){
    console.log('blue wins')
  }
  else if(verticalWinRed == 5){
    console.log('red wins')
  }
  verticalWinBlue = 1;
  verticalWinRed = 1;
}



document.addEventListener('DOMContentLoaded', () => {
  let nodiI = document.querySelectorAll('i');

  let counts = 1;


  nodiI.forEach(nodo => {
    nodo.addEventListener('click', () => {
      if (counts % 2 != 0) {
        nodo.setAttribute('class', 'bi bi-plus-lg blue');

      }
      else {
        nodo.setAttribute('class', 'bi bi-plus-lg red');
      }
      counts++;
      checkWinner()
    })
    nodo.addEventListener('click', function (evt) {
      if (evt.detail === 2) {
        nodo.setAttribute('class', 'bi bi-plus-lg')
      }
    });
  });








})
