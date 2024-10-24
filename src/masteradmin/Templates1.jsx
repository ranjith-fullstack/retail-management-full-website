import React from "react";
import "./Templates.css";
 const Templates1 = () => {
  return (
    <div>
      <div className="invoice">
        <header>
          <h1>INVOICE</h1>
          <p>GSTIN: 12ABCDE1234F1Z5</p>
        </header>
        <div className="credit-note">
          <p>CREDIT NOTE</p>
          <p>Credit Note#: CN-17 Date: 25 Mar 2024</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Brochure Design</td>
              <td>1.00</td>
              <td>300.00</td>
              <td>300.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Web Design</td>
              <td>1.00</td>
              <td>250.00</td>
              <td>250.00</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Print Ad - Basic <br /> Color Nos
              </td>
              <td>1.00</td>
              <td>80.00</td>
              <td>80.00</td>
            </tr>
            <tr>
              <td colSpan="4" className="text-right">
                Sub Total
              </td>
              <td>630.00</td>
            </tr>
            <tr>
              <td colSpan="4" className="text-right">
                Total
              </td>
              <td>RS.662.75</td>
            </tr>
          </tbody>
        </table>
        <footer>
          <div className="contact-details">
            <p>
              Manu IT Solutions <br />
              Old Alwal, Suchitra Circle <br />
              Hyderabad, Telangana 500010 <br />
              India <br />
              +91 9380488282 <br />
              vivekavinash17@gmail.com
            </p>
          </div>
          <div className="footer-text">
            <p>Thank you for your business!</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Templates1;