import React from 'react';
import './App.css';
import Header from './components/Header'
import Category from './components/Category'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const SearchFunction = () => {
	return(
  	  <form>
        <input 
		/>
        <Button text='submit' />
      </form>   
	)
}

function App() {
  return (
    <div className="App">
      <Header />
	  <SearchFunction />
	<Category />
	</div>
  );
}

export default App;