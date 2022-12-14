import { useState } from "react";
import { useEffect } from "react";
import usePlantStore from "../store/plants";
import PlantCard from "./PlantCard";
import { getAllPlants } from "../utils/helpers";

const PlantsGrid = () => {
  const [loading, setLoading] = useState(true);
  const plants = usePlantStore((state) => state.plants);
  const setPlants = usePlantStore((state) => state.setPlants);

  useEffect(() => {
    async function getAndSetPlants() {
      const plantsFromDb = await getAllPlants();
      setPlants(plantsFromDb);
      setLoading(false);
    }
    getAndSetPlants();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        plants.map((plant) => <PlantCard plant={plant} key={plant.id} />)
      )}
    </div>
  );
};

export default PlantsGrid;
