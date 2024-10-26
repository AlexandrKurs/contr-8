import React, { useEffect, useState } from "react";
import axiosApi from "../../axiosApi";
import NewQuote from "./NewQuote";
import Sidebar from "../Category/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

interface Quote {
  id: string;
  author: string;
  category: string;
  text: string;
}

const Quotes: React.FC<{ category: string }> = ({ category }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const query =
          category === "all"
            ? "/quotes.json"
            : `/quotes.json?orderBy="category"&equalTo="${category}"`;

        const response = await axiosApi.get(query);
        const fetchedQuotes: Quote[] = [];

        for (const key in response.data) {
          fetchedQuotes.push({ id: key, ...response.data[key] });
        }

        setQuotes(fetchedQuotes);
      } catch (error) {
        console.error("Error fetching quotes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [category]);

  const handleEdit = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const handleUpdate = async (updatedQuote: Quote) => {
    try {
      await axiosApi.patch(`/quotes/${updatedQuote.id}.json`, updatedQuote);
      console.log("Quote updated successfully");

      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote.id === updatedQuote.id ? { ...quote, ...updatedQuote } : quote,
        ),
      );

      setSelectedQuote(null);
    } catch (error) {
      console.error("Error updating quote: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosApi.delete(`/quotes/${id}.json`);
      console.log("Quote deleted successfully");

      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
    } catch (error) {
      console.error("Error deleting quote: ", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 quotesContainer">
          {selectedQuote ? (
            <NewQuote existingQuote={selectedQuote} onUpdate={handleUpdate} />
          ) : (
            <>
              {quotes.length === 0 ? (
                <p>No quotes found for this category.</p>
              ) : (
                <ul className="list-group">
                  {quotes.map((quote) => (
                    <li key={quote.id} className="list-group-item">
                      <blockquote className="blockquote">
                        <p className="mb-0">{quote.text}</p>
                        <footer className="blockquote-footer">
                          — {quote.author}{" "}
                          <cite title="Source Title">({quote.category})</cite>
                        </footer>
                        <div className="mt-2">
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(quote)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(quote.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </blockquote>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
