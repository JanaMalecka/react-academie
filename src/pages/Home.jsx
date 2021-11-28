import React from 'react';
import Students from '../components/Students';

function Home(props) {
  return <Students onStudentClick={props.onStudentClick} />;
}

export default Home;

//{...props} - vsechno, co prijde do props
