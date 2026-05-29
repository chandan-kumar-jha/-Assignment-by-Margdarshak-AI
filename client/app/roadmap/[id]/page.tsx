"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Navbar from "@/components/Navbar";
import { api, Roadmap } from "@/lib/api";

export default function RoadmapDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [roadmap, setRoadmap] =
    useState<Roadmap | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!id) return;

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getOne(id);
      setRoadmap(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load roadmap"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchRoadmap();
}, [id]);

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

      <Container
        maxWidth="md"
        sx={{ py: 4 }}
      >
        <Button
          component={Link}
          href="/history"
          sx={{ mb: 3 }}
        >
          ← Back to History
        </Button>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            {error}
          </Alert>
        ) : !roadmap ? (
          <Alert severity="warning">
            Roadmap not found
          </Alert>
        ) : (
          <Paper sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="h4"
                 sx={{
                    fontWeight:700
                 }}
                  gutterBottom
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
                />
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Created on{" "}
                {new Date(
                  roadmap.createdAt
                ).toLocaleString()}
              </Typography>

              <Divider />

              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Current Skills
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
                      />
                    )
                  )}
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Career Roadmap
                </Typography>

                <Stack spacing={2}>
                  {roadmap.roadmap.map(
                    (step, index) => (
                      <Paper
                        key={index}
                        variant="outlined"
                        sx={{
                          p: 2,
                        }}
                      >
                        <Typography
                         sx={{
                            fontWeight:700
                         }}
                          gutterBottom
                        >
                          Step {index + 1}
                        </Typography>

                        <Typography color="text.secondary">
                          {step}
                        </Typography>
                      </Paper>
                    )
                  )}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        )}
      </Container>
    </>
  );
}