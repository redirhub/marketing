'use client'

import { Accordion, Box, Heading, Text, Span } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

interface FAQ {
  question: string
  answer: string
}

interface BlogFAQProps {
  faqs: FAQ[]
}

export default function BlogFAQ({ faqs }: BlogFAQProps) {
  return (
    <Box as="section" mt={10}>
      <Box borderTop="1px solid" borderColor="gray.200" mb={6} />
      <Heading
        as="h2"
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="bold"
        my={8}
        color="gray.900"
      >
        Frequently Asked Questions
      </Heading>

      <Accordion.Root defaultValue={['faq-0']} collapsible multiple>
        {faqs.map((faq, index) => (
          <Box
            key={`faq-box-${index}`}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            mb={4}
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              borderColor: '#7D65DB',
            }}
          >
            <Accordion.Item key={`faq-item-${index}`} value={`faq-${index}`} border="none">
              <Accordion.ItemTrigger
                py={4}
                px={6}
                borderTopRadius="2xl"
                borderTop="2px solid #7D65DB"
                cursor="pointer"
                css={{
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: '#F7FAFC',
                  },
                  '[data-state=open] &': {
                    background: '#7D65DB',
                    color: 'white',
                  },
                }}
              >
                <Span
                  flex="1"
                  textAlign="left"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="semibold"
                >
                  {faq.question}
                </Span>

                <Accordion.ItemIndicator>
                  <Box
                    w="24px"
                    h="24px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="transform 0.2s ease"
                  >
                    <Box
                      display="flex"
                      css={{
                        '[data-state=open] &': { display: 'flex' },
                        '[data-state=closed] &': { display: 'none' },
                      }}
                    >
                      <MinusIcon boxSize={4} />
                    </Box>
                    <Box
                      display="flex"
                      css={{
                        '[data-state=open] &': { display: 'none' },
                        '[data-state=closed] &': { display: 'flex' },
                      }}
                    >
                      <AddIcon boxSize={4} />
                    </Box>
                  </Box>
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>

              <Accordion.ItemContent>
                <Accordion.ItemBody
                  pb={6}
                  pt={4}
                  px={6}
                  bg="gray.50"
                  borderTop="1px solid"
                  borderColor="gray.200"
                >
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="gray.700"
                    lineHeight="1.7"
                  >
                    {faq.answer}
                  </Text>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Box>
        ))}
      </Accordion.Root>
    </Box>
  )
}
