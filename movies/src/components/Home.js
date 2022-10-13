import { useEffect, useState } from 'react';
import '../styles/Home.css';

function Home() {

  const [countries, setCountries] = useState([])
  const [countryname, setCountry] = useState(null)

  useEffect(() => {
    if (countries.length == 0) {
      fetch('https://api.themoviedb.org/3/trending/all/day?api_key=44690770c7218f35a73e5bdda03ad0bd')
        .then(response => response.json())
        .then(data => setCountries(data.results));
    }
  }, [countries])

  console.log(countries)

  const newList = countryname ? countries.filter(element => { return element.title.toLowerCase().includes(countryname.toLowerCase()) }) : countries;

  const handleCountrySearch = (e) => {
    setCountry(e.target.value)
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          Show Time!
        </p>
      </header>
      <div className="Home-link">search field</div>
      <div>table</div>
      <div>Countries list!<br />
        <input type="text" id="searchCountry" onChange={handleCountrySearch} />
      </div>
      {newList.map((list, index) =>
        <div className="countryItem" key={index}>
          <div className="countryName">{list.title ? list.title : list.name}</div>
          <div className="countryDetail">Release : {list.release_date}</div>
          <div className="countryImage"><img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${list.poster_path}`} /></div>
        </div>
      )}
    </div>
  );
}

export default Home;
