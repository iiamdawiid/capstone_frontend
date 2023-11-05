import ReactDOM from 'react-dom/client'
import App from './views/App'
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
