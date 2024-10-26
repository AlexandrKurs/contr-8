import Header from "./components/Header/Header.tsx";
import Quotes from "./components/Quotes/Quotes.tsx";
import NewQuote from "./components/Quotes/NewQuote.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { categories } from "./categories";
import { Category } from "./types";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <div className="content">
          <div className="quotes-container">
            <Routes>
              {categories.map((category: Category) => (
                <Route
                  key={category.id}
                  path={`/${category.id}`}
                  element={<Quotes category={category.id} />}
                />
              ))}
              <Route path="/" element={<Quotes category="all" />} />
              <Route path="/new-quote" element={<NewQuote />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
