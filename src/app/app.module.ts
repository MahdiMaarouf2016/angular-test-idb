import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { AppComponent } from './app.component';
import { PlayersService } from './players.service';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db, transaction) => {
      const store = transaction.objectStore('player');
      store.createIndex('id', 'id', { unique: false });
    }
  };
}

const dbConfig: DBConfig = {
  name: 'frontdb',
  version: 1,
  objectStoresMeta: [{
    store: 'player',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'app', keypath: 'app', options: { unique: false } },
      { name: 'min', keypath: 'min', options: { unique: false } },
      { name: 'goal', keypath: 'goal', options: { unique: false } },
      { name: 'decisive ', keypath: 'decisive', options: { unique: false } },
      { name: 'yellow ', keypath: 'yellow', options: { unique: false } },
      { name: 'red ', keypath: 'red', options: { unique: false } },
      { name: 'hpm ', keypath: 'hpm', options: { unique: false } },//height per meter
      { name: 'pour ', keypath: 'pour', options: { unique: false } },
      { name: 'aerialwon ', keypath: 'aerialwon', options: { unique: false } },//Aerial Won 
      { name: 'hdm ', keypath: 'hdm', options: { unique: false } },
    ]
  }],
  migrationFactory
};

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule ,
    TableModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
