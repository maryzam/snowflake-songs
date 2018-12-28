import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer>
      	<p>To learn about Data Analysis & Metodology read <Link to="/About">About</Link></p>
        <p>Source code & Full Data set availabe on <a href="http://github.com/maryzam/snowflake-songs/" target="_blank">GitHub</a></p>
    </footer>
);

export default Footer;
