import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import colourConfig from './config/colourConfig';
import { useCallback, useEffect, useState } from 'react';
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
		createNewListContent: false,
		editList: false,
		editListContent: false
	})

	var requestEndPoint = process.env.REACT_APP_API_URI

	const [groceryList, setGroceryList] = useState(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		let response = await axios.get(requestEndPoint);
		response = response.data;
		setGroceryList(response);
		setLoading(false);
	}, [requestEndPoint])

	useEffect(() => {
		fetchData();
	}, [fetchData, requestEndPoint])

	return (
		<Container>
			<Header state={state} setState={setState} groceryList={groceryList} requestEndPoint={requestEndPoint} fetchData={fetchData} />
			{
				loading ? (
					<Loading />
				) : (
					<Main groceryList={groceryList} setGroceryList={setGroceryList} state={state} setState={setState} requestEndPoint={requestEndPoint} fetchData={fetchData} />
				)
			}
		</Container>

	);
}

export default App;