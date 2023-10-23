import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./PlanScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const PlanScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

    const loadCheckout = async (priceId) => {
        // Get a reference to the "checkout_sessions" collection
        debugger
        const checkoutSessionsRef = db.collection("checkout_sessions");

        // Create a new checkout session document
        const docRef = await checkoutSessionsRef.add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                // Show an error to the customer
                // Inspect your cloud function logs in Firebase Console
                alert(`An error occurred: ${error.message}`);
            }
            if (sessionId) {
                // We have a session, let's redirect to checkout
                // Initialize Stripe
                const stripe = await loadStripe(stripePublicKey);
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                const productsData = {};
                querySnapshot.forEach(async (productDoc) => {
                    productsData[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach((price) => {
                        productsData[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });
                setProducts(productsData);
            });
    }, []);

    console.log(products);
    return (
        <div className="planScreen">
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div className="planScreen__plan">
                        <div className="planScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>
                            Subscribe
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default PlanScreen;
