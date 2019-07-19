import React from 'react';
import withAuth from '../src/helper/auth';
import { database, auth } from '../src/firebase/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '' };
  }

  componentDidMount() {
    database.ref(`/users/${auth.currentUser.uid}`).once('value').then((snapshot) => {
      this.setState({
        name: snapshot.val().name,
        email: snapshot.val().email,
        username: snapshot.val().username
      });
    });
  }

  render() {
    const { name, email, username } = this.state;
    return (
      <div className="columns">
        {/*Left side of website, the sidebar*/}
        <div className="column is-one-fifth">
          <figure className="image container is-128x128 has-text-centered">
            <img className="is-rounded" alt="user profile" src="https://bulma.io/images/placeholders/96x96.png" />
          </figure>
          <button className="button is-rounded is-fullwidth has-text-primary">
            <FontAwesomeIcon icon="plus-circle" size="1x" color='#B3D9DE'/>
            ADD CHORE
          </button>
          <div className="box ">
            <label className="label has-text-primary">Your Places</label>
          </div>
          <div className="box">
            <button className="button is-rounded is-fullwidth has-text-primary">
              <FontAwesomeIcon icon="plus-circle" size="1x" color='#B3D9DE'/>
              SET UP A HOUSE
            </button>
          </div>
        </div>
        {/*Right side of website*/}
        <div className="column">
          <div className="box" >
                <h1 className="title is-size-3 is-size-5-mobile has-text-centered has-text-primary">
                  Welcome Back, {username}
                </h1>
                <figure className="image container is-480x800 has-text-centered">
                    <FontAwesomeIcon icon="home" size="10x" color='#B3D9DE'/>
                </figure>
                <figure className="image container is-500x500 has-text-centered">
                    <FontAwesomeIcon icon="tasks" size="2x" color='#B3D9DE'/>
                </figure>
                <div className="box"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Dashboard);
