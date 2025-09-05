import './App.css';
import { useState, useEffect } from 'react';

function sortCards(state){
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
          if (state === 'all' || card.classList.contains(state)){
            card.style.display = 'block';
          }
          else{
            card.style.display = 'none';
          }
        })
      }


const lightmode = () => {
  document.addEventListener('DOMContentLoaded', () => {
    let lightmode = localStorage.getItem('lightmode');
    const themeSwitch = document.getElementById('change-theme-wrap');

    const enableLightmode = () => {
      document.body.classList.add('light');
      localStorage.setItem('lightmode', 'active');
    }

    const disableLightmode = () => {
      document.body.classList.remove('light');
      localStorage.setItem('lightmode', null);
    }

    themeSwitch.addEventListener("click", () => {
      lightmode = localStorage.getItem('lightmode')
      lightmode !== 'active' ? enableLightmode() : disableLightmode();
    })
  })
}
lightmode()

function RenderPage(){
  return ( 
    <>
    <div className="header-wrap">
      <header className="header">
        <img src="/assets/logo.svg" alt="" id="logo" />
        <div className="change-theme-wrap" id='change-theme-wrap'>
          <img src="assets/icon-sun.svg" alt="" id="icon-sun" />
          <img src="assets/icon-moon.svg" id="icon-moon" />
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
          <input type="radio" name="filter" id='filter-all' defaultChecked className="hidden" onClick={() => sortCards('all')} />
            <label htmlFor="filter-all" class="sort-btn">All</label>
        </div>
        
        <div className="sort-btn-wrap">
          <input type="radio" className="hidden" id='filter-active' name="filter" onClick={() => sortCards('active')} />
          <label htmlFor="filter-active" className="sort-btn">Active</label>
        </div>
        <div className="sort-btn-wrap">
          <input type="radio" className="hidden" id='filter-inactive' name="filter" onClick={() => sortCards('inactive')} />
            <label htmlFor="filter-inactive" className="sort-btn">Inactive</label>
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

  
    const toggleState = (index) => {
      const updatedCards = [...cards];
      updatedCards[index].isActive = !updatedCards[index].isActive;
      updatedCards[index].state = updatedCards[index].state === 'inactive' ? 'active' : 'inactive';
      console.log(index, ': ', updatedCards[index].isActive, updatedCards[index].state);
      setCards(updatedCards);
    }
      
    const removeCard = (index) => {
      const updatedCards = cards.filter((_, i) => i !== index);
      setCards(updatedCards);
    };


      // <script>
      //   function sort(state){
      //     card = document.querySelectorAll('card');

      //     if (card.classList.contains(state)){
      //       card.classList.remove('invis')
      //     }
      //     else{
      //       card.classList.add('invis');
      //     }

      //   }
      // </script>

      
      
  return (
    <>
      <RenderPage />
      <main>
        {cards.map((card, index) => (
        <div className={`card ${card.state}`} data-filter={card.state} key={card.id || index}>
          <div className="logo-title">
            <div className="logo"><img src={card.logo} alt="" /></div>
            <div className="title-desc">
              <h1>{card.name}</h1>
              <p>{card.description}</p>
            </div>
          </div>
          <div className="remove-off-on">
            <button onClick={() => removeCard(index)}>Remove</button>
            <label className="switch">
              <input type="checkbox" defaultChecked={card.isActive} onChange={() => toggleState(index)} />
              <span className="slider"></span>
            </label>
          </div>
        </div> ))}
      </main> 
    </>
  );
}

export default App;