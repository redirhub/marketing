import {
  Select,
  Portal,
  Box,
  createListCollection,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

interface DomainOption {
  label: string;
  value: string;
}

interface DomainSelectorProps {
  label?: string;
  value: string;
  options: DomainOption[];
  onChange: (value: string) => void;
}

/**
 * Reusable domain selector component with consistent styling.
 * Used for selecting domains in URL shortening and redirect forms.
 */
export const DomainSelector: React.FC<DomainSelectorProps> = ({
  label = "Domain",
  value,
  options,
  onChange,
}) => {
  const collection = createListCollection({
    items: options,
  });

  return (
    <FormControl>
      <FormLabel
        fontFamily="'Inter', sans-serif"
        fontStyle="normal"
        fontSize="14px"
        fontWeight="500"
        color="gray.700"
        mb={2}
      >
        {label}
      </FormLabel>
      <Select.Root
        collection={collection}
        multiple={false}
        value={[value]}
        onValueChange={(details) => {
          const next = Array.isArray(details.value)
            ? details.value[0]
            : details.value;
          onChange(next);
        }}
      >
        <Select.HiddenSelect />

        <Select.Control
          css={{
            bg: "white",
            border: "1px solid",
            borderColor: "gray.300",
            borderRadius: "12px",
            height: "56px",
            w: "full",
            fontSize: "md",
            color: "gray.900",
            display: "flex",
            alignItems: "center",
            _focus: {
              borderColor: "brand.focus",
              outline: "none",
              boxShadow: "0 0 0 1px {colors.brand.focus}",
            },
          }}
        >
          <Select.Trigger border="none" px={4} w="full">
            <Select.ValueText placeholder="Select domain" />
          </Select.Trigger>

          <Select.IndicatorGroup pr={3}>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content
              css={{
                bg: "white",
                borderRadius: "12px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {collection.items.map((option) => (
                <Select.Item item={option} key={option.value}>
                  <Box px={3} py={2} _hover={{ bg: "gray.100" }} w="100%">
                    {option.label}
                  </Box>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </FormControl>
  );
};
