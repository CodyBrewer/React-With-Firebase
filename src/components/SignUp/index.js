import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const SignupPage = () => {
  return (
    <div>
      <h1>SignUp</h1>

      <FirebaseContext.Consumer>
        <SignUpForm />
      </FirebaseContext.Consumer>
    </div>
  );
};

const SignUpForm = props => {
  const [credentials, setCredentials] = useState(...INITIAL_STATE);

  const onSubmit = e => {
    const { username, email, passwordOne } = credentials;

    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setCredentials({ ...INITIAL_STATE });
      })
      .catch(error => {
        setCredentials({ ...credentials, error: error });
      });

    e.preventDefault();
  };

  const onChange = e => {
    setCredentials({ [e.target.name]: e.target.value });
  };

  const isInvalid =
    credentials.passwordOne !== credentials.passwordTwo ||
    credentials.passwordOne === "" ||
    credentials.email === "" ||
    credentials.username === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        value={credentials.username}
        onChange={onChange}
        type="text"
        name="username"
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={onChange}
        placeholder="Email Address"
      />
      <input
        type="password"
        name="passwordOne"
        value={credentials.passwordOne}
        onChange={onChange}
        placeholder="Password"
      />
      <input
        type="password"
        name="passwordTwo"
        value={credentials.passwordTwo}
        onChange={onChange}
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {credentials.error && <p>{credentials.error.message}</p>}
    </form>
  );
};

const SignupLink = () => {
  return (
    <p>
      Don't Have an Account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignupPage;

export { SignUpForm, SignupLink };
