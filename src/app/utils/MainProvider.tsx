"use client";
import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import store from "@/redux/stre";
const queryClient = new QueryClient()

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default MainProvider;
