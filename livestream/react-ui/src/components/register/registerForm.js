import React from "react";
import { Redirect, Link} from "react-router-dom";

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      login: false,
    };
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    const res = await login(this.state.username, this.state.password);
    if(res===200){
      this.setState({error:"Succes !",login:true})
    }
    else if(res===401){
      this.setState({error:"Invalid credentials"})
    }
    else{
      this.setState({error:"Oops, unkwown error"})
      console.log(res.status)
    }
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    if(this.state.login){
      return <Redirect to='/'/>;
    }
    else{
    return (
      <div class="container text-center">
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username}</h1>
        <h3>{this.state.error}</h3>
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
            <Link to="/login">
       Login 
                    </Link>
      </div>
    );
  }
  }
}

async function login(username, password){
  const res = await fetchTokenPair(username, password);
  if (res.status===200){
    const tokenpair = await res.json();
    storeTokenPair(tokenpair);
    await refreshToken()
  }
  return res.status
}

async function fetchTokenPair(username, password) {
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
  // const content = await rawResponse.json();
  // storeTokenPair(content["access"], content["refresh"]);
  // await refreshToken();
  return rawResponse;
}

async function refreshToken() {
  const rawResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    }),
  });
  if(rawResponse.status===200){
    const content = await rawResponse.json();
    localStorage.setItem("access", content["access"]);
  }
}

function storeTokenPair(tokenpair) {
  localStorage.setItem("access", tokenpair["access"]);
  localStorage.setItem("refresh", tokenpair["refresh"]);
}
