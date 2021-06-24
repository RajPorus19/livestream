import React from "react";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    const res = await obtainTokenPair(this.state.username, this.state.password);
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username}</h1>
        <p>Enter your username:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <p>Enter your password:</p>
        <input
          type="password"
          name="password"
          onChange={this.myChangeHandler}
        />
        <br />
        <br />
        <input type="submit" />
      </form>
    );
  }
}

async function obtainTokenPair(username, password) {
  const rawResponse = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const content = await rawResponse.json();
  storeTokenPair(content["access"], content["refresh"]);
  return content;
}
function storeTokenPair(access, refresh) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
}
