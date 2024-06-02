import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { getOrders } from "../api/ordersData";
import SaleOrderForm from "./SaleOrderForm";

const fetchActiveOrders = async () => {
  const orders = await getOrders();
  return orders.filter((order) => order.status === "unpaid");
};

const ActiveOrders = () => {
  const { data, error, isLoading } = useQuery(
    "activeOrders",
    fetchActiveOrders
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSaleOrderFormOpen, setIsSaleOrderFormOpen] = useState(false);

  const openSaleOrderForm = (order) => {
    setSelectedOrder(order);
    setIsSaleOrderFormOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading active orders</div>;

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.price}</Td>
              <Td>{order.last_modified}</Td>
              <Td>
                <Button
                  size="xs"
                  mx={1}
                  onClick={() => openSaleOrderForm(order)}
                >
                  Create Sale Order
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isSaleOrderFormOpen && (
        <SaleOrderForm
          isOpen={isSaleOrderFormOpen}
          onClose={() => setIsSaleOrderFormOpen(false)}
          existingOrder={selectedOrder}
        />
      )}
    </div>
  );
};

export default ActiveOrders;
