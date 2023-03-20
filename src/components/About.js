import React from 'react';
import userContext from '../context/user/userContext';
import { useContext, useEffect, useRef, useState} from 'react';


const About = () => {

  // For maintaining the user data on the navbar upon reload also.
  const Ucontext = useContext(userContext);
  const { getUserDetails } = Ucontext;
  useEffect(() => {
    getUserDetails(localStorage.getItem('token'));
  }, [])

  return (
    <div>
      this is About page.
    </div>
  )
}

export default About;
