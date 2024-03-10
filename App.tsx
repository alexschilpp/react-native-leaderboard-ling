import store from './context/store';
import {Provider} from 'react-redux';
import UserTable from './components/userTable';
import SearchBar from './components/searchBar';

export default function App() {
  return (
    <Provider store={store}>
        <SearchBar />
        <UserTable />
    </Provider>
  );
}
