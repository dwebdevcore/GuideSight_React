import React, { Component } from "react";
import { connect } from "react-redux";
import Searchbar from "../../components/topbar/searchBox";
import TopbarSearchModal from "./topbarSearchModal.style";

class TopbarSearch extends Component {
  state = {
    visiblity: false
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleBlur = () => {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 200);
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  render() {
    const { customizedTheme } = this.props;
    const { visible } = this.state;
    return (
      <div onClick={this.showModal}>
        <i
          className="ion-ios-search-strong"
          style={{ color: customizedTheme.textColor }}
        />
        <TopbarSearchModal
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          wrapClassName="isoSearchModal"
          width="60%"
          footer={null}
        >
          <div className="isoSearchContainer">
            {visible ? <Searchbar onBlur={this.handleBlur} /> : ""}
          </div>
        </TopbarSearchModal>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.App,
  customizedTheme: state.ThemeSwitcher.topbarTheme
}))(TopbarSearch);
