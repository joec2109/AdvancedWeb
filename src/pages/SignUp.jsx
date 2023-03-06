import React, {useState} from 'react';
import '../App.css';

// SignUp.js
export default function SignUp() {
  return (
  <div className="form">
    <h1>Sign Up</h1>
    <div className="form-body">
      <div className="firstName">
        <label className="form__label" for="firstName">First Name </label>
        <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
      </div>
      <div className="lastName">
        <label className="form__label" for="lastName">Last Name </label>
        <input className="form__input" type="text" id="lastName" placeholder="Last Name"/>
      </div>
      <div className="email">
        <label className="form__label" for="email">Email </label>
        <input className="form__input" type="text" id="email" placeholder="Email"/>
      </div>
      <div className="username">
        <label className="form__label" for="username">Username </label>
        <input className="form__input" type="text" id="username" placeholder="Username"/>
      </div>
      <div className="password">
        <label className="form__label" for="password">Password </label>
        <input className="form__input" type="text" id="password" placeholder="Password"/>
      </div>
      <div className="passwordRepeat">
        <label className="form__label" for="passwordRepeat">Repeat Password </label>
        <input className="form__input" type="text" id="passwordRepeat" placeholder="Repeat Password"/>
      </div>
    </div>
    <button type="submit" class="btn">Sign Up</button>
  </div>
  )
}