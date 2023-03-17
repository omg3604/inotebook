import React from 'react';
import Notes from './Notes';

const Home = (props) => {
  return (
    <div className='container my-4'>
      <Notes showAlert={props.showAlert}></Notes>
    </div>
  )
}
export default Home;