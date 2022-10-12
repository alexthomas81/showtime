import { useEffect, useState } from 'react';
import '../styles/Home.css';

function Home() {

  const [countries, setCountries] = useState([])
  const [countryname, setCountry] = useState(null)

  useEffect(() => {
    if (countries.length == 0) {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => setCountries(data));
    }
  }, [countries])

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
          <div className="countryName">{list.title}</div>
          <div className="countryDetail">Capital : {list.completed}</div>
        </div>
      )}
    </div>
  );
}

export default Home;
