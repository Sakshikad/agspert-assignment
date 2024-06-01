// src/api/ordersData.js
const ordersData = [
    {
      "customer_id": 11908,
      "items": [
        {
          "sku_id": 220,
          "price": 12,
          "quantity": 12
        }
      ],
      "paid": false,
      "invoice_no": "Invoice - 1212121",
      "invoice_date": "7/5/2024"
    },
    {
      "customer_id": 11908,
      "items": [
        {
          "sku_id": 220,
          "price": 12,
          "quantity": 12
        }
      ],
      "paid": true,
      "invoice_no": "Invoice - 1212121",
      "invoice_date": "7/5/2024"
    },
    // Add the other order data entries here
  ];
  
  export const getOrders = async () => {
    const orders = JSON.parse(localStorage.getItem('orders'));
    return Array.isArray(orders) ? orders : [
      {
        invoice_no: 'INV001',
        customer_id: 11908,
        items: [
          { sku_id: 220, price: 12, quantity: 12 }
        ],
        status: 'unpaid'
      },
      {
        invoice_no: 'INV002',
        customer_id: 11909,
        items: [
          { sku_id: 220, price: 12, quantity: 12 }
        ],
        status: 'paid'
      },
      // more orders can be added here
    ];
  };
  