import { useState, useEffect } from 'react';
import StarRating from './StarRating';

// API base URL
const API_URL = 'https://imdb.iamidiotareyoutoo.com/search';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState('');

  const handleAddWatched = (movie) => {
    setWatched((watched) => {
      const existingMovie = watched.find(
        (m) => m['#IMDB_ID'] === movie['#IMDB_ID']
      );
      if (existingMovie) {
        return watched.map((m) =>
          m['#IMDB_ID'] === movie['#IMDB_ID']
            ? { ...m, userRating: movie.userRating }
            : m
        );
      } else {
        return [...watched, movie];
      }
    });
  };

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceQuery(query);
    }, 1000);
    return () => clearTimeout(handleDebounce);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (debounceQuery.length < 1) {
        setMovies([]);
        setTotalResults(0);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const res = await fetch(
          `${API_URL}?q=${encodeURIComponent(debounceQuery.trim())}`
        );
        const data = await res.json();
        if (data.ok && Array.isArray(data.description)) {
          setMovies(data.description);
          setTotalResults(data.description.length);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [debounceQuery]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults totalResults={totalResults} />
      </NavBar>

      <Main>
        {/* 法1 */}

        <Box>
          <MovieList
            movies={movies}
            onAddWatched={handleAddWatched}
            loading={isLoading}
          />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>

        {/* 法2 */}
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>USE POPCORN</h1>
    </div>
  );
}

function NumResults({ totalResults }) {
  return (
    <p className='num-results'>
      Found <strong>{totalResults}</strong> results
    </p>
  );
}
function Search({ query, setQuery, handleKeyDown }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className='box'>
//       <button
//         className='btn-toggle'
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? '–' : '+'}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
function MovieList({ movies, onAddWatched, loading }) {
  return (
    <ul className='list'>
      {loading ? (
        <div className='loader'>
          <div className='circle'>
            <div className='dot'></div>
            <div className='outline'></div>
          </div>
          <div className='circle'>
            <div className='dot'></div>
            <div className='outline'></div>
          </div>
          <div className='circle'>
            <div className='dot'></div>
            <div className='outline'></div>
          </div>
          <div className='circle'>
            <div className='dot'></div>
            <div className='outline'></div>
          </div>
        </div>
      ) : (
        movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie['#IMDB_ID']}
            onAddWatched={onAddWatched}
          />
        ))
      )}
    </ul>
  );
}

function Movie({ movie, onAddWatched }) {
  const [userRating, setUserRating] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRating = (rating) => {
    setUserRating(rating);
    onAddWatched({ ...movie, userRating: rating });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <li>
      <div
        style={{ position: 'relative', width: '100%', paddingBottom: '150%' }}
      >
        {!imageLoaded && (
          <div
            className='loader'
            style={{
              position: 'absolute',
              top: '-30px',
              left: '-55px',
              zIndex: 1,
            }}
          >
            <div className='circle'>
              <div className='dot'></div>
              <div className='outline'></div>
            </div>
          </div>
        )}
        <img
          src={movie['#IMG_POSTER']}
          alt={`${movie['#TITLE']} poster`}
          onLoad={handleImageLoad}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: imageLoaded ? 'block' : 'none',
          }}
        />
      </div>
      <h3>{movie['#TITLE']}</h3>
      <div>
        <p style={{ marginTop: '10px' }}>
          <span>📅</span>
          <span>{movie['#YEAR']}</span>
        </p>
        <StarRating
          maxRating={5}
          messages={['超級難看', '不好看', '還行', '很好看', '超級好看']}
          defaultRating={userRating}
          onRate={handleRating}
        />
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <div>
      {watched.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10%' }}>
          You haven't rated yet.
        </p>
      ) : (
        <ul className='list'>
          {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie['#IMDB_ID']} />
          ))}
        </ul>
      )}
    </div>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie['#IMG_POSTER']} alt={`${movie['#TITLE']} poster`} />
      <h3>{movie['#TITLE']}</h3>
      <div>
        <p>
          <span>🏆</span>
          <span>{movie['#RANK']}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>

        <p>
          <span>🔗</span>
          <a
            href={`https://www.imdb.com/title/${movie['#IMDB_ID']}`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'inherit' }}
          >
            IMDb
          </a>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>🏆</span>
          <span>RANK</span>
        </p>
        <p>
          <span>🌟</span>
          <span>Your Rating</span>
        </p>
      </div>
    </div>
  );
}
