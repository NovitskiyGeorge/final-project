import React from 'react';
import { Spinner } from 'reactstrap';
import './spinner.css';

const SpinnerBlue = (props) => {
   return (
      <div className='spinner'>
         <Spinner
            color="primary"
            style={{ width: '3rem', height: '3rem' }}
         > </Spinner>
      </div>
   );
}

export default SpinnerBlue;