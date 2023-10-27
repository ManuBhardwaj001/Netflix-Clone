import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import Netflix_Avatar from "../image/Netflix_Avatar.png"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlanScreen from "./PlanScreen";

const ProfileScreen = () => {
    const user = useSelector(selectUser);
    return (<div className="profileScreen">
        <Nav />
        <div className="profileScreen__body">
            <h2 className="profileScreen__editProfile">Edit Profile</h2>
            <div className="profileScreen__info">
                <img src={Netflix_Avatar} alt="" />
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                        <h4>Plans</h4>
                        <PlanScreen />
                        <button onClick={() => {
                            auth.signOut();
                        }}
                            className="profileScreen__signout">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default ProfileScreen;
