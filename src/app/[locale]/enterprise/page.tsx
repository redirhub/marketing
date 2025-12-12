import { Metadata } from "next";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import initTranslations from "@/lib/i18n";
import { getAppName } from "@/lib/utils/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);
  const t = (key: string, fallback: string) => {
    const translation = resources?.[locale]?.common?.[key];
    return translation || fallback;
  };

  return {
    title: `${t("meta.enterprise.title", "Enterprise")} - ${getAppName()}`,
    description: t(
      "meta.enterprise.description",
      "Simple, transparent enterprise for RedirHub"
    ),
  };
}

export default async function PricingPage() {
  return (
    <Box py={20}>
      <Container maxW="7xl" mx="auto">
        <Heading as="h1" size="2xl" mb={4}>
          Enterprise
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Coming soon...
        </Text>
      </Container>
    </Box>
  );
}
