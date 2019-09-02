import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Info from './Info/Info';
// import top from '../../../img/Top.png';

const today = new Date();
const mm = today.getMonth() + 1; // January is 0!

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      dates: {},
      monthID: mm,
      ready: false,
    };
    this.setState = this.setState.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
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
        {/* <TopImage src="http://localhost:3000/Top.png" />
        <LeftImage src="http://localhost:3000/Left.png" /> */}
        <Info
          listing={listing}
          dates={dates}
          ready={ready}
          monthID={monthID}
          changeMonth={this.changeMonth}
        />
      </div>
    );
  }
}

const TopImage = styled.img`
  width: 100%;
`;
const LeftImage = styled.img`
  width: 50%;
`;

export default App;
