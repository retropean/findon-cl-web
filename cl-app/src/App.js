import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import datasService from './services/datas'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Data = ({ onClick, data }) => {
	return (
		<div className='data'>
			<img src={require("./img/" + data.img)} alt={data.make + " " + data.model} onClick={onClick} width='100%' height='75%'/>
			{data.make} {data.model}
		</div>
	)
}

const Item = ({ data }) => {
	return (
		<div className='highlighted-item'>
			<img className='item_img' src={require("./img/" + data.img)} alt={data.make + " " + data.model} width='100%' height='75%'/>
			<div className='item_text'>
				<b>make: </b>{data.make} <br/> 
				<b>model: </b>{data.model} <br/> 
				<b>price: </b>{data.price} <br/> 
				<b>date: </b>{data.date} <br/> 
			</div>
		</div>
	)
}

function App() {
	const [data, setData] = useState([])
	const [showCat, setShowCat] = useState('')
	const [search, setSearch] = useState('') 
	const [showId, setShowId] = useState(0)
	
	const handleSearchChange = (event) => {
		console.log(event.target.value)
		setSearch(event.target.value)
	}
	
	const handleItemChange = (id) => {
		console.log(id)
		setShowId(id)
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
	
	const itemToShow = data.filter(data => showId === data.id)
	
	// Build the rows based on category
	const rows = () => rowsToShow.map(data =>
		<Data
		  key={data.id}
		  data={data}
		  onClick={() => handleItemChange(data.id)} 
		/>
	)
	
	const itemRow = () => showId === 0 ?
		<div></div>
		:
		itemToShow.map(data=> 
			<Item
				key={data.id}
				data = {data}
			/>
		)
		
	if(showId === 0) {
		return (
			<div className="App">
				<Header />
				<div>
					search our database
				</div>
				<form>
					<input className='mainsearch' value={search} onChange={handleSearchChange}	/>
				</form>   
				<p>
				or browse by category
				</p>
				<div>
				<Button className="button_style" text="all" onClick={() => setShowCat("")}/>  
				<Button className="button_style" text="art" onClick={() => setShowCat("art")}/>  
				<Button className="button_style" text="bikes" onClick={() => setShowCat("bikes")}/>  
				<Button className="button_style" text="computers" onClick={() => setShowCat("computers")}/>
				<Button className="button_style" text="electronics" onClick={() => setShowCat("electronics")}/>
				<Button className="button_style" text="vehicles" onClick={() => setShowCat("vehicles")}/>
				</div>
				<div className='data-shell'>
				{rows()}
				</div>
			</div>
		);
	}
	else {
		return (
			<div className="App">
				<Header />
				<div>
					<Button className="button_style" text="back" onClick={() => setShowId(0)}/>
				</div>
				<div className='item-shell'>
					{itemRow()}
				</div>
			</div>
		)
	}
}

export default App;