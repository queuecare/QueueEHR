import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import SignupPage from './Signup.js'
import "./Home.css";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			records: []
		};
	}
	async componentDidMount() {
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
	renderImmunization(records) {
		// TODO X: Immunization records!
		return <ListGroupItem
			key="Immunization"
			href="/immunization"
			onClick={this.handleRecordClick}
		>
			<h4>
				Immunization record
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
							<b>{"\uFF0B"}</b> Create a new record
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

				<div className="col-sm-6">
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
		);
	}

	renderRecords() {
		return (
			<div className="records">
				<PageHeader> Your Records </PageHeader>
				<ListGroup className="section">
					{!this.state.isLoading && this.renderImmunization(this.state.records)}
				</ListGroup>
				<ListGroup className="section">
					{!this.state.isLoading && this.renderRecordsList(this.state.records)}
				</ListGroup>
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
