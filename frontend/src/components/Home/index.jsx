import React from "react";
import "./index.css";
import heliverse_mock_data from "./heliverse_mock_data.json";
import Card from "../Card";
import Navbar from "../Navbar";
import { FaSearchPlus } from "react-icons/fa";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchName: "",
      searchDomain: "",
      searchGender: "",
      searchAvailability: "",
      teamData: [],
    };
  }

  componentDidMount() {
    this.setState({ data: heliverse_mock_data });
    this.filterData();
  }

  filterData = () => {
    let filtered = heliverse_mock_data.filter((item) =>
      `${item.first_name} ${item.last_name}`
        .toLowerCase()
        .includes(this.state.searchName.toLowerCase())
    );

    if (
      this.state.searchDomain !== "" &&
      this.state.searchDomain !== "select"
    ) {
      filtered = filtered.filter(
        (item) =>
          item.domain.toLowerCase() === this.state.searchDomain.toLowerCase()
      );
    }
    if (
      this.state.searchGender !== "" &&
      this.state.searchGender !== "select"
    ) {
      filtered = filtered.filter(
        (item) =>
          item.gender.toLowerCase() === this.state.searchGender.toLowerCase()
      );
    }

    let ans = this.state.searchAvailability === "Available" ? true : false;
    if (
      this.state.searchAvailability !== "" &&
      this.state.searchAvailability !== "select"
    ) {
      filtered = filtered.filter((item) => item.available === ans);
    }
    this.setState({ data: filtered });
  };

  onChangeSearchByUser = (e) => {
    this.setState({ searchName: e.target.value }, this.filterData);
  };

  onChangeDomain = (e) => {
    this.setState({ searchDomain: e.target.value }, this.filterData);
  };

  onChangeGender = (e) => {
    this.setState({ searchGender: e.target.value }, this.filterData);
  };

  onChangeAvailability = (e) => {
    this.setState({ searchAvailability: e.target.value }, this.filterData);
  };

  render() {
    const { searchName, searchAvailability, searchDomain, searchGender } =
      this.state;
    return (
      <div className="homeContainer">
        <Navbar />
        <div className="operators">
          <div className="searchContainer">
            <input
              type="search"
              placeholder="Search by name"
              value={searchName}
              className="userInput"
              onChange={this.onChangeSearchByUser}
            />
            <button className="searchBtn">
              <FaSearchPlus />
            </button>
          </div>
          <select
            className="selectOperator"
            onChange={this.onChangeDomain}
            value={searchDomain}
          >
            <option value="select">Select Domain</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="IT">IT</option>
            <option value="UI Designing">UI Designing</option>
            <option value="management">Management</option>
            <option value="business Development">Business Development</option>
            <option value="marketing">Marketing</option>
          </select>
          <select
            className="selectOperator"
            onChange={this.onChangeGender}
            value={searchGender}
          >
            <option value="select">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Polygender">Polygender</option>
          </select>
          <select
            className="selectOperator"
            onChange={this.onChangeAvailability}
            value={searchAvailability}
          >
            <option value="select">Select Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        {this.state.data.length > 0 && (
          <ul className="cards">
            {this.state.data.map((item) => (
              <Card key={item.id} details={item} />
            ))}
          </ul>
        )}
        {this.state.data.length === 0 && (
          <div className="notFound">
            <p className="noUsers">No Users Found </p>{" "}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
