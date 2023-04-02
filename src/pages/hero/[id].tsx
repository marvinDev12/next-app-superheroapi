import { Hero, Powerstats } from "@/interfaces/Hero";
import { convertObjectKeysToCamel } from "@/utils/commonUtils";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  CardBody,
  Box,
  Text,
  Center,
  Stack,
  StackDivider,
  IconButton,
  Progress,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export default function HeroPage({ hero }: { hero: Hero }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Profile - {hero.name}</title>
      </Head>
      <Center>
        <Stack mt="10">
          <Flex>
            <IconButton
              variant="outline"
              aria-label="back"
              fontSize="20px"
              onClick={() => router.back()}
              icon={<ArrowBackIcon />}
              mr="auto"
            />
          </Flex>
          <Card w="xl">
            <CardHeader>
              <Flex gap="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="xl" name={hero.name} src={hero.image.url} />
                  <Box>
                    <Heading size="lg">{hero.name}</Heading>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Stack direction="row" divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs">Appearance</Heading>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Gender:</b> {hero.appearance.gender}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Race:</b> {hero.appearance.race}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Height:</b> {hero.appearance.height.join("/")}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Weight:</b> {hero.appearance.weight.join("/")}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Eye Color:</b> {hero.appearance.eyeColor}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Hair Color:</b> {hero.appearance.hairColor}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs">Biography</Heading>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Full Name:</b> {hero.biography.fullName}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Alter Egos:</b> {hero.biography.alterEgos}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Aliases:</b> {hero.biography.aliases.join("/")}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Place of Birth:</b> {hero.biography.placeOfBirth}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>First Appearance:</b> {hero.biography.firstAppearance}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Publisher:</b> {hero.biography.publisher}
                    </Text>
                    <Text pt="2" fontSize="xs" color="gray.500">
                      <b>Alignment:</b> {hero.biography.alignment}
                    </Text>
                  </Box>
                </Stack>
                <Box>
                  <Heading size="xs">Powerstats</Heading>
                  {Object.keys(hero.powerstats).map((key) => (
                    <>
                      <Text pt="2" fontSize="sm">
                        {key}
                      </Text>
                      <Progress
                        value={Number(hero.powerstats[key as keyof Powerstats])}
                      />
                    </>
                  ))}
                </Box>
                <Box>
                  <Heading size="xs">Work</Heading>
                  <Text pt="2" fontSize="xs" color="gray.500">
                    <b>Occupation:</b> {hero.work.occupation}
                  </Text>
                  <Text pt="2" fontSize="xs" color="gray.500">
                    <b>Base:</b> {hero.work.base}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs">Connections</Heading>
                  <Text pt="2" fontSize="xs" color="gray.500">
                    <b>Group Affiliation:</b>{" "}
                    {hero.connections.groupAffiliation}
                  </Text>
                  <Text pt="2" fontSize="xs" color="gray.500">
                    <b>Relatives:</b> {hero.connections.relatives}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const response = await fetch(
    `https://superheroapi.com/api/${ACCESS_TOKEN}/${id}`
  );
  const result = await response.json();

  if (result.response === "error") return { notFound: true };

  const hero = convertObjectKeysToCamel(result);

  return {
    props: {
      hero,
    },
  };
}
