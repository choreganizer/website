import React from 'react';
import { generate } from 'shortid';
import withAuth from '../src/helper/auth';
import { database, auth } from '../src/firebase/index';
import {
  createGroup, getGroups, addChore, getChores, addUserToGroup, deleteGroup,
} from '../src/firebase/helper';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', username: '', chores: [], groups: [], isInGroup: false,
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
        console.log(groups[0])
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

  // componentDidUpdate(prevProps, prevStates) {
  //   getGroups(auth.currentUser.uid).then((value) => {
  //     if (prevStates.groups !== value) {
  //       console.log('here');
  //       this.setState({
  //         groups: value,
  //       });
  //     }
  //   });
  // }

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
        console.log(this.state.groups);
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

  render() {
    const {
      chores, username, groups, isInGroup, groupSelection,
      choreName, assignedToUsername, addingUsername, groupSelectionForAddingToGroup,
    } = this.state;
    return (
      <div className="columns">
        <div className="column">
          <div className="box">
            <h1 className="is-size-8 title">Heres the chores for {username}</h1>
            <div className="buttons">
              {chores.map(obj => (
                <button className="button is-fullwidth" type="button" key={obj.choreID} onClick={() => this.deleteChore(obj.choreID)}>{obj.choreName} : {obj.choreID}</button>
              ))}
            </div>
            {!isInGroup ? (
              <fieldset disabled>
                <div className="field has-addons">
                  <div className="control is-link">
                    <input className="input" name="choreName" type="text" placeholder="Chore Name" />
                  </div>
                  <div className="control">
                    <a className="button is-primary">
                      Add Chore
                    </a>
                  </div>
                </div>
              </fieldset>
            ) : (
              <div className="field has-addons">
                <div className="control">
                  <input className="input" name="choreName" type="text" placeholder="Chore Name" onChange={this.handleInputChange} />
                </div>
                <div className="control">
                  <input className="input" name="assignedToUsername" type="text" placeholder="User Name" onChange={this.handleInputChange} />
                </div>
                <div className="select">
                  <select name="groupSelection" onChange={this.handleInputChange}>
                    {groups.map(obj => (
                      <option value={obj.groupID} key={obj.groupID}>{obj.groupName}</option>
                    ))}
                  </select>
                </div>
                <div className="control">
                  <button className="button is-primary" type="button" onClick={() => addChore(groupSelection, choreName, assignedToUsername)}>
                    Add Chore
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h1 className="is-size-8 title">Heres the groups for {username}</h1>
            <div className="buttons">
              {groups.map(obj => (
                <button className="button is-fullwidth" type="button" key={obj.groupID} onClick={() => this.deleteGroup(obj.groupID)}>{obj.groupName} : {obj.groupID}</button>
              ))}
            </div>
            <div className="buttons is-centered">
              <button className="button" type="button" onClick={this.clickCreateGroup}>Create Group</button>
              <button className="button" type="button" onClick={this.printButton}>Print Button</button>
              <button className="button" type="button">Join Group</button>
            </div>
            <div className="field has-addons has-addons-centered">
              <div className="control">
                <input className="input" name="addingUsername" type="text" placeholder="User Name" onChange={this.handleInputChange} />
              </div>
              <div className="select">
                <select name="groupSelectionForAddingToGroup" onChange={this.handleInputChange}>
                  {groups.map(obj => (
                    <option value={obj.groupID} key={obj.groupID}>{obj.groupName}</option>
                  ))}
                </select>
              </div>
              <div className="control">
                <button className="button is-primary" type="button" onClick={() => addUserToGroup(addingUsername, groupSelectionForAddingToGroup)}>
                  Add to group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Admin);
