import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
      }
    };
  };

  handleChange = e => {
    this.setState ({
      credentals: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/login", this.state.credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => console.error(err))
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </>
    );
  }

};

export default Login;
