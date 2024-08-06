import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalSubscriptionButton = ({ onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "Acf233I1_3rGzDMdAetKihEDbXe0v6NA-IyUPe1GiQuKylL8GBBxKwXYqhrf4Y0t6l5IAa7R-nIwTFe4", "vault": true, "intent": "subscription" }}>
      <div style={{ display: 'inline-block', width: '150px', height: '40px' }}>
        <PayPalButtons
          style={{ shape: 'rect', color: 'gold', layout: 'horizontal', label: 'paypal', height: 40, width: 150 }} // Adjust the height and width
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: 'P-1FS758377D133751TM2ZB2TQ'
            });
          }}
          onApprove={(data, actions) => {
            onSuccess(data);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalSubscriptionButton;
