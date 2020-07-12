import {useState} from 'react';
import Head from 'next/head';
import { Search, RepositoryRecord } from '../components';
import { repositoriesByStars } from '../api';
  
const pageSize = 5;

const App = () => {
  const [repos, setRepos] = useState({
    message: "Enter at least 3 characters to begin search",
    repositoryCount: 0,
    repositories: []
  });

  const [loading, setLoading] = useState(false);

  const handleSearch = async search => {
    setLoading(true);

    const { error, repositoryCount = 0, repositories = [] } = await repositoriesByStars(search, pageSize);

    let message = error || (
      repositoryCount === 0
        ? `No matching repositories found for '${search}'`
        : `${repositoryCount} repositories found containing '${search}'`
    );

    setRepos({ message, repositoryCount, repositories });
    setLoading(false);
  };

  return (
    <div className={loading ? "loading" : ""}>
      <Head>
        <title>Rokt Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="card">
          <Search autoFocus onSearch={handleSearch} />
        </div>
      </div>

      <div className="repos-message">{repos.message}</div>
      <div className="repos-container">
        {repos.repositories.map(({ id, name, watchersCount }) =>
          <RepositoryRecord key={id} id={id} name={name} watchersCount={watchersCount} />
        )}
      </div>

      <style jsx>{`
        :global(html) { 
          font-size: 62.5%;
        }

        :global(body) {
          margin: 0;
          background-color: #333;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1.6rem;
        }

        .loading::after {
          content: '';
          display: block;
          position: absolute;
          left: 48%;
          top: 40%;
          width: 40px;
          height: 40px;
          border-style: solid;
          border-color: black;
          border-top-color: transparent;
          border-width:  4px;
          border-radius: 50%;
          -webkit-animation: spin .8s linear infinite;
          animation: spin .8s linear infinite;
        }

        @-webkit-keyframes spin {
          from { -webkit-transform: rotate(0deg); }
          to { -webkit-transform: rotate(360deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .repos-message {
          color: red;
          padding: 1rem;
        }

        .repos-container {
          padding: 1.8rem;
        }

        .card {
          padding: 1.8rem 1.8rem 2.4rem;
          border: 1px solid #9b9b9b;
        }

        .card:hover {
          border-color: #067df7;
        }
      `}</style>
    </div>
  );
};

export default App;
