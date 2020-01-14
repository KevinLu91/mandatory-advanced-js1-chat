import React from 'react';
import io from 'socket.io-client';
import Emojify from 'react-emojione';
import ScrollToBottom from 'react-scroll-to-bottom';
import Linkify from 'react-linkify';
import './Chat.css'
const socket = io('http://3.120.96.16:3000');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: "",
      messages: [],
      userInfo: ""
    }

    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.socket = io("http://3.120.96.16:3000");

    this.socket.on("messages", (data) => {
      this.setState({messages: data});
    })

    this.socket.on("new_message", message => {
      this.setState({
        messages: [
          ...this.state.messages,
          message
        ]
      });
    })
  }

  componentWillUnmount() {
    this.socket.off();
  }

  onChange(e) {
    this.setState({userMessage: e.target.value});
  }

  onSend(e) {
    e.preventDefault();

    if (this.state.userMessage.length === 0 || this.state.userMessage.length > 200) {
      this.setState({userInfo: "The content must be between 1 and 200 characters long"})
      return;
    } else {
      this.setState({userMessage: ""})
    }

    this.socket.emit('message', {
      username: this.props.username,
      content: this.state.userMessage
    }, (response) => {
      this.setState({
        messages: [
          ...this.state.messages,
          response.data.newMessage
        ]
      });
    });
  }

  render() {

    return (<div id="main">
      <h1>The chatroom</h1>
      <h3>Welcome: {this.props.username}</h3>
      <button onClick={this.props.onLogOut}>Sign Out</button>
      <div id="chatContainer">
        <Linkify>
          <Emojify>
            <ScrollToBottom className="ROOT_CSS">
              {
                this.state.messages.map(({
                  content,
                  id,
                  username
                }, idx) => (<div className="bubbleContainer" key={id}>
                  <span className="chatBubble">{username}: {content}</span>
                </div>))
              }
            </ScrollToBottom>
          </Emojify>
        </Linkify>
      </div>
      <h3>message</h3>
      <form onSubmit={this.onSend}>
        <input onChange={this.onChange} type="text" value={this.state.userMessage}/>
        <button onClick={this.onSend}>Send</button>
        <p>{this.state.userInfo}</p>
      </form>
    </div>)
  }
}

export default Chat;
