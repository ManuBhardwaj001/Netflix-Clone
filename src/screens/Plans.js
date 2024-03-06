// Import necessary libraries and modules
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./Plans.css";
// import ProfileScreen from "./ProfileScreen";

// PlanScreen component definition
function Plans({ subscription }) {
  // State variables
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  // Fetch active products with their prices
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  // Function to initiate the checkout process
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(stripePublicKey);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  // Render the PlanScreen component
  return (
    <div className="PlanScreen">
      {/* <ProfileScreen subscription={subscription} /> */}
      {/* {subscription && (
                <p>Member since {new Date(subscription?.current_period_start * 1000).toLocaleDateString()}</p>
            )}
            {subscription && (
                <p>Your next billing date is {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
            )} */}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={` ${
              isCurrentPackage ? "planScreen__plan--disabled" : ""
            } planScreen__plan`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;