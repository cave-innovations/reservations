import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar/Calendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Calendar/>
      </div>
    )
  }
}

export default App;