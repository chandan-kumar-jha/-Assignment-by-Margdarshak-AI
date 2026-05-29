"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid";

import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Navbar from "@/components/Navbar";
import RoadmapForm from "@/components/RoadmapForm";
import RecentHistory from "@/components/RecentHistory";

import { Roadmap } from "@/lib/api";

export default function HomePage() {
  const [roadmap, setRoadmap] =
    useState<Roadmap | null>(null);

  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
        }}
      >
        {/* HERO */}

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
              maxWidth:700
            }}
          >
            Generate a personalized
            step-by-step roadmap based on
            your existing skills and your
            dream career path.
          </Typography>
        </Stack>

        {/* MAIN LAYOUT */}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <RoadmapForm
                onGenerated={setRoadmap}
              />

              {roadmap && (
                <Paper sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight:700
                      }}
                    >
                      Generated Roadmap
                    </Typography>

                    <Divider />

                    <Typography
                      variant="subtitle1"
                     sx={{
                      fontWeight:600
                     }}
                    >
                      {roadmap.targetRole}
                    </Typography>

                    <Chip
                      label={
                        roadmap.experienceLevel
                      }
                      color="primary"
                      sx={{
                        width: "fit-content",
                      }}
                    />

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
                              fontWeight:600
                             }}
                            >
                              Step {index + 1}
                            </Typography>

                            <Typography
                              color="text.secondary"
                            >
                              {step}
                            </Typography>
                          </Paper>
                        )
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              )}
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