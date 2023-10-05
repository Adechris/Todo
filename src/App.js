import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Todo from './Components/Content/Todo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Todo/>} />
      </Routes>
    </Router>
  );
}

export default App;
