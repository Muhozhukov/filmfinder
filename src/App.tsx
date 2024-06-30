import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import FilmPage from './pages/FilmPage/FilmPage';
import { logout, setUser } from './store/userSlice';
import { TLoginRequest, useLoginMutation } from './api/userApi';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    dispatch(setUser({ userName: 'authorized' }));
  }

  const [login] = useLoginMutation();

  const handleLogin = async ({ username, password }: TLoginRequest) => {
    try {
      const result = await login({ username, password }).unwrap();
      dispatch(setUser({ userName: username }));
      localStorage.setItem('jwt', result.token);
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <Header handleLogin={handleLogin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/film/:filmId" element={<FilmPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
