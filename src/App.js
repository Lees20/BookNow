
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import SearchBar from './components/Search-Bar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Home/>
        
      </header>
     
    </div>
  );
}

export default App;
