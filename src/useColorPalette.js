import { useEffect } from "react";
import palette from "./colors";

const varMap = {
  bg:        "--c-bg",
  card:      "--c-card",
  text:      "--c-text",
  heading:   "--c-heading",
  accent:    "--c-accent",
  highlight: "--c-highlight",
  glow1:     "--c-glow1",
  glow2:     "--c-glow2",
  spark:     "--c-spark",
  hover:     "--c-hover",
};

export default function useColorPalette() {
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, cssVar] of Object.entries(varMap)) {
      if (palette[key]) {
        root.style.setProperty(cssVar, palette[key]);
      }
    }
  }, []);
}
