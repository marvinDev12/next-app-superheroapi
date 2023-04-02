import { Hero } from "@/interfaces/Hero";
import {
  Input,
  Box,
  Center,
  Stack,
  Grid,
  Flex,
  Text,
  Spinner,
  Heading,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Index() {
  const [searchKey, setSearchKey] = useState("");
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const doSearch = async () => {
    await fetch(`/api/search?searchKey=${searchKey}`)
      .then(async (response) => {
        if (!response.ok) throw new Error();

        return response.json();
      })
      .then((result: { heroes: Hero[] }) => setHeroes(result.heroes))
      .catch((error: unknown) => {
        toast({
          status: "error",
          title: "Error",
          duration: 2000,
        });
      });

    setIsLoading(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    await doSearch();
  };

  return (
    <>
      <Head>
        <title>Superhero - Search</title>
      </Head>
      <Box h="100%" w="100%" display="block">
        <Center>
          <Stack padding={2} w="70%">
            <Box height="10vh" width="50%">
              <form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="searchKey"
                  value={searchKey}
                  placeholder="Search hero by name"
                  size="lg"
                  onChange={(event) => setSearchKey(event.target.value)}
                />
              </form>
            </Box>
            <Box
              height="80vh"
              overflow="auto"
              border="1px solid"
              borderColor="gray.200"
            >
              <Center>
                {isLoading && (
                  <Box
                    zIndex={99}
                    position="fixed"
                    top="50%"
                    bottom="50%"
                    height="100%"
                  >
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Box>
                )}
                {!isLoading && heroes.length === 0 && (
                  <Box zIndex={99} mt="200" height="100%">
                    <Heading color="gray.500">Empty results</Heading>
                  </Box>
                )}
              </Center>
              <Grid templateColumns="repeat(6, 1fr)" gap={1} padding={2}>
                {heroes &&
                  heroes.map((hero) => (
                    <Link key={hero.id} href={`/hero/${hero.id}`}>
                      <Flex key={hero.id} direction="column">
                        <Image
                          alt={hero.name}
                          width={150}
                          height={200}
                          style={{
                            width: "150px",
                            height: "200px",
                          }}
                          src={hero.image.url}
                        />
                        <Text>{hero.name}</Text>
                      </Flex>
                    </Link>
                  ))}
              </Grid>
            </Box>
          </Stack>
        </Center>
      </Box>
    </>
  );
}
