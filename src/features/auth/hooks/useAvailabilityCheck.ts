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
  options?: Options,
) {
  const [state, setState] = useState<{ checking: boolean; taken: boolean }>({ checking: false, taken: false });

  useEffect(() => {
    if (!debouncedValue) { setState({ checking: false, taken: false }); return; }
    if (options?.minLength && debouncedValue.length < options.minLength) { setState({ checking: false, taken: false }); return; }
    if (options?.pattern && !options.pattern.test(debouncedValue)) { setState({ checking: false, taken: false }); return; }

    let cancelled = false;
    setState({ checking: true, taken: false });

    checkFn(debouncedValue).then((res) => {
      if (!cancelled) setState({ checking: false, taken: res.ok && !res.data.isAvailable });
    }).catch(() => {
      if (!cancelled) setState({ checking: false, taken: false });
    });

    return () => { cancelled = true; };
  }, [debouncedValue, options?.minLength, options?.pattern]);

  return state;
}
