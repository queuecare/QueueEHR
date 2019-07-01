import React, { Component } from "react";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewRecord.css";
export default class NewRecord extends Component {
	constructor(props) {
		super(props);
		this.file = null;
		this.state = {
		isLoading: null,
		title: "",
		content: ""
		};
	}
	validateForm() {
		return this.state.title.length > 0 && this.state.content.length > 0;
	}
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	handleFileChange = event => {
		this.file = event.target.files[0];
	}
	handleSubmit = async event => {
		event.preventDefault();
		if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
			alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
			return;
		}
		this.setState({ isLoading: true });
		try {
			const attachment = this.file
				? await s3Upload(this.file)
				: null;
		await this.createRecord({
			attachment,
			title: this.state.title,
			content: this.state.content
		});
		this.props.history.push("/");
		} catch (e) {
		alert(e);
		this.setState({ isLoading: false });
		}
	}
	createRecord(record) {
		return API.post("records", "/healthrecords", {
		body: record
		});
	}
	render() {
		return (
			<div className="NewRecord">
				<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="title">
					<FormControl
					onChange={this.handleChange}
					value={this.state.title}
					componentClass="textarea"
					/>
				</FormGroup>
				<FormGroup controlId="content">
					<FormControl
					onChange={this.handleChange}
					value={this.state.content}
					componentClass="textarea"
					/>
				</FormGroup>
				<FormGroup controlId="file">
				<ControlLabel>Attachment</ControlLabel>
				<FormControl onChange={this.handleFileChange} type="file"
				/>
				</FormGroup>
				<LoaderButton
				block
				bsStyle="primary"
				bsSize="large"
				disabled={!this.validateForm()}
				type="submit"
				isLoading={this.state.isLoading}
				text="Create"
				loadingText="Creating…"
				/>
				</form>
			</div>
		);
	}
}
