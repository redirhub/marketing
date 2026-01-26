"use client";

import { Accordion, Box, Span } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const [openItem, setOpenItem] = useState<string | null>(items[0]?.value || null);
  return (
    <Box w="100%" maxW="6xl" mx="auto">
      <Accordion.Root value={openItem ? [openItem] : []} onValueChange={(details) => setOpenItem(details.value[0] || null)} collapsible>
        {items.map((item, index) => (
          <Box
            key={`${item.value}-${index}`}
            mb={5}
            position="relative"
            transition="all 0.3s"
            _before={{
              content: '""',
              position: "absolute",
              top: "16px",
              left: "16px",
              right: "16px",
              bottom: "16px",
              zIndex: 0,
              background:
                "gradients.faqGlow",
              filter: "blur(35px)",
              opacity: openItem === item.value ? 0.8 : 0,
              transition: "opacity 0.4s ease-in-out",
              pointerEvents: "none",
              willChange: "opacity",
            }}
            css={{
              "&::before": {
                WebkitFilter: "blur(35px)",
                transform: "translateZ(0)",
              },
            }}
          >
          <Accordion.Item
            value={item.value}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="12px"
            bg="white"
            overflow="hidden"
            position="relative"
            zIndex={1}
            cursor="pointer"
            _hover={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
            transition="all 0.3s"
          >
              <Accordion.ItemTrigger
                p={6}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Span
                  flex="1"
                  textAlign="left"
                  fontSize={{ base: "14px", md: "1.1rem" }}
                  fontWeight="medium"
                  color="gray.700"
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
                        bg: "white",
                        borderColor: "gray.300",
                        color: "gray.900",
                      },
                      "[data-state=closed] &": {
                        bg: "transparent",
                        borderColor: "gray.300",
                        color: "gray.900",
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
                    fontSize={{ base: "14px", md: "18px" }}
                    color="gray.500"
                    lineHeight={{ base: "24px", md: "30px" }}
                    textAlign={"left"}
                    p="0px 20px 10px 0px"
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
