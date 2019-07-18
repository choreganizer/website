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
      });
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="columns">
        <div className="column is-one-fifth">
          <figure className="image container is-128x128 has-text-centered">
            <img className="is-rounded" alt="user profile" src="https://bulma.io/images/placeholders/96x96.png" />
          </figure>
          <button className="button is-rounded is-fullwidth has-text-primary">
            ADD CHORE
          </button>
          <div className="box ">
            <label className="label has-text-primary">Your Places</label>
          </div>
          <div className="box ">
            <button className="button is-rounded is-fullwidth has-text-primary">
              Create New House
            </button>
          </div>
        </div>
        {/*}<div className="column is-two-fifths"></div>*/}
        <div className="column">
          <div className="box" >
                <h1 className="title is-size-3 is-size-5-mobile has-text-centered has-text-primary">
                  Welcome Back, Username!
                </h1>
                <figure className="image container is-500x500 has-text-centered">
                    <FontAwesomeIcon icon="home" size="10x" color='#B3D9DE'/>
                </figure>
          </div>
          {/*}<span class="icon">
            <i class="fas fa-home"></i>
          </span>*/}

        </div>
      </div>
    );
  }
}
export default withAuth(Dashboard);
