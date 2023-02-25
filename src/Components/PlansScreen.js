import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../CSS/PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Oval } from "react-loader-spinner";

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const [loaderId, setLoaderId] = useState("loaderStop");

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

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
          setProducts(products);
        });
      });
  }, []);

  const loadCheckout = async (priceId) => {
    setLoaderId("loaderStart");
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
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_JANHjtnIPcmRkXIwzENE4CJC00DaMpexQn"
        );

        stripe.redirectToCheckout({ sessionId });
        setLoaderId("loaderStop");
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        //add some logic to check if the user's subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen__plan__disabled"
            } plansScreen__plan`}
          >
            <div className="planScreen__info">
              <h5> {productData.name} </h5>
              <h6> {productData.description} </h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
            <div id={loaderId}>
              <div className="ovalLoader">
                <Oval
                  height={100}
                  width={100}
                  color="#e50914"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#e50914"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
                <br />
                <h2>Loading..</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
