"use client";

import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from "@mui/material";

import { api, Roadmap } from "@/lib/api";

type RoadmapFormProps = {
  onGenerated: (roadmap: Roadmap) => void;
};

type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export default function RoadmapForm({
  onGenerated,
}: RoadmapFormProps) {
  const [targetRole, setTargetRole] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("beginner");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addSkill = (skill: string) => {
    const value = skill.trim();

    if (!value) return;

    const exists = skills.some(
      (s) => s.toLowerCase() === value.toLowerCase()
    );

    if (exists) return;

    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) =>
      prev.filter((item) => item !== skill)
    );
  };

  const handleSkillKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }

    if (
      e.key === "Backspace" &&
      !skillInput &&
      skills.length > 0
    ) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!targetRole.trim()) {
      setError("Target role is required");
      return;
    }

    if (skills.length === 0) {
      setError("Add at least one skill");
      return;
    }

    try {
      setLoading(true);

      const roadmap = await api.generate({
        targetRole,
        currentSkills: skills,
        experienceLevel,
      });

      onGenerated(roadmap);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack
          component="form"
          spacing={3}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">
            Generate Career Roadmap
          </Typography>

          <TextField
            label="Target Role"
            fullWidth
            placeholder="e.g. Full Stack Developer, Data Scientist..."
            value={targetRole}
            onChange={(e) =>
              setTargetRole(e.target.value)
            }
          />

          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1 }}
            >
              Current Skills
            </Typography>

            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: 1.5,
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                alignItems: "center",
              }}
            >
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() =>
                    removeSkill(skill)
                  }
                />
              ))}

              <TextField
                variant="standard"
                placeholder="Type and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                slotProps={{
                    input: {
                    disableUnderline: true,
                    },
                }}
               />
            </Box>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1 }}
            >
              Experience Level
            </Typography>

            <ToggleButtonGroup
              exclusive
              fullWidth
              value={experienceLevel}
              onChange={(_, value) => {
                if (value) {
                  setExperienceLevel(value);
                }
              }}
            >
              <ToggleButton value="beginner">
                🌱 Beginner
              </ToggleButton>

              <ToggleButton value="intermediate">
                🚀 Intermediate
              </ToggleButton>

              <ToggleButton value="advanced">
                ⚡ Advanced
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={18}
                  color="inherit"
                  sx={{ mr: 1 }}
                />
                Generating...
              </>
            ) : (
              "✨ Generate Roadmap"
            )}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}