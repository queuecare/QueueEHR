import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader} from "react-bootstrap";
import EditTable from "../components/Table";
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
						<EditTable title="Immunization Record"
							data={this.renderImmunizationTable(this.state.records).filter(
									function (el) {
  										return el != null;
											})
									 }
						 delete={this.handleDelete}
						 />
					</div>
				);
			}
			renderImmunizationTable(records) {
				return [{}].concat(records).map(
					(record, i) =>
						i !== 0 && record.ftype ==='immune'
							?
								record
							: null
				);
			}

			render() {
				return(
					<div className="Home">
					{this.state.isLoading ? 'Loading...' : this.renderImmunization()}

					</div>
				);
			}
}
