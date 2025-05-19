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
import { Grid } from "@mui/material";
import DefaultLayout from "@/component/DefaultLayout/DefaultLayout";
import { Schedule } from "@/component/Schedule";

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
    <>
      <DefaultLayout>
        <Grid display={"flex"} flexDirection={"column"} height={"100%"}>
          <Schedule />
          <div className="min-h-screen  p-8">
            <ChartComponent id="charts" primaryXAxis={primaryxAxis}>
              <Inject
                services={[ColumnSeries, Tooltip, LineSeries, Category]}
              />
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
      </DefaultLayout>
    </>
  );
}

export default Page;
