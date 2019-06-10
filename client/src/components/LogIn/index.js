import React, { Component } from 'react';
import { Form, Input,Button,Header,Message,Divider, Grid, Icon, Search, Segment } from 'semantic-ui-react'
	
class LogIn extends Component {
	
	componentDidUpdate(prevProps) {
		if (this.props.userID !== prevProps.userID) {
			this.fetchData(this.props.userID);
		}
	}
	
  render() {      
		const {login,signup,onChange,loginError,signupError} = this.props;
    return (
			<div>
				<Segment placeholder className="fullscreen">
						<Grid columns={2} stackable textAlign='center'>
							<Divider vertical>Or</Divider>
							<Grid.Row verticalAlign='middle'>
								<Grid.Column>
									<Form onSubmit={login}>
										<Header as='h1'>
											Log in
										</Header>
										<Form.Field error={loginError} required>
											<label>Email</label>
											<Input placeholder='Email' type="email" onChange={onChange} name="email"/>
										</Form.Field>
										<Form.Field error={loginError} required>
											<label>Password</label>
											<Input placeholder='Password' type="password" onChange={onChange} name="password"/>
										</Form.Field>
										<Button>
												Log In
										</Button>
									</Form>
								</Grid.Column>
								<Grid.Column>
									<Form error={signupError} onSubmit={signup}>
										<Header as='h1'>
											Sign Up
										</Header>
										<Form.Field error={signupError} required>
											<label>Name</label>
											<Input placeholder='Name' onChange={onChange} name="name"/>
										</Form.Field>
										<Form.Field error={signupError} required>
											<label>Email</label>
											<Input placeholder='Email' type="email" onChange={onChange} name="email"/>
										</Form.Field>
										<Form.Field error={signupError} required>
											<label>Password</label>
											<Input placeholder='Password' type="password" onChange={onChange} name="password"/>
										</Form.Field>
										<Button>
												Sign Up
										</Button>
									</Form>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
			</div>
    );
  }
}

export default LogIn;