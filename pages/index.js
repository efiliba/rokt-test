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

  const handleSearch = async search => {
    const { error, repositoryCount = 0, repositories = [] } = await repositoriesByStars(search, pageSize);

    let message = error || (
      repositoryCount === 0
        ? `No matching repositories found for '${search}'`
        : `${repositoryCount} repositories found containing '${search}'`
    );

    setRepos({ message, repositoryCount, repositories });
  };

  return (
    <div>
      <Head>
        <title>Rokt Test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container'>
        <div className='card'>
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
