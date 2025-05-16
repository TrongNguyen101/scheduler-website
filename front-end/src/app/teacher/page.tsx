"use client";
import React from "react";
import ProtectedRoute from "@/context/ProtectedRoute";
import { registerSyncfusionLicense } from "@/utils/registerLicense";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import Header from "@/component/Header/header";
import { Sidebar } from "@/component/Sidebar";
import { Grid } from "@mui/material";

registerSyncfusionLicense();

function Page() {
  const data: object = [
    { x: 1, y: 10 },
    { x: 10, y: 50 },
    { x: 100, y: 100 },
  ];
  type ValueType = "DateTime" | "Double" | "Category" | "Logarithmic";

  const primaryxAxis: { valueType: ValueType } = { valueType: "Category" };
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <Header />
      <Grid display={"flex"} flexDirection={"row"} height={"100%"}>
        <Sidebar />

        <div className="min-h-screen  p-8">
          <ChartComponent id="charts" primaryXAxis={primaryxAxis}>
            <Inject services={[ColumnSeries, Tooltip, LineSeries, Category]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={data}
                xName="x"
                yName="y"
                name="Sales"
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </Grid>
    </ProtectedRoute>
  );
}

export default Page;
