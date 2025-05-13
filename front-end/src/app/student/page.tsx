"use client";
import React from "react";
import ProtectedRoute from "@/context/ProtectedRoute";
import Header from "@/component/Header/header";
import { Schedule } from "@/component/Schedule";
function Page() {
  return (
    // <ProtectedRoute allowedRoles={["student"]}>
    //   <div className="min-h-screen bg-gray-100 p-8">
    //     <div className="max-w-4xl mx-auto">
    //       <h1 className="text-3xl font-bold text-blue-600 mb-4">
    //         Student Page
    //       </h1>
    //       <p className="text-gray-600 mb-8">Welcome to the student page!</p>
    //     </div>
    //   </div>
    // </ProtectedRoute>
    <>
      <Header />
      <Schedule />
    </>
  );
}

export default Page;
