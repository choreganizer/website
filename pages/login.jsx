import React from 'react';
import router from 'next/router';
import { auth, database } from '../src/firebase';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', pass: '' };
  }

  handleSignIn = () => {
    const { username, pass } = this.state;
    let mail = '';
    database.ref(`usernames/${username}/email`).once('value', (usernameSnapshot) => {
      // console.log(usernameSnapshot.val().email);
      mail = usernameSnapshot.val();
    }).then(() => {
      // console.log(email);
      auth.signInWithEmailAndPassword(mail, pass).then(() => {
        router.push('/dashboard');
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ pass: e.target.value });
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-two-fifths">
          <div className="box">
            <h1 className="title is-size-3 is-size-5-mobile has-text-centered has-text-primary">
              WELCOME BACK!
            </h1>
            <div className="field">
              <label className="label has-text-primary">USERNAME</label>
              <div className="control">
                <input className="input" type="text" placeholder="choreboiz" onChange={this.handleUsernameChange} />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-primary">PASSWORD</label>
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Enter Password" onChange={this.handlePasswordChange} />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-primary is-rounded is-fullwidth" type="submit" onClick={this.handleSignIn}>
                  LOGIN
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
