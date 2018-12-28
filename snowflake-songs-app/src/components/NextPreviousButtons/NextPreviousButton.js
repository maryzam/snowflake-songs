import React from 'react';
import { Link } from 'react-router-dom';
import Provider from "../../utils/dataProvider";
import Button from "./Button";

function generateButtons(id){
  const lastSongId = Provider.getSongsLength()-1;
  if (id != 0 && id !=  lastSongId){
    return (
      <div>

        <Button
          id={id}
          type={'previous'} />

          <Button
            id={id}
            type={'next'} />

      </div>
    );
  }
  else if (id == 0) {
    return (
      <Button
        id={id}
        type={'next'} />
    );
  }
  else if (id == lastSongId) {
    return (
      <Button
        id={id}
        type={'previous'} />
      );
  }
}

const NextPreviousButton = ( { id } ) => (

      <div className="prev-next-button-container">
        {generateButtons(id)}
      </div>

	);

export default NextPreviousButton;
