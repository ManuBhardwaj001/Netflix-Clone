import React, { useEffect, useState } from "react";
import "./Account.css";
import Nav from "../Nav";
import Netflix_Avatar from "../image/Netflix_Avatar.png";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Plans from "./Plans";
import db from "../firebase";
import moment from "moment";

const Account = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState();
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscript) => {
          setSubscription({
            role: subscript.data().role,
            current_period_end: subscript.data().current_period_end.seconds,
            current_period_start: subscript.data().current_period_start.seconds,
          });
          setStartDate(
            moment(subscription?.current_period_start * 1000).format(
              "MMMM YYYY"
            )
          );
          setEndDate(
            moment(subscription?.current_period_end * 1000).format(
              "DD MMMM YYYY"
            )
          );
        });
      });
  }, []);
  return (
    <div className="Account__main">
      <Nav isAccountScreen={true} />
      <div className="accounts__header"></div>
      <div className="bd__wrapper">
        <div className="bd__container">
          <div className="bd__left__col">
            <div className="left__col__nav">
              <ul>
                <li>
                  <button>Back to Netflix</button>
                </li>
                <li>
                  <button>Overview</button>
                </li>
                <li>
                  <button>Membership</button>
                </li>
                <li>
                  <button>Security</button>
                </li>
                <li>
                  <button>Devices</button>
                </li>
                <li>
                  <button>Profiles</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="bd__right__col"></div>

          <p>Member Since {startDate}</p>
          {/* <p>Next payment {endDate}</p> */}
          <div className="profileScreen__info">
            {/* <img src={Netflix_Avatar} alt="" /> */}
            <div className="profileScreen__details">
              {/* <h2>{user.email}</h2> */}
              <div className="profileScreen__plans">
                {/* <h4>Plans</h4> */}
                {/* <PlanScreen /> */}
                {/* <button onClick={() => {
                                auth.signOut();
                            }}
                                className="profileScreen__signout">Sign Out</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
