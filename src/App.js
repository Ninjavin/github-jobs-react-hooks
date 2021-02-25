import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

function App(){
	const [params, setParams] = useState({})
	const [page, setPage] = useState(1)
	const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

	function handleParamChange(e){
		const param = e.target.name
		const value = e.target.value
		setPage(1)
		setParams(prevParams => {
			return { ...prevParams, [param]: value}
		})
	}
	return (
		<Container className="my-4">
			<h3 className="mb-4">GitHub Jobs</h3>
			<SearchForm params={params} onParamChange={handleParamChange} />
			<JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
			{ loading && <h3>Loading...</h3>}
			{ error && <h3>Error</h3>}
			{ jobs.map(job => {
				return <Job key={job.id} job={job}></Job>
			})} 
			<JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
		</Container>
	)
}

export default App;