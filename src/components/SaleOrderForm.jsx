import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  Checkbox,
  VStack,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, updateOrder } from "../redux/slices/ordersSlice";
import SelectedProductsInput from "./SelectedProductsInput.jsx"; // Import the new component

const SaleOrderForm = ({ isOpen, onClose, existingOrder }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  const products = useSelector((state) => state.products.products);
  const [selectedCustomer, setSelectedCustomer] = useState(
    existingOrder ? existingOrder.customer_id : ""
  );
  const [selectedProducts, setSelectedProducts] = useState(
    existingOrder ? existingOrder.items.map((item) => item.sku_id) : []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (existingOrder) {
      setValue("invoice_number", existingOrder.invoice_no);
      setValue("invoice_date", existingOrder.invoice_date);
      setValue("paid", existingOrder.paid);
      setValue("customer_id", existingOrder.customer_id);
      setValue("products", existingOrder.items);
    }
  }, [existingOrder, setValue]);

  const onSubmit = (data) => {
    if (existingOrder) {
      dispatch(updateOrder({ ...data, items: selectedProducts }));
    } else {
      dispatch(addOrder({ ...data, items: selectedProducts }));
    }
    onClose();
  };
  console.log(products);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {existingOrder ? "Edit Sale Order" : "Create Sale Order"}
        </ModalHeader>
        <ModalBody>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={4}
            width="100%"
          >
            <FormControl isInvalid={errors.invoice_number}>
              <FormLabel>Invoice Number</FormLabel>
              <Input
                placeholder="Invoice Number"
                {...register("invoice_number", {
                  required: "Invoice number is required",
                })}
              />
            </FormControl>
            <FormControl isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <Input
                type="date"
                placeholder="Invoice Date"
                {...register("invoice_date", {
                  required: "Invoice date is required",
                })}
              />
            </FormControl>
            <FormControl isInvalid={errors.customer_id}>
              <FormLabel>Customer</FormLabel>
              <Select
                placeholder="Select Customer"
                {...register("customer_id", {
                  required: "Customer is required",
                })}
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                {customers.map((customer) => (
                  <option
                    key={customer.id}
                    value={customer.customer_profile.id}
                  >
                    {customer.customer_profile.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isInvalid={errors.products}>
              <FormLabel>Products</FormLabel>
              <SelectedProductsInput
                products={products}
                selectedProducts={selectedProducts}
                onChange={setSelectedProducts}
              />
            </FormControl>
            <HStack spacing={4} justifyContent="flex-end">
              <Button colorScheme="green" size="xs">
                Total Price: {totalPrice}
              </Button>
              <Button colorScheme="green" size="xs">
                Total Items: {totalItems}
              </Button>
            </HStack>
            <FormControl>
              <Checkbox {...register("paid")}>Paid</Checkbox>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={4} width="100%">
            <Button size="md" colorScheme="red" onClick={onClose} flex="1">
              Discard
            </Button>
            <Button size="md" colorScheme="green" type="submit" flex="1">
              {existingOrder ? "Update Sale Order" : "Create Sale Order"}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
