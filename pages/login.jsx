import React from 'react';
import router from 'next/router';
import { auth, database } from '../src/firebase';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', username: '', pass: '' };
  }

  handleSignIn = () => {
    const { email, username, pass } = this.state;
    let uid = '';
    database.ref(`usernames/${username}`).once('value', (usernameSnapshot) => {
      uid = usernameSnapshot.val().uid;
    }).then(() => {
      database.ref(`users/${uid}`).once('value', (userSnapshot) => {
        this.setState({ email: userSnapshot.val().email });
      }).then(() => {
        auth.signInWithEmailAndPassword(email, pass).then(() => {
          router.push('/dashboard');
        }).catch((err) => {
          alert(err);
        });
      });
    });
    // database.ref(`usernames/${username}`).once('value', (usernameSnapshot) => {
    //   const { uid } = usernameSnapshot.val();
    //   database.ref(`users/${uid}`).once('value', (userSnapshot) => {
    //     console.log(userSnapshot.val());
    //     const userEmail = userSnapshot.val().email;

    //     this.setState({ email: userEmail });
    //   });
    // });
    // auth.signInWithEmailAndPassword(email, pass)
    //   .then(() => {
    //     router.push('/dashboard');
    //   })
    //   .catch((err) => {
    //     alert('OOps something went wrong check your console');
    //     console.log(err);
    //   });
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
