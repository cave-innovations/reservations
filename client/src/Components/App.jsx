import React from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import Info from './Info/Info';

const today = new Date();
const mm = today.getMonth() + 1; // January is 0!

class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      dates: {},
      monthID: mm,
      ready: false,
      scroll: true,
      listingID: 1,
    };
    const url = document.URL.split('/');
    if (url.length > 4) {
      const listingID = url[4];
      this.state.listingID = listingID;
    }
    this.setState = this.setState.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }

  componentDidMount(direction = 0) {
    let { monthID } = this.state;
    const { listingID } = this.state;
    axios.get('http://localhost:3001/getListings', {
      params: {
        ID: listingID,
        monthID: monthID + direction,
      },
    })
      .then((response) => {
        monthID += direction;
        this.setState({
          listing: response.data.listing, dates: response.data.dates, ready: true, monthID,
        });
      });

    window.addEventListener('scroll', () => {
      const InfoTop = document.getElementById('info').getBoundingClientRect().top;
      const toppp = document.getElementById('info').offsetTop;
      if (window.scrollY > InfoTop * 2) {
        this.setState({ scroll: false });
      } else {
        this.setState({ scroll: true });
      }
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
      listing, dates, ready, monthID, scroll,
    } = this.state;
    return (
      <InfoContainer
        id="info"
      >
        <Div
          scroll={scroll}
        >
          <Info
            listing={listing}
            dates={dates}
            ready={ready}
            monthID={monthID}
            changeMonth={this.changeMonth}
          />

        </Div>
      </InfoContainer>
    );
  }
}
const Img = styled.img`
  width: 100%;
`;
const TopImage = styled.div`
  position: relative;
  display: flex;
  max-width: 100%;
  z-index:0;
`;
const LeftImage = styled.div`
  flex-direction: column;
  position: relative;
  display: flex;
  max-width: 55%;
  z-index:0;
`;
const InfoContainer = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin-top: 30px;
  margin-left: 50px;
  z-index:1;
`;

const Div = styled.div`
  position: ${(props) => (props.scroll ? 'relative' : 'fixed')};
  top: ${(props) => (props.scroll ? '' : '30px')}
`;

export default Reservations;
