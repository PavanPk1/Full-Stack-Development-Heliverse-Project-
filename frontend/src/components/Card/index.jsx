import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { FaCircleCheck } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import Context from "../../context/team";

class Card extends React.Component {
  state = {
    addUser: false,
  };

  addUserHandler = (addMember, details, teamList) => {
    const isDomainAdded = teamList.some(
      (existingMember) => existingMember.domain === details.domain
    );
    if (details.available && !isDomainAdded) {
      this.setState((prevState) => ({ addUser: !prevState.addUser }));
    }
    addMember(details);
  };

  render() {
    const { details } = this.props;
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      available,
      domain,
    } = details;
    const availability = available ? (
      <FaCircleCheck className="green" />
    ) : (
      <FaTimesCircle className="red" />
    );
    return (
      <Context.Consumer>
        {({ addMember, teamList }) => (
          <li className="card" key={id}>
            <div className="userDetails">
              <img src={avatar} alt={first_name} className="avatar" />
              <div className="name_email">
                <h2 className="name">
                  {first_name} {last_name}
                </h2>
                <p className="email">{email}</p>
              </div>
              <button
                type="button"
                className={this.state.addUser ? "addBtn added" : "addBtn"}
                onClick={() =>
                  this.addUserHandler(addMember, details, teamList)
                }
                id={id}
              >
                <IoIosPeople size={25} />
              </button>
            </div>
            <div className="details">
              <p className="subtitle">{gender}</p>
              <p className="subtitle">{domain}</p>
              <p className="subtitle">{availability}</p>
            </div>
          </li>
        )}
      </Context.Consumer>
    );
  }
}

Card.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    domain: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
