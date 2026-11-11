
import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async (event) => {
    event.preventDefault();

    const searchName = username.trim();

    if (!searchName) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setUser(null);

      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(searchName)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("GitHub user not found.");
        }

        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Try again later.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>GitHub Finder</h1>
        <p className="subtitle">
          Search GitHub users and explore their profiles
        </p>

        <form className="search-form" onSubmit={searchUser}>
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading && <p className="loading">Fetching GitHub profile...</p>}

        {user && (
          <div className="profile-card">
            <img
              className="avatar"
              src={user.avatar_url}
              alt={`${user.login}'s profile`}
            />

            <h2>{user.name || user.login}</h2>
            <a
              className="username"
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              @{user.login}
            </a>

            <p className="bio">
              {user.bio || "No bio available"}
            </p>

            <p className="location">
              {user.location || "Location not available"}
            </p>

            <div className="stats">
              <div>
                <h3>{user.public_repos}</h3>
                <p>Repositories</p>
              </div>

              <div>
                <h3>{user.followers}</h3>
                <p>Followers</p>
              </div>

              <div>
                <h3>{user.following}</h3>
                <p>Following</p>
              </div>
            </div>

            <a
              className="profile-link"
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
