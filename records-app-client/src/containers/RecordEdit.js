import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import config from "../config";


import "./RecordEdit.css";

export default class Records extends Component {
	constructor(props) {
		super(props);
		this.file = null;
		this.state = {
			isLoading: null,
			isDeleting: null,
			record: null,
			ftype: "",
			title: "",
			content: "",
			attachmentURL: null
		};

	}

	async componentDidMount() {

		try {
			let attachmentURL;
			const record = await this.getRecord();
			const {ftype, title, content, attachment } = record;
			if (attachment) {
				attachmentURL = await Storage.vault.get(attachment);
			}

			this.setState({
				record,
				ftype,
				title,
				content,
				attachmentURL
			});
		} catch (e) {
			alert(e);
		}
	}

	getRecord() {
		return API.get("records", `/healthrecords/${this.props.match.params.id}`);
	}

	validateForm() {
	  return this.state.content.length > 0;
	}

	formatFilename(str) {
	  return str.replace(/^\w+-/, "");
	}

	handleChange = event => {
	  this.setState({
		[event.target.id]: event.target.value
	  });
	}

	handleFileChange = event => {
	  this.file = event.target.files[0];
	}

	saveRecord(record) {
	  return API.put("records", `/healthrecords/${this.props.match.params.id}`, {
		body: record
	  });
	}

	handleSubmit = async event => {
	  let attachment;

	  event.preventDefault();

	  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
		alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
		return;
	  }

	  this.setState({ isLoading: true });

	  try {
		if (this.file) {
		  attachment = await s3Upload(this.file);
		}

		await this.saveRecord({
			ftype: this.state.ftype,
			title: this.state.title,
		  content: this.state.content,
		  attachment: attachment || this.state.record.attachment
		});
		this.props.history.push("/");
	  } catch (e) {
		alert(e);
		this.setState({ isLoading: false });
	  }
	}


	deleteRecord() {
	  return API.del("records", `/healthrecords/${this.props.match.params.id}`);
	}

	handleDelete = async event => {
	  event.preventDefault();

	  const confirmed = window.confirm(
		"Are you sure you want to delete this Record?"
	  );

	  if (!confirmed) {
		return;
	  }

	  this.setState({ isDeleting: true });

	  try {
		await this.deleteRecord();
		this.props.history.push("/");
	  } catch (e) {
		alert(e);
		this.setState({ isDeleting: false });
	  }
	}

	render() {
	  return (
		<div className="RecordEdit">
			<h1>{`Visit to ${this.state.title}`}</h1>
		  {this.state.record &&
			<form onSubmit={this.handleSubmit}>
			  <FormGroup controlId="content">
				<FormControl
				  onChange={this.handleChange}
				  value={this.state.content}
				  componentClass="textarea"
				/>
			  </FormGroup>
			  {this.state.record.attachment &&
				<FormGroup>
				  <ControlLabel>Attachment</ControlLabel>
				  <FormControl.Static>
					<a
					  target="_blank"
					  rel="noopener noreferrer"
					  href={this.state.attachmentURL}
					>
					  {this.formatFilename(this.state.record.attachment)}
					</a>
				  </FormControl.Static>
				</FormGroup>}
			  <FormGroup controlId="file">
				{!this.state.record.attachment &&
				  <ControlLabel>Attachment</ControlLabel>}
				<FormControl onChange={this.handleFileChange} type="file" />
			  </FormGroup>
			  <LoaderButton
				block
				bsStyle="primary"
				bsSize="large"
				disabled={!this.validateForm()}
				type="submit"
				isLoading={this.state.isLoading}
				text="Save"
				loadingText="Saving…"
			  />

			  <LoaderButton
				block
				bsStyle="danger"
				bsSize="large"
				isLoading={this.state.isDeleting}
				onClick={this.handleDelete}
				text="Delete"
				loadingText="Deleting…"
			  />
			</form>}
		</div>
	  );
	}
}
