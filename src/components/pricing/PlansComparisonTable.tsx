"use client";

import { useState, useMemo, useCallback, Fragment } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  Badge,
  Table,
  Button,
} from "@chakra-ui/react";
import { HiMinus } from "react-icons/hi2";
import { FiHelpCircle } from "react-icons/fi";
import { Tooltip } from "@/components/ui/tooltip";
import { TabsLayout, TabTriggerButton } from "@/components/ui/TabsLayout";
import { redirectData, ComparisonRow } from "./redirectPlanData";
import { shortenUrlData } from "./shortenUrlPlanData";
import { monitorData } from "./monitorPlanData";

interface PlansComparisonTableProps {
  isAnnually: boolean;
}

type ProductTab = "redirect" | "shorten" | "monitor";

const TAB_DATA = {
  redirect: { plans: redirectData.plans, comparison: redirectData.comparison },
  shorten: { plans: shortenUrlData.plans, comparison: shortenUrlData.comparison },
  monitor: { plans: monitorData.plans, comparison: monitorData.comparison },
} as const;

const BUTTON_STYLES = {
  popular: {
    bg: "brand.500",
    color: "white",
    borderColor: "brand.500",
    hoverBg: "brand.700",
    hoverBorderColor: "brand.600",
    hoverColor: "white",
  },
  default: {
    bg: "transparent",
    color: "primary.600",
    borderColor: "#1C6DB63D",
    hoverBg: "primary.50",
    hoverBorderColor: "primary.600",
    hoverColor: "primary.600",
  },
} as const;

const CheckIcon = () => (
  <Box>
    <img src={'/assets/images/check-icon.png'} width={20} height={20} alt="Check icon" />
  </Box>
);

const DashIcon = () => <Icon as={HiMinus} color="gray.400" boxSize={5} />;

interface PlanButtonProps {
  plan: { badge: string | null; label: string };
  size?: "sm" | "md";
  mt?: number;
}

const PlanButton = ({ plan, size = "sm", mt }: PlanButtonProps) => {
  const styles = plan.badge ? BUTTON_STYLES.popular : BUTTON_STYLES.default;

  return (
    <Button
      mt={mt}
      size={size}
      borderRadius="12px"
      p={6}
      fontWeight="700"
      fontSize="14px"
      minW="180px"
      maxW={'180px'}
      bg={styles.bg}
      color={styles.color}
      border="1px solid"
      borderColor={styles.borderColor}
      _hover={{
        bg: styles.hoverBg,
        borderColor: styles.hoverBorderColor,
        color: styles.hoverColor,
      }}
    >
      {plan.label === "Enterprise" ? "Contact Us" : "Try For Free"}
    </Button>
  );
};

