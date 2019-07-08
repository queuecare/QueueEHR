import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"

import { Icon } from "@material-ui/core"
import { Auth } from "aws-amplify";
import Routes from "./Routes";

import "./App.css";
import logo from "./components/Logo.png";




class App extends Component {
	constructor(props) {
	super(props);
		this.state = {
			isAuthenticating: true,
			isAuthenticated: false
		};
	}
	async componentDidMount() {
		try {
			if (await Auth.currentSession()) {
			this.userHasAuthenticated(true);
			}
		}
		catch(e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}
		this.setState({ isAuthenticating: false });
	}
	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	}
	handleLogout = async event => {
		await Auth.signOut();
		this.userHasAuthenticated(false);
		this.props.history.push("/login");
	}
	render() {
		const childProps = {
		  isAuthenticated: this.state.isAuthenticated,
		  userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			!this.state.isAuthenticating &&
			<div className="App container">
				<Navbar className="top" fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/"><img src={logo} alt={"Queue Logo"} className="Logo"/></Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							{this.state.isAuthenticated
							? <NavItem onClick={this.handleLogout}>Logout</NavItem>
							: <Fragment>
								<LinkContainer to="/login">
								  <NavItem>Login</NavItem>
								</LinkContainer>
							  </Fragment>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<div className="spacer"> </div>
				<Routes childProps={childProps} />

				<Navbar className="bottom" fluid collapseOnSelect>
				{this.props.match.isExact
					?
						<Navbar.Header>
							<Navbar.Toggle />
						</Navbar.Header>
					:
						<Navbar.Header>
							<Navbar.Brand>
								<Link to="/"><Icon>keyboard_arrow_left</Icon>Home</Link>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
				}
				<Navbar.Collapse>
					<Nav pullRight>
						{this.state.isAuthenticated
						? <NavItem onClick={this.handleLogout}>Logout</NavItem>
						: <Fragment>
							<LinkContainer to="/login">
								<NavItem>Login</NavItem>
							</LinkContainer>
							</Fragment>
						}
					</Nav>
				</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}


export default withRouter(App);
