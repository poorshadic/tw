const reset = "0";
var play1, play2, players;
var again = 0;
var troca = 0, desistiu = 0, quem;
let name, password, sementes, cavidades, game, on = 0, rank, tabuleiro, proximo = 0;
var turnUser;
let data;


function sendRequest(type, object){

  if(!XMLHttpRequest) { alert('XHR não é suportado'); return; }

  const xhr = new XMLHttpRequest();
  const link = "http://twserver.alunos.dcc.fc.up.pt:8127/" + type;

  xhr.open('POST',link,true);
    xhr.onreadystatechange = function() {
      if (xhr.responseText === '{"error":"User registered with a different password"}') {
        alert('Palavra-passe incorreta');
      }
      if(xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
            console.log(data);
            if(type == "register") {
              let log = document.getElementById("login");
              log.style.display = "none";
              let account = document.getElementById("account");
              account.style.display = "flex";
              let nick = document.getElementById("user");
              nick.innerText = "Nome:" + nome.value;
              on = 1;
            }
            else if (type == "join"){
              game = data.game;
              update();
            }
            else if (type == "leave") {
              desistiu = 1;
              quem = nome.value;
              resetar();
            }
            else if (type == "ranking") {
              rank = data.ranking;
              for(let i = 0; i < 10; i++){
                let t = i+1;
                document.getElementById(t).innerText = rank[i].nick + ": victories ->" + rank[i].victories + " games ->" + rank[i].games;
              }
            }
    }
  }

  xhr.send(JSON.stringify(object));
}


function update(){
  if (game == undefined) {
    alert("nao se encontra em jogo");
    return;
  }

  const url = "update?nick="+name+"&game="+game;
  const link = "http://twserver.alunos.dcc.fc.up.pt:8008/" + url;

  var eventSource = new EventSource(link);
  eventSource.onmessage = function(event) {
     data = JSON.parse(event.data);
     console.log(data);
     tabuleiro = data;
     if (data.winner != undefined) {
       if (data.winner == name){
         alert("Venceu o jogo");
       }
       else {
        alert("Perdeu o jogo");
       }
       eventSource.close();
       return;
     }
     else if(desistiu == 1){
       if(name != quem){
         alert("Venceu o jogo");
       }
       eventSource.close();
       return;
     }
     if (data.board != undefined) {
         players = Object.keys(tabuleiro.board.sides);
         play1 = players[0];
         play2 = players[1];
         if(name == play1){
           let y = 0;
           //console.log(tabuleiro.board.sides[play1].pits[y]);
           for(let x = 1; x <= cavidades; x++){
             document.getElementById("p" + x).innerText = data.board.sides[play1].pits[y];
             y++;
           }
           y = cavidades - 1;
           document.getElementById("a2").innerText = data.board.sides[play1].store;
           for(let x = 10; x > (10 - cavidades); x--){
             document.getElementById("p" + x).innerText = data.board.sides[play2].pits[y];
             y--;
           }
           document.getElementById("a1").innerText = data.board.sides[play2].store;
         }

         else {
           let y = 0;
           for(let x = 1; x <= cavidades; x++){
             document.getElementById("p" + x).innerText = data.board.sides[play2].pits[y];
             y++;
           }
           y = cavidades - 1;
           document.getElementById("a2").innerText = data.board.sides[play2].store;
           for(let x = 10; x > (10 - cavidades); x--){
             document.getElementById("p" + x).innerText = data.board.sides[play1].pits[y];
             y--;
           }
           document.getElementById("a1").innerText = data.board.sides[play1].store;
         }
     }
  }
}


function login(){
  name = document.getElementById('nome').value;
  password = document.getElementById('psw').value;
  let conta = {
    password : password,
    nick : name,
  };
  sendRequest("register", conta);

}



