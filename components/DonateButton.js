import React, { useEffect, useRef } from "react";
import { getHost, windowExists } from "../lib/utils";

const DonateButton = () => {
  const buttonRef = useRef(null);
  useEffect(() => {
    if (windowExists) {
      const button = window.PayPal.Donation.Button({
        env: "production",
        hosted_button_id: "8SWHCCK77W33Y",
        image: {
          src: `${getHost()}/donate_button.png`,
          alt: "Donate with PayPal button",
          title: "PayPal - The safer, easier way to pay online!",
        },
      });
      button.render(`#donate-button`);
    }
  }, []);
  return (
    <div className="paypal-container" ref={buttonRef} id={"donate-button"} />
  );
};

export default DonateButton;
