"use client";

import {
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";

import { Roadmap } from "@/lib/api";

interface RoadmapViewerProps {
  roadmap: Roadmap | null;
  loading?: boolean;
}

export default function RoadmapViewer({
  roadmap,
  loading = false,
}: RoadmapViewerProps) {
  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Skeleton
            variant="text"
            width="40%"
            height={40}
          />

          <Skeleton
            variant="rounded"
            width={120}
            height={32}
          />

          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              variant="rectangular"
              height={80}
            />
          ))}
        </Stack>
      </Paper>
    );
  }

  if (!roadmap) {
    return null;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          Generated Roadmap
        </Typography>

        <Divider />

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          {roadmap.targetRole}
        </Typography>

        <Chip
          label={roadmap.experienceLevel}
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
                    fontWeight: 600,
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
  );
}