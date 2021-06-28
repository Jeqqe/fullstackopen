import React, { useState } from 'react'


const Button = ({name, onClick}) => {
	return (
		<button onClick={onClick}>{name}</button>
	)
}

const Statistic = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}{text === 'positive' ? '%' : ''}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {

	const total = good + neutral + bad
	const average = (good * 1 + bad * (-1))/total
	const positive = good/total

	if (total === 0){
		return (
			<div>
				<p>No feedback given</p>
			</div>
		)	
	}

	return (
		<table>
			<tbody>
				<Statistic text='good' value={good}/>
				<Statistic text='neutral' value={neutral}/>
				<Statistic text='bad' value={bad}/>
				<Statistic text='total' value={total}/>
				<Statistic text='average' value={average}/>
				<Statistic text='positive' value={positive}/>
			</tbody>
		</table>
	)
}

const App = () => {
  	
  	const [good, setGood] = useState(0)
  	const [neutral, setNeutral] = useState(0)
  	const [bad, setBad] = useState(0)

  	return (
    	<div>
      		<h1>give feedback</h1>
	  		<Button name={'good'} onClick={() => setGood(good + 1)}/>
	  		<Button name={'neutral'} onClick={() => setNeutral(neutral + 1)}/>
	  		<Button name={'bad'} onClick={() => setBad(bad + 1)}/>

			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    	</div>
  	)
}

export default App
