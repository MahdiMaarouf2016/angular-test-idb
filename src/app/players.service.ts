import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export interface IPlayer {
  id?: number;
  name: string;
  app: number;
  min: number;
  goals: number;
  decisive: number;
  yellow: number;
  red: number;
  hpm: number;
  pour: number;
  aerialwon: number;
  hdm: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private dbService: NgxIndexedDBService) {
  }

  add(player: IPlayer): Promise<IPlayer> {
    return new Promise<IPlayer>((resolve, error) => {
      this.dbService
        .add('player', player)
        .subscribe(player => {
          resolve(player);
        }, error => {
          error(error);
        });
    })
  }

  delete(id: number): Promise<IPlayer> {
    return new Promise<IPlayer>((resolve, error) => {
      this.dbService.delete<IPlayer>('player', id).subscribe(player => {
        resolve(player[0]);
      }, error => {
        error(error);
      })
    });
  }

  update(id: number, newPlayer: IPlayer): Promise<IPlayer> {
    return new Promise<IPlayer>((resolve, error) => {
      this.dbService.updateByKey('player', newPlayer, id).subscribe(player => {
        resolve(player[0]);
      }, error => {
        error(error);
      });
    });
  }

   addBulk(players: IPlayer[]): Promise<Array<IPlayer>> {
     return new Promise<IPlayer[]>((resolve, error) => {
       this.dbService.bulkAdd('player', players).subscribe(ids => {
         players.map((player, index) => {
           players[index].id = ids[index];
         })
         resolve(players);
       }, error => {
         error(error);
       })
     });
   }

}