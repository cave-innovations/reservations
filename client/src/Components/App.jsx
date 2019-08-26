import React from 'react';
import axios from 'axios';
import Calendar from './Calendar/Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      dates: {},
      monthID: 0,
      ready: false,
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    axios.get('/api/listings', {
      params: {
        ID: 1,
        monthID: this.state.monthID,
      },
    })
      .then((response) => {
        this.setState({ listing: response.data.listing, dates: response.data.dates, ready: true });
      });
  }

  render() {
    return (
      <div>
        <Calendar listing={this.state.listing} dates={this.state.dates} ready={this.state.ready} monthID={this.state.monthID} />
      </div>
    );
  }
}

export default App;
