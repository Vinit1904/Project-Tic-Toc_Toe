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

  boxclick() {
    var isX = true;
    var isValid = false;
    var cells = [];
    var player = 1;
    var computer = 0;
    var onMove = 1;
    var result = "";
    var intervalId;

    {
      console.log(player);
    }
  }






}
