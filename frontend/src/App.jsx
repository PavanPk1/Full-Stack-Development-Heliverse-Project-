import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Team from "./components/Team";
import Context from "./context/team";
import { Component } from "react";

class App extends Component {
  state = {
    teamList: [],
  };

  addMember = (member) => {
    const { teamList } = this.state;
    if (member.available === false) {
      alert("Member is unavailable to add to the team. Please check availability.");
      return;
    }

    const isUniqueDomain = !teamList.some(
      (existingMember) => existingMember.domain === member.domain
    );

    if (isUniqueDomain) {
      this.setState((prevState) => ({
        teamList: [...prevState.teamList, member],
      }));
    } else {
      alert("Domain already exists in the team. Please add a member from a different domain.");
    }
  };

  render() {
    const { teamList } = this.state;
    // console.log(teamList);
    return (
      <Context.Provider value={{ teamList, addMember: this.addMember }}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/team" exact element={<Team />} />
          </Routes>
        </Router>
      </Context.Provider>
    );
  }
}

export default App;
