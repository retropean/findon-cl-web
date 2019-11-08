import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import datasService from './services/datas'


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

const Data = ({ data }) => {
  return (
    <li className='data'>
      {data.make} 
    </li>
  )
}

function App() {
	const [data, setData] = useState([])
	const [showCat, setShowCat] = useState('vehicles')
  

	const handleCatChange = (category) => {
		console.log('hello')
		setShowCat(category)
	}
	
    useEffect(() => {
		datasService
		  .getAll()
		  .then(initialData => {
			setData(initialData)
		})
    }, [])	
	
	const rowsToShow = data.filter(data => data.category === showCat) // Filter the data based on category
	// Build the rows based on category
	const rows = () => rowsToShow.map(data =>
		<Data
		  key={data.id}
		  data={data}
		/>
	)
		
	return (
		<div className="App">
			<Header />
			<SearchFunction />
			<p>
			or browse by category
			</p>
			<Button text="art" onClick={() => setShowCat("art")}/>  
			<Button text="bikes" onClick={() => setShowCat("bikes")}/>  
			<Button text="computers" onClick={() => setShowCat("computers")}/>
			<Button text="electronics" onClick={() => setShowCat("electronics")}/>
			<Button text="vehicles" onClick={() => setShowCat("vehicles")}/>
			{rows()}
		</div>
	);
}

export default App;