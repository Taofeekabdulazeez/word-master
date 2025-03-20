/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from "react";

export function useScrollToBottom(
  elementContainerRef: RefObject<HTMLDivElement | null>,
  deps: any[]
) {
  useEffect(() => {
    if (elementContainerRef.current) {
      elementContainerRef.current.scrollTop =
        elementContainerRef.current.scrollHeight;
    }
  }, [...deps, elementContainerRef]);
}
