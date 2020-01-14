import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import Chat from './Chat.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: false,
      username: "",
    };
    this.onLogIn = this.onLogIn.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogIn(e) {
    this.setState({validation: true, username:e.username})
  }

  onLogOut(e) {
    this.setState({validation: false});
  }

  render() {
    return (<div className="App">
      {
        this.state.validation
          ? <Chat onLogOut={this.onLogOut} username={this.state.username}/>
          : <Login onLogIn={this.onLogIn} username={this.state.username}/>
      }
    </div>)
  }
}

export default App;
