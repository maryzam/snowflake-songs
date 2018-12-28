import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function getIdButton(id,type) {
  if (type == 'next'){
    return id + 1
  }
  else {
    return id - 1;
  }

}

function getIconButton(type){
  if (type == 'next'){
    return faChevronRight;
  }
  else {
    return faChevronLeft;
  }
}

const Button = ( { id, type } ) => (

  <div className="previous-next-button">
    <Link to={`/song/${getIdButton(id,type)}`}>
      <FontAwesomeIcon icon={getIconButton(type)} size="lg" color="grey"/>
    </Link>
  </div>

	);

export default Button;
