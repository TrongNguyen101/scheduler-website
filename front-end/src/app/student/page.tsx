"use client";
import React from "react";
import Header from "@/component/Header/header";
import { Schedule } from "@/component/Schedule";
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
