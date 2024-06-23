import { useMediaQuery } from "./use-media-query";
import vars from "../scss/vars.module.scss";

export const useIsMobile = (overwrite?: string) => {
  return useMediaQuery(`(max-width: ${overwrite || vars.sm})`);
};
