"use client";
import React from "react";
import Header from "@/components/Header/header";
import { Schedule } from "@/components/Schedule";
import ProtectedRoute from "@/context/ProtectedRoute";
function Page() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <Header />
      <Schedule />
    </ProtectedRoute>
  );
}

export default Page;
