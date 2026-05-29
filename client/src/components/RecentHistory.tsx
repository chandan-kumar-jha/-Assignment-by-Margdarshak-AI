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
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { api, Roadmap } from "@/lib/api";

export default function RecentHistory() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  const fetchRoadmaps = async () => {
    try {
      const data = await api.getAll();
      setRoadmaps(data.slice(0, 3));
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

  if (loading) {
    return (
      <Stack spacing={2}>
        <Skeleton
          variant="rounded"
          height={160}
        />
        <Skeleton
          variant="rounded"
          height={160}
        />
      </Stack>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3">
          🗺️
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          No roadmaps yet. Generate your first one!
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2}>
        <Box
            sx={{
             display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
        <Typography variant="h6">
          Recent Roadmaps
        </Typography>

        <Button
          component={Link}
          href="/history"
          size="small"
        >
          View all →
        </Button>
      </Box>

      {roadmaps.map((roadmap) => (
        <Card key={roadmap._id}>
          <CardContent>
            <Stack spacing={1.5}>
             <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600 }}
            >
                {roadmap.targetRole}
              </Typography>

              <Chip
                label={roadmap.experienceLevel}
                color={getChipColor(
                  roadmap.experienceLevel
                )}
                size="small"
                sx={{ width: "fit-content" }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {new Date(
                  roadmap.createdAt
                ).toLocaleDateString()}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {roadmap.currentSkills
                  .slice(0, 4)
                  .map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                    />
                  ))}

                {roadmap.currentSkills.length >
                  4 && (
                  <Chip
                    size="small"
                    label={`+${
                      roadmap.currentSkills
                        .length - 4
                    }`}
                  />
                )}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
              >
                {roadmap.roadmap[1] ||
                  "No roadmap steps"}
              </Typography>
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              component={Link}
              href={`/roadmap/${roadmap._id}`}
              size="small"
            >
              View Roadmap
            </Button>

            <Button
              color="error"
              size="small"
              onClick={() =>
                handleDelete(roadmap._id)
              }
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}