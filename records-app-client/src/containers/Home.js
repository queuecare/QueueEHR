import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import record from "../components/record.jpeg";
import CircularProgress from '@material-ui/core/CircularProgress';
import SignupPage from './Signup.js'
import "./Home.css";
import logo from "../components/Logo.png";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transform: 100,
			isLoading: true,
			records: []
		};
	}
	async componentDidMount() {
		window.addEventListener('scroll', this.resizeHeaderOnScroll);
		if (!this.props.isAuthenticated) {
			return;
		}
		try {
			const records = await this.records();
			this.setState({ records });
		} catch (e) {
			alert(e);
		}
		this.setState({ isLoading: false });
		}
		records() {
		return API.get("records", "/healthrecords");
	}

	resizeHeaderOnScroll = async event => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 500;
      //headerEl = document.getElementById("test-image");

		let itemTranslate = 100;


		if (distanceY > shrinkOn) {
			itemTranslate = Math.max(50,100-(distanceY-shrinkOn)/5);
      //headerEl.classList.add("smaller");
			//console.log('smaller');
    } else {
      //headerEl.classList.remove("smaller");
			//console.log('larger');

    }

		this.setState({
			transform: itemTranslate
		});
		console.log(this.state.transform)
  }



	renderImmunization(records) {
		// TODO X: Immunization records!
		return <ListGroupItem
			key="Immunization"
			href="/immunization"
			onClick={this.handleRecordClick}
		>
			<h4>
				View your record
			</h4>
		</ListGroupItem>
	}

	renderRecordsList(records) {
		return [{}].concat(records).map(
			(record, i) =>
				i !== 0 && record.ftype==='clinic'
					? <ListGroupItem
						key={record.recordId}
						href={`/records/${record.recordId}`}
						onClick={this.handleRecordClick}
						header={`visit to ${record.title}`}
					>
					{"Created: " + new Date(record.createdAt).toLocaleString()}
					</ListGroupItem>
					: i===0 ?
					<ListGroupItem
						key="new"
						href="/records/new"
						onClick={this.handleRecordClick}
					>
						<h4>
							<b>{"\uFF0B"}</b> Create a new visit record
						</h4>
					</ListGroupItem>

					: null
		);
	}

	handleRecordClick = event => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute("href"));
	}



	renderLander() {
		return(
			<div className="lander">
				<div className="ground">
					<div className="col-sm-6">
						<img src={logo} alt="logo" height="200px"/>
						<h2>Say Goodbye</h2>
						<h3>to loosing records</h3>
						<h3>It's all here!</h3>
					</div>
					<div className='col-sm-6'>
						<div className='SignupPage'>
							<h1>Sign Up</h1>
							<p>It's Free and Secure</p>
							<SignupPage
								userHasAuthenticated={this.props.userHasAuthenticated}
								history={this.props.history}/>
						</div>
					</div>

				</div>
					<img src={record} className="test-image" style={{'width':`${this.state.transform}vw`}} alt="test"/>
				<h2>Say Goodbye</h2>
				<h3>to loosing records</h3>
				<h3>It's all here!</h3>
				<h2>Say Goodbye</h2>
				<h3>to loosing records</h3>
				<h3>It's all here!</h3>
				<h2>Say Goodbye</h2>
				<h3>to loosing records</h3>
				<h3>It's all here!</h3>
				<h2>Say Goodbye</h2>

			</div>
		);
	}

	renderRecords() {
		return (
			<div className="records">
				<PageHeader> Your Records </PageHeader>
				{this.state.isLoading ?
					<center><CircularProgress/></center>
					:
						<React.Fragment>
							<h2> Immunization Records </h2>
								<ListGroup className="section">
									{this.renderImmunization(this.state.records)}
								</ListGroup>
							<h2> Visit Records </h2>
								<ListGroup className="section">
									{this.renderRecordsList(this.state.records)}
								</ListGroup>
						</React.Fragment>
				}
			</div>
		);
	}

	render() {
		return(
			<div className="Home">
			{this.props.isAuthenticated ? this.renderRecords() : this.renderLander()}
			</div>
		);
	}
}
