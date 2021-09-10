import './App.css';
import { Provider } from "react-redux"
import store from "./js/store/index"
import BaseApp from './js/components/App'

function App() {
  return (
    <Provider store={store}>
      <BaseApp/>
    </Provider>  
  );
}

export default App;
