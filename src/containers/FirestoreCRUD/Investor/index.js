import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/uielements/input';
import Modal from '../../../components/feedback/modal';
import actions from '../../../redux/investors/actions';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Popconfirms from '../../../components/feedback/popconfirm';
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  ButtonHolders,
} from './investors.style';
import clone from 'clone';

class Investors extends Component {
  componentDidMount() {
    this.props.loadFromFireStore();
  }
  handleRecord = (actionName, investor) => {
    if (investor.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(investor, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (investor = null) => {
    this.props.toggleModal(investor);
  };

  onRecordChange = (key, event) => {
    let { investor } = clone(this.props);
    if (key) investor[key] = event.target.value;
    this.props.update(investor);
  };

  render() {
    const { modalActive, investors } = this.props;
    const { investor } = clone(this.props);
    const dataSource = [];
    Object.keys(investors).map((investor, index) => {
      return dataSource.push({
        ...investors[investor],
        key: investor,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
      },
      {
        title: 'Company Name',
        dataIndex: 'company_name',
        key: 'company_name',
        sorter: (a, b) => {
          if (a.company_name < b.company_name) return -1;
          if (a.company_name > b.company_name) return 1;
          return 0;
        },
      },
      {
        title: 'Job Title',
        dataIndex: 'job_title',
        key: 'job_title',
        sorter: (a, b) => {
          if (a.job_title < b.job_title) return -1;
          if (a.job_title > b.job_title) return 1;
          return 0;
        },
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        sorter: (a, b) => {
          if (a.location < b.location) return -1;
          if (a.location > b.location) return 1;
          return 0;
        },
      },
      {
        title: 'Number of Investments',
        dataIndex: 'investment_count',
        key: 'investment_count',
        width: '190px',
        sorter: (a, b) =>
          parseInt(a.investment_count, 10) - parseInt(b.investment_count, 10),
      },
      {
        title: 'Number of Exists',
        dataIndex: 'exists_count',
        key: 'exists_count',
        width: '160px',
        sorter: (a, b) =>
          parseInt(a.exists_count, 10) - parseInt(b.exists_count, 10),
      },
      {
        title: 'Actions',
        width: '60px',
        key: 'action',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)}>
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this record?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirms>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Investors</ComponentTitle>

              <ButtonHolders>
                <ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                </ActionBtn>

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new record
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={investor.key ? 'Update investor' : 'Add New investor'}
              okText={investor.key ? 'Update investor' : 'Add investor'}
              onOk={this.handleRecord.bind(this, 'insert', investor)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Name</Label>
                  <Input
                    label="Name"
                    placeholder="Enter owner name"
                    value={investor.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Company Name</Label>
                  <Input
                    label="Company Name"
                    placeholder="Enter the company name"
                    value={investor.company_name}
                    onChange={this.onRecordChange.bind(this, 'company_name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Job TItle</Label>
                  <Input
                    label="Job Title"
                    placeholder="Enter the job title"
                    value={investor.job_title}
                    onChange={this.onRecordChange.bind(this, 'job_title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Location</Label>
                  <Input
                    label="Location"
                    placeholder="Enter Description"
                    value={investor.location}
                    onChange={this.onRecordChange.bind(this, 'location')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Number of Investments</Label>
                  <Input
                    label="Number of Investments"
                    placeholder="Enter number of investments"
                    value={investor.investment_count}
                    onChange={this.onRecordChange.bind(
                      this,
                      'investment_count'
                    )}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Number of Exists</Label>
                  <Input
                    label="Number of Exists"
                    placeholder="Enter Number of Exists"
                    value={investor.exists_count}
                    onChange={this.onRecordChange.bind(this, 'exists_count')}
                  />
                </Fieldset>
              </Form>
            </Modal>

            <TableWrapper
              rowKey="key"
              columns={columns}
              rowSelection={rowSelection}
              loading={this.props.isLoading}
              dataSource={dataSource}
              className="isoSimpleTable"
              pagination={{
                // defaultPageSize: 1,
                hideOnSinglePage: true,
                total: dataSource.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Investors,
  }),
  actions
)(Investors);
