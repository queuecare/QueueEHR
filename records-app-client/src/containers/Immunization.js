import React, { Component } from "react";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { Button, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Immunization.css";
export default class Records extends Component {
	constructor(props) {
		super(props);
		this.file = null;
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



	handleRecordClick = event => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute("href"));
	}


	renderImmunization() {
		return (
			<div className="records">
				<PageHeader> Your Immunization Record: </PageHeader>
				<ListGroup>
					{!this.state.isLoading && this.renderImmunizationList(this.state.records) }
				</ListGroup>
			</div>
		);
	}

	renderImmunizationList(records) {
		return [{}].concat(records).map(
			(record, i) =>
				i !== 0 && record.ftype ==='immune'
					?
						<ListGroupItem
							key={record.recordId}
							href={`/records/${record.recordId}`}
							onClick={this.handleRecordClick}
							header={`visit to ${record.title}`}
						>
						{"Created: " + new Date(record.createdAt).toLocaleString()}
						</ListGroupItem>

					: i===0?

						<ListGroupItem
							key="new"
							href="/immunization/new"
							onClick={this.handleRecordClick}
						>
							<h4>
								<b>{"\uFF0B"}</b> Create a new record
							</h4>
						</ListGroupItem>

					: null
		);
	}

	render() {
		return(
			<div className="Home">
			{this.renderImmunization()}
			</div>
		);
	}
}
