-- CreateEnum
CREATE TYPE "weather_part" AS ENUM ('current', 'minutely', 'hourly', 'daily', 'alerts');

-- CreateTable
CREATE TABLE "weather" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "part" "weather_part" NOT NULL,
    "timezone" TEXT NOT NULL,
    "timezone_offset" INTEGER NOT NULL,
    "dt" TIMESTAMP(3) NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "weather_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "weather_lat_lon_part_idx" ON "weather"("lat", "lon", "part");

-- CreateIndex
CREATE UNIQUE INDEX "weather_lat_lon_part_dt_key" ON "weather"("lat", "lon", "part", "dt");
