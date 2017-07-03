import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable()
export class AuthService {
    private token: string;

    constructor(private router: Router) {
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    console.log(response);

                    this.setToken();

                    // redirect to the main page
                    this.redirectToMainPage();
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    // Set local token from the firebase getToken()
    setToken() {
        firebase.auth().currentUser.getToken()
            .then(
                (token: string) => this.token = token
            );
    }

    getToken() {
        this.setToken();
        
        return this.token;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;

        // redirect to the main page
        this.redirectToMainPage();
    }
    
    isAuthenticated() {
        return this.token != null;
    }


    private redirectToMainPage() {
        this.router.navigate(['/']);
    }
}