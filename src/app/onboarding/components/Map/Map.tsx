"use client";

import { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { RegionValue } from "@/app/onboarding/context/regionTypes";
import { REGION_OPTIONS } from "@/app/onboarding/context/regionTypes";
import type { FeatureCollection } from "geojson";

interface RegionProperties {
  CTP_KOR_NM?: string;
  SIDO_KOR_NM?: string;
  name?: string;
  adm_nm?: string;
}

function normalizeToRegionValue(
  props: RegionProperties
): Exclude<RegionValue, "전체" | "해외"> | null {
  const raw =
    props?.CTP_KOR_NM ||
    props?.SIDO_KOR_NM ||
    props?.name ||
    props?.adm_nm ||
    "";

  const map: Record<string, Exclude<RegionValue, "전체" | "해외">> = {
    서울특별시: "서울",
    부산광역시: "부산",
    대구광역시: "대구",
    인천광역시: "인천",
    광주광역시: "광주",
    대전광역시: "대전",
    울산광역시: "울산",
    세종특별자치시: "세종",
    경기도: "경기",
    강원특별자치도: "강원",
    강원도: "강원",
    충청북도: "충북",
    충청남도: "충남",
    전라북도: "전북",
    전북특별자치도: "전북",
    전라남도: "전남",
    경상북도: "경북",
    경상남도: "경남",
    제주특별자치도: "제주",
  };

  if (map[raw]) return map[raw];
  return raw in REGION_OPTIONS
    ? (raw as Exclude<RegionValue, "전체" | "해외">)
    : null;
}

function MapBase({
  geographies,
  value,
  onSelect,
  className,
}: {
  geographies: FeatureCollection | string;
  value: RegionValue | null;
  onSelect: (next: Exclude<RegionValue, "전체" | "해외">) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <ComposableMap
        width={400}
        height={400}
        projection="geoMercator"
        projectionConfig={{ scale: 3000, center: [127.4, 35.8] }}
        style={{ width: 400, height: "auto" }}
      >
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const region = normalizeToRegionValue(geo.properties);

              // 전체 → 모든 시도 하이라이트, 해외 → 하이라이트 없음
              const selected =
                value === "전체"
                  ? !!region
                  : value !== "해외" && region === value;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => region && onSelect(region)}
                  tabIndex={region ? 0 : -1}
                  role="button"
                  aria-pressed={!!selected}
                  onKeyDown={(e) => {
                    if (region && (e.key === "Enter" || e.key === " ")) {
                      onSelect(region);
                    }
                  }}
                  style={{
                    default: {
                      fill: selected ? "rgba(139, 92, 246, 0.2)" : "#ffffff",
                      stroke: "#303030",
                      strokeWidth: 0.9,
                      outline: "none",
                      cursor: region ? "pointer" : "default",
                    },
                    hover: {
                      fill: selected ? "rgba(139, 92, 246, 0.28)" : "#f9fafb",
                      stroke: "#303030",
                      strokeWidth: 0.9,
                      outline: "none",
                      cursor: region ? "pointer" : "default",
                    },
                    pressed: {
                      fill: selected ? "rgba(139, 92, 246, 0.32)" : "#eef2ff",
                      stroke: "#303030",
                      strokeWidth: 0.9,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export const Map = memo(MapBase);
