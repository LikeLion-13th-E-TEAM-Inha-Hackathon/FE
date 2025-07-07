import { useEffect, useState } from "react";
import { getFamilyPoints, deductFamilyPoints } from "../api/points";
import Footer from "../components/Footer";
import "../styles/Home.css";

// 이미지들
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
  const [points, setPoints] = useState(0);
  const [wateringCount, setWateringCount] = useState(0);
  const [plantImage, setPlantImage] = useState(stage1);
  const [plantStage, setPlantStage] = useState(1);
  const [isWatering, setIsWatering] = useState(false);

  const code = localStorage.getItem("code");
  const plantType = localStorage.getItem("plantType"); // strawberry, tomato, sunflower

  useEffect(() => {
    fetchPoints();
  }, []);

  useEffect(() => {
    updatePlantImage();
  }, [wateringCount]);

  const fetchPoints = async () => {
    try {
      const data = await getFamilyPoints(code);
      setPoints(data.points || 0);
    } catch (err) {
      console.error("포인트 불러오기 실패:", err);
    }
  };

  const handleWater = async () => {
    if (points < 100) {
      alert("포인트가 부족합니다! 😢");
      return;
    }

    setIsWatering(true);

    setTimeout(async () => {
      try {
        await deductFamilyPoints(code, 100);
        setPoints((prev) => prev - 100);
        setWateringCount((prev) => prev + 1);
      } catch (err) {
        console.error("물주기 실패:", err);
      } finally {
        setIsWatering(false);
      }
    }, 1000);
  };

  const updatePlantImage = () => {
    let img = stage1;
    let stage = 1;

    if (wateringCount >= 3 && wateringCount < 5) {
      img = stage2;
      stage = 2;
    } else if (wateringCount >= 5 && wateringCount < 7) {
      stage = 3;
      if (plantType === "sunflower") img = sunflower3;
      else if (plantType === "strawberry") img = strawberry3;
      else if (plantType === "tomato") img = tomato3;
    } else if (wateringCount >= 7) {
      stage = 4;
      if (plantType === "sunflower") img = sunflower4;
      else if (plantType === "strawberry") img = strawberry4;
      else if (plantType === "tomato") img = tomato4;
    }

    setPlantImage(img);
    setPlantStage(stage);
  };

  return (
    <div className="home-container">
      <h2>🏡 가족 홈</h2>
      <p className="point-display">
        현재 가족 포인트: <strong>{points}P</strong>
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

