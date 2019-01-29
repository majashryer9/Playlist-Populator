import * as React from 'react';
import './include/bootstrap';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import HomeComponent from './components/home-component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* put nav bar here  */}
            <div id="main-content-container">
              <Switch>
                <Route component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;