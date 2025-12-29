"use client";

import { Accordion, Box, Text, Heading, Span } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  return (
    <Box w="100%" maxW="6xl" mx="auto">
      <Accordion.Root defaultValue={[items[0].value]} collapsible>
        {items.map((item, index) => (
          <Box
            key={index}
            bg="white"
            mb={4}
            overflow="hidden"
            _hover={{
              boxShadow: "md",
            }}
            transition="all 0.3s"
            border="1px solid #EAECF0"
            borderRadius="12px"
            cursor="pointer"
          >
            <Accordion.Item value={item.value} border="none">
              <Accordion.ItemTrigger
                p={6}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Span
                  flex="1"
                  textAlign="left"
                  fontSize={{ base: "14px", md: "1.1rem" }}
                  fontWeight="semibold"
                  color="#1f2124"
                  pr={4}
                  letterSpacing={"0.2px"}
                >
                  {item.question}
                </Span>

                <Accordion.ItemIndicator>
                  <Box
                    w="20px"
                    h="20px"
                    borderRadius="full"
                    border="1px solid"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.3s"
                    css={{
                      "[data-state=open] &": {
                        bg: "#fff",
                        borderColor: "gray.300",
                        color: "#1f2124",
                      },
                      "[data-state=closed] &": {
                        bg: "transparent",
                        borderColor: "gray.300",
                        color: "#1f2124",
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      w="100%"
                      h="100%"
                      css={{
                        "[data-state=open] &": { display: "flex" },
                        "[data-state=closed] &": { display: "none" },
                      }}
                    >
                      <MinusIcon boxSize={2} />
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      w="100%"
                      h="100%"
                      css={{
                        "[data-state=open] &": { display: "none" },
                        "[data-state=closed] &": { display: "flex" },
                      }}
                    >
                      <AddIcon boxSize={2} />
                    </Box>
                  </Box>
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody pb={6} px={6}>
                  {/* <Text
                    fontSize={{ base: "14px", md: "15px" }}
                    color="gray.600"
                    lineHeight="24px"
                    textAlign={"left"}
                    p="0px 23px 23px 23px"
                  >
                    {item.answer}
                  </Text> */}
                  <Box
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                    css={{
                      ul: { marginLeft: "20px", marginTop: "10px" },
                      li: { marginBottom: "8px" },
                    }}
                    fontSize={{ base: "14px", md: "15px" }}
                    color="gray.600"
                    lineHeight="24px"
                    textAlign={"left"}
                    p="0px 23px 23px 23px"
                  />
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Box>
        ))}
      </Accordion.Root>
    </Box>
  );
};
