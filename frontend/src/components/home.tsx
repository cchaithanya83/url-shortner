import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState(''); // State for custom short code
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('https://url-shortner-ngnn.onrender.com/initial-data');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('https://url-shortner-ngnn.onrender.com/shorten', {
        longUrl: url,
        shortCode: shortCode.trim() // Ensure the short code is trimmed
      });
      

      setShortenedUrl(response.data.shortUrl);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('URL already exists use something else');
      setShortenedUrl(''); // Clear the shortened URL on error
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="URL" className="block mb-2 text-sm font-medium text-gray-900">
            URL
          </label>
          <input
            type="text"
            id="URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="shortCode" className="block mb-2 text-sm font-medium text-gray-900">
            Custom Short URL
          </label>
          <input
            type="text"
            id="shortCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter a custom short URL"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="SURL" className="block mb-2 text-sm font-medium text-gray-900">
            Shortened URL
          </label>
          <input
            type="text"
            id="SURL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Shortened URL"
            value={shortenedUrl}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
        {loading && (
          <div className="mt-4 text-blue-600 text-sm">
            <p>Loading...</p> {/* You can replace this with a spinner if desired */}
          </div>
        )}
        {shortenedUrl && (
          <p className="mt-4 text-green-600 text-sm">
            Shortened URL: <a href={shortenedUrl} className="underline">{shortenedUrl}</a>
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-sm">
            Error: {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Home;
