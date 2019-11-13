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
		<div className='data' class='data'>
			{data.make} {data.model}
		</div>
	)
 //style={{width: '200px', height: '200px', float: 'left',  border: '1px solid black', margin: '10px'}}	
	
/*
  return (
    <li className='data'>
      {data.make} 
    </li>
  )
*/
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
				<input class='mainsearch' value={search} onChange={handleSearchChange}	/>
			</form>   
			<p>
			or browse by category
			</p>
			<div>
			<Button class="button_style" text="all" onClick={() => setShowCat("")}/>  
			<Button class="button_style" text="art" onClick={() => setShowCat("art")}/>  
			<Button class="button_style" text="bikes" onClick={() => setShowCat("bikes")}/>  
			<Button class="button_style" text="computers" onClick={() => setShowCat("computers")}/>
			<Button class="button_style" text="electronics" onClick={() => setShowCat("electronics")}/>
			<Button class="button_style" text="vehicles" onClick={() => setShowCat("vehicles")}/>
			</div>
			<div class='data-shell'>
			{rows()}
			</div>
		</div>
	);
}

export default App;