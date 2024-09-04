"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ProvidersState } from "../../../types";

export function Providers({ children }: ProvidersState) {
  return <Provider store={store}>{children}</Provider>;
}
