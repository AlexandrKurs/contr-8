import Header from './components/Header/Header.tsx';
import Quotes from './components/Quotes/Quotes.tsx';
import NewQuote from './components/Quotes/NewQuote.tsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/new-quote" element={<NewQuote />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;