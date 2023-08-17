"use client";
// Custom Query Client Provider
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DialogProvider } from "@/context/DialogContext";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TabScrollTopContextProvider } from "@/context/TabScrollTopContext";
import AnalyticsTrackingEventsProvider from "./AnalyticsTrackingEventsProvider";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 5 } } })
  );

  return (
    <AnalyticsTrackingEventsProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <DialogProvider>
            <TabScrollTopContextProvider>
              <UserProvider>{children}</UserProvider>
            </TabScrollTopContextProvider>
          </DialogProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AnalyticsTrackingEventsProvider>
  );
}

export default Providers;
