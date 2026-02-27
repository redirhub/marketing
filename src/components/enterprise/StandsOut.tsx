import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import {
  LocationsIcon,
  MainIcon,
  RapidRequestsIcon,
  SLAIcon,
  SSLIcon,
  UptimeIcon,
} from "../icons";
import { FeatureStatCard } from "./FeatureStatCard";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import { useLocalePath } from "@/lib/hooks/useLocalePath";

const StandsOut = async ({ locale }: { locale: string }) => {
  const t = getT(locale);
  const localePath = useLocalePath();

  const statsData = [
    {
      icon: <MainIcon />,
      statValue: "90ms",
      title: t("enterprise.stat-rapid-title", "Rapid redirect"),
      description: t("enterprise.stat-rapid-desc", "Average redirect latency, ensuring quick, seamless user experiences"),
      linkHref: localePath("https://findredirect.com/uptime"),
      linkLabel: t("enterprise.stat-rapid-link", "View real-time speed report"),
    },
    {
      icon: "/assets/images/stands-out/SLA.png",
      statValue: "100%",
      title: t("enterprise.stat-sla-title", "SLA"),
      description: t("enterprise.stat-sla-desc", "Guaranteed performance 24/7 with our infrastructure"),
      linkLabel: t("enterprise.stat-sla-link", "Learn more"),
    },
    {
      icon: <RapidRequestsIcon />,
      statValue: "10+",
      title: t("enterprise.stat-locations-title", "Locations"),
      description: t("enterprise.stat-locations-desc", "Points of Presence worldwide for reliable, global coverage"),
    },
  ];
  const secoundRowData = [
    {
      icon: "/assets/images/stands-out/two-factor.png",
      statValue: t("enterprise.stat-2fa-value", "Two-factor"),
      title: t("enterprise.stat-2fa-title", "Authentication"),
      description: t("enterprise.stat-2fa-desc", "An extra guard on your account that ensures only authorized users access your dashboard."),
    },
    {
      icon: "/assets/images/stands-out/Dedicated.png",
      statValue: t("enterprise.stat-network-value", "Dedicated"),
      title: t("enterprise.stat-network-title", "Network"),
      description: t("enterprise.stat-network-desc", "Average redirect latency, ensuring quick, seamless user experiences"),
    },
  ];
  const lastRowData = [
    {
      icon: <UptimeIcon />,
      statValue: "99.99%",
      title: t("enterprise.stat-uptime-title", "Uptime"),
      description: t("enterprise.stat-uptime-desc", "Uptime guarantee, ensuring consistent access, dependable performance for all users"),
    },
    {
      icon: "/assets/images/stands-out/SSO.png",
      statValue: t("enterprise.stat-sso-value", "SSO"),
      title: t("enterprise.stat-sso-title", "SAML"),
      description: t("enterprise.stat-sso-desc", "Strengthen your sign-on process by unifying with your existing authentication solution."),
    },
    {
      icon: "/assets/images/stands-out/Dedicated.png",
      statValue: t("enterprise.stat-team-value", "Team"),
      title: t("enterprise.stat-team-title", "Members"),
      description: t("enterprise.stat-team-desc", "Decide who manages, views, or edits each redirect in your network for total peace of mind."),
    },
  ];
  return (
    <>
      <Box w="100%" py={{ base: 20, md: 24 }} bg={"#fff"}>
        <Heading
          textAlign="center"
          color="#344054"
          fontWeight={500}
          fontSize={{ base: "1.5rem", md: "3rem" }}
          letterSpacing={"0.4px"}
          mb={{ base: 6, md: 12 }}
        >
          {t("enterprise.stands-out-why", "Why")}{" "}
          <Box
            as="span"
            fontWeight="bolder"
            background="radial-gradient(circle, #20A795 0%, #1C6DB6 100%)"
            backgroundClip="text"
            fill="transparent"
            color="transparent"
          >
            {APP_NAME}
          </Box>{" "}
          {t("enterprise.stands-out-stands", "Stands Out")}
        </Heading>

        <Container maxW="7xl" mx="auto" px={{ base: 4, md: 4 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={5}
            align="stretch"
            mb={{ base: 6, md: "40px" }}
          >
            {/* LEFT SIDE: 60% Width */}
            <Box flex={{ base: "1", lg: "1.5" }}>
              <FeatureStatCard {...statsData[0]} isFeatured={true} />
            </Box>

            {/* RIGHT SIDE: 40% Width containing a horizontal row */}
            <Flex
              flex={{ base: "1", lg: "1.5" }}
              gap={6}
              direction={{ base: "column", md: "row" }}
            >
              <Box flex="1">
                <FeatureStatCard {...statsData[1]} />
              </Box>
              <Box flex="1">
                <FeatureStatCard {...statsData[2]} />
              </Box>
            </Flex>
          </Flex>

          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={6}
            align="stretch"
            mb={{ base: 6, md: "40px" }}
          >
            {secoundRowData.map((item, idx) => (
              <Box key={idx} flex="1">
                <FeatureStatCard {...item} />
              </Box>
            ))}
          </Flex>
          {/* THIRD ROW: 3 Equal Cards (33/33/33) */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={6}
            align="stretch"
          >
            {lastRowData.map((item, idx) => (
              <Box key={idx} flex="1">
                <FeatureStatCard {...item} />
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default StandsOut;
