import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
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

  componentDidMount(direction = 0) {
    const { monthID } = this.state;
    axios.get('/api/listings', {
      params: {
        ID: 1,
        monthID: monthID + direction,
      },
    })
      .then((response) => {
        this.setState({
          listing: response.data.listing, dates: response.data.dates, ready: true, monthID: monthID + direction,
        });
      });
  }

  changeMonth(direction) {
    // dir = 1 move ahead
    if (direction) {
      this.componentDidMount(direction);
    } else {
      this.componentDidMount();
    }
  }

  render() {
    const {
      listing, dates, ready, monthID,
    } = this.state;
    return (
      <Calendar listing={listing} dates={dates} ready={ready} monthID={monthID} changeMonth={this.changeMonth.bind(this)} />
    );
  }
}


export default App;
