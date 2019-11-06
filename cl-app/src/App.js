import React from 'react';
import './App.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Category = () => {
	return(
  	  <div>
		  <p>
			or browse by category
		  </p>
		  <div>
			| art | bikes | computers | electronics | vehicles | 
		  </div>
	  </div>
	)
}
const Header = () => {
	return(
  	  <div>
		  <h1>findon.cl</h1>
		  <div>search our database</div>
	  </div>
	)
}

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