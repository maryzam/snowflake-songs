import React from 'react';
import { Link } from 'react-router-dom'

import ShareLinks from "./ShareLinks";

const Header = ({ 
    title = "Snowflake Songs",
    singer = "",
    createdByBlock = true 
}) => (
    <header>
        	<h1>
                <Link to={`/`}>{ title }</Link>
            </h1>
            { (singer && singer.length) ? (<p className="singer"> by { singer }</p>) : null }
            {
                createdByBlock ?
                (<p className="autors">
                        by <a href="https://twitter.com/MaryZamCode">Mary Zam</a> & <a href="https://twitter.com/edithmaulandi">Edith Maulandi</a>
                </p>) : null
            }
        <ShareLinks />
    </header>
);

export default Header;
