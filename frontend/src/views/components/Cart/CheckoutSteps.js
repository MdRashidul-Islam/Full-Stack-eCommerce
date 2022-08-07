import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import React, { Fragment } from "react";
import "./CheckoutSteps.scss";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <h4>Shipping Details</h4>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <h4>Confirm Order</h4>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <h4>Payment</h4>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper
        className="checkoutSteps"
        alternativeLabel
        activeStep={activeStep}
        style={stepStyles}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#F75606" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
