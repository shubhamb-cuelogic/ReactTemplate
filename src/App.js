import logo from './logo.svg';
import './App.css';
import Routes from './routes'
import { useEffect } from 'react';
import { storeUser } from './redux/actions';
import { connect } from 'react-redux';
function App(props) {

  useEffect(() => {
    window.addEventListener('unload', keepOnPage);

    return function cleanup() {
      window.removeEventListener("unload", null)
      // 
      console.log(props.user);
    }
  }, []);

  const keepOnPage = (e) => {
     
      if (props.user) {
        localStorage.setItem('user', JSON.stringify(props.user));
      }

    //  localStorage.setItem('storeUser', localStorage.getItem('user'));
  }
  // console.log(props);

  return (
    <div style={{
      width: '100%', padding: 0,
      height: '100vh',
      overflow: 'hidden',
    }}>
      <Routes />
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  const { user, storedUser } = state.User;
  return { user, storedUser }
}
export default connect(mapStateToProps, { storeUser })(App)

