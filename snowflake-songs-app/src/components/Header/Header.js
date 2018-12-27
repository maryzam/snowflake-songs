import React from 'react';
import { Link } from 'react-router-dom'

import ShareLinks from "./ShareLinks";

const Header = () => (
    <header>
        	<h1>
                <Link to={`/`}>Snowflake songs</Link>
            </h1>
            <p className="autors">
                by <a href="https://twitter.com/MaryZamCode">Mary Zam</a> & <a href="https://twitter.com/edithmaulandi">Edith Maulandi</a>
            </p>
        <ShareLinks />

    </header>
	);

export default Header;
