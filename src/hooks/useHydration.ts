"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the component is hydrated (client-side rendered)
 * Returns true if the component is rendered on the client side, false during SSR
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // This effect will only run on the client, after hydration
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
}