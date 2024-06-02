// src/api/productsData.js
const productsData = [
  {
    id: 210,
    display_id: 8,
    owner: 1079,
    name: "Product1",
    category: "The god of War",
    characteristics: "New Product Characteristics",
    features: "",
    brand: "New Product Brand",
    sku: [
      {
        id: 240,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 32,
        product: 210,
      },
      {
        id: 210,
        selling_price: 64,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 10,
        product: 210,
      },

      // Add the other SKU entries here
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
  {
    id: 208,
    display_id: 9,
    owner: 1080,
    name: "Product2",
    category: "The god of War",
    characteristics: "New Product Characteristics",
    features: "",
    brand: "New Product Brand",
    sku: [
      {
        id: 248,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 20,
        product: 209,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
];

export default productsData;
