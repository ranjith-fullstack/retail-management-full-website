import React, { useState, useEffect } from "react";
import "./Chatbot.css";
import axios from "axios";
 
const questions = [
  "1. What type of small retail business are you operating?",
  "2. Which products do you primarily offer in your store?",
  "3. Are you currently utilizing any software or tools to streamline your business operations?",
  "4. What are the main hurdles you encounter while managing your business?",
  "5. What specific functionalities would you prioritize in a retail management software solution for your business?",
  "6. How do you presently handle billing and manage your inventory?",
  "7. What are your expansion plans or goals for your business in the upcoming years?",
  "8. How important is it for you to have training and ongoing support for using the software?",
];
 
const predefinedAnswers = [
  ["Apparel store", "Electronics shop", "Gift shop", "Bookstore", "Cosmetics store", "Home goods store", "Other"],
  ["Clothing", "Electronics gadgets", "Books", "Toys", "Jewelry", "Beauty products", "Kitchenware", "Other"],
  ["Yes", "No"],
  ["Inventory management", "Supplier management", "Customer retention", "Marketing and promotions", "Competition", "Supply chain management", "Other"],
  ["Inventory tracking", "Sales reporting", "CRM (Customer Relationship Management)", "E-commerce integration", "Loyalty program management", "Purchase order management", "Employee scheduling", "Other"],
  ["Manual paper-based billing", "Basic billing software", "Handwritten records", "Excel spreadsheets", "POS system", "Other"],
  ["Expand product offerings", "Open new locations", "Increase online presence", "Improve customer experience", "Streamline operations", "Diversify revenue streams", "Other"],
  ["Very important", "Somewhat important", "Not important"],
];
 
function Chatbot() {
  const [showDialog, setShowDialog] = useState(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(""));
  const [otherInputs, setOtherInputs] = useState(Array(questions.length).fill(""));
  const [contactDetails, setContactDetails] = useState({ name: "", phone: "", email: "" });
  const [showHelpText, setShowHelpText] = useState(true);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    validateContactDetails();
  }, [contactDetails]);
 
  const handleDialogToggle = () => {
    if (showDialog) {
      resetDialog();
      setAnimationPaused(false);
    } else {
      setAnimationPaused(true);
    }
    setShowDialog(!showDialog);
  };
 
  const resetDialog = () => {
    setCurrentStep(0);
    setSelectedAnswers(Array(questions.length).fill(""));
    setOtherInputs(Array(questions.length).fill(""));
    setContactDetails({ name: "", phone: "", email: "" });
    setError("");
  };
 
  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentStep] = answer;
    setSelectedAnswers(newSelectedAnswers);
 
    if (answer !== "Other") {
      const newOtherInputs = [...otherInputs];
      newOtherInputs[currentStep] = "";
      setOtherInputs(newOtherInputs);
    }
  };
 
  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    const newOtherInputs = [...otherInputs];
    newOtherInputs[currentStep] = value;
    setOtherInputs(newOtherInputs);
 
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentStep] = "Other";
    setSelectedAnswers(newSelectedAnswers);
  };
 
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };
 
  const handleSubmit = async () => {
    if (selectedAnswers.includes("") || !isContactDetailsValid()) {
      setError("Please fill all necessary details.");
      return;
    }
 
    const dataToSave = {
      Name: contactDetails.name,
      Phone: contactDetails.phone,
      Email: contactDetails.email,
      Question1: selectedAnswers[0] === "Other" ? otherInputs[0] : selectedAnswers[0],
      Question2: selectedAnswers[1] === "Other" ? otherInputs[1] : selectedAnswers[1],
      Question3: selectedAnswers[2] === "Other" ? otherInputs[2] : selectedAnswers[2],
      Question4: selectedAnswers[3] === "Other" ? otherInputs[3] : selectedAnswers[3],
      Question5: selectedAnswers[4] === "Other" ? otherInputs[4] : selectedAnswers[4],
      Question6: selectedAnswers[5] === "Other" ? otherInputs[5] : selectedAnswers[5],
      Question7: selectedAnswers[6] === "Other" ? otherInputs[6] : selectedAnswers[6],
      Question8: selectedAnswers[7] === "Other" ? otherInputs[7] : selectedAnswers[7],
    };
 
    try {
      const response = await axios.post('http://localhost:3005/api/Chatbot', dataToSave);
      resetDialog();
      setShowDialog(false);
      setShowThankYouPopup(true);
      setTimeout(() => setShowThankYouPopup(false), 3000);
    } catch (error) {
      console.error("There was an error saving the data!", error);
    }
  };
 
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setError("");
  };
 
  const handleHelpTextClose = () => {
    setShowHelpText(false);
  };
 
  const validatePhoneNumber = (phoneNumber) => {
    return /^[1-9][0-9]{9}$/.test(phoneNumber);
  };
 
  const isContactDetailsValid = () => {
    const { name, phone } = contactDetails;
    return name.trim() !== "" && validatePhoneNumber(phone);
  };
 
  const validateContactDetails = () => {
    setIsSubmitDisabled(!isContactDetailsValid());
  };
 
  return (
    <div className={`chatbot-chatbot-container ${animationPaused ? 'animationPaused' : ''}`}>
      {showHelpText && (
        <div className="chatbot-chatbot-help-text">
          Hi, I'm here to help you
          <button className="chatbot-close-help-button" onClick={handleHelpTextClose}>✖</button>
        </div>
      )}
      <div className="chatbot-chatbot-content">
        <button className="chatbot-chatbot-button" onClick={handleDialogToggle}>?</button>
        {showDialog && (
          <div className="chatbot-dialog">
            <div className="chatbot-dialog-header">
              <h2>Quick Dost</h2>
              <button className="chatbot-close-button" onClick={handleDialogToggle}>✖</button>
            </div>
            <div className="chatbot-dialog-body">
              {error && <p className="error-message">{error}</p>}
              {currentStep < questions.length ? (
                <div className="chatbot-question">
                  <p>{questions[currentStep]}</p>
                  <div className="chatbot-answers">
                    {predefinedAnswers[currentStep].map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(answer)}
                        className={selectedAnswers[currentStep] === answer ? "chatbot-selected" : ""}
                      >
                        {answer}
                      </button>
                    ))}
                    {predefinedAnswers[currentStep].includes("Other") &&
                      selectedAnswers[currentStep] === "Other" && (
                        <input
                          type="text"
                          value={otherInputs[currentStep]}
                          onChange={handleOtherInputChange}
                          placeholder="Please specify"
                        />
                      )}
                  </div>
                </div>
              ) : (
                <div className="chatbot-contact-details">
                  <h3>Contact Details</h3>
                  <input
                    type="text"
                    name="name"
                    value={contactDetails.name}
                    onChange={handleContactInputChange}
                    placeholder="Name"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    value={contactDetails.phone}
                    onChange={handleContactInputChange}
                    placeholder="Phone"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={contactDetails.email}
                    onChange={handleContactInputChange}
                    placeholder="Email (optional)"
                    required
                  />
                </div>
              )}
            </div>
            <div className="chatbot-dialog-footer">
              {currentStep > 0 && (
                <button className="chatbot-nav-button" onClick={handlePrevious}>Previous</button>
              )}
              {currentStep < questions.length ? (
                <button className="chatbot-nav-button" onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
              ) : (
                currentStep === questions.length && (
                  <button
                    className="chatbot-nav-button"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                  >
                    Submit
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
      {showThankYouPopup && (
        <div className="thank-you-popup">
          Thank you. We will get back to you soon.
        </div>
      )}
    </div>
  );
}
 
export default Chatbot;
 