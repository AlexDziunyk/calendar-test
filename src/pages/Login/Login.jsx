import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';
import { useContext } from 'react';

const Login = () => {

  const { user, signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    console.log(user);
    return navigate('/');
  }

  return (
    <div className='login'>
      <div className='login__container' onClick={signIn}>
        <div className='login__button'>Sign in with Google</div>
      </div>
    </div>
  )
}

export default Login