function create(){
  let size = document.getElementById("board");
  cavidades = size.value;
  let semente = document.getElementById("semente");
  let sementes = semente.value;
  let turn = document.getElementById("player");
  turnUser = turn.checked;
  let n1 = document.getElementById("pt5");
  let n2 = document.getElementById("pt6");
  let n3 = document.getElementById("pt4");
  let n4 = document.getElementById("pt7");
  if(!(document.getElementById("cpu").checked)){
    if(on == 1){
      let group = "tiago";
      let jogo = {
        group : group,
        nick : name,
        password : password,
        size : cavidades,
        initial  : sementes
      };
      sendRequest("join", jogo);
    }
    else{
        alert("Sessao por inizializar");
        return;
    }
    let a1 = document.getElementById("a1");
    a1.innerText = "0";
    let a2 = document.getElementById("a2");
    a2.innerText = "0";
    let p1 = document.getElementById("p1");
    p1.innerText = sementes;
    let p2 = document.getElementById("p2");
    p2.innerText = sementes;
    let p3 = document.getElementById("p3");
    p3.innerText = sementes;
    let p4 = document.getElementById("p4");
    p4.innerText = sementes;
    let p5 = document.getElementById("p5");
    p5.innerText = sementes;
    let p6 = document.getElementById("p6");
    p6.innerText = sementes;
    let p7 = document.getElementById("p7");
    p7.innerText = sementes;
    let p8 = document.getElementById("p8");
    p8.innerText = sementes;
    let p9 = document.getElementById("p9");
    p9.innerText = sementes;
    let p10 = document.getElementById("p10");
    p10.innerText = sementes;
      p1.disable = false;
      p2.disable = false;
      p3.disable = false;
      p4.disable = false;
      p5.disable = false;
      p6.disable = true;
      p7.disable = true;
      p8.disable = true;
      p9.disable = true;
      p10.disable = true;
  }
  else{
    let a1 = document.getElementById("a1");
    a1.innerText = "0";
    let a2 = document.getElementById("a2");
    a2.innerText = "0";
    let p1 = document.getElementById("p1");
    p1.innerText = sementes;
    let p2 = document.getElementById("p2");
    p2.innerText = sementes;
    let p3 = document.getElementById("p3");
    p3.innerText = sementes;
    let p4 = document.getElementById("p4");
    p4.innerText = sementes;
    let p5 = document.getElementById("p5");
    p5.innerText = sementes;
    let p6 = document.getElementById("p6");
    p6.innerText = sementes;
    let p7 = document.getElementById("p7");
    p7.innerText = sementes;
    let p8 = document.getElementById("p8");
    p8.innerText = sementes;
    let p9 = document.getElementById("p9");
    p9.innerText = sementes;
    let p10 = document.getElementById("p10");
    p10.innerText = sementes;
    if(turnUser == true){
      p1.disable = false;
      p2.disable = false;
      p3.disable = false;
      p4.disable = false;
      p5.disable = false;
      p6.disable = true;
      p7.disable = true;
      p8.disable = true;
      p9.disable = true;
      p10.disable = true;
    }
    else{
      troca = 1;
      p1.disable = true;
      p2.disable = true;
      p3.disable = true;
      p4.disable = true;
      p5.disable = true;
      p6.disable = false;
      p7.disable = false;
      p8.disable = false;
      p9.disable = false;
      p10.disable = false;
      play("p1", 1);
    }
  }
  //selecionar o tabuleiro e inicializaçao das cavidades
  if(cavidades== 3){
    n1.style.display = "none";
    n2.style.display = "none";
    n3.style.display = "none";
    n4.style.display = "none";
  }
  else if(cavidades== 4){
    n1.style.display = "none";
    n2.style.display = "none";
    n3.style.display = "inline"
    n4.style.display = "inline";
  }
  else{
    n1.style.display = "inline";
    n2.style.display = "inline";
    n3.style.display = "inline";
    n4.style.display = "inline";
  }
}

  function quit(){
    if(!(document.getElementById("cpu").checked)){
      let derrota = {
        game : game,
        nick : name,
        password : password
      };
      sendRequest("leave", derrota);
    }
      on = 0;
      resetar();
  }

 function ranks(){
   let tabela = document.getElementById("tabela");
   tabela.style.display = "flex";
   sendRequest("ranking", 0);
 }


 function fechar(){
   let tabela = document.getElementById("tabela");
   tabela.style.display = "none";
 }

/////////////////////////////////////////////////////////////////////////////////


function logout(){
  let ac = document.getElementById("account");
  ac.style.display = "none";
  let log = document.getElementById("login");
  log.style.display = "flex";
  on = 0;
  quit();
  //document.location.reload(true);
}


function turn(clicked_id){
  again = 0;
  var clicked = document.getElementById(clicked_id);
  if(clicked.disable == false){
    //online
    if(!(document.getElementById("cpu").checked)){
      if(tabuleiro.board.turn != name ){
        alert("nao é o teu turno");
        return
      }
      else{
        let cha = play(clicked_id, 0);
        /*if(endgame(cha) == true){
          pontuaçao(cha);
          return;
        }*/
        let move = parseInt(clicked_id.charAt(1)) - 1;
        let jogada = {
          nick: name,
          password: password,
          game: game,
          move: move
        };
        proximo = 1;
        sendRequest("notify", jogada);
      }
    }
    //offline
    else{
      let cha = play(clicked_id, 0);
      if(endgame(cha) == true){
        pontuaçao(cha);
      }
      else if(again == 0){
        setTimeout(() => {  bot(cha); }, 1500);
        if(endgame(cha) == true){
          pontuaçao(cha);
        }
      }
    }
  }
  else{
    alert("jogada invalida");
  }
}

function bot(cha){
  again = 0;
  var row = Math.ceil(cha.length/2);
  let total = 0;
  let index = 0;
  for(var i = 1; i < row; i++){
    var mudanca = document.getElementById(cha[i]);
    if(mudanca.innerText != "0" && parseInt(mudanca.innerText) > total){
      total = parseInt(mudanca.innerText);
      index = i;
    }
  }
  play(cha[index], 1);
  if(again != 0){
    bot(cha);
  }
}


