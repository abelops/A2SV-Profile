import './App.css'
import { Provider } from 'react-redux';
import store from './store';
import NoteList from './notes';

function App() {
  return (
    <>
      <Provider store={store}>
        <NoteList />
      </Provider>
    </>
  )
}

export default App


