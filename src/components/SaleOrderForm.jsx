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
  FormControl,
  FormLabel,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, updateOrder } from "../redux/slices/ordersSlice";
import SelectedProductsInput from "./SelectedProductsInput.jsx";

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
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (existingOrder) {
      setValue("invoice_number", existingOrder.invoice_no || "");
      setValue("invoice_date", existingOrder.invoice_date || "");
      setValue("paid", existingOrder.paid || false);
      setSelectedCustomer(existingOrder.customer_id || "");
      setSelectedProducts(
        existingOrder.items
          ? existingOrder.items.map((item) => item.sku_id)
          : []
      );
    } else {
      setValue("invoice_number", "");
      setValue("invoice_date", "");
      setValue("paid", false);
      setSelectedCustomer("");
      setSelectedProducts([]);
    }
  }, [existingOrder, setValue]);

  const updateLocalOrders = (data) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = existingOrder
      ? orders.map((order) =>
          order.invoice_no === existingOrder.invoice_no
            ? { ...order, ...data }
            : order
        )
      : [...orders, data];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const onSubmit = (data) => {
    console.log("submit");
    const orderData = {
      ...data,
      customer_id: selectedCustomer,
      items: selectedProducts,
    };
    if (existingOrder) {
      dispatch(updateOrder({ ...orderData, id: existingOrder.id }));
    } else {
      dispatch(addOrder(orderData));
    }
    updateLocalOrders(orderData);
    console.log("data", data);
    console.log("orderData", orderData);
    onClose();
  };
  console.log(selectedProducts, "selectedProducts");
  // const onSubmit = (data) => {
  //   const items = selectedProducts
  //     .map((productId) => {
  //       const product = products.find((p) => p.id === productId);
  //       return product.sku.map((sku) => {
  //         const skuData = productData[productId]?.sku?.[sku.id];
  //         return {
  //           sku_id: sku.id,
  //           price: sku.selling_price,
  //           quantity: skuData ? skuData.totalItems : 0,
  //         };
  //       });
  //     })
  //     .flat();

  //   const orderData = {
  //     ...data,
  //     customer_id: parseInt(selectedCustomer), // ensure customer_id is a number
  //     items,
  //   };

  //   if (existingOrder) {
  //     dispatch(updateOrder({ ...orderData, id: existingOrder.id }));
  //   } else {
  //     dispatch(addOrder(orderData));
  //   }
  //   updateLocalOrders(orderData);
  //   onClose();
  // };

  const updateTotals = (items, price) => {
    setTotalItems(items);
    setTotalPrice(price);
  };
  const handleSelectedItems = (selectedItems) => {
    console.log("Selected items:", selectedItems);
  };

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
                updateTotals={updateTotals}
                onSelectedItemsChange={handleSelectedItems}
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
            <Button
              size="md"
              colorScheme="green"
              type="submit"
              flex="1"
              onClick={handleSubmit(onSubmit)}
            >
              {existingOrder ? "Update Sale Order" : "Create Sale Order"}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
