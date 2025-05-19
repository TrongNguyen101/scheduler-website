"use client";
import React from "react";
import Header from "@/component/Header/header";
import { Schedule } from "@/component/Schedule";
import ProtectedRoute from "@/context/ProtectedRoute";
import FormCreateUser from "@/component/Form/FormCreateUser";
function Page() {
  return (
    <>
      <FormCreateUser />

      <Header />
      <Schedule />
    </>
  );
}

export default Page;
