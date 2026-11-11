
import { useState } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  function addBookmark() {

    const bookmarkName = name.trim();
    const bookmarkUrl = url.trim();

    if (!bookmarkName || !bookmarkUrl) {
      alert("Please enter both name and URL.");
      return;
    }

    if (
      !bookmarkUrl.startsWith("http://") &&
      !bookmarkUrl.startsWith("https://")
    ) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    const newBookmark = {
      name: bookmarkName,
      url: bookmarkUrl
    };

    const updatedBookmarks = [...bookmarks, newBookmark];

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );

    setName("");
    setUrl("");
  }

  function removeBookmark(index) {

    const updatedBookmarks = bookmarks.filter(
      (_, i) => i !== index
    );

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  }

  return (
    <div className="app-container">

      <h1>Bookmark Saver</h1>

      <div className="input-container">

        <input
          type="text"
          placeholder="Bookmark Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="url"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={addBookmark}>
          Add Bookmark
        </button>

      </div>

      <ul id="bookmark-list">

        {bookmarks.map((bookmark, index) => (

          <li key={index}>

            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.name}
            </a>

            <button onClick={() => removeBookmark(index)}>
              Remove
            </button>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default App;
