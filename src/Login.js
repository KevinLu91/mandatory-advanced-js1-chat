import background from './image/background.jpg'
import './Login.css'
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userInfo: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({username: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    const regex = /^[0-9a-zA-Z_\s-]{1,12}$/;
    if (regex.test(this.state.username)) {
      this.props.onLogIn({username: this.state.username})
    } else if (regex.test(this.state.username) === false) {
      this.setState({userInfo: "The username can only contain alphanumeric characters, -, _ and spaces. It also must be between 1 and 2 characters long"})
    }
  }

  render() {
    return (<div id="main">
    <img id="imageBackground" src={background}/>
      <div id="loginContainer">
        <h1>Frontend 19-Chatroom</h1>
        <div id="loginboard">
        <form onSubmit={this.onSubmit}>
          <h3>Welcome: Enter your username</h3>
          <input onChange={this.onChange} placeholder="Username" value={this.state.username}/>
          <button onClick={this.onSubmit}>Login</button>
          <p>{this.state.userInfo}</p>
        </form>
        </div>
      </div>
    </div>)
  }
}

export default Login;
