import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    // total no. of requests
    const campaign = Campaign(address);

    //returned as string
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    // Request an array of different indices that we need to request from campaign
    const requests = await Promise.all(
      //pass as int
      Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );
    // same key: value
    return { address, requests, requestCount, approversCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />;
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
        <div>
        Found {this.props.requestCount} requests
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
