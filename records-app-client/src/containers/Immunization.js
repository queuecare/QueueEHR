import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import {Button} from "react-bootstrap"
import config from "../config";
import "./Immunization.css";
export default class Immunization extends Component {
	constructor(props) {
		super(props);
		this.file = null;
		this.state = {
			content: "",
		};
	}

	async componentDidMount() {
		try {
			// TODO X: Get Imm instead
			const record = await this.getRecord();
			const {content} = record;

			this.setState({
				record,
				content,
			});
		} catch (e) {
			alert(e);
		}
	}

	getRecord() {
		// TODO X: Make own get for Immunization
		console.log('this.props.match.params.id: ', this.props.match.params.id)
		return API.get("records", `/healthrecords/${this.props.match.params.id}`);
	}

	handleRecordClick = event => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute("href"));
	}

	render() {
	  return (
		<div className="Records">
			<div className="visit-detail">
				<div className="row">
					<div className="col-sm-6">
					<h2>Your immunization records</h2>
					</div>
					<div className="button col-sm-6">
					<Button
						// TODO X: Hard code Immunization href
						href={`/Immunization/edit`}
						onClick={this.handleRecordClick}
						bsStyle="primary"
						bsSize="large"
						>
						Edit
					</Button>
					</div>
				</div>
				<div dangerouslySetInnerHTML={{__html: this.state.content.replace(/\n/g, "<br />")}}></div>
			</div>




		</div>
	  );
	}
}
