import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./PlanScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                const subscriptionsData = querySnapshot.docs.map(subscriptionDoc => ({
                    role: subscriptionDoc.data().role,
                    current_period_end: subscriptionDoc.data().current_period_end.seconds,
                    current_period_start: subscriptionDoc.data().current_period_start.seconds,
                }));

                setSubscriptions(subscriptionsData);
            });
    }, [user.uid]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await db.collection('products').where('active', '==', true).get();

                const productsData = await Promise.all(querySnapshot.docs.map(async (productDoc) => {
                    const product = { id: productDoc.id, ...productDoc.data() };

                    const priceSnap = await productDoc.ref.collection("prices").get();
                    const prices = priceSnap.docs.map(price => ({
                        priceId: price.id,
                        priceData: price.data(),
                    }));

                    product.prices = prices;

                    return product;
                }));

                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // console.log(products);
    console.log(subscriptions);

    const loadCheckout = async (priceId, productName) => {
        try {
            // Check if the product has an active subscription
            const isSubscribed = subscriptions.some(subscription => subscription.role === productName);
            
            if (isSubscribed) {
                alert("You are already subscribed to this plan.");
                return;
            }

            const docRef = await db.collection('customers')
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
                    const stripe = await loadStripe("pk_test_51O3NXFSDsWDrSNdMwWwrGtIzKOcX6ek8i5c5XjsWXo7Yk34wHGRIllQ1hkPzcpqAEcOSLMAMeLRTkBbL95VfonZL00D3rPxyiI");
                    stripe.redirectToCheckout({ sessionId });
                }
            });
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <div className="PlanScreen">
            {products.map(productData => (
                <div key={productData.id} className="planScreen__plan">
                    <div className="plansScreen__info">
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>
                    {productData.prices.map(priceData => (
                        <div key={priceData.priceId} className="subscription-info">
                            <button
                                onClick={() => loadCheckout(priceData.priceId, productData.name)}
                                disabled={subscriptions.some(subscription => subscription.role === productData.name)}
                            >
                                {subscriptions.some(subscription => subscription.role === productData.name)
                                    ? "Subscribed"
                                    : "Subscribe"
                                }
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default PlanScreen;





// pk_test_51O3NXFSDsWDrSNdMwWwrGtIzKOcX6ek8i5c5XjsWXo7Yk34wHGRIllQ1hkPzcpqAEcOSLMAMeLRTkBbL95VfonZL00D3rPxyiI