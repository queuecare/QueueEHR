import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import {Button} from "react-bootstrap"
import "./Records.css";

export default class Records extends Component {
	constructor(props) {
		super(props);
		this.file = null;
		this.state = {
			record: null,
			recordId: "",
			title: "",
			content: "",
			attachmentURL: null
		};

	}

	async componentDidMount() {

		try {
			let attachmentURL;
			const record = await this.getRecord();
			const {recordId, title, content, attachment } = record;
			if (attachment) {
				attachmentURL = await Storage.vault.get(attachment);
			}

			this.setState({
				record,
				recordId,
				title,
				content,
				attachmentURL,
				isLoading: false
			});
		} catch (e) {
			alert(e);
		}
	}

	getRecord() {
		return API.get("records", `/healthrecords/${this.props.match.params.id}`);
	}

	deleteRecord() {
	  return API.del("records", `/healthrecords/${this.props.match.params.id}`);
	}

	handleRecordClick = event => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute("href"));
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
		<div className="Records">
			<div className="visit-detail">
				<div className="row">
					<div className="col-sm-6">
					<h2>{`Visit to ${this.state.title}`}</h2>
					</div>
					<div className="button col-sm-6">
					<Button
						href={`/records/edit/${this.state.recordId}`}
						onClick={this.handleRecordClick}
						bsStyle="primary"
						bsSize="large"
						>
						Edit
					</Button>
					<LoaderButton
						bsStyle="danger"
						bsSize="large"
						isLoading={this.state.isDeleting}
						onClick={this.handleDelete}
						text="Delete"
						loadingText="Deleting…"
					/>
					</div>
				</div>
				<hr/>
				<img src={this.state.attachmentURL} alt="attachment"/>
				<hr/>
				<h3>Detail</h3>
				<div dangerouslySetInnerHTML={{__html: this.state.content.replace(/\n/g, "<br />")}}></div>
			</div>




		</div>
	  );
	}
}
