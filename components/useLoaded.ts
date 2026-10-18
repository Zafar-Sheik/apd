"use client";

import { useEffect, useState } from "react";
import { LOADED_EVENT } from "./Preloader";

/** True once the preloader has finished revealing the page. */
export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.loaded === "true") {
      setLoaded(true);
      return;
    }
    const on = () => setLoaded(true);
    window.addEventListener(LOADED_EVENT, on);
    return () => window.removeEventListener(LOADED_EVENT, on);
  }, []);
  return loaded;
}
