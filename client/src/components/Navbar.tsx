"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "text.primary",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🗺️ Mini Margdarshak AI
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            component={Link}
            href="/"
            variant={pathname === "/" ? "contained" : "text"}
            color="primary"
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            href="/history"
            variant={pathname === "/history" ? "contained" : "text"}
            color="primary"
          >
            History
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}