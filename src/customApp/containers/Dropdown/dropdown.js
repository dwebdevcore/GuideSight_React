import React, { Component } from 'react';
import { Icon, Row, Col } from 'antd';
import Menu from '../../../components/uielements/menu';
import Dropdown, {
  DropdownButtons,
  DropdownMenu,
  MenuItem,
  SubMenu
} from '../../../components/uielements/dropdown';
import Buttons from '../../../components/uielements/button';
import message from '../../../components/uielements/message';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../settings/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import { rtl } from '../../../settings/withDirection';
const MenuDivider = Menu.Divider;
const DropdownButton = DropdownButtons;
const Button = Buttons;

export default class IsoDropDown extends Component {
  state = {
    visible: false
  };

  handleButtonClick = e => {
    message.info('Click on left button.');
  };

  handleMenuClickToLink = e => {
    message.info('Click on menu item.');
  };

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  };
  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const demoStyle = {
      marginBottom: '8px',
      marginRight: '8px'
    };

    const menuHover = (
      <DropdownMenu>
        <MenuItem>
          <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
            1st menu item
          </a>
        </MenuItem>
        <MenuItem>
          <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
            2nd menu item
          </a>
        </MenuItem>
        <MenuItem>
          <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
            3d menu item
          </a>
        </MenuItem>
      </DropdownMenu>
    );
    const menuHoverDisable = (
      <DropdownMenu>
        <MenuItem key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
            1st menu item
          </a>
        </MenuItem>
        <MenuItem key="1">
          <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
            2nd menu item
          </a>
        </MenuItem>
        <MenuDivider />
        <MenuItem key="3" disabled>
          3d menu item（disabled）
        </MenuItem>
      </DropdownMenu>
    );
    const menuClicked = (
      <DropdownMenu onClick={this.handleMenuClickToLink}>
        <MenuItem key="1">1st menu item</MenuItem>
        <MenuItem key="2">2nd menu item</MenuItem>
        <MenuItem key="3">3d menu item</MenuItem>
      </DropdownMenu>
    );

    const menuSubmenu = (
      <DropdownMenu>
        <MenuItem>1st menu item</MenuItem>
        <MenuItem>2nd menu item</MenuItem>
        <SubMenu title="sub menu">
          <MenuItem>3d menu item</MenuItem>
          <MenuItem>4th menu item</MenuItem>
        </SubMenu>
      </DropdownMenu>
    );

    return (
      <LayoutWrapper>

        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>

              <ContentHolder>
                <Dropdown overlay={menuClicked}>
                  <Button
                    style={{
                      margin: rtl === 'rtl' ? '0 8px 0 0' : '0 0 0 8px'
                    }}
                  >
                    Button <Icon type="down" />
                  </Button>
                </Dropdown>
              </ContentHolder>

          </Col>

        </Row>
      </LayoutWrapper>
    );
  }
}
