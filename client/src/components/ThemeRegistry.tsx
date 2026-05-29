"use client";

import { useRef, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";

function createEmotionCache() {
  return createCache({
    key: "mui",
    prepend: true,
  });
}

type ThemeRegistryProps = {
  children: React.ReactNode;
};

export default function ThemeRegistry({
  children,
}: ThemeRegistryProps) {
  const [cache] = useState(() => createEmotionCache());
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    const tags = cache.sheet.tags;

    if (!tags.length) {
      return null;
    }

    const styles = tags
      .map((tag) => tag.textContent || "")
      .join("");

    cache.sheet.flush();
    inserted.current = true;

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${Object.keys(
          cache.inserted
        ).join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}