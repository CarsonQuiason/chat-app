import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';

import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private auth: AuthService,
    private router: Router,
    private afs: AngularFirestore
  ) { }


  getChat(chatId) {
    return this.afs
      .collection<any>('chatRoom')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  async createRoom(title: string) {
    const { uid } = await this.auth.getUserPromise();

    const roomData = {
      uid,
      title,
      timeCreated: Date.now(),
      msg: []
    };

    const docRef = await this.afs.collection('chatRoom').add(roomData);

    return this.router.navigate(['chatRoom', docRef.id]);
  }

  async sendMsg(chatId, content) {
    const { uid } = await this.auth.getUserPromise();

    const chatData = {
      uid,
      content,
      timeCreated: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('chatRoom').doc(chatId);
      return ref.update({
        //Allows for idempotent messages
        msg: firebase.firestore.FieldValue.arrayUnion(chatData)
      });
    }
  }

  connectUsertoMsg(chat$: Observable<any>) {
    let chat;
    const join = {};

    return chat$.pipe(
      switchMap(c => {
        chat = c;
        const uids = Array.from(new Set(c.msg.map(v => v.uid)));

        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (join[(<any>v).uid] = v));
        chat.msg = chat.msg.map(v => {
          return { ...v, user: join[v.uid] };
        });

        return chat;
      })
    );
  }

  getUserCreatedChats() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('chatRoom', ref => ref.where('uid', '==', user.uid))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }

  getAllChats() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('chatRoom')
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }
}
