import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const BUTTON_TYPES = {
  NEXT: "next",
  PREV: "prev"
}

const getTargetLink = (songId, type) => {
  const targetSongId = (type === BUTTON_TYPES.NEXT) 
                        ? (songId + 1) 
                        : (songId - 1);
  return `/song/${ targetSongId }`;
}

const getIcon = (type) => {
  return (type === BUTTON_TYPES.NEXT) 
            ? faChevronRight 
            : faChevronLeft;
}

const NavigationButton = ( { songId, type } ) => (
  <div className="navigation-button">
    <Link to={ getTargetLink(songId, type) }>
      <FontAwesomeIcon icon={ getIcon(type) } size="lg" color="grey"/>
    </Link>
  </div>
);

export { BUTTON_TYPES };
export default NavigationButton;
