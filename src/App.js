import { render } from '@testing-library/react';
import './App.css';
import { useState, useEffect } from 'react';

function RenderPage(){
  return ( 
    <>
    <div className="header-wrap">
      <header className="header">
        <img src="/assets/logo.svg" alt="" id="logo" />
        <div className="change-theme-wrap">
          <img src="assets/icon-sun.svg" alt="" id="icon-sun" />
        </div>
      </header>
    </div>
    <div className='title-and-btn-wrap'>
      <div className='title-and-btn'>
        <h1 className="list-title">
        Extensions List
      </h1>

      <div className="sort-btns">
        <div className="sort-btn-wrap">
          <input type="radio" name="filter" data-filter="all" defaultChecked className="hidden" />
            <label htmlFor="filter-all" class="sort-btn">All</label>
        </div>
        
        <div className="sort-btn-wrap">
          <input type="radio" data-filter="active" className="hidden" name="filter" />
          <label htmlFor="active" className="sort-btn">Active</label>
        </div>
        <div className="sort-btn-wrap">
          <input type="radio" className="hidden" data-filter="inactive" name="filter" />
            <label htmlFor="inactive" className="sort-btn">Inactive</label>
        </div>
      </div>
    </div>
    </div>

    {/* <main>
       <div className="card">
        <div className="logo-title">
          <div className="logo"><img src="assets/logo-devlens.svg" alt="" /></div>
          <div class="title-desc">
            <h1>DevLens</h1>
            <p>Quickly inspect page layouts and visualize element boundaries.</p>
          </div>
        </div>
        <div class="remove-off-on">
          <button>Remove</button>
          <label class="switch">
            <input type="checkbox" defaultChecked />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </main> */}
    
    </>
  );
}

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        setCards(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  

  return (
    <>
      <RenderPage />
      <main>
        {cards.map((card, index) => (
        <div className="card" key={card.id || index}>
          <div className="logo-title">
            <div className="logo"><img src={card.logo} alt="" /></div>
            <div className="title-desc">
              <h1>{card.name}</h1>
              <p>{card.description}</p>
            </div>
          </div>
          <div className="remove-off-on">
            <button>Remove</button>
            <label className="switch">
              <input type="checkbox" checked={card.isActive} />
              <span className="slider"></span>
            </label>
          </div>
        </div> ))}
      </main> 
    </>
  );
}

export default App;