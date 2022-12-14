import {
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

function refreshPage() {
  location.reload();
}

const DeniedComponent = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minH="100vh"
    >
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            bgClip="text"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
          >
            Location Permission Denied
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            We need your location to find the nearest bike to you. Please enable
            location services in your browser.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Button
              rounded={"full"}
              px={6}
              bgGradient="linear(to-l, #F8DD58, #FC855B)"
              _hover={{ bg: "orange.500" }}
              colorScheme="gray.500"
              onClick={refreshPage}
            >
              Click here to try again
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default DeniedComponent;
