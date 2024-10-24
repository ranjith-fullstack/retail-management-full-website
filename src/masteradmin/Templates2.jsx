import React from 'react'
import './Templates.css'
 const Templates2 = () => {
    const companyInfo = {
        name: 'Nandhini Restaurent',
        address: 'Karthik Hospital Oppo, Kurnool, 500110',
        phone: '8074435469',
        email: 'nandhu123@gmail.com',
        slipToken: 'SLP-123', // Add slip token number here
        date: new Date().toLocaleDateString(), // Add date here
      };
    
      const invoiceDetails = {
        invoiceNumber: 'INV-17',
        date: new Date().toLocaleDateString(),
      };
    
      const invoiceItems = [
        {
          itemName: 'Dum Biriyani',
          quantity: 1.0,
          rate: 200.0,
          amount: 200.0,
        },
        {
          itemName: 'Sprite',
          quantity: 1.0,
          rate: 50.0,
          amount: 50.0,
        },
        {
          itemName: 'Water Bottle',
          quantity: 1.0,
          rate: 20.0,
          amount: 20.0,
        },
      ];
    
      const subTotal = invoiceItems.reduce((total, item) => total + item.amount, 0);
      const total = subTotal; // Assuming no tax is applied
    
      return (
        <div className="iunique-e-invoice-container">
          <header className="iunique-e-invoice-header">
            <div className="iunique-e-company-info">
              <h1>{companyInfo.name}</h1>
              <p>{companyInfo.address}</p>
              <p>{companyInfo.phone}</p>
              <p>{companyInfo.email}</p>
              <p className='token'>Slip Token: {companyInfo.slipToken}</p> {/* Display slip token number */}
              <p className='date'>Date: {companyInfo.date}</p> {/* Display date */}
            </div>
          </header>
          <main className="iunique-e-invoice-body">
            <table className="iunique-e-invoice-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.rate.toFixed(2)}</td>
                    <td>₹{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Sub Total</td>
                  <td>₹{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3">TOTAL</td>
                  <td>₹{total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </main>
          <footer className="iunique-e-invoice-footer">
            <p>Thanks for your business.</p>
          </footer>
        </div>
  )
}
export default Templates2;