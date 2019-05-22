import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
          <div vertical-align="middle">
              <Link to="/dashboard">
                  <img src={require('../../image/logo_header.png')} width="136" height="20"/>
              </Link>
          </div>
      )}
    </div>
  );
};
