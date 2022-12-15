import { useState } from "react";
import axios from "axios";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import usePlantStore from "../store/plants";
import PlantCard from "./PlantCard";
import { getAllPlants } from "../utils/helpers";

const PlantsGrid = () => {
  const [loading, setLoading] = useState(true);
  const plants = usePlantStore((state) => state.plants);
  const setPlants = usePlantStore((state) => state.setPlants);
  const [plantTypes, setPlantTypes] = useState(["All", "Cactus", "Araceae"]);
  const [selectedPlantType, setSelectedPlantType] = useState(plantTypes[0]);

  const [feature, setFeatured] = useState([false, true]);
  const [selectedFeatured, setSelectedFeatured] = useState(feature[0]);

  useEffect(() => {
    let filterObj = {
      type: selectedPlantType,
      featured: selectedFeatured,
    };

    console.log(selectedFeatured + "howdy");
    async function getAndSetPlants(filter) {
      const plantsFromDb = await getAllPlants(filter);
      setPlants(plantsFromDb);
      setLoading(false);
    }
    getAndSetPlants(filterObj);
  }, [selectedPlantType, selectedFeatured]);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 0.5,
              height: "60px",
            }}
          >
            <label for="plantTypes">Choose a type:</label>

            <select
              name="plantTypes"
              id="plantTypes"
              value={selectedPlantType}
              onChange={(e) => setSelectedPlantType(e.target.value)}
              style={{ width: "150px" }}
            >
              {plantTypes.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 0.5,
              height: "60px",
            }}
          >
            <label for="featured">Featured:</label>
            <select
              name="featured"
              id="featured"
              value={selectedFeatured}
              onChange={(e) => setSelectedFeatured(e.target.value)}
            >
              {feature.map((featured, index) => {
                return (
                  <option key={index} value={featured}>
                    {featured + ""}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default PlantsGrid;
