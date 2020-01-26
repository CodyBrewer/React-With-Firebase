import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCjA8Pkg9RIn1YfMq10qxLiEAHE156l0NM",
  authDomain: "react-tutorial-5eb73.firebaseapp.com",
  databaseURL: "https://react-tutorial-5eb73.firebaseio.com",
  projectId: "react-tutorial-5eb73",
  storageBucket: "react-tutorial-5eb73.appspot.com",
  messagingSenderId: "731729519971",
  appId: "1:731729519971:web:995f3f4f92e3978c439f56"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => {
    this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => {
    this.auth.currentUser.updatePassword();
  };
}

export default Firebase;
