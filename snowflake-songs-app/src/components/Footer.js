import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ createdByBlock = false }) => (
    <footer>
      	<p>To learn about snowflake build process, legend, and metodology read <Link to="/About">About</Link></p>
        <p>Source code & full data set availabe on <a href="http://github.com/maryzam/snowflake-songs/" target="_blank"  rel="noopener noreferrer">GitHub</a></p>
        { 
        	createdByBlock ?
        	(
        		<p className="autors">
	               Created by <a href="https://twitter.com/MaryZamCode">Mary Zam</a> & <a href="https://twitter.com/edithmaulandi">Edith Maulandi</a>
	            </p>
            ) :	null
        }
    </footer>
);

export default Footer;
