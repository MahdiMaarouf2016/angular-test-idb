import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlayer, PlayersService } from './players.service';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  @ViewChild('dt') table: Table;
  players:Array<IPlayer> = [{
    name:"sdqsdqs",
    app:2,
    min:12,
    goals:23,
    pour:23,
    hdm:2,
    hpm:3,
    yellow:1,
    red:1,
    decisive:12,
    aerialwon:12
  }];
  selectedplayers:Array<IPlayer> = [];
  loading:false;
  constructor(private playersService:PlayersService,private primengConfig: PrimeNGConfig){

  }
ngOnInit(): void {

  this.primengConfig.ripple = true;
}
  
filterate($event,field,filtername){
  this.table.filter($event.target.value, field,filtername );
}

delete(player){
  this.playersService.delete(player.id).then(res=>{
    alert("player has been deleted !");
  },error=>{
    alert("error has been occured when deleting player");
  })
}

}

/*

onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
        const activity = parseInt(value);

        if (!isNaN(activity)) {
            this.table.filter(activity, 'activity', 'gte');
        }
    }
}
*/