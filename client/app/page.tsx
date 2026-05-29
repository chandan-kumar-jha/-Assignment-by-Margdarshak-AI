"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import Navbar from "@/components/Navbar";
import RoadmapForm from "@/components/RoadmapForm";
import RecentHistory from "@/components/RecentHistory";
import RoadmapViewer from "@/components/RoadmapViewer";

import { Roadmap } from "@/lib/api";

export default function HomePage() {
  // Load roadmap from localStorage on initial render
  const [roadmap, setRoadmap] =
    useState<Roadmap | null>(() => {
      if (typeof window === "undefined") {
        return null;
      }

      const savedRoadmap =
        localStorage.getItem("latest-roadmap");

      return savedRoadmap
        ? JSON.parse(savedRoadmap)
        : null;
    });

  // Persist roadmap whenever it changes
  useEffect(() => {
    if (roadmap) {
      localStorage.setItem(
        "latest-roadmap",
        JSON.stringify(roadmap)
      );
    }
  }, [roadmap]);

  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
        }}
      >
        {/* Hero Section */}
        <Stack
          spacing={3}
          sx={{
            alignItems: "center",
            textAlign: "center",
            mb: 6,
          }}
        >
          <Chip
            label="🧭 Assignment by Margdarshak AI"
            color="primary"
            variant="outlined"
          />

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
            }}
          >
            Your Career,{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
              }}
            >
              Mapped Out
            </Box>
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 700,
            }}
          >
            Generate a personalized
            step-by-step roadmap based on
            your existing skills and your
            dream career path.
          </Typography>
        </Stack>

        {/* Main Layout */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <RoadmapForm
                onGenerated={setRoadmap}
              />

              <RoadmapViewer
                roadmap={roadmap}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <RecentHistory />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}