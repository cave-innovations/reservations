import React from 'react';
import Calendar from './Calendar/Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boop: '',
    };
  }

  render() {
    return (
      <div>
        <Calendar />
      </div>
    );
  }
}

export default App;
