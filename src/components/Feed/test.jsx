import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  chatContainer = React.createRef();

  state = {
    value: "",
    messages: [
      "blabla",
      "cao",
      "kako si",
      "asdasdasdasd",
      "asdasdasdas",
      "asdasdasd",
    ],
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      value,
    });
  };

  sendMessage = () => {
    let messages = [...this.state.messages, this.state.value];

    console.log("MESSAGES", messages);

    this.setState(
      {
        messages,
      },
      () => this.scrollToMyRef()
    );
  };

  scrollToMyRef = () => {
    const scroll =
      this.chatContainer.current.scrollHeight -
      this.chatContainer.current.clientHeight;
    this.chatContainer.current.scrollTo(0, scroll);
  };

  render() {
    return (
      <div className="App">
        <div ref={this.chatContainer} className="Chat">
          {this.state.messages.map((message) => (
            <div>{message}</div>
          ))}
        </div>

        <input value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.sendMessage}>SEND</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
