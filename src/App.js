import { useState } from 'react';
import './App.css';
import Temperatura from './components/Temperatura'

const api = {
  key: "SUA-CHAVE-AQUI",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [tempo, setTempo] = useState({});

  const search = async evt => {
    if(evt.key === "Enter") {
      const response = await fetch(`${api.base}weather?q=${query}&units=metric&lang=pt_br&APPID=${api.key}`);
      const tempoJson = await response.json();
      setTempo(tempoJson);
      setQuery('');
      console.log(tempoJson)
    }
  }

  return (
    <div className={tempo.main ? ((tempo.main.temp > 16) ? "app warm" : "app") : "app"}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Pesquisar..."
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {(typeof tempo.main != "undefined") && (
          <Temperatura
            cidade={tempo.name}
            pais={tempo.sys.country}
            temperatura={tempo.main.temp}
            tempo={tempo.weather[0].description}
          />
        )}
      </main>
    </div>
  );
}

export default App;
