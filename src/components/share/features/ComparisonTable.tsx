'use client'

import { Box, Container, Heading, Text, Table, Tooltip, Icon } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons'

interface ComparisonValue {
  status: 'yes' | 'no' | 'warning'
  label?: string
}

interface ComparisonRow {
  feature: string
  description?: string
  values: ComparisonValue[]
}

interface Competitor {
  name: string
  description?: string
  highlight?: boolean
}

interface ComparisonTableProps {
  title?: string
  description?: string
  competitors: Competitor[]
  rows: ComparisonRow[]
  notes?: string[]
}

const StatusIcon = ({ status, label }: { status: 'yes' | 'no' | 'warning'; label?: string }) => {
  const iconProps = {
    yes: { as: CheckIcon, color: 'green.500', 'aria-label': 'Supported' },
    no: { as: CloseIcon, color: 'red.500', 'aria-label': 'Not supported' },
    warning: { as: WarningIcon, color: 'orange.500', 'aria-label': 'Partial support' },
  }

  const props = iconProps[status]

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      <Icon {...props} boxSize={5} fontWeight="bold" />
      {label && (
        <Text as="span" fontSize="sm" color="gray.700" fontWeight="medium">
          {label}
        </Text>
      )}
    </Box>
  )
}

export default function ComparisonTable({
  title,
  description,
  competitors,
  rows,
  notes,
}: ComparisonTableProps) {
  return (
    <Box as="section" py={{ base: 12, md: 16 }} my={8}>
      <Container maxW="7xl">
        {title && (
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight="bold"
            textAlign="center"
            mb={3}
            color="gray.900"
          >
            {title}
          </Heading>
        )}

        {description && (
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            textAlign="center"
            maxW="3xl"
            mx="auto"
            mb={12}
          >
            {description}
          </Text>
        )}

        <Box
          overflowX="auto"
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <Table.Root
            variant="outline"
            size={{ base: 'sm', md: 'md' }}
          >
            <Table.Header>
              <Table.Row borderBottom="2px solid" borderColor="gray.200">
                <Table.ColumnHeader
                  color="gray.600"
                  borderColor="transparent"
                  fontSize={{ base: 'xs', md: 'sm' }}
                  fontWeight="semibold"
                  textTransform="none"
                  py={6}
                  px={6}
                  width="30%"
                  bg="gray.50"
                >
                  Feature
                </Table.ColumnHeader>
                {competitors.map((competitor, idx) => (
                  <Table.ColumnHeader
                    key={idx}
                    color={competitor.highlight ? 'white' : 'gray.900'}
                    borderColor="transparent"
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontWeight="bold"
                    textTransform="none"
                    textAlign="center"
                    bg={competitor.highlight ? 'brand.500' : 'gray.50'}
                    py={6}
                    px={4}
                    width={`${70 / competitors.length}%`}
                  >
                    <Box>
                      <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold">
                        {competitor.name}
                      </Text>
                      {competitor.description && (
                        <Text
                          as="div"
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color={competitor.highlight ? 'white.100' : 'gray.600'}
                          fontWeight="normal"
                          mt={1}
                        >
                          {competitor.description}
                        </Text>
                      )}
                    </Box>
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row, rowIdx) => (
                <Table.Row
                  key={rowIdx}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.15s"
                  _last={{ borderBottom: 'none' }}
                >
                  <Table.Cell
                    borderColor="transparent"
                    py={5}
                    px={6}
                    bg="white"
                  >
                    {row.description ? (
                      <Tooltip.Root openDelay={100}>
                        <Tooltip.Trigger>
                          <Box
                            as="span"
                            cursor="help"
                            fontWeight="normal"
                            fontSize={{ base: 'sm', md: 'md' }}
                            borderBottom="1px dotted"
                            borderColor="gray.400"
                            display="inline-block"
                            color="gray.900"
                          >
                            {row.feature}
                          </Box>
                        </Tooltip.Trigger>
                        <Tooltip.Positioner>
                          <Tooltip.Content
                            bg="gray.600"
                            color="white"
                            fontSize="sm"
                            borderRadius="md"
                            p={3}
                            maxW="250px"
                          >
                            {row.description}
                          </Tooltip.Content>
                        </Tooltip.Positioner>
                      </Tooltip.Root>
                    ) : (
                      <Text fontWeight="normal" fontSize={{ base: 'sm', md: 'md' }} color="gray.900">
                        {row.feature}
                      </Text>
                    )}
                  </Table.Cell>
                  {row.values.map((value, valueIdx) => {
                    const isHighlighted = competitors[valueIdx]?.highlight
                    return (
                      <Table.Cell
                        key={valueIdx}
                        borderColor="transparent"
                        textAlign="center"
                        bg={isHighlighted ? 'blue.50/50' : 'white'}
                        py={5}
                        px={4}
                      >
                        <StatusIcon status={value.status} label={value.label} />
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        {notes && notes.length > 0 && (
          <Box mt={8}>
            {notes.map((note, idx) => (
              <Text
                key={idx}
                fontSize={{ base: 'xs', md: 'sm' }}
                color="gray.500"
                textAlign="center"
                mt={idx > 0 ? 2 : 0}
                lineHeight="tall"
              >
                {note}
              </Text>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  )
}
