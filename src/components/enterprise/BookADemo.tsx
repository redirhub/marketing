import { Box, Container, Heading } from "@chakra-ui/react";
import { getT } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";

const BookADemo = async ({ locale }: { locale: string }) => {
  const t = getT(locale);
  const typeformUrl =
    "https://form.typeform.com/to/b8G7n6nh?typeform-embed-id=061521929204578885&typeform-embed=embed-widget&typeform-source=managed-builder.redirhub.com&typeform-medium=snippet&typeform-medium-version=next&embed-opacity=100&typeform-embed-handles-redirect=1&typeform-embed-no-heading=true";
  return (
    <>
      <Box w="100%" py={{ base: 10, md: 16 }} bg={"#f2f4ef"}>
        <Container maxW="5xl" mx="auto" px={{ base: 4, md: 0 }}>
          <Heading
            textAlign="center"
            color="#344054"
            fontWeight={500}
            fontSize={{ base: "2.2rem", md: "3rem" }}
            letterSpacing={"0.4px"}
            lineHeight={{base: '40px', md: 'auto'}}
            mb={{ base: 6, md: 12 }}
          >
            {t("enterprise.book-demo", "Book a demo with {{n}}", { n: APP_NAME })}
          </Heading>
          <Box
            w="100%"
            h={{ base: "450px", md: "500px" }}
            borderRadius="24px"
            overflow="hidden"
            bg="white"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <iframe
              src={typeformUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="camera; microphone; autoplay; encrypted-media; fullscreen;"
              title="RedirHub Demo Booking"
              style={{ border: "none" }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BookADemo;
