import React from 'react';
import withAuth from '../src/helper/auth'
import { database, auth } from '../src/firebase/index';
class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: "", email: ""};
  }

  componentDidMount() {
    database.ref('/users/'+auth.currentUser.uid).once('value').then(snapshot => {
      this.setState({
        name: snapshot.val().name,
        email: snapshot.val().email
      });
    });
  }

  render() {
    const {name, email} = this.state;
    return (
      <div className="container">
        <h1 className="title is-size-3">Dashboard  Page</h1>
        <p>You are authenticated. Welcome {name}</p>
        <p>You have used the email: {email}</p>
      </div>
    )
  }
}
export default withAuth(Dashboard);