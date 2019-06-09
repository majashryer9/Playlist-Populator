import * as React from 'react';
import './include/bootstrap';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import NavBar from './components/navbar/NavBar';
import CreatePlaylistContainer from './components/create-playlist/create-playlist-container';
import BrowseContainer from './components/browse/browse-container';
import LoginContainer from './components/login-register/login-container';
import MyProfileContainer from './components/my-profile/container';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar />
            <div id="main-content-container">
              <Switch>
                <Route path='/create-playlist' component={CreatePlaylistContainer} />
                <Route path='/browse' component={BrowseContainer} />
                <Route path='/login' component={LoginContainer} />
                <Route path='/my-profile' component={MyProfileContainer} />
                <Route component={LoginContainer} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;