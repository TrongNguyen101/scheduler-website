"use client";
import React from "react";
import { Grid } from "@mui/material";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout";
import { Schedule } from "@/components/Schedule";

function Page() {
  return (
    // Using ProtectedRoute to author with allowedRoles Teacher
    <>
      {/* DefaultLayout is main layout for teacher and student */}
      <DefaultLayout>
        <Grid display={"flex"} flexDirection={"column"} height={"100%"}>
          <Schedule />
        </Grid>
      </DefaultLayout>
    </>
  );
}

export default Page;
