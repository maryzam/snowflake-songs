import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPinterest } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
      <div className="wrapper-width">
        <h1>Christmas songs as snowflakes</h1>
        <p>Hello</p>

        <div className="navigation">
          <Link to={`/about`}> About </Link>
          <Link to={`/`}> Home </Link>
        </div>

        <div className="socialfloat">


            <a className="button facebook" href="http://www.facebook.com/sharer/sharer.php?u=YOUR-URL">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>

          <a className="button twitter" href="https://twitter.com/intent/tweet?text=YOUR-TEXT&url=YOUR-URL&via=TWITTER-HANDLER">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a className="button pinterest" href="http://pinterest.com/pin/create/button/?url=YOUR-URL&description=YOUR-DESCRIPTION&media=YOUR-IMAGE-SRC">
            <FontAwesomeIcon icon={faPinterest} size="lg" />
          </a>
          <a className="button linkedin" href="http://www.linkedin.com/shareArticle?mini=true&url=YOUR-URL&title=YOUR-TITLE&source=YOUR-URL">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>

      </div>


    </header>
	);

export default Header;
