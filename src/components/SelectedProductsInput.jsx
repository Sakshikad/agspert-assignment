import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Box,
  Text,
  Input,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const SelectedProductsInput = ({ products, selectedProducts, onChange }) => {
  const { control, setValue, watch } = useForm();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    selectedProducts.forEach((productId, index) => {
      const product = products.find((p) => p.id === productId);
      const sku = product.sku[0];

      setValue(`products[${index}].sellingPrice`, sku.selling_price);
      setValue(
        `products[${index}].totalItems`,
        productData[productId]?.totalItems || ""
      );
      setValue(
        `products[${index}].netSkuPrice`,
        productData[productId]?.netSkuPrice || 0
      );
    });
  }, [selectedProducts, setValue, products, productData]);

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((id) => id !== productId);
    onChange(updatedProducts);
    const newProductData = { ...productData };
    delete newProductData[productId];
    setProductData(newProductData);
  };

  const handleTotalItemsChange = (index, productId, value) => {
    const totalItems = value ? parseInt(value) : 0;
    const product = products.find((p) => p.id === productId);
    const sku = product.sku[0];
    const netSkuPrice = totalItems * sku.selling_price;

    setValue(`products[${index}].totalItems`, value);
    setValue(`products[${index}].netSkuPrice`, netSkuPrice);

    setProductData((prevData) => ({
      ...prevData,
      [productId]: {
        totalItems,
        netSkuPrice,
      },
    }));
  };

  const productOptions = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const selectedProductOptions = selectedProducts.map((productId) => {
    const product = products.find((p) => p.id === productId);
    return {
      label: product.name,
      value: product.id,
    };
  });

  return (
    <VStack spacing={2} width="100%">
      <Select
        placeholder="Search Products"
        value={selectedProductOptions}
        options={productOptions}
        onChange={(selectedOptions) => {
          const updatedSelectedProducts = selectedOptions.map(
            (option) => option.value
          );
          onChange(updatedSelectedProducts);
        }}
        isMulti
        closeMenuOnSelect={false}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
          }),
        }}
      />
      <Accordion allowToggle width="100%">
        {selectedProducts.map((productId, index) => {
          const product = products.find((p) => p.id === productId);
          const sku = product.sku[0];

          return (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {product.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControl width="45%">
                    <FormLabel>Selling Price</FormLabel>
                    <Input value={sku.selling_price} isReadOnly />
                  </FormControl>
                  <FormControl width="45%">
                    <FormLabel>Total Items</FormLabel>
                    <Controller
                      name={`products[${index}].totalItems`}
                      control={control}
                      rules={{ required: "Total items are required" }}
                      render={({ field }) => (
                        <Input
                          placeholder="Total Items"
                          type="number"
                          {...field}
                          value={watch(`products[${index}].totalItems`)}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTotalItemsChange(
                              index,
                              productId,
                              e.target.value
                            );
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
                <Box
                  mt={4}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="gray.50"
                  width="200px"
                  height="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Text fontSize="sm" fontWeight="bold">
                    Net SKU Price
                  </Text>
                  <Controller
                    name={`products[${index}].netSkuPrice`}
                    control={control}
                    render={({ field }) => (
                      <Text {...field} ml={2} color="gray.700">
                        Rs. {watch(`products[${index}].netSkuPrice`) || 0}
                      </Text>
                    )}
                  />
                </Box>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </VStack>
  );
};

export default SelectedProductsInput;
