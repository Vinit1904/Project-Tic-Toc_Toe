import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  start() {
    //winning Combination
    var winnings = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    let arr = [];


    registerListeners();
    resetGame();

    //registerlisterner
    function registerListeners() {
      var game = document.getElementById("game");
      var btns = game.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = button_onclick;
      }
      document.getElementById("resetButton").onclick = resetGame;
    }

    ///lock-game
    function lockGame() {
      var game = document.getElementById("game");
      var btns = game.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
      }
    }

    ////RESET GAME
    function resetGame() {
      var game = document.getElementById("game");
      var btns = game.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].innerText = "";
        btns[i].disabled = null;
      }
    }

    //BUTTON FUNCTION
    function buttonsWith(token) {
      var result = [];
      var game = document.getElementById("game");
      var btns = game.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].innerText === token) {
          result.push(i);
        }
      }
      return result;
    }

    ///CONTAIL ALL ARRAY
    function containsAll(array, test) {
      if (array.length < test.length) return false;
      var arrayIndex = 0;
      for (var i = 0; i < test.length; i++) {
        while (array[arrayIndex] < test[i]) {
          arrayIndex++;
          if (arrayIndex >= array.length) return false;
        }
        if (array[arrayIndex] !== test[i]) return false;
      }
      return true;
    }

    //IS WIN FUNCTION
    function isWin(userButtons) {
      for (var i = 0; i < winnings.length; i++) {
        console.log(winnings[i]);
        if (containsAll(userButtons, winnings[i]))
          return true;
      }
      return false;
    }

    //ISGAMEOVER
    function isGameOver() {
      //console.log('Checking game state');
      var userButtons = buttonsWith('X');
      if (isWin(userButtons)) {
        console.log('Player has won!');
        lockGame();
        return true;
      }
      var computerButtons = buttonsWith('O');
      if (isWin(computerButtons)) {
        console.log('Computer has won!');
        lockGame();
        return true;
      }
      return false;
    }


    //VALID MOVE
    let validMove = () => {


      var game = document.getElementById("game");
      var btns = game.getElementsByTagName("button");

      for (var i = 0; i < btns.length; i++) {
        if (btns[i].innerText === '') {
          arr.push(i);
          //console.log("valid");
          //console.log('Computer move');
          //btns[i].innerText = "O";
          //randomGenerator();					
        }

      }
      if (arr.length !== 0)
        return true;
      else
        return false
    }

    //COMPUER MOVE
    function computerMove() {
      var game = document.getElementById("game");
      var btns = game.getElementsByTagName("button");

      console.log(arr);
      //const randomElement = array[Math.floor(Math.random() * array.length)];
      if (validMove() == true) {
        {


          /*let randomString = () => {
            let randomString1 = array[Math.floor(Math.random() * array.length)];
            let randomNumber = parseInt(randomString1);
            console.log(randomNumber);
            return randomNumber;
          };
          let val = randomString();*/

          let val = () => {
            let randomString1 = arr[Math.floor(Math.random() * arr.length)];
            let randomNumber = parseInt(randomString1);
            console.log(randomNumber);
            return randomNumber;

          };
          let no = val();

          function randomGenerator() {
            while (btns[no].innerText !== '') {
              console.log("valid");

            }
            btns[no].innerText = "O";
            arr = [];
          }

          randomGenerator();
        }
        return true;
      }

      /*for (var i = 0; i < btns.length; i++) {
        if (btns[i].innerText === '') {
          //arr.push(i);
          console.log('Computer move');
          //btns[i].innerText = "O";
          randomGenerator();
          return true;
        }
      }*/
      return false;
    }


    function button_onclick() {
      this.innerText = "X";
      this.disabled = "disabled";
      if (isGameOver()) return;
      if (!computerMove()) {
        console.log('game is a draw!');
      }
      isGameOver();
    }







  }


}
