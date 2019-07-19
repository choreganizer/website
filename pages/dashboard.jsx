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
          {/*Profile picture*/}
          <figure className="image container is-128x128 has-text-centered">
            <img className="is-rounded" alt="user profile" src="https://bulma.io/images/placeholders/96x96.png" />
          </figure>
          {/*userid label directly under the profile pic*/}
          <label className="label  has-text-centered has-text-white">{username}</label>
          {/*Add chore button*/}
          <button className="button is-rounded is-fullwidth has-text-primary">
            <FontAwesomeIcon icon="plus-circle" size="1x" color='#B3D9DE'/>
            ADD CHORE
          </button>
          {/*Input field for adding chores*/}
          <div className="field">
            <div className="control">
              <input className="input" name="chore" type="text" /*onChange={function for chore database}*/ placeholder="Vacuum the living room" />
            </div>
            {/*Submit button for adding chores, on-click will add chore to database*/}
            <button className="button is-rounded has-text-primary" >
              Add
            </button>
          </div>
          {/*"Your Places" label, trying to get it to look like Vania's design*/}
          <div className="box ">
            <label className="label has-text-primary">YOUR PLACES</label>
          </div>
          <div className="box">
            <button className="button is-rounded is-fullwidth has-text-primary">
              <FontAwesomeIcon icon="plus-circle" size="1x" color='#B3D9DE'/> {/*color='primary' also works*/}
              SET UP A HOUSE
            </button>
          </div>
        </div>
        {/*Right side of website*/}
        <div className="column">
          <div className="box" >
                <h1 className="title is-size-3 is-size-5-mobile has-text-centered has-text-primary">
                  Welcome Home, {username}
                </h1>
                <figure className="image container is-480x800 has-text-centered">
                    <FontAwesomeIcon icon="home" size="10x" color='#B3D9DE'/>
                </figure>
                <figure className="image container is-500x500 has-text-centered">
                    <FontAwesomeIcon icon="tasks" size="2x" color='#B3D9DE'/>
                </figure>
                <div className="box"></div>
                <div className="field"></div>
                <div className="columns">
                  <div className="column is-one-third">
                    <div className="box">
                        <label className="label has-text-centered has-text-primary">Your Tasks</label>
                        <text className="label has-text-left has-text-grey">- Vacuum living room.</text>
                        <text className="label has-text-left has-text-grey">So I was thinking that we would display the
                        list of user's chores from the database here. It updates whenever we "Add Chore". Also,
                        it would be cool if we could check it off and delete the items we finished.</text>
                    </div>
                  </div>
                  <div className="column is-one-third">
                    <div className="box">
                        <label className="label has-text-centered has-text-primary">Members</label>
                    </div>
                  </div>
                  <div className="column is-one-third">
                      <button className="button is-fullwidth has-text-primary">
                        <FontAwesomeIcon icon="edit" color='primary'/>
                        Edit House
                      </button>
                  </div>
                </div>
                <div className="field"></div>
                <div className="box"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Dashboard);
