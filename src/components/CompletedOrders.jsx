import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { getOrders } from '../api/ordersData';

const fetchCompletedOrders = async () => {
  const orders = await getOrders();
  return orders.filter(order => order.status === 'paid');
};

const CompletedOrders = () => {
  const { data, error, isLoading } = useQuery('completedOrders', fetchCompletedOrders);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading completed orders</div>;

  return (
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

        <Tr >
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td>
            <Button size='xs' mx={1}>View</Button>
          </Td>
        </Tr>
        
      </Tbody>
    </Table>
  );
};

export default CompletedOrders;
