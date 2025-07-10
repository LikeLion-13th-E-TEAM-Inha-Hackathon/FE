import { useEffect, useState } from "react";
import { getFamilyPoints, deductFamilyPoints } from "../api/points";
import { getPlantStatus } from "../api/plant";
import Footer from "../components/Footer";
import "../styles/Home.css";

import windowBg from "../assets/window_shelf.png";
import stage1 from "../assets/plant_stage1.png";
import stage2 from "../assets/plant_stage2.png";
import sunflower3 from "../assets/sunflower_stage3.png";
import sunflower4 from "../assets/sunflower_stage4.png";
import strawberry3 from "../assets/strawberry_stage3.png";
import strawberry4 from "../assets/strawberry_stage4.png";
import tomato3 from "../assets/tomato_stage3.png";
import tomato4 from "../assets/tomato_stage4.png";

function Home() {
  const [seeds, setSeeds] = useState(0);
  const [growLevel, setGrowLevel] = useState(0);
  const [plantImage, setPlantImage] = useState(stage1);
  const [plantStage, setPlantStage] = useState(1);
  const [isWatering, setIsWatering] = useState(false);
  const [plantType, setPlantType] = useState(""); // sunflower, tomato, strawberry

  const code = localStorage.getItem("code");

  useEffect(() => {
    if (!code) return; // ✅ code 없으면 fetch하지 않음
    fetchPoints();
    fetchPlantStatus();
  }, [code]);

  useEffect(() => {
    if (plantType) {
      updatePlantImage(growLevel, plantType);
    }
  }, [growLevel, plantType]);

  const fetchPoints = async () => {
    try {
      const data = await getFamilyPoints(code);
      setSeeds(data.seeds ?? 0); // ✅ null 대비
    } catch (err) {
      console.error("포인트 불러오기 실패:", err);
    }
  };

  const fetchPlantStatus = async () => {
    try {
      const data = await getPlantStatus(code);
      setGrowLevel(data.growLevel ?? 0); // ✅ 0도 유효하게
      setPlantType(data.type || "");
    } catch (err) {
      console.error("식물 상태 불러오기 실패:", err);
    }
  };

  const handleWater = async () => {
    if (seeds < 100) {
      alert("포인트가 부족합니다! 😢");
      return;
    }

    setIsWatering(true);

    setTimeout(async () => {
      try {
        const result = await deductFamilyPoints(code); // POST /plant/water
        setSeeds(result.seeds ?? 0);
        setGrowLevel(result.growLevel ?? 0); // ✅ 0도 포함
      } catch (err) {
        console.error("물주기 실패:", err);
      } finally {
        setIsWatering(false);
      }
    }, 1000);
  };

  const updatePlantImage = (level, type) => {
    let img = stage1;
    let stage = 1;

    if (level === 0) {
      img = stage1;
      stage = 1;
    } else if (level === 1) {
      img = stage2;
      stage = 2;
    } else if (level === 2) {
      stage = 3;
      if (type === "sunflower") img = sunflower3;
      else if (type === "strawberry") img = strawberry3;
      else if (type === "tomato") img = tomato3;
    } else if (level === 3) {
      stage = 4;
      if (type === "sunflower") img = sunflower4;
      else if (type === "strawberry") img = strawberry4;
      else if (type === "tomato") img = tomato4;
    }

    setPlantImage(img);
    setPlantStage(stage);
  };

  // ✅ code 없을 때는 렌더링 방어
  if (!code) {
    return (
      <div className="home-container">
        <h2>🏡 가족 홈</h2>
        <p>가족 코드 정보를 불러오고 있어요... ⏳</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2>🏡 가족 홈</h2>
      <p className="point-display">
        현재 가족 포인트: <strong>{seeds}P</strong>
      </p>

      <div className="plant-scene">
        <img src={windowBg} alt="창가 배경" className="window-bg" />
        <img
          src={plantImage}
          alt="화분"
          className={`plant-img plant-stage${plantStage} ${isWatering ? "shake" : ""}`}
        />
        {isWatering && <div className="drop">💧</div>}
      </div>

      <button className="water-btn" onClick={handleWater}>
        💧 물주기 (-100P)
      </button>
    </div>
  );
}

export default Home;


