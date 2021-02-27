import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BlogMeFirebaseService {
  private dbPath = '/category/';

  constructor(private db: AngularFireDatabase) {
   
  }

  getAll() {
    return this.db.list(this.dbPath).snapshotChanges();
  }

  create(path, data) {
    return this.db.list(this.dbPath+path).push(data);
  }


}
