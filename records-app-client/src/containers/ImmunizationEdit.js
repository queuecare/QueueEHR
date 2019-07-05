import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ImmunizationEdit.css";
export default class ImmunizationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: null,
			record: null,
			ftype: "",
			content: "",
		};
	}

	async componentDidMount() {
		try {
			const record = await this.getRecord();
			const {ftype, content } = record;

			this.setState({
				record,
				ftype,
				content,
			});
		} catch (e) {
			alert(e);
		}
	}

	getRecord() {
		// TODO X: Get Imm instead
		return API.get("records", `/healthrecords/${this.props.match.params.id}`);
	}

	validateForm() {
	  return this.state.content.length > 0;
	}

	handleChange = event => {
	  this.setState({
		[event.target.id]: event.target.value
	  });
	}

	saveRecord(record) {
		// TODO X: Imm put instead
		return API.put("records", `/healthrecords/${this.props.match.params.id}`, {
			body: record
		});
	}

	handleSubmit = async event => {
	  event.preventDefault();

	  this.setState({ isLoading: true });

	  try {
		await this.saveRecord({
			ftype: this.state.ftype,
			title: this.state.title,
		  content: this.state.content,
		});
		this.props.history.push("/");
	  } catch (e) {
		alert(e);
		this.setState({ isLoading: false });
	  }
	}

	render() {
	  return (
		<div className="RecordEdit">
			<h1>{`Edit your immunization records`}</h1>
		  {this.state.record &&
			<form onSubmit={this.handleSubmit}>
			  <FormGroup controlId="content">
				<FormControl
				  onChange={this.handleChange}
				  value={this.state.content}
				  componentClass="textarea"
				/>
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
			</form>}
		</div>
	  );
	}
}
