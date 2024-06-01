import React, { useEffect, useState } from 'react';
import {
    HStack,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Spacer,
    ButtonGroup,
    IconButton
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { getOrders } from '../api/ordersData';
import SaleOrderForm from './SaleOrderForm';

const OrderTabs = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchedOrders = getOrders();
        if (Array.isArray(fetchedOrders)) {
            setOrders(fetchedOrders);
        } else {
            console.error('Fetched orders is not an array:', fetchedOrders);
            setOrders([]);
        }
    }, []);

    // Log orders for debugging
    console.log('Orders:', orders);
    console.log('Type of orders:', typeof orders);

    // Filtered orders based on the selected filter
    const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'active') {
            return order.status === 'active';
        } else if (filter === 'completed') {
            return order.status === 'completed';
        } else {
            return true;
        }
    }) : [];

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleNewSaleOrder = () => {
        toggleModal(); // Open modal when "New Sale Order" button is clicked
    };

    return (
        <TableContainer mx={4}>
            <HStack spacing={4} mb={4}>
                <Button colorScheme="green" onClick={() => setFilter('active')} isActive={filter === 'active'}>
                    Active Orders
                </Button>
                <Button colorScheme="green" onClick={() => setFilter('completed')} isActive={filter === 'completed'}>
                    Completed Orders
                </Button>
                <Spacer />
                <ButtonGroup size='sm' isAttached variant='outline' colorScheme="green">
                    <IconButton aria-label='Add Sale Order' icon={<AddIcon />} onClick={handleNewSaleOrder} />
                    <Button onClick={handleNewSaleOrder}>Sale Order</Button>
                </ButtonGroup>
            </HStack>

            <TableContainer borderWidth='1px' mx={8} my={4}>
                <Table variant='simple'>
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

                        <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td>
                                <Button size='xs' mx={1}>Edit/View</Button>
                            </Td>
                        </Tr>

                    </Tbody>
                </Table>
            </TableContainer>

            <SaleOrderForm isOpen={isModalOpen} onClose={toggleModal} />
        </TableContainer>
    );
};

export default OrderTabs;
