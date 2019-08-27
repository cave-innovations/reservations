import React from 'react';
import axios from 'axios';
import Calendar from './Calendar/Calendar';
import Info from './Info/Info';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      dates: {},
      monthID: 1,
      ready: false,
      stars: null,
      reviews: null,
      views: null,
      name: '',
      maxGuests: '',
      pricing: null,
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount(direction = 0) {
    let { monthID } = this.state;
    axios.get('/api/listings', {
      params: {
        ID: 1,
        monthID: monthID + direction,
      },
    })
      .then((response) => {
        monthID += direction;
        this.setState({
          listing: response.data.listing, dates: response.data.dates, ready: true, monthID,
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
      <div>
        <Info listing={listing} dates={dates} ready={ready} monthID={monthID} changeMonth={this.changeMonth.bind(this)} />
        <Calendar dates={dates} ready={ready} monthID={monthID} changeMonth={this.changeMonth.bind(this)} />
      </div>
    );
  }
}

export default App;