export default function PlansComparisonTable({
  isAnnually,
}: PlansComparisonTableProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>("redirect");

  const { plans, comparison } = useMemo(() => TAB_DATA[activeTab], [activeTab]);
  const groupedComparison = useMemo(() =>
    comparison.reduce<Record<string, ComparisonRow[]>>((acc, row) => {
      const category = row.category || "Other";
      (acc[category] ??= []).push(row);
      return acc;
    }, {}),
    [comparison]
  );

  const formatPrice = useCallback((plan: (typeof plans)[0]) => {
    if (plan.label === "Enterprise") return "n/a";
    const price = isAnnually ? plan.annual_price : plan.price;
    return `$${price}`;
  }, [isAnnually]);

  const renderCellValue = useCallback((row: ComparisonRow, planId: string) => {
    const planValue = row.plans[planId];
    if (!planValue) return <DashIcon />;

    const { value } = planValue;

    if (row.type === "bool") {
      return value === true ? <CheckIcon /> : <DashIcon />;
    }

    if ((row.type === "param" || row.type === "text") && value != null && value !== "") {
      return (
        <Text fontSize="14px" color="gray.700" textAlign="center">
          {String(value)}
        </Text>
      );
    }

    return <DashIcon />;
  }, []);

  const handleTabChange = useCallback((val: string) => {
    setActiveTab(val as ProductTab);
  }, []);

  const tabHeader = (
    <>
      <TabTriggerButton value="redirect" label="Redirect" />
      <TabTriggerButton value="shorten" label="Shorten URL" />
      <TabTriggerButton value="monitor" label="Monitor" />
    </>
  );

  const tabBody = (
    <Box overflowX="auto" background={'transparent'}>
      <Table.Root size="md" css={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <Table.Header>
          <Table.Row bg="transparent">
            <Table.ColumnHeader
              background="transparent"
              border={'none'}
              borderBottom={'1px solid'}
              borderBottomColor={'gray.300'}
            />
            {plans.map((plan) => (
              <Table.ColumnHeader
                key={plan.id}
                textAlign="center"
                background="transparent"
                border={'none'}
                borderBottom={'1px solid'}
                borderBottomColor={'gray.300'}
                p={4}
              >
                <Flex align="center" justifyContent={'flex-start'} gap={2}>
                  <Text fontSize="18px" fontWeight="600" color="gray.700">
                    {plan.label}
                  </Text>
                  {plan.badge && (
                    <Badge
                      bg="success.50"
                      border={'1px solid'}
                      borderColor={'success.800'}
                      color="success.700"
                      borderRadius="full"
                      px={4}
                      py={1.5}
                      fontSize="14px"
                      fontWeight="500"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                </Flex>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
          <Table.Row bg="transparent">
            <Table.ColumnHeader
              background="transparent"
              border={'none'}
            />
            {plans.map((plan) => (
              <Table.ColumnHeader
                key={`price-${plan.id}`}
                textAlign="center"
                background="transparent"
                border={'none'}
                p={3}
              >
                <Flex direction="column" gap={2} background={'transparent'}>
                  <Flex align="baseline" gap={1} pb={2.5} pt={1}>
                    <Text
                      fontSize={{ base: "32px", md: "40px" }}
                      fontWeight="600"
                      color="gray.700"
                      lineHeight="1"
                    >
                      {formatPrice(plan)}
                    </Text>
                    {plan.label !== "Enterprise" && (
                      <Text fontSize="14px" color="gray.700">per month</Text>
                    )}
                  </Flex>
                  <PlanButton plan={plan} size="sm" mt={1.5} />
                </Flex>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body background={'transparent'}>
          {Object.entries(groupedComparison).map(([category, rows], categoryIndex) => (
            <Fragment key={category}>
              <Table.Row background={'transparent'}>
                <Table.Cell
                  colSpan={plans.length + 1}
                  bg="transparent"
                  pt={6}
                  pb={3}
                  px={4}
                  border="none"
                  {...(categoryIndex > 0 && { borderTop: "1px solid", borderColor: "gray.300" })}
                >
                  <Text
                    fontSize="14px"
                    fontWeight="600"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    {category} Features
                  </Text>
                </Table.Cell>
              </Table.Row>
              {rows.map((row, index) => (
                <Table.Row key={row.id} bg={index % 2 === 0 ? "white" : "transparent"} transition="background 0.2s">
                  <Table.Cell p={5} border={'none'} bg={index % 2 === 0 ? "white" : "transparent"}>
                    <Flex align="center" gap={1}>
                      <Text fontSize="14px" fontWeight="500" whiteSpace={'nowrap'} color="gray.700" textTransform={'capitalize'}>
                        {row.label}
                      </Text>
                      {row.tooltip && (
                        <Tooltip
                          content={row.tooltip}
                          contentProps={{
                            p: 2,
                            bg: "gray.500",
                            color: "white",
                            borderRadius: "md",
                          }}
                        >
                          <Icon as={FiHelpCircle} color="gray.400" boxSize={4.5} cursor="help" />
                        </Tooltip>
                      )}
                    </Flex>
                  </Table.Cell>
                  {plans.map((plan) => (
                    <Table.Cell
                      key={`${row.id}-${plan.id}`}
                      textAlign="center"
                      bg={index % 2 === 0 ? "white" : "transparent"}
                      py={4}
                      border={'none'}
                    >
                      <Flex justify="center">{renderCellValue(row, plan.id)}</Flex>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Fragment>
          ))}

          <Table.Row bg="transparent">
            <Table.Cell border="none" borderTop="1px solid" borderColor="gray.300" py={6} bg="transparent" />
            {plans.map((plan) => (
              <Table.Cell key={`cta-${plan.id}`}  textAlign="center" border={'none'} borderTop="1px solid" borderColor="gray.300" py={6}>
                <PlanButton plan={plan} size="md" />
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );

  return (
    <Box w="full" mt={16} bg="warning.100" borderRadius="24px" px={{ base: 4, md: 8 }} py={12}>
      <Heading
        as="h2"
        fontSize={{ base: "24px", md: "38px" }}
        fontWeight="600"
        color="gray.700"
        textAlign="center"
        mb={8}
      >
        Our Plans Compared
      </Heading>

      <TabsLayout
        defaultValue="redirect"
        value={activeTab}
        onValueChange={handleTabChange}
        tabHeader={tabHeader}
        tabBody={tabBody}
        bg="transparent"
        border="none"
        p={0}
        boxShadow="none"
        maxW="100%"
      />
    </Box>
  );
}
