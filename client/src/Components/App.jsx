import React from 'react';
import axios from 'axios';
import Calendar from './Calendar/Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      dates: {},
      monthID: 1,
      ready: false,
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const { monthID } = this.state;
    axios.get('/api/listings', {
      params: {
        ID: 1,
        monthID,
      },
    })
      .then((response) => {
        this.setState({ listing: response.data.listing, dates: response.data.dates, ready: true });
      });
  }

  render() {
    const {
      listing, dates, ready, monthID,
    } = this.state;
    return (
      <div>
        <Calendar listing={listing} dates={dates} ready={ready} monthID={monthID} />
      </div>
    );
  }
}

export default App;
