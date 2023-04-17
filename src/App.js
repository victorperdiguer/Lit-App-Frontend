import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
//main views
import CircleControl from './views/circles/CircleControl';
import MainQuestions from './views/questions/MainQuestions';
import MainProfile from './views/profile/MainProfile';
import MainNotifications from './views/notifications/MainNotifications';
import MainStore from './views/store/MainStore';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<IsPrivate><MainQuestions /></IsPrivate>} />
        <Route path="/circles" element={<IsPrivate><CircleControl /></IsPrivate>} />
        <Route path="/profile" element={<IsPrivate><MainProfile /></IsPrivate>} />
        <Route path="/notifications" element={<IsPrivate><MainNotifications /></IsPrivate>} />
        <Route path="/store" element={<IsPrivate><MainStore /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
