import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client'
import LogIn from './components/LogIn/';
import { Form, Input,Button,Header,Message,Divider, Grid, Icon, Search, Segment,List } from 'semantic-ui-react'

const socket = io("http://localhost:4567");


class App extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
			message:null,
			channel:null,
			channelName:null,
			apiData: [],
			apiDataLoaded: false,
			loginError:false,
			signupError:false
		};
		this.fetchData = this.fetchData.bind(this);
		this.onChange = this.onChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);	
		this.login = this.login.bind(this);	
		this.signup = this.signup.bind(this);
		this.changeChannel = this.changeChannel.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
		this.renderChannels = this.renderChannels.bind(this);
		this.messagesEndRef = React.createRef()
	}
	componentDidMount(){
		this.fetchData();
		// const token = ".eyJlbWFpbCI6ImV4YW1wbGUxQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE1NTk4MjY0NDh9.tnLDLxeuTUIwxXbU8jQtGA40TfevVj_mvBXVLuU63Cw"
		// const id = "1"
		// localStorage.setItem("token",token)
		// localStorage.setItem("id",id)
		socket.on('chat message', this.fetchData);
		this.scrollToBottom();
	}

	componentDidUpdate(){
		this.scrollToBottom();
	}

	onChange = e => {
		const {
		 target: { value, name },
		} = e;
		this.setState({
		 [name]: value
		});
	};

	fetchData = async () => {
		const api = await axios.get('/channels');
		const apiData= api.data;
		this.setState({apiData,apiDataLoaded:true});
		console.log(apiData);
		
	}

	sendMessage = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {
      text: formData.get("message")
		};
		const header = {
      headers: {
				token: `${localStorage.getItem("token")}`,
				channel: this.state.channel
      }
		};
		const message = await axios.post('/messages/create', data, header);
		console.log(header);
		this.fetchData();
		socket.emit('chat message', data.text);
	}

	login = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {
      email: formData.get("email"),
      password: formData.get("password")	
    };
		const login = await axios.post('/users/login',data);
		console.log(login);
		if(login.data.message){
			this.setState({loginError:true});
		}
		if (login.data.token){
			localStorage.setItem("token",login.data.token)
			localStorage.setItem("id",login.data.id);
			this.fetchData();
		}
	}

	signup = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {
			name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    };
		const signup = await axios.post('/users/signup',data);
		console.log(signup);
		if(signup.data.errors){
			this.setState({signupError:true});
		}
		if(signup.data.token){
			localStorage.setItem("token",signup.data.token)
			localStorage.setItem("id",signup.data.id);
			this.fetchData();
		}
	}
	scrollToBottom = () => {
		if (this.messagesEndRef.current) this.messagesEndRef.current.scrollIntoView();
	}
	

	changeChannel = async (e,channel,channelName) => {
		e.preventDefault();
		this.setState({channel,channelName},()=>console.log("Current channel is "+this.state.channel));
	}
	renderMessages = () => {
		const currentChannel = this.state.channel;
		return (this.state.apiData.map((channel) => {
			if (channel.id== currentChannel){
				return (<div>
					{channel.messages.map((message)=> {
					return (
							<Grid.Row className="padding">
								<h3>{message.user.name}</h3>
								<p>{message.text}</p>
							</Grid.Row>
					)
				})}
				<div style={{ float:"left", clear: "both" }}
					ref={this.messagesEndRef}>
        </div>

				</div>
				)
			}
			return null;
		})
		)
	}
	

	renderChannels = () => {
		return ( <List divided verticalAlign='middle' size="massive">
			{this.state.apiData.map((channel) => {
      return (<div key={channel.id} className="click">
					{/* <button onClick={(e)=>this.changeChannel(e,channel.id,channel.name)}>{channel.name}</button> */}
					
						<List.Item onClick={(e)=>this.changeChannel(e,channel.id,channel.name)}>
							<List.Content>
								<List.Header>{channel.name}</List.Header>
							</List.Content>
						</List.Item>
        </div>
      );
    })}
		</List>
		);
	}


  render() {
    return (
      <div>
			{localStorage.getItem("token")?
				<Segment placeholder>
				<Grid columns={2} celled textAlign='left'>

					<Grid.Row>
						<Grid.Column width={3} className="test">
							{(this.state.apiDataLoaded) ? this.renderChannels() : <p>Loading...</p>}
						</Grid.Column>

						<Grid.Column width={13}>
						<Grid.Row className="test3">
						<h1>{this.state.channelName}</h1>
						</Grid.Row>
						<Grid.Row className="test2">
							{(this.state.apiDataLoaded) ? this.renderMessages() : <p>Loading...</p>}
						</Grid.Row>
						<Grid.Row fluid={true}>
							<Form fluid={true} onSubmit={(e)=>{this.sendMessage(e);e.target.reset()}}>
								<Input placeholder={`Message ${this.state.channelName}`} onChange={this.onChange} autoComplete="off" fluid={true} name="message"/>
						</Form>
						</Grid.Row>
							
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>:
				<LogIn
				login={this.login}
				signup={this.signup}
				onChange={this.onChange}
				loginError = {this.state.loginError}
				signupError = {this.state.signupError}
				/>}
      </div>
    );
  }
}

export default App;