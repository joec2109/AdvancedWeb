import React, {useState} from 'react';
import '../App.css';

// LogIn.js

export default function LogIn() {
  return (
    <div className="form">
      <h1>Log In</h1>
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="username">Username </label>
          <input className="form__input" type="text" id="username" placeholder="Username"/>
        </div>
        <div className="password">
          <label className="form__label" for="password">Password </label>
          <input className="form__input" type="text" id="password" placeholder="Password"/>
        </div>
      </div>
      <button type="submit">Sign Up</button>
    </div>
  )
}