import React from 'react';
import './App.css';
import { auth } from './firebase/init';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user);
      }
    })
  }, []);

  function register() {
    console.log('register')
    createUserWithEmailAndPassword(auth, 'adam@email.com', 'test123')
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'adam@email.com', 'test123')
      .then(({ user }) => {
        console.log(user)
        setUser(user) 
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  const button = ({ btn }) => {
    function pageLoaded() {
      console.log('pageLoaded')
    }
  }

  return (
    <div className="App">
      <nav className='nav__bar--skeleton'>
        <button className="skeleton register__btn--skeleton" onClick={register}>Register</button>
        <button className="skeleton login__btn--skeleton" onClick={login}>Login</button>
        <button className="skeleton logout__btn--skeleton" onClick={logout}>A</button>
        {loading ? "Loading..." : user.email}
      </nav>
    </div>
  );
}

export default App;
