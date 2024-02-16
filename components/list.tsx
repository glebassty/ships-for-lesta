"use client";

import { useState, useEffect } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import Selects from "./selects";

interface Ship {
  title: string;
  description: string;
  level: number;
  type: {
    title: string;
    name: string;
  };
  icons: {
    medium: string;
  };
  nation: {
    name: string;
  };
}

const List = () => {
  const { data, loading, error } = useVehicles();

  const [filter, setFilter] = useState<{
    level: string;
    nation: string;
    type: string;
  }>({ level: "", nation: "", type: "" });
  const [sortedVehicles, setSortedVehicles] = useState<Ship[]>([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setSortedVehicles(data.vehicles);
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (!loading && !error && data) {
      let sorted = [...data.vehicles];
      if (filter.level) {
        sorted = sorted.filter(
          (ship) => ship.level.toString() === filter.level
        );
      }
      if (filter.nation) {
        sorted = sorted.filter((ship) => ship.nation?.name === filter.nation);
      }
      if (filter.type) {
        sorted = sorted.filter((ship) => ship.type.name === filter.type);
      }
      setSortedVehicles(sorted);
    }
  }, [filter, loading, error, data]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    filterKey: string
  ) => {
    setFilter({
      ...filter,
      [filterKey]: event.target.value,
    });
  };

  const uniqueLevels = Array.from(
    new Set(data?.vehicles.map((ship: Ship) => ship.level))
  );
  const uniqueNations = Array.from(
    new Set(data?.vehicles.map((ship: Ship) => ship.nation?.name))
  );
  const uniqueTypes = Array.from(
    new Set(data?.vehicles.map((ship: Ship) => ship.type.name))
  );

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Корабли</h1>
        <Selects
          handleFilterChange={handleFilterChange}
          filter={filter}
          uniqueLevels={uniqueLevels}
          uniqueNations={uniqueNations}
          uniqueTypes={uniqueTypes}
        />
        <div className="grid grid-cols-3 gap-4">
          {sortedVehicles.map((ship: Ship) => (
            <div
              key={ship.title}
              className="border p-4 rounded-md bg-blue-400 text-blue-200"
            >
              <img
                src={ship.icons.medium}
                alt={ship.title}
                className="mx-auto mb-2"
              />
              <h2 className="text-2xl font-bold">{ship.title}</h2>
              <p className="text-blue-100 mb-2">{ship.description}</p>
              <p className="text-blue-100">Level: {ship.level}</p>
              <p className="text-blue-100">Type: {ship.type.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
