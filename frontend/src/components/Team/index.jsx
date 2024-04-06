import Navbar from "../Navbar";
import "./index.css";
import Context from "../../context/team";
import Card from "../Card";

const Team = () => (
  <Context.Consumer>
    {(value) => {
      const {teamList} = value;
      console.log(teamList);
      return (
        <div className="team">
          <Navbar />
          <div className="teamContainer">
            <h1>Team</h1>
            <ul className="oneteam">
              {teamList.map((item) => (
                <Card details={item} key ={item.id} />
              ))}
            </ul>
          </div>
        </div>
      );
    }}
  </Context.Consumer>
);
export default Team;
