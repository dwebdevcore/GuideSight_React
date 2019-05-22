import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Input from "../../components/uielements/input";
import Tooltip from "../../components/uielements/tooltip";
import Radio, { RadioGroup } from "../../components/uielements/radio";
import DatePicker from "../../components/uielements/datePicker";
import Modal from "../../components/feedback/modal";
import notification from "../../components/notification";
import actions from "../../redux/chat/actions";
import { AddUserBtn, Fieldset, Form, Label } from "./message.style";

const dateFormat = "DD/MM/YYYY";

class AddNewUser extends Component {
  handleCancel = () => {
    this.props.updateNewUsersProp({ modalActive: false });
  };
  initAddUser = () => {
    this.props.updateNewUsersProp({
      modalActive: true,
      name: "New User",
      dob: "22/04/1992",
      mobileNo: "9429692135",
      gender: "Male",
      language: "English",
      profileImageUrl:
        "https://thumb7.shutterstock.com/display_pic_with_logo/818215/552201991/stock-photo-beautiful-young-grinning-professional-black-woman-in-office-with-eyeglasses-folded-arms-and-552201991.jpg"
    });
  };
  userNameExist = newUser =>
    this.props.users.findIndex(
      user => user.name.toLowerCase() === newUser.name.toLowerCase()
    ) !== -1;

  addUser = () => {
    const { user, addNewUsersProp, addNewUser } = this.props;
    if (addNewUsersProp.name) {
      if (this.userNameExist(addNewUsersProp)) {
        notification("error", "User name already exists");
      } else {
        addNewUser(user, addNewUsersProp);
        notification("success", "New user created successfuly");
      }
    } else {
      notification("error", "please add new user name");
    }
  };
  render() {
    const {
      addNewUsersProp,
      modalActive,
      name,
      dob,
      mobileNo,
      gender,
      language,
      updateNewUsersProp
    } = this.props;
    return (
      <div>
        <Tooltip placement="topRight" title="Add a new user (For demo only)">
          <AddUserBtn onClick={this.initAddUser}>
            <i className="ion-android-add" />
          </AddUserBtn>
        </Tooltip>

        <Modal
          visible={modalActive}
          onClose={this.handleCancel}
          title="Add New User"
          okText="Add User"
          onOk={this.addUser}
          onCancel={this.handleCancel}
        >
          <Form>
            <Fieldset>
              <Label>Name</Label>
              <Input
                label="Name"
                placeholder="Enter Name"
                value={name || ""}
                onChange={event => {
                  addNewUsersProp.name = event.target.value;
                  updateNewUsersProp(addNewUsersProp);
                }}
              />
            </Fieldset>

            <Fieldset>
              <Label>Mobile</Label>
              <Input
                label="Mobile"
                placeholder="Mobile No"
                value={mobileNo || ""}
                onChange={event => {
                  addNewUsersProp.mobileNo = event.target.value;
                  updateNewUsersProp(addNewUsersProp);
                }}
              />
            </Fieldset>

            <Fieldset>
              <Label>Gender</Label>
              <RadioGroup
                id="gender"
                name="gender"
                value={gender}
                onChange={event => {
                  addNewUsersProp.gender = event.target.value;
                  updateNewUsersProp(addNewUsersProp);
                }}
              >
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </RadioGroup>
            </Fieldset>

            <Fieldset>
              <Label>Language</Label>
              <Input
                label="Language"
                placeholder="Language"
                value={language || ""}
                onChange={event => {
                  addNewUsersProp.language = event.target.value;
                  updateNewUsersProp(addNewUsersProp);
                }}
              />
            </Fieldset>

            <Fieldset>
              <Label>Date</Label>
              <DatePicker
                allowClear={false}
                format={dateFormat}
                value={moment(dob, dateFormat)}
                onChange={(date, dateString) => {
                  addNewUsersProp.dob = dateString;
                  updateNewUsersProp(addNewUsersProp);
                }}
              />
            </Fieldset>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, users, addNewUsersProp } = state.Chat;
  return { user, users, addNewUsersProp, ...addNewUsersProp };
}
export default connect(mapStateToProps, actions)(AddNewUser);
