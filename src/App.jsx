import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './App.css'
import Skeleton from "./assets/components/Skeleton";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  

  const fetchJoke = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();
      setJoke(data);

      setTimeout(() => setLoading(false), 100);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);


  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  


  const handleShare = async () => {
    const shareData = {
      title: 'Funny Joke 😂',
      text: `${joke?.setup}\n${joke?.punchline}`,
      url: window.location.href
    };
  
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Joke shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${joke?.setup}\n${joke?.punchline}`);
        alert("Joke copied to clipboard! 📋");
      } catch (error) {
        alert("Failed to copy joke.");
      }
    }
  };



  const handleFavorite = () => {
    if (!joke) return;
  
    if (favorites.some(fav => fav.id === joke.id)) {
      alert('Already in favorites!');
      return;
    }
  
    const newFavorite = { id: joke.id, setup: joke.setup, punchline: joke.punchline };
    const updatedFavorites = [...favorites, newFavorite];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    alert('Joke added to favorites! ❤️');
  };
  
  

 

  if (loading) return <Skeleton />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-900 text-black p-4 relative transition-colors duration-500">

   <div className="bg-gray-800 shadow-lg rounded-lg p-10 max-w-md text-center transition-colors duration-500">

        <h1 className="text-2xl text-white font-bold mb-4">Random Joke</h1>
        <p className="text-lg font-semibold">{joke.setup}</p>
        <p className="text-xl text-green-900 mt-2">{joke.punchline}</p>

        <button
          onClick={fetchJoke}
          className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
        >
          Get Another Joke
        </button>  
        <button
           onClick={handleShare}
           className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
       >
          Share This Joke
        </button>
        <button
           onClick={handleFavorite}
           className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition"
        >
          ❤️ Favorite
        </button>
     
        <button
  onClick={() => navigate('/favorites')}
  className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition"
>
  View Favorites Page
</button>


      </div>

    </div>
  );
}

export default App;
