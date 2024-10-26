import React, { useState, useEffect } from "react";
import axiosApi from "../../axiosApi";
import { categories } from "../../categories";

interface Quote {
  id?: string;
  author: string;
  category: string;
  text: string;
}

interface NewQuoteProps {
  existingQuote?: Quote;
  onUpdate?: (quote: Quote) => void;
}

const NewQuote: React.FC<NewQuoteProps> = ({ existingQuote, onUpdate }) => {
  const [author, setAuthor] = useState(
    existingQuote ? existingQuote.author : "",
  );
  const [category, setCategory] = useState(
    existingQuote ? existingQuote.category : categories[0].id,
  );
  const [text, setText] = useState(existingQuote ? existingQuote.text : "");

  useEffect(() => {
    if (existingQuote) {
      setAuthor(existingQuote.author);
      setCategory(existingQuote.category);
      setText(existingQuote.text);
    }
  }, [existingQuote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quote = { author, category, text };

    if (existingQuote) {
      (await onUpdate) && onUpdate({ ...quote, id: existingQuote.id! });
    } else {
      await axiosApi.post("/quotes.json", quote);
      console.log("Quote added successfully");
    }

    setAuthor("");
    setText("");
    setCategory(categories[0].id);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author:
        </label>
        <input
          type="text"
          id="author"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Quote:
        </label>
        <textarea
          id="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {existingQuote ? "Update Quote" : "Add Quote"}
      </button>
    </form>
  );
};

export default NewQuote;
