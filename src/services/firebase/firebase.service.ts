import firebaseAdmin from 'firebase-admin';
import firebase, { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Service } from 'typedi';
import serviceAccount from '@/config/firebase.json';
import { logger } from '@/utils/logger';

@Service()
class FirebaseService {
  public firebaseApp: firebase.FirebaseApp;
  public firebaseAdminApp: firebaseAdmin.app.App;
  public firebaseAuth: Auth;

  constructor() {
    this.initializeFirebase();
  }

  public getFirebaseApp() {
    return this.firebaseApp;
  }

  public getFirebaseAuth() {
    return this.firebaseAuth;
  }

  public getFirebaseAdminApp() {
    return this.firebaseAdminApp;
  }

  private initializeFirebase() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD-5tJlW9u9Dl4cJQOZ6wZ2fE1bY6y0X6Q',
      authDomain: 'lor-tracker.firebaseapp.com',
      databaseURL: 'https://lor-tracker-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'lor-tracker',
      storageBucket: 'lor-tracker.appspot.com',
      messagingSenderId: '1050441881464',
      appId: '1:1050441881464:web:3f1f2c5b6d7f6b8c7b2a4c',
      measurementId: 'G-8XJ5JQ4Q0J',
    };

    this.firebaseApp = initializeApp(firebaseConfig);

    this.firebaseAdminApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount as any),
      databaseURL: 'https://lor-tracker-default-rtdb.europe-west1.firebasedatabase.app',
    });

    this.firebaseAuth = getAuth(this.firebaseApp);
  }
}

export { FirebaseService };
