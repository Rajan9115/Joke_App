import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-12">
      
      <div className='fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-md z-10'>
         <h1 className="text-2xl font-bold text-center mb-6">❤️ Favorite Jokes</h1>

         <Link to="/" className="text-blue-500 hover:underline block mb-4 text-center">
            ← Back to Main Page
         </Link>
      </div>
      <div className="max-w-xl mx-auto">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorite jokes yet.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((joke, index) => (
              <li key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <p className="font-medium">{joke.setup}</p>
                <p className="font-bold text-green-600 dark:text-green-400">{joke.punchline}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
