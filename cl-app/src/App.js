import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import datasService from './services/datas'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Data = ({ data }) => {
  return (
    <li className='data'>
      {data.make} 
    </li>
  )
}

function App() {
	const [data, setData] = useState([])
	const [showCat, setShowCat] = useState('')
	const [search, setSearch] = useState('') 
	
	const handleSearchChange = (event) => {
		console.log(event.target.value)
		setSearch(event.target.value)
	}
	
    useEffect(() => {
		datasService
		  .getAll()
		  .then(initialData => {
			setData(initialData)
		})
    }, [])	
	
	const rowsToShow = data.filter(data => showCat === '' ?
		data.make.includes(search) ||
		data.model.includes(search) ||
		data.category.includes(search)
		:
		(data.make.includes(search) ||
		data.model.includes(search) ||
		data.category.includes(search)) &&
		data.category === showCat
	)
	
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
			<form>
				<input value={search} onChange={handleSearchChange}	/>
			</form>   
			<p>
			or browse by category
			</p>
			<Button text="all" onClick={() => setShowCat("")}/>  
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