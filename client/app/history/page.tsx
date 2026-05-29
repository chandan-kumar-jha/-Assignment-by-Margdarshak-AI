"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";

import Navbar from "@/components/Navbar";
import { api, Roadmap } from "@/lib/api";

export default function HistoryPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);




     useEffect(() => {
    const fetchRoadmaps = async () => {
     try {
      const data = await api.getAll();
      setRoadmaps(data);
        } catch (error) {
      console.error(error);
        } finally {
      setLoading(false);
        }
     };

     fetchRoadmaps();
    }, []);
 
  const handleDelete = async (id: string) => {
    try {
      await api.delete(id);

      setRoadmaps((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getChipColor = (
    level: Roadmap["experienceLevel"]
  ) => {
    switch (level) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
        >
          Roadmap History
        </Typography>

       {loading ? (
  <Stack spacing={2}>
    {[1, 2, 3, 4].map((item) => (
      <Card key={item}>
        <CardContent>
          <Stack spacing={1.5}>
            <Skeleton
              variant="text"
              width="40%"
              height={35}
            />

            <Skeleton
              variant="rounded"
              width={110}
              height={28}
            />

            <Skeleton
              variant="text"
              width="35%"
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Skeleton
                variant="rounded"
                width={70}
                height={24}
              />
              <Skeleton
                variant="rounded"
                width={90}
                height={24}
              />
              <Skeleton
                variant="rounded"
                width={80}
                height={24}
              />
            </Box>
          </Stack>
        </CardContent>

        <CardActions>
          <Skeleton
            variant="rounded"
            width={70}
            height={32}
          />

          <Skeleton
            variant="rounded"
            width={70}
            height={32}
          />
        </CardActions>
      </Card>
    ))}
  </Stack>
) :  roadmaps.length === 0 ? (
          <Typography color="text.secondary">
            No roadmaps found.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {roadmaps.map((roadmap) => (
              <Card key={roadmap._id}>
                <CardContent>
                  <Stack spacing={1}>
                   <Typography
                     variant="h6"
                     sx={{
                        fontWeight: 600,
                    }}
                    >
                      {roadmap.targetRole}
                    </Typography>

                    <Chip
                      label={
                        roadmap.experienceLevel
                      }
                      color={getChipColor(
                        roadmap.experienceLevel
                      )}
                      size="small"
                      sx={{
                        width: "fit-content",
                      }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Created:
                      {" "}
                      {new Date(
                        roadmap.createdAt
                      ).toLocaleString()}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {roadmap.currentSkills.map(
                        (skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                          />
                        )
                      )}
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions>
                  <Button
                    component={Link}
                    href={`/roadmap/${roadmap._id}`}
                  >
                    View
                  </Button>

                  <Button
                    color="error"
                    onClick={() =>
                      handleDelete(
                        roadmap._id
                      )
                    }
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
}