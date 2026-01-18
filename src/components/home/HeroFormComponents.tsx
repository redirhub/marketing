"use client";

import {
  Text,
  HStack,
  Icon,
  Input,
  Button,
  InputProps,
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { FiArrowRight } from "react-icons/fi";

export interface CustomInputProps extends InputProps {
  label: string;
  placeholder?: string;
}

export interface PrimaryActionButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
  subtext?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  ...rest
}) => {
  const inputStyles = {
    bg: "white",
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: "12px",
    h: "56px",
    px: 4,
    fontSize: "md",
    color: "gray.900",
    _placeholder: {
      color: "gray.500",
    },
    _focus: {
      borderColor: "brand.focus",
      outline: "none",
      boxShadow: "0 0 0 1px {colors.brand.focus}",
    },
  };
  const labelStyles = {
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    fontSize: "14px",
    fontWeight: "500",
    color: "gray.700",
    mb: 2,
  };
  return (
    <FormControl>
      <FormLabel {...labelStyles}>{label}</FormLabel>
      <Input placeholder={placeholder} {...inputStyles} {...rest} />
    </FormControl>
  );
};

export const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({
  label,
  subtext,
  ...rest
}) => {
  const buttonStyles = {
    bg: "brand.solid",
    borderRadius: "12px",
    h: "56px",
    px: { base: 4, md: 8 },
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    color: "white",
    w: "full",
    _hover: {
      bg: "brand.hover",
    },
    _active: {
      bg: "brand.active",
    },
  };
  return (
    <FormControl>
      <FormLabel opacity={0} mb={2} pointerEvents="none" display={{ base: "none", md: "block" }}>Spacer</FormLabel>
      <Stack gap={2} w="full" align={{ base: "center", md: "center" }}>
        <Button {...buttonStyles} {...rest}>
          <HStack gap={2}>
            <Text>{label}</Text>
            <Icon as={FiArrowRight} />
          </HStack>
        </Button>
        {subtext && (
          <Text fontSize="12px" color="gray.500" textAlign={{ base: "center", md: "center" }} whiteSpace="nowrap">
            {subtext}
          </Text>
        )}
      </Stack>
    </FormControl>
  );
};

export const ApiStatusMessage: React.FC<{ message: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <Text fontSize="sm" color="gray.700" textAlign="left">
      {message}
    </Text>
  );
};
