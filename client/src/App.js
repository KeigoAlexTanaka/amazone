import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
// import Template from './components/Template/';


class App extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
    	foo:null
    };
	}
	
	onChange = e => {
		const {
		 target: { value, name },
		} = e;
		this.setState({
		 [name]: value
		});
	};


  render() {
    return (
      <div className="App">
				<ul id="messages"></ul>
				<form>
				<input name="foo" onChange={this.onChange} />
				<button>Send</button>
				</form>
      </div>
    );
  }
}

export default App;