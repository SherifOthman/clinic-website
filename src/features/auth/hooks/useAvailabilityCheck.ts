"use client";

import { useEffect, useState } from "react";
import type { ApiResult } from "@/src/core/utils/api";

interface Options {
  minLength?: number;
  pattern?: RegExp;
}

export function useAvailabilityCheck(
  debouncedValue: string,
  checkFn: (val: string) => Promise<ApiResult<{ isAvailable: boolean }>>,
  onTaken: () => void,
  options?: Options,
) {
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!debouncedValue) return;
    if (options?.minLength && debouncedValue.length < options.minLength) return;
    if (options?.pattern && !options.pattern.test(debouncedValue)) return;

    let cancelled = false;
    setChecking(true);

    checkFn(debouncedValue).then((res) => {
      if (cancelled) return;
      if (res.ok && !res.data.isAvailable) onTaken();
    }).finally(() => {
      if (!cancelled) setChecking(false);
    });

    return () => { cancelled = true; };
  }, [debouncedValue, checkFn, onTaken, options?.minLength, options?.pattern]);

  return checking;
}
