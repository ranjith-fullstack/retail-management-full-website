import React from 'react'
import './Templates.css'

const Templates3 = () => {
  return (
    <div>
        <div className="invoice-container">
    <div className="invoice-header">
      <div className="Settingcompany-name">Sweety Sweet House</div>
      <div className="invoice-number">INVOICE</div>
    </div>
    <div className="Settinginvoice-number-check">
      <div className="invoice-info">
        INVOICE:1234567890
      </div>
      <div className="invoice-date">
        DATE 2-5-2017
      </div>
    </div>
    <div className="mailing-info">
      <div className="mailing-info-header">MAILING <br></br>INFO</div>
      <div class="Settingvertical-line"></div>
      <div className="street-address">Jaya Bheri Park</div>
      <div className="city-state-zip">Hyderabad, Kompally</div>
      <div className="phone-fax">
        Phone: 8074435469
      </div>
    </div>
    <div className="bill-to">
      <div className="bill-to-header">BILL TO</div>
      <div className="vertical-line"></div>
      <div className="name">Name: Ajai Reddy</div>
      <div className="customer-id">Customer ID: 1</div>
      <div className="bill-to-address">
        Srikantam Circle <br />
        Anantapur, 515405
      </div>
      <div className="phone-number">Phone: 0987654321</div>
    </div>
    <div className="invoice-details">
      <div className="description heading">Description</div>
      <div className="amount heading">Amount</div>
      <div className="underline"></div>
      <div className="description1">Laddu</div>
      <div className="amount1">$9512</div>
      <div className="description2">Jilebi</div>
      <div className="amount2">$28500</div>
    </div>
    <div className="amount-details">
      <div className="amount-subtotal">
        <span className="Settingamount-label">SUBTOTAL</span>
        <span className="amount-value">$ 380,12</span>
      </div>
      <div className="tax-rate">
        <span className="tax-rate-label">TAX RATE</span>
        <span className="tax-rate-value">0,000%</span>
      </div>
      <div className="tax-amount">
        <span className="tax-amount-label">TAX</span>
        <span className="tax-amount-value">$ 0,00</span>
      </div>
      <div className="shipping-handling">
        <span className="shipping-handling-label">S&H</span>
        <span className="shipping-handling-value">$ 0,00</span>
      </div>
      <div className="discount">
        <span className="discount-label">DISCOUNT</span>
        <span className="discount-value">$ (50,00)</span>
      </div>
      <div className="total">
        <span className="total-label">TOTAL</span>
        <span className="total-value">$ 330,12</span>
      </div>
    </div>
    <div className="payment-details">
      <div className="payable-to">
        OTHER COMMENTS:
        <div className="underline"></div>
      </div>
      <div className="payable-to">
        Make all checks payable to: <br></br>Sweety Sweet House
      </div>
    </div>
    <div className="other-comments">
      <ol>
        <li>Total payment due in 30 days</li>
        <li>Please include the invoice number on your check</li>
      </ol>
    </div>
    <div className="footer">
      <p className="footer-text">Thank You For Your Business!</p>
    </div>
  </div>
    </div>
  )
}
export default Templates3;