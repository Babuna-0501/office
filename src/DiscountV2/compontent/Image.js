import React from 'react';
import { replaceImageUrl } from '../../utils';

const Image = props => {
  let picture = props.data.image ? replaceImageUrl(props?.data?.image[0]) : '';

  return (
    <div style={{ height: '100%', padding: '10px', cursor: 'pointer' }}>
      {props.data.image ? (
        <img
          src={picture}
          style={{ height: '56px', objectFit: 'cover', width: '56px' }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Image;
