import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  isWinner: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PlayersComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {}

  player1: any;
  player2: any;
  winner:String=""
  isPlayer1 = true;
  board: any;
  noOfTurn = 0;
  ngOnInit(): void {
    this.winner="";
    this.firstDiagonalCount = 0;
    this.player1 = { id: -1, isPlayer1: false };
    this.player2 = { id: -1, isPlayer2: false };
    this.isPlayer1 = true;
    this.board = [];
    this.isWinner = false;
    this.noOfTurn = 0;
    this.createBoard();
  }
  clickOnDiv(row: any, col: any) {
    if(!this.isWinner)
    {
      this.winner=""
    }
    this.noOfTurn++;
    if (this.noOfTurn >= 8) {
      return;
    }
    if (this.noOfTurn < 8 && !this.isWinner) {
      if (this.isPlayer1) {
        this.board[row][col].status = 'X';
      } else {
        this.board[row][col].status = 'O';
      }
      this.isPlayer1 = !this.isPlayer1;
      this.checkGameStatus(row, col);
      if(this.isWinner)
      {
        if(this.board[row][col].status=='X')
        {
          this.winner="Player 1"
        }
        else if(this.board[row][col].status=='O')
        {
          this.winner="Player 2"
        }
      }
    }
  }
  checkGameStatus(row: any, col: any) {
    this.checkDiagonal(row, col);
    this.checkRow(row, col);
    this.checkCol(row, col);
  }
  public allCol = [0, 0, 0];
  checkCol(row: any, col: any) {
    this.allCol = [0, 0, 0];
    let fixRow = 0;
    if (!this.isWinner) {
      for (let i = 0; i < 3; i++) {
        var fixedVal = this.board[fixRow][i].status;
        for (let j = 0; j < 3; j++) {
          if (fixedVal != '') {
            if (this.board[j][i].status == fixedVal) {
              this.allCol[i] = this.allCol[i] + 1;
            }
            if (this.allCol[i] >= 3) {
              break;
            }
          }
        }
        if (this.allCol[i] >= 3) {
          break;
        }
      }
    }
    for (let ct of this.allCol) {
      if (ct >= 3) {
        this.isWinner;
      }
    }
  }
  checkRow(row: any, col: any) {
    this.allRow = [0, 0, 0];
    let fixCol = 0;
    if (!this.isWinner) {
      for (let i = 0; i < 3; i++) {
        var fixedVal = this.board[i][fixCol].status;
        for (let j = 0; j < 3; j++) {
          if (fixedVal != '') {
            if (this.board[i][j].status == fixedVal) {
              this.allRow[i] = this.allRow[i] + 1;
            }
            if (this.allRow[i] >= 3) {
              break;
            }
          }
        }
        if (this.allRow[i] >= 3) {
          break;
        }
      }
    }
    for (let ct of this.allRow) {
      if (ct >= 3) {
        this.isWinner = true;
      }
    }
  }
  public firstDiagonalCount = 0;
  public secondDiagonalCOunt = 0;
  public allRow = [0, 0, 0];
  checkDiagonal(row: any, col: any) {
    this.firstDiagonalCount = 0;
    this.secondDiagonalCOunt = 0;
    let firstDia = this.board[0][0].status;
    let secondDia = this.board[0][2].status;
    if (!this.isWinner) {
      for (let i = 0; i < 3; i++) {
        if (firstDia != '') {
          if (this.board[i][i].status == firstDia) {
            this.firstDiagonalCount++;
          }
          if (this.firstDiagonalCount >= 3) {
            break;
          }
        }
        for (let j = 2-i; j >= 0; j--) {
          if (secondDia != '') {
            if (this.board[i][j].status == secondDia) {
              this.secondDiagonalCOunt++;
            }
            break;
          }
        }
      }
    }
    if (this.firstDiagonalCount >= 3 || this.secondDiagonalCOunt >= 3) {
      this.isWinner = true;
    }
  }
  createBoard() {
    var dummyBoard = [];
    for (let i = 0; i < 3; i++) {
      dummyBoard = [];
      for (let j = 0; j < 3; j++) {
        dummyBoard.push({
          row: i,
          col: j,
          status: '',
        });
      }
      this.board.push(dummyBoard);
    }
  }
}
