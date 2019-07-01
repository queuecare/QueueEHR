import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
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

	renderRecordsList(records) {
		return [{}].concat(records).map(
			(record, i) =>
				i !== 0
					? <ListGroupItem
						key={record.recordId}
						href={`/records/${record.recordId}`}
						onClick={this.handleRecordClick}
						header={`visit to ${record.title}`}
					>
					{"Created: " + new Date(record.createdAt).toLocaleString()}
					</ListGroupItem>
					: <ListGroupItem
						key="new"
						href="/records/new"
						onClick={this.handleRecordClick}
					>
						<h4>
							<b>{"\uFF0B"}</b> Create a new record
						</h4>
					</ListGroupItem>
		);
	}

	handleRecordClick = event => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute("href"));
	}

	renderLander() {
		return(
			<div className="lander">
				<h1> Queue Records </h1>
				<p>A simple Record taking app by Queue</p>
			</div>
		);
	}

	renderRecords() {
		return (
			<div className="records">
				<PageHeader> Your Records </PageHeader>
				<ListGroup>
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
