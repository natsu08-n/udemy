import { Header } from './components/header/Header'
import './index.css'
import { TaskCards } from './components/task/TaskCards'

function App() {
	return (
		<div className="app">
			<Header />
			<TaskCards />
		</div>
	)
}

export default App
