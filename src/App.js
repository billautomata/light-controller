import './App.css';
import SequenceProgrammer from './components/SequenceProgrammer'

function App() {

  const trees = new Array(7).fill(0)

  return (
    <div className="App">
      <SequenceProgrammer/>
    </div>
  );
}

export default App;
