import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import colourConfig from './config/colourConfig';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './components/Main';

const Container = styled.div`
  background-color: ${colourConfig.background};
  min-height: 100vh;
  color: ${colourConfig.font};
  
`

function App() {
	const [loading, setLoading] = useState(true);

	const [state, setState] = useState({
		display: false,
		displayID: null,
		createNewList: false,
		createNewListContent: false
	})

	var requestEndPoint = "https://api.elvistkf.synology.me/api/grocery-list"

	const [groceryList, setGroceryList] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				let response = await axios.get(requestEndPoint);
				response = response.data;
				setGroceryList(response);
				console.log(response);
			} catch (e) {
				console.error(e);
				var requestEndPoint = "http://10.88.111.10/api/grocery-list"
				let response = await axios.get(requestEndPoint);
				response = response.data;
				setGroceryList(response);
				console.log(response);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [])

	return (
		<Container>
			<Header state={state} setState={setState} groceryList={groceryList} />
			{
				loading ? (
					<div>Loading</div>
				) : (
					<Main groceryList={groceryList} state={state} setState={setState} requestEndPoint={requestEndPoint}/>
				)
			}
		</Container>

	);
}

export default App;