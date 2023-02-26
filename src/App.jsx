import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import colourConfig from './config/colourConfig';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './components/Main';
import Loading from './components/Loading';

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

	var requestEndPoint = process.env.REACT_APP_API_URI

	const [groceryList, setGroceryList] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				let response = await axios.get(requestEndPoint);
				response = response.data;
				setGroceryList(response);
				// console.log(response);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [requestEndPoint])

	return (
		<Container>
			<Header state={state} setState={setState} groceryList={groceryList} />
			{
				loading ? (
					<Loading />
				) : (
					<Main groceryList={groceryList} state={state} setState={setState} requestEndPoint={requestEndPoint}/>
				)
			}
		</Container>

	);
}

export default App;