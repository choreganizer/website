import React from 'react';
import withAuth from '../src/helper/auth';
import { database, auth } from '../src/firebase/index';

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
          <a className="button is-large is-fullwidth">Large</a>
        </div>
        <div className="column">
          <div className="box">
            <p className="title is-size-4 has-text-centered has-text-primary"> Welcome home </p>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Dashboard);
