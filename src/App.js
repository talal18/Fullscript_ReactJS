import React from "react";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import { Carousel } from "react-bootstrap";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      imgs: []
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = "jaguar") => {
    const API_KEY = process.env.REACT_APP_UNSPLASH_KEY;
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=${API_KEY}`
      )
      .then(data => {
        this.setState({ imgs: data.data.results });
      })
      .catch(err => {
        console.log("Fetching error", err);
      });
  };

  render() {
    const searchResults = this.state.imgs;

    return (
      <div>
        <div className="titleSearchContainer">
          <p className="title">Unspalsh Carousel</p>
          <SearchForm onSearch={this.performSearch} />
        </div>
        <div>
          <Carousel className="carouselMain">
            {searchResults.map(image => {
              return (
                <Carousel.Item key={image.id} className="carouselItem">
                  <img
                    src={image.urls.full}
                    className="d-block"
                    alt={image.id}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}
