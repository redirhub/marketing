"use client";

import {
  Tabs,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import TestimonialsSlider from "./TestimonialsSlider";
import { PiCheckCircleFill } from "react-icons/pi";

interface CustomTabTriggerProps {
  value: string;
  label: string;
}
interface FeatureDetail {
  heading: string;
  description: string;
}
interface FeatureItem {
  key: string;
  tabLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: FeatureDetail[];
  hideLeanMore?: boolean;
}
interface FeatureContentProps {
  data: FeatureItem;
}
interface FeatureListItemProps extends FeatureDetail {}

const CustomTabTrigger: React.FC<CustomTabTriggerProps> = ({
  value,
  label,
}) => {
  return (
    <Tabs.Trigger
      value={value}
      flex={1}
      px={6}
      py={3}
      borderRadius="full"
      color="#344054"
      transition="all 0.3s ease"
      _hover={{
        bg: "#222B271A",
        color: "#101828",
      }}
      _selected={{
        bg: "#1C6DB6",
        color: "#fff",
        fontWeight: "semibold",
        boxShadow: "md",
      }}
    >
      <Text textStyle="xs"> {label} </Text>
    </Tabs.Trigger>
  );
};

const FeatureListItem: React.FC<FeatureListItemProps> = ({
  heading,
  description,
}) => (
  <Box as="li" display="flex" gap={2} listStyleType="none">
    {/* Use a fixed size unit for consistency */}
    <PiCheckCircleFill
      color="#E49426"
      style={{ marginTop: "4px", fontSize: "20px" }}
    />
    <Box>
      <Text as="span" fontSize="sm" fontWeight="700" color="#101828">
        {heading}
      </Text>
      {/* Ensures the rest of the text is slightly smaller/lighter and flows inline */}
      <Text as="span" fontSize="sm" color="#667085" display="inline">
        {" "}
        {description}
      </Text>
    </Box>
  </Box>
);

const ActionButton: React.FC<
  React.ComponentProps<typeof Button> & { label: string; isPrimary?: boolean }
> = ({ label, isPrimary = false, ...rest }) => {
  const primaryStyles = {
    bg: "#E49426",
    color: "white",
    _hover: { bg: "#C78121", transform: "translateY(-2px)", boxShadow: "lg" },
  };
  const secondaryStyles = {
    bg: "#fff",
    color: "#16538A",
    border: "1px solid #222B271A",
    _hover: {
      bg: "#16538A",
      color: "#fff",
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },
  };

  return (
    <Button
      px="24px"
      py="12px"
      fontSize="1rem"
      fontWeight="normal"
      borderRadius="8px"
      transition="all 0.2s"
      _active={{ transform: "translateY(0)" }}
      {...(isPrimary ? primaryStyles : secondaryStyles)}
      {...rest}
    >
      {label}
    </Button>
  );
};
const FeatureContent: React.FC<FeatureContentProps> = ({ data }) => {
  const {
    title,
    description,
    features,
    imageSrc,
    imageAlt,
    key,
    hideLeanMore = false,
  } = data;

  return (
    <Box
      w="100%"
      maxW="7xl"
      mx="auto"
      mt={4}
      bg="white"
      borderRadius="lg"
      p={{ base: 4, md: 6 }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        {/* Left Side: Text and Features */}
        <Box textAlign="left">
          <Heading fontSize="1.9rem" color="#101828" mb={6} fontWeight={600}>
            {title}
          </Heading>
          <Text color="#667085" mb={4}>
            {description}
          </Text>
          <Box as="ul" pl={0} display="grid" rowGap={3}>
            {/* Using the reusable FeatureListItem */}
            {features.map((feature, index) => (
              <FeatureListItem
                key={index}
                heading={feature.heading}
                description={feature.description}
              />
            ))}
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            gap={4}
            align="center"
            mt={8}
          >
            <ActionButton
              label={!hideLeanMore ? "Get Started For Free" : "Learn More"}
              isPrimary
            />
            {!hideLeanMore && <ActionButton label="Learn More" />}
          </Stack>
        </Box>

        {/* Right Side: Image */}
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={640}
            height={420}
            style={{
              width: "100%",
              height: "auto",
            }}
            priority={key === "tab1"} // Next.js optimization
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default function PowerfulFeatures() {
  const featuresData: FeatureItem[] = [
    {
      key: "tab1",
      tabLabel: "Quick DNS Setup",
      title: "Effortless DNS Configuration",
      description:
        "Simplify DNS setup with RedirHub’s streamlined tools. Configure DNS records quickly and ensure your redirects work seamlessly without technical hurdles.",
      imageSrc: "/assets/images/powerful-features/quick-dns-Setup.png",
      imageAlt: "DNS Configuration dashboard preview",
      features: [
        {
          heading: "Fast and Intuitive Setup:",
          description:
            "No more complex configurations—get your DNS set up in minutes.",
        },
        {
          heading: "Comprehensive Guides:",
          description: "Step-by-step instructions for every configuration.",
        },
        {
          heading: "Reliable Support:",
          description:
            "Our team is ready to assist with any DNS-related queries.",
        },
      ],
    },
    {
      key: "tab2",
      tabLabel: "QR Code",

      title: "Seamless QR Code Integration",
      description:
        "RedirHub lets you generate custom QR codes tied to your redirects, making it easier for users to access your content on the go.",
      imageSrc: "/assets/images/powerful-features/qr-code.png",
      imageAlt: "QR Code generation preview",
      features: [
        {
          heading: "Dynamic QR Codes:",
          description: "Update destination URLs without reprinting the code.",
        },
        {
          heading: "Custom Branding:",
          description: "Add your logo and brand colors to every QR code.",
        },
        {
          heading: "Track Scans:",
          description:
            "Monitor engagement metrics like scan count and locations.",
        },
      ],
      hideLeanMore: true,
    },
    {
      key: "tab3",
      tabLabel: "Team Collaboration",
      title: "Boost Productivity with Team Collaboration",
      description:
        "Manage your redirects more efficiently by enabling your team to work together seamlessly on RedirHub.",
      imageSrc: "/assets/images/powerful-features/team-Collaboration.jpeg",
      imageAlt: "Team collaboration dashboard preview",
      features: [
        {
          heading: "User Roles and Permissions:",
          description: "Assign roles to team members for secure collaboration.",
        },
        {
          heading: "Shared Projects:",
          description:
            "Organize redirects into shared folders for team visibility.",
        },
        {
          heading: "Activity Logs:",
          description: "Keep track of changes made by team members.",
        },
      ],
      hideLeanMore: true,
    },
    {
      key: "tab4",
      tabLabel: "Advanced Redirects",
      title: "Advanced Redirect Options with Custom Codes",
      description:
        "Harness the full power of HTTP status codes to handle a variety of redirect scenarios, from temporary redirects to permanent migrations.",
      imageSrc: "/assets/images/powerful-features/redirect.jpeg",
      imageAlt: "Redirect settings preview",
      features: [
        {
          heading: "Customizable Redirects:",
          description: "Configure 301, 302, and other HTTP codes effortlessly.",
        },
        {
          heading: "SEO-Friendly:",
          description:
            "Optimize search engine visibility with proper redirect handling.",
        },
        {
          heading: "Real-Time Updates:",
          description: "Make changes instantly without downtime.",
        },
      ],
      hideLeanMore: true,
    },
  ];
  return (
    <Box
      w="100%"
      py={{ base: 14, md: 20 }}
      px={{ base: 4, md: 6 }}
      textAlign="center"
      bg={"#fff"}
    >
      <Box w="100%" maxW="7xl" mx="auto" textAlign="center">
        <Heading
          fontSize={{ base: "2rem", md: "3rem" }}
          fontWeight={500}
          color="#344054"
          letterSpacing="0.4px"
          mb={16}
        >
          Discover RedirHub's Powerful Features
        </Heading>
      </Box>

      <Box w="100%" maxW="7xl" mx="auto">
        <Tabs.Root defaultValue="tab1" variant="enclosed">
          <Tabs.List
            w="55%"
            fontSize={{ base: "md", md: "lg" }}
            gap={2}
            bg="#FFFFFF61"
            p={2}
            borderRadius="full"
            borderWidth="1px"
            borderColor="#CED1D6"
            mb={8}
          >
            <CustomTabTrigger value="tab1" label="Quick DNS Setup" />
            <CustomTabTrigger value="tab2" label="Quick DNS Setup" />
            <CustomTabTrigger value="tab3" label="Team Collaboration" />
            <CustomTabTrigger value="tab4" label="301 Redirect" />
          </Tabs.List>

          {featuresData.map((feature) => (
            <Tabs.Content key={feature.key} value={feature.key}>
              <FeatureContent data={feature} />
            </Tabs.Content>
          ))}
          {/* <Tabs.Content value="tab1">
            <Box
              w="100%"
              maxW="7xl"
              mx="auto"
              mt={4}
              bg="white"
              borderRadius="lg"
              p={{ base: 4, md: 6 }}
            >
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={8}
                alignItems="center"
              >
                <Box textAlign="left">
                  <Heading
                    fontSize="1.9rem"
                    color="#101828"
                    mb={6}
                    fontWeight={600}
                  >
                    Effortless DNS Configuration
                  </Heading>
                  <Text color="#667085" mb={4}>
                    Simplify DNS setup with RedirHub’s streamlined tools.
                    Configure DNS records quickly and ensure your redirects work
                    seamlessly without technical hurdles.
                  </Text>
                  <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                    <Box as="li" display="flex" gap={2} listStyleType="none">
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "32px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Fast and Intuitive Setup:
                        </Text>{" "}
                        No more complex configurations—get your DNS set up in
                        minutes.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      // alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Comprehensive Guides:
                        </Text>{" "}
                        Step-by-step instructions for every configuration.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Reliable Support:
                        </Text>{" "}
                        Our team is ready to assist with any DNS-related
                        queries.
                      </Box>
                    </Box>
                  </Box>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    gap={4}
                    align="center"
                    mt={8}
                  >
                    <Button
                      bg="#E49426"
                      color="white"
                      px="24px"
                      py="12px"
                      fontSize="1rem"
                      fontWeight="normal"
                      borderRadius="8px"
                      _hover={{
                        bg: "#C78121",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        bg: "orange.700",
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Get Started For Free
                    </Button>

                    <Button
                      bg="#fff"
                      color="#16538A"
                      px="24px"
                      py="12px"
                      fontSize="1rem"
                      fontWeight="normal"
                      borderRadius="8px"
                      border="1px solid #222B271A"
                      _hover={{
                        bg: "#16538A",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                        color: "#fff",
                      }}
                      _active={{
                        bg: "#16538A",
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>

                <Box
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={"/assets/images/powerful-features/quick-dns-Setup.png"}
                    alt="Redirect feature preview"
                    width={640}
                    height={420}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <Box
              w="100%"
              maxW="7xl"
              mx="auto"
              mt={4}
              bg="white"
              borderRadius="lg"
              p={{ base: 4, md: 6 }}
            >
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={8}
                alignItems="center"
              >
                <Box textAlign="left">
                  <Heading
                    fontSize="1.9rem"
                    color="#101828"
                    mb={6}
                    fontWeight={600}
                  >
                    Seamless QR Code Integration
                  </Heading>
                  <Text color="#667085" mb={4}>
                    RedirHub lets you generate custom QR codes tied to your
                    redirects, making it easier for users to access your content
                    on the go.
                  </Text>
                  <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Dynamic QR Codes:
                        </Text>{" "}
                        Update destination URLs without reprinting the code.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Custom Branding:
                        </Text>{" "}
                        Add your logo and brand colors to every QR code.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Track Scans:
                        </Text>{" "}
                        Monitor engagement metrics like scan count and
                        locations.
                      </Box>
                    </Box>
                  </Box>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    gap={4}
                    align="center"
                    mt={8}
                  >
                    <Button
                      bg="#E49426"
                      color="white"
                      px="24px"
                      py="12px"
                      fontSize="1rem"
                      fontWeight="normal"
                      borderRadius="8px"
                      _hover={{
                        bg: "#C78121",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        bg: "orange.700",
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>

                <Box
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={"/assets/images/powerful-features/qr-code.png"}
                    alt="Redirect feature preview"
                    width={640}
                    height={420}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <Box
              w="100%"
              maxW="7xl"
              mx="auto"
              mt={4}
              bg="white"
              borderRadius="lg"
              p={{ base: 4, md: 6 }}
            >
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={8}
                alignItems="center"
              >
                <Box textAlign="left">
                  <Heading
                    fontSize="1.9rem"
                    color="#101828"
                    mb={6}
                    fontWeight={600}
                  >
                    Boost Productivity with Team Collaboration
                  </Heading>
                  <Text color="#667085" mb={4}>
                    Manage your redirects more efficiently by enabling your team
                    to work together seamlessly on RedirHub.
                  </Text>
                  <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "30px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          User Roles and Permissions:
                        </Text>{" "}
                        Assign roles to team members for secure collaboration.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Shared Projects:
                        </Text>{" "}
                        Organize redirects into shared folders for team
                        visibility.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Activity Logs:
                        </Text>{" "}
                        Keep track of changes made by team members.
                      </Box>
                    </Box>
                  </Box>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    gap={4}
                    align="center"
                    mt={8}
                  >
                    <Button
                      bg="#E49426"
                      color="white"
                      px="24px"
                      py="12px"
                      fontSize="1rem"
                      fontWeight="normal"
                      borderRadius="8px"
                      _hover={{
                        bg: "#C78121",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        bg: "orange.700",
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>

                <Box
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={
                      "/assets/images/powerful-features/team-Collaboration.jpeg"
                    }
                    alt="Redirect feature preview"
                    width={640}
                    height={420}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Tabs.Content>{" "}
          <Tabs.Content value="tab4">
            <Box
              w="100%"
              maxW="7xl"
              mx="auto"
              mt={4}
              bg="white"
              borderRadius="lg"
              p={{ base: 4, md: 6 }}
            >
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={8}
                alignItems="center"
              >
                <Box textAlign="left">
                  <Heading
                    fontSize="1.9rem"
                    color="#101828"
                    mb={6}
                    fontWeight={600}
                  >
                    Advanced Redirect Options with Custom Codes
                  </Heading>
                  <Text color="#667085" mb={4}>
                    Harness the full power of HTTP status codes to handle a
                    variety of redirect scenarios, from temporary redirects to
                    permanent migrations.
                  </Text>
                  <Box as="ul" pl={0} color="#667085" display="grid" rowGap={3}>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Customizable Redirects:
                        </Text>{" "}
                        Configure 301, 302, and other HTTP codes
                        effortlessly.{" "}
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          SEO-Friendly:
                        </Text>{" "}
                        Optimize search engine visibility with proper redirect
                        handling.
                      </Box>
                    </Box>
                    <Box
                      as="li"
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      listStyleType="none"
                    >
                      <PiCheckCircleFill
                        color="#E49426"
                        style={{ marginTop: "2px", fontSize: "28px" }}
                      />{" "}
                      <Box>
                        <Text
                          as="span"
                          fontSize={"14px"}
                          fontWeight="700"
                          color="#101828"
                        >
                          Real-Time Updates:
                        </Text>{" "}
                        Make changes instantly without downtime.
                      </Box>
                    </Box>
                  </Box>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    gap={4}
                    align="center"
                    mt={8}
                  >
                    <Button
                      bg="#E49426"
                      color="white"
                      px="24px"
                      py="12px"
                      fontSize="1rem"
                      fontWeight="normal"
                      borderRadius="8px"
                      _hover={{
                        bg: "#C78121",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        bg: "orange.700",
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>

                <Box
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={"/assets/images/powerful-features/redirect.jpeg"}
                    alt="Redirect feature preview"
                    width={640}
                    height={420}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Tabs.Content> */}
        </Tabs.Root>
      </Box>

      <TestimonialsSlider />
    </Box>
  );
}
