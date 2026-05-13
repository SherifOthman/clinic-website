"use client";

import { useEffect, useRef, useState } from "react";
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
  const checkFnRef = useRef(checkFn);
  checkFnRef.current = checkFn;
  const onTakenRef = useRef(onTaken);
  onTakenRef.current = onTaken;

  useEffect(() => {
    if (!debouncedValue) return;
    if (options?.minLength && debouncedValue.length < options.minLength) return;
    if (options?.pattern && !options.pattern.test(debouncedValue)) return;

    let cancelled = false;
    setChecking(true);

    checkFnRef.current(debouncedValue).then((res) => {
      if (cancelled) return;
      if (res.ok && !res.data.isAvailable) onTakenRef.current();
    }).finally(() => {
      if (!cancelled) setChecking(false);
    });

    return () => { cancelled = true; };
  }, [debouncedValue, options?.minLength, options?.pattern]);

  return checking;
}
