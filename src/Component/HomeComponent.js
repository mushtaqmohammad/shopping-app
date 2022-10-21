import React, { Component } from 'react';
import { Button } from 'primereact/button';
import UserService from '../services/UserService';
import PostService from '../services/PostService';
import { Dialog } from 'primereact/dialog';
import ViewTweetComponent from '../ShoppingComponent/ViewTweetComponent';
import ViewMyTweetComponent from '../ShoppingComponent/ViewMyTweetComponent';
import ResetPasswordComponent from '../ChangePasswordComponent/ResetPasswordComponent';
class HomeComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showUser: false,
      showSearchUser: false,
      showAllTweet: true,
      showUserTweet: false,
      showPasswordReset: false,
      users: [],
      searchUser: {},
      searchData: '',
      message: '',
      searchMessage: '',
      showPostTweet: false,
      tweetMessage: {},
      error: '',
      postError: ''

    }
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loginId');
    this.props.history.push('/');

  }
  setData() {
    return localStorage.getItem('loginId');

  }
  displayPostTweet = (e) => {
    this.setState({ showPostTweet: true });
    this.setState({ postError: '' });
    this.setState({ tweetMessage: {} });

  }
  displayPasswordReset = (e) => {
    this.setState({ showPasswordReset: true });
  }
  handleChange = (e) => {
    this.setState({ searchData: e.target.value })
  }
  handleTweetChange = (e) => {
    let tweet = this.state.tweetMessage;
    tweet["tweetMessage"] = e.target.value;
    this.setState({ tweet })
  }

  getAllUsers = (e) => {
    e.preventDefault();
    this.setState({ message: '' });
    UserService.getUser().then(response => {
      this.setState({ users: response.data });
      console.log(this.state.users);
      if (this.state.users == []) {
        this.setState({ message: "No User Found" });
      }

    });
    this.setState({ showUser: true });
    this.setState({ showSearchUser: false });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: false });
    this.setState({ showUserTweet: false });
  }
  getUserSearch = (e) => {
    e.preventDefault();
    this.setState({ searchMessage: '' });
    UserService.getUserSearch(this.state.searchData).then(response => {
      this.setState({ searchUser: response.data });

      console.log(this.state.users);
      if (this.state.searchUser == []) {
        this.setState({ searchMessage: "No User Found" });
      }

    });
    this.setState({ showUser: false });
    this.setState({ showSearchUser: true });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: false });
    this.setState({ showUserTweet: false });

  }
  getAllTweet = (e) => {
    e.preventDefault();
    this.setState({ showUser: false });
    this.setState({ showSearchUser: false });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: true });
    this.setState({ showUserTweet: false });


  }
  getUserTweet = (e) => {
    e.preventDefault();
    this.setState({ showUser: false });
    this.setState({ showSearchUser: false });
    this.setState({ showPostTweet: false });
    this.setState({ showAllTweet: false });
    this.setState({ showUserTweet: true });


  }
  onHide() {
    this.setState({ showPostTweet: false });
  }
  saveTweet() {
    //e.preventDefault();
    this.setState({ postError: '' });
    let tweet = this.state.tweetMessage;
    if (tweet["tweetMessage"].length <= 144) {
      tweet["like"] = 0;
      tweet["tweetTime"] = new Date().toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'short',

      });
      PostService.postTweet(tweet).then(response => { });
      this.setState({ showPostTweet: false });
      console.log(tweet);
    }
    else {
      this.setState({ postError: 'Message size is long' });
    }
  }
  renderFooter() {
    return (
      <div>
        <Button label="Cancel" onClick={() => this.onHide()} className="p-button-text" />
        <Button label="Post" onClick={() => this.saveTweet()} autoFocus />
      </div>
    );
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-dark bg-dark">
          <ul className="nav navbar-nav"><li><a href="" className="navbar-brand">Tweet App</a></li></ul>
          <ul className="nav navbar-nav search"><li> <input placeholder="UserName" name="searchData" className="form-control"
            value={this.state.searchData} onChange={this.handleChange} /></li><li>
              &nbsp;<button className="btn btn-success" onClick={this.getUserSearch.bind(this)}>Search</button>
            </li></ul>
          <ul className="nav navbar-nav text">
            <li><Button className="p-button p-button-rounded" icon="pi pi-users" iconPos="right" title="view users" onClick={this.getAllUsers.bind(this)} /></li>
            <li><Button className="p-button p-button-rounded" icon="pi pi-plus" iconPos="right" title="post tweet" onClick={this.displayPostTweet.bind(this)} /></li>
            <li >
              <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.setData()}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#" onClick={this.getUserTweet.bind(this)}>View MyTweet</a>
                  <a class="dropdown-item" href="#" onClick={this.getAllTweet.bind(this)}>View AllTweet</a>
                  <a class="dropdown-item" href="#" onClick={this.displayPasswordReset.bind(this)}>Reset Password</a>
                  <a class="dropdown-item" href="#" onClick={this.logout.bind(this)}><i class="pi pi-sign-out">&nbsp;logout</i></a>
                </div>
              </div>
            </li></ul></nav>
        {this.state.showUser && <div className="user">
          <h3 className="center">Users</h3><br />
          <div className="center">{this.state.message}</div>
          <table className="table table-striped ">
            {
              this.state.users.map(
                user =>
                  <tr key={user.loginId}>
                    <td>  {user.firstName} </td>
                    <td> {user.lastName}</td>
                    <td>{user.dob}</td>
                  </tr>)}
          </table>
        </div>}
        {this.state.showSearchUser && <div className="user">
          <h3 className="center">Users</h3><br />
          <div className="center">{this.state.searchMessage}</div>
          <table className="table table-striped ">
            {<tr >
              <td>  {this.state.searchUser.firstName} </td>
              <td> {this.state.searchUser.lastName}</td>
              <td>{this.state.searchUser.dob}</td>
            </tr>}
          </table></div>}
        <Dialog header="Post Tweet" footer={this.renderFooter()} visible={this.state.showPostTweet} style={{ width: '50vw' }}>
          <br /><input placeholder="Enter Post" name="tweetMessage" className="form-control"
            value={this.state.tweetMessage["tweetMessage"]} onChange={this.handleTweetChange} />
          <br /><span className="error"> {this.state.postError}</span>
        </Dialog>

        {this.state.showAllTweet && <div className="user">
          <ViewTweetComponent /></div>}
        {this.state.showUserTweet && <div className="user">
          <ViewMyTweetComponent /></div>}
        {this.state.showPasswordReset && <div>
          <ResetPasswordComponent /></div>}

      </div>
    )
  }
}

export default HomeComponent
