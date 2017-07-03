import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAuU1BHjohb2OTyiZBvbiHfoHFGCfdQhCo",
      authDomain: "ng-recipe-book-8ba77.firebaseapp.com"
    });
  }
}
