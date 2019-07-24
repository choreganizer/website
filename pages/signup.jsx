import React from 'react';
import router from 'next/router';
import { auth, database } from '../src/firebase';

export default class signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', username: '', password: '', confirmedPass: '',
    };
  }

  handleSignUp = () => {
    const {
      email, username, password, confirmedPass,
    } = this.state;
    let usernameExists = false;
    database.ref(`usernames/${username}`).once('value', (snapshot) => {
      if (snapshot.exists()) {
        usernameExists = true;
      }
    });
    if (password !== confirmedPass) {
      alert("Passwords don't match");
    } else if (usernameExists) {
      alert('Username Exists');
    } else {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          const { uid } = auth.currentUser;
          database.ref(`users/${uid}`).set({
            email,
            username,
          });
          database.ref(`usernames/${username}`).set({
            uid,
            email,
          }).then(() => {
            router.push('/dashboard');
          });
        })
        .catch((err) => {
          alert('OOps something went wrong check your console');
          console.log(err);
        });
    }
  }

  handleInputChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
    console.log(value);
  }

  uploadImage = () => {
    alert('Change this later to maybe a new page to make it easier');
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-two-fifths">
          <div className="box">
            <figure className="image container is-96x96 is-centered">
              <img className="is-rounded" alt="user profile" src="https://bulma.io/images/placeholders/96x96.png" />
            </figure>
            <a className="button is-small is-fullwidth is-text has-text-grey" style={{ opacity: '1', boxShadow: 'none' }}>Upload a profile picture</a>
            <div className="field">
              <label className="label has-text-primary">USERNAME</label>
              <div className="control">
                <input className="input" name="username" type="text" onChange={this.handleInputChange} placeholder="choreboiz" />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-primary">EMAIL</label>
              <div className="control">
                <input className="input" name="email" type="email" onChange={this.handleInputChange} placeholder="choreboiz@choreganizer.com" />
              </div>
            </div>
            <label className="label has-text-primary">PASSWORD</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input className="input" name="password" type="password" onChange={this.handleInputChange} placeholder="Enter Password" />
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded">
                    <input className="input" name="confirmedPass" type="password" onChange={this.handleInputChange} placeholder="Confirm Password" />
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-primary is-rounded is-fullwidth" type="submit" onClick={this.handleSignUp}>
                  SUBMIT
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