function play(clicked_id, ident){
  var clicked = document.getElementById(clicked_id);
    let ponto = clicked.innerText;
    if(clicked.innerText != "0"){
      clicked.innerText = reset;
      var x = 0;
      let y;
      //tamanho = 3
      if(cavidades == 3){
        if(turnUser == true){
          if(ident == 0){
              var cha = ["a2" ,"p8", "p9", "p10", "p1", "p2", "p3"];
          }
          else{
              var cha = ["a1" ,"p1", "p2", "p3", "p8", "p9", "p10"];
          }
        }
        else{
          if(ident == 0){
              var cha = ["a1" ,"p1", "p2", "p3", "p8", "p9", "p10"];
          }
          else{
              var cha = ["a2" ,"p8", "p9", "p10", "p1", "p2", "p3"];
          }
        }
      }
      //tamanho = 4
      else if(cavidades == 4){
        if(turnUser == true){
          if(ident == 0){
              var cha = ["a2" ,"p7", "p8", "p9", "p10", "p1", "p2", "p3", "p4"];
          }
          else{
              var cha = ["a1" ,"p1", "p2", "p3", "p4", "p7", "p8", "p9", "p10"];
          }
        }
        else{
          if(ident == 0){
              var cha = ["a1" ,"p1", "p2", "p3", "p4", "p7", "p8", "p9", "p10"];
          }
          else{
              var cha = ["a2" ,"p7", "p8", "p9", "p10", "p1", "p2", "p3", "p4"];
          }
        }
      }
      //tamanho = 5
      else{
        if(turnUser == true){
          if(ident == 0){
              var cha = ["a2" ,"p6", "p7", "p8", "p9", "p10", "p1", "p2", "p3", "p4", "p5"];
          }
          else{
              var cha = ["a1" ,"p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];
          }
        }
        else{
          if(ident == 0){
              var cha = ["a1" ,"p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];
          }
          else{
              var cha = ["a2" ,"p6", "p7", "p8", "p9", "p10", "p1", "p2", "p3", "p4", "p5"];
          }
        }
      }
    }
    while(clicked_id != cha[x]){
      x++;
    }
    for(let i = parseInt(ponto, 10); i > 0; i--){
      if(++x == cha.length){
        x = 0;
      }
      var mudanca = document.getElementById(cha[x]);
      var mud = parseInt(mudanca.innerText) + 1;
      mudanca.innerText = mud;
    }
    if(cha[x].charAt(0) == "a"){
      again++;
      if(ident == 0){
        alert("play again");
      }
    }
    else if(mudanca.innerText == "1" && x >= Math.ceil(cha.length/2)){
      mudanca.innerText = reset;
      y = (cha.length)-x;
      mudanca = document.getElementById(cha[y]);
      var final = document.getElementById(cha[0]);
      var nota = parseInt(final.innerText) + 1 + parseInt(mudanca.innerText);
      mudanca.innerText = reset;
      final.innerText = nota;
    }
    return cha;

}

function endgame(cha){
  var row = Math.ceil(cha.length/2);   //var cha = ["a1" ,"p10", "p9", "p8", "p3", "p2", "p1"];
  var times = 0;
  for(var i = 1; i < row; i++){
    var mudanca = document.getElementById(cha[i]);
    if(mudanca.innerText != reset){
      times++;
    }
  }
  times -= 1;
  if(times == 0){
    return true;
  }
  times = 0;
  for(var i = row; i < cha.length; i++){
    var mudanca = document.getElementById(cha[i]);
    if(mudanca.innerText != reset){
      times++;
    }
  }
  if(times == 0){
    return true;
  }
  return false;
}

function pontuaçao(cha){
  let size = document.getElementById("board");
  let cavidades = size.value;
  let semente = document.getElementById("semente");
  let sementes = semente.value;
  alert("acabou o jogo");
  let start = Math.ceil(cha.length/2);
  let me = document.getElementById(cha[0]);
  let p1 = parseInt(me.innerText);
  let max = cavidades*2*sementes;
  for(start; start < cha.length; start++){
    me = document.getElementById(cha[start]);
    p1 += parseInt(me.innerText); // pontuaçao player
    me.innerText = reset;
  }
  let comp = max - p1; //pontuaçao computador
  if(p1 > comp){alert("Venceu" + p1 + "-" + comp);}
  else if (comp > p1){alert("Perdeu" + p1 + "-" + comp);}
  else{alert("Empate" + p1 + "-" + comp);}
  resetar();
}

function resetar(){
  let a1 = document.getElementById("a1");
  a1.innerText = "0";
  let a2 = document.getElementById("a2");
  a2.innerText = "0";
  let p1 = document.getElementById("p1");
  p1.innerText = "0";
  let p2 = document.getElementById("p2");
  p2.innerText = "0";
  let p3 = document.getElementById("p3");
  p3.innerText = "0";
  let p4 = document.getElementById("p4");
  p4.innerText = "0";
  let p5 = document.getElementById("p5");
  p5.innerText = "0";
  let p6 = document.getElementById("p6");
  p6.innerText = "0";
  let p7 = document.getElementById("p7");
  p7.innerText = "0";
  let p8 = document.getElementById("p8");
  p8.innerText = "0";
  let p9 = document.getElementById("p9");
  p9.innerText = "0";
  let p10 = document.getElementById("p10");
  p10.innerText = "0";
}
