import React from 'react';
import Notes from './Notes';
import { useEffect  , useState} from 'react';
import WithoutLogin from './WithoutLogin';
import Spinner from './Spinner.js';

const Home = (props) => {
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setisLogin(true);
    }
  }, [])
  return (
    <div className='container my-4'>
      {/* <Spinner/> */}
      {!isLogin && <WithoutLogin></WithoutLogin>}
      {isLogin && <Notes showAlert={props.showAlert}></Notes>}
    </div>
  )
}
export default Home;