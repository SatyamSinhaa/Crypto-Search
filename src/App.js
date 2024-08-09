import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import debounce from 'lodash.debounce';

function App() {
  const [crypto, setCrypto] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [link, setLink] = useState('');
  const [ind, setInd] = useState('');
  const [usd, setUsd] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  const fetchCryptoData = async (cryptoName) => {
    const url = `https://api.coingecko.com/api/v3/coins/${cryptoName}`;
    try {
      const res = await axios.get(url);
      const resData = res.data;
      setCache((prevCache) => ({
        ...prevCache,
        [cryptoName]: resData,
      }));
      setImg(resData.image.large);
      setName(resData.name);
      setSymbol(resData.symbol);
      setLink(resData.links.homepage[0]);
      setInd(`Indian price : ₹${resData.market_data.current_price.inr}`);
      setUsd(`US price : $${resData.market_data.current_price.usd}`);
      setDesc(resData.description.en);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Cryptocurrency not found. Please check the name and try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    if (!crypto.trim()) {
      setError('Please enter a cryptocurrency name.');
      return;
    }
    setLoading(true);
    setError('');
    
    if (cache[crypto]) {
      const resData = cache[crypto];
      setImg(resData.image.large);
      setName(resData.name);
      setSymbol(resData.symbol);
      setLink(resData.links.homepage[0]);
      setInd(`Indian price : ₹${resData.market_data.current_price.inr}`);
      setUsd(`US price : $${resData.market_data.current_price.usd}`);
      setDesc(resData.description.en);
      setLoading(false);
    } else {
      fetchCryptoData(crypto);
    }
  };

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setCrypto(value);
    }, 500),
    []
  );

  const handleChange = (event) => {
    debouncedChangeHandler(event.target.value.toLowerCase());
  };

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  function createMarkup() {
    return { __html: desc };
  }

  return (
    <div className="App" style={{ backgroundColor: "crimson", minHeight: "100vh" }}>
      <header>
        <h1 className="bg-info p-4 text-center">Cryptocurrency Search</h1>
      </header>
      <main className="container">
        <div className="d-flex justify-content-center flex-wrap">
          <div className="col-md-6 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Enter the cryptocurrency"
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary px-5 mt-4">
                Submit
              </button>
            </form>
            {loading && <div className="mt-4">Loading...</div>}
            {error && <div className="alert alert-danger mt-4">{error}</div>}
          </div>
        </div>
        <div className="row mt-5">
          {name && (
            <div className="col-md-4 bg-success p-2 rounded text-center">
              {img && <img src={img} alt={name} width="150" />}
              <h1 className="text-white">{name}</h1>
              <h2>{symbol}</h2>
              {link && (
                <h2>
                  <a
                    className="text-white"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link}
                  </a>
                </h2>
              )}
              <h2>{ind}</h2>
              <h2>{usd}</h2>
            </div>
          )}
          {desc && (
            <div className="col-md-8 text-white my-auto">
              <div dangerouslySetInnerHTML={createMarkup()} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


export default App;