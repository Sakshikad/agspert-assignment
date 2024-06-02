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

const SelectedProductsInput = ({
  products,
  selectedProducts,
  onChange,
  updateTotals,
}) => {
  const { control, setValue, watch } = useForm();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    updateTotals(calculateTotalItems(), calculateTotalPrice());
  }, [selectedProducts, productData, updateTotals]);

  const calculateTotalItems = () => {
    let totalItems = 0;
    selectedProducts.forEach((productId) => {
      const product = products.find((p) => p.id === productId);
      product.sku.forEach((sku) => {
        const skuData = productData[productId]?.sku?.[sku.id];
        if (skuData) {
          totalItems += skuData.totalItems || 0;
        }
      });
    });
    return totalItems;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((productId) => {
      const product = products.find((p) => p.id === productId);
      product.sku.forEach((sku) => {
        const skuData = productData[productId]?.sku?.[sku.id];
        if (skuData) {
          totalPrice += skuData.netSkuPrice || 0;
        }
      });
    });
    return totalPrice;
  };

  // const handleRemoveProduct = (productId) => {
  //   const updatedProducts = selectedProducts.filter((id) => id !== productId);
  //   onChange(updatedProducts);
  //   const newProductData = { ...productData };
  //   delete newProductData[productId];
  //   setProductData(newProductData);
  // };

  // const handleRemoveProduct = (productId) => {
  //   const updatedProducts = selectedProducts.filter((id) => id !== productId);
  //   onChange(updatedProducts);
  //   const newProductData = { ...productData };
  //   delete newProductData[productId];
  //   setProductData(newProductData);

  //   // Reset totalItems and netSkuPrice to 0 for each SKU of the removed product
  //   const resetProductData = { ...productData };
  //   selectedProducts.forEach((selectedProductId) => {
  //     if (selectedProductId === productId) {
  //       productData[selectedProductId].sku.forEach((skuId) => {
  //         resetProductData[selectedProductId].sku[skuId] = {
  //           totalItems: 0,
  //           netSkuPrice: 0,
  //         };
  //       });
  //     }
  //   });
  //   setProductData(resetProductData);
  // };
  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((id) => id !== productId);
    onChange(updatedProducts);
    const newProductData = { ...productData };
    delete newProductData[productId];
    setProductData(newProductData);

    // Reset totalItems and netSkuPrice to 0 for each SKU of the removed product
    const resetProductData = { ...productData };
    selectedProducts.forEach((selectedProductId) => {
      if (selectedProductId === productId) {
        productData[selectedProductId].sku.forEach((skuId) => {
          resetProductData[selectedProductId].sku[skuId] = {
            totalItems: 0,
            netSkuPrice: 0,
          };
        });
      }
    });
    setProductData(resetProductData);

    // Reset form values for totalItems and netSkuPrice
    reset({
      products: updatedProducts.map((productId) => ({
        id: productId,
        sku: productData[productId].sku.map((skuId) => ({
          id: skuId,
          totalItems: 0,
          netSkuPrice: 0,
        })),
      })),
    });
  };

  const handleTotalItemsChange = (productIndex, skuId, value) => {
    const totalItems = value ? parseInt(value) : 0;
    const product = products.find(
      (p) => p.id === selectedProducts[productIndex]
    );
    const sku = product.sku.find((s) => s.id === skuId);
    const netSkuPrice = totalItems * sku.selling_price;

    setValue(`products[${productIndex}].sku[${skuId}].totalItems`, value);
    setValue(
      `products[${productIndex}].sku[${skuId}].netSkuPrice`,
      netSkuPrice
    );

    setProductData((prevData) => ({
      ...prevData,
      [selectedProducts[productIndex]]: {
        ...prevData[selectedProducts[productIndex]],
        sku: {
          ...prevData[selectedProducts[productIndex]]?.sku,
          [skuId]: {
            totalItems,
            netSkuPrice,
          },
        },
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
        {selectedProducts.map((productId, productIndex) => {
          const product = products.find((p) => p.id === productId);

          return (
            <AccordionItem key={productId}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {product.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {product.sku.map((sku, skuIndex) => (
                  <Box key={sku.id} mt={4}>
                    <Text fontWeight="bold" mb={2}>
                      {skuIndex + 1}. SKU {sku.id} ({sku.amount} {sku.unit})
                    </Text>
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
                          name={`products[${productIndex}].sku[${sku.id}].totalItems`}
                          control={control}
                          rules={{ required: "Total items are required" }}
                          render={({ field }) => (
                            <Input
                              placeholder="Total Items"
                              type="number"
                              {...field}
                              value={watch(
                                `products[${productIndex}].sku[${sku.id}].totalItems`
                              )}
                              onChange={(e) => {
                                field.onChange(e);
                                handleTotalItemsChange(
                                  productIndex,
                                  sku.id,
                                  e.target.value
                                );
                              }}
                            />
                          )}
                        />
                        <Tag
                          mt={-2}
                          position="relative"
                          left="165px"
                          right="0px"
                          fontSize="sm"
                          color="green.700"
                          size="sm"
                          variant="solid"
                          backgroundColor="green.300"
                        >
                          {sku.quantity_in_inventory} item(s) remaining
                        </Tag>
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
                        name={`products[${productIndex}].sku[${sku.id}].netSkuPrice`}
                        control={control}
                        render={({ field }) => (
                          <Text {...field} ml={2} color="gray.700">
                            Rs.{" "}
                            {watch(
                              `products[${productIndex}].sku[${sku.id}].netSkuPrice`
                            ) || 0}
                          </Text>
                        )}
                      />
                    </Box>
                  </Box>
                ))}
                <Tag
                  mt={4}
                  size="sm"
                  variant="solid"
                  colorScheme="red"
                  onClick={() => handleRemoveProduct(productId)}
                >
                  <TagLabel>Remove Product</TagLabel>
                  <TagCloseButton />
                </Tag>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </VStack>
  );
};

export default SelectedProductsInput;
