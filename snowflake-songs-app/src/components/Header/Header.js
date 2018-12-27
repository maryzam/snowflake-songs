import React from 'react';
import { Link } from 'react-router-dom'

import ShareLinks from "./ShareLinks";

const Header = () => (
    <header>
        <h1>Snowflake songs</h1>

        <div className="navigation">
          <Link to={`/about`}> About </Link>
          <Link to={`/`}> Home </Link>
        </div>

        <ShareLinks />

    </header>
	);

export default Header;
