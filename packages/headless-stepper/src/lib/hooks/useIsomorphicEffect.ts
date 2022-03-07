import React from "react";
import { isClient } from "../utils";

const useIsomorphicEffect = isClient ? React.useLayoutEffect : React.useEffect;

export { useIsomorphicEffect };
