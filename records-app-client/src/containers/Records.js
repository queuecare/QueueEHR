import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { Fab, Icon } from "@material-ui/core";
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
					<h2>{`Visit to ${this.state.title}`}</h2>
					</div>
					<div className="button col-sm-6">

					</div>
				</div>
				<hr/>
				<img src={this.state.attachmentURL} alt="attachment"/>
				<hr/>
				<h3>Detail</h3>
				<div dangerouslySetInnerHTML={{__html: this.state.content.replace(/\n/g, "<br />")}}></div>

				<a
					href={`/records/edit/${this.state.recordId}`}
					onClick={this.handleRecordClick}
				>
					<Fab
						className="actionbutton"
						color="primary"
						aria-label="Edit"

						>
						<Icon>edit_icon</Icon>
					</Fab>
				</a>
			</div>




		</div>
	  );
	}
}
