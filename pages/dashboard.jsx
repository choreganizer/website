import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withAuth from '../src/helper/auth';
import { database, auth } from '../src/firebase/index';
import { createGroup, addChore, getChores,
         addUserToGroup, getGroups, deleteGroup} from '../src/firebase/helper'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', email: '', username: '', groups: [], isInGroup: false,
    };
  }

  componentDidMount() {
    getGroups(auth.currentUser.uid).then((value) => {
      this.setState({
        groups: value,
      });
      getChores(auth.currentUser.uid).then((chores) => {
        this.setState({
          chores,
        });
      });
      const { groups } = this.state;
      database.ref(`/users/${auth.currentUser.uid}`).once('value').then((snapshot) => {
        this.setState({
          name: snapshot.val().name,
          email: snapshot.val().email,
          username: snapshot.val().username,
          groupSelection: groups.length <= 0 ? null : groups[0].groupID,
          groupSelectionForAddingToGroup: groups.length <= 0 ? null : groups[0].groupID,
          isInGroup: groups.length > 0,
        });
      });
    });
  }

  clickCreateGroup = () => {
    createGroup(generate(), auth.currentUser.uid).then((gid) => {
      console.log(gid);
      // // this.setState({
      // //   groups: groups.push(gid),
      // // });
      // database.ref(`groups/${gid}`).once('value').then((groupSnapshot) => {
      //   this.setState({
      //     groups: groupSnapshot.val(),
      //   });
      //   console.log(this.state);
      // });
    });
  }

  deleteGroup = (groupID) => {
    deleteGroup(auth.currentUser.uid, groupID).then((gid) => {
      getGroups(auth.currentUser.uid).then((value) => {
        this.setState({
          groups: value,
        });
      });
    });
  }

  deleteChore = (choreID) => {
    console.log(choreID);
  }

  printButton = () => {
    console.log(this.state);
  }

  handleInputChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
    this.printButton();
    console.log(value);
  }

  /* okay so bulma has limited color names, so i named the darker blue "warning"
the $milkyWhite is named "link" */
  render() {
    const { name, email, username } = this.state;
    return (
      <div className="columns">
        {/* Left side of website, the sidebar */}
        <div className="column is-one-fifth">
          {/* Profile picture */}
          <figure className="image container is-128x128 has-text-centered">
            <img className="is-rounded" alt="user profile" src="https://bulma.io/images/placeholders/96x96.png" />
          </figure>
          {/* userid label directly under the profile pic */}
          <label className="label  has-text-centered has-text-link">{username}</label>

          <div className="box is-invisible is-marginless" />
          {/* "Your Places" label, trying to get it to look like Vania's design */}
          <div className="columns">
            <div className="column is-two-thirds has-background-warning ">
              <div className="block is-fullwidth has-background-warning">
                <label className="label is-pulled-right has-text-link">YOUR PLACES</label>
              </div>
            </div>
          </div>
          <div className="box has-background-link">
            <FontAwesomeIcon icon="home" size="2x" color="#91C7CE" />
          </div>
          <button className="button is-rounded is-funellwidth has-text-warning has-background-link">
            <FontAwesomeIcon icon="plus-circle" size="1x" color="#91C7CE" />
            SET UP A HOUSE
          </button>
        </div>
        {/* Right side of website */}
        <div className="column">
          <div className="box has-background-link">
            <h1 className="title is-size-3 is-size-5-mobile has-text-centered has-text-warning">
                  Welcome Home, {username}
            </h1>
            {/* Center Visual: House Icon */}
            <figure className="image container is-480x800 has-text-centered">
              <FontAwesomeIcon icon="home" size="10x" color="#91C7CE" />
            </figure>
            <figure className="image container is-500x500 has-text-centered">
              <FontAwesomeIcon icon="tasks" size="2x" color="#B3D9DE" />
            </figure>
            {/* Box to fill up space lol */}
            <div className="box is-invisible is-paddingless" />
            <div className="field" />
            {/* Bottom 3 columns for tasks, members, edit house boxes */}
            <div className="columns">
              <div className="column is-one-third">
                <div className="box has-background-link">
                  <label className="label has-text-centered has-text-warning has-text-weight-normal">Your Tasks</label>
                  <button className="button is-fullwidth has-text-left has-text-link
                        has-background-warning"
                  ><FontAwesomeIcon icon="check" color="#B3D9DE" /> Vacuum living room.
                  </button>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="box has-background-link">
                  <label className="label has-text-centered has-text-warning has-text-weight-normal">Members</label>
                  <button className="button is-fullwidth has-text-link has-background-warning">
                          Vania
                  </button>
                  <button className="button is-fullwidth has-text-link has-background-warning">
                          Ayden, etc.
                  </button>
                  <button className="button is-rounded is-fullwidth has-text-warning has-background-link">
                    <FontAwesomeIcon icon="plus-circle" size="1x" color="#91C7CE" /> {/* color='primary' also works */}
                          ADD A MEMBER
                  </button>
                </div>
              </div>
              <div className="column is-one-third">
                <button className="button is-fullwidth has-text-warning has-background-link">
                  <FontAwesomeIcon icon="edit" color="#91C7CE" />
                        Edit House
                </button>
                <div className="box is-invisible is-paddingless" /> {/* Spacer */}
                {/* Add chore button */}
                <button className="button is-rounded is-fullwidth has-background-link has-text-warning">
                  <FontAwesomeIcon icon="plus-circle" size="1x" color="#91C7CE" />
                        ADD CHORE
                </button>
                {/* Input field for adding chores */}
                <div className="field">
                  <div className="control">
                    <input className="input" name="chore" type="text" placeholder="Vacuum the living room" />
                  </div>
                  {/* Submit button for adding chores, on-click will add chore to database */}
                  <button className="button is-rounded has-text-warning has-background-link">
                          Add
                  </button>
                </div>
              </div>
            </div>
            <div className="field" />
            <div className="box is-invisible" />
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Dashboard);
