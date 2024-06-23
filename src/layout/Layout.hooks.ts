import React from "react";

export const useSidebarExpanded = (() => {
  const setFnList: ((val: boolean) => void)[] = [];
  return () => {
    const [expanded, setExpanded] = React.useState(true);
    setFnList.push(setExpanded);
    return [
      expanded,
      (val: boolean) => setFnList.forEach((fn) => fn(val)),
    ] as const;
  };
})();
