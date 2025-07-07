import { useEffect, useState } from "react";
import {
  getTodayQuestion,
} from "../api/questions.js"; // 오늘의 질문 관련
import {
  postAnswer,
  getAnswers,
} from "../api/answers.js"; // 답변 관련
import { addFamilyPoints } from "../api/points.js"; // 포인트 관련

function Question() {
  const [question, setQuestion] = useState(null);         // 오늘의 질문
  const [answers, setAnswers] = useState([]);             // 가족 답변 리스트
  const [myAnswer, setMyAnswer] = useState("");           // 내 답변 입력값
  const [hasAnswered, setHasAnswered] = useState(false);  // 답변 완료 여부

  const userId = localStorage.getItem("userId");
  const nickname = localStorage.getItem("nickname");
  const familyCode = localStorage.getItem("familyCode");

  // 오늘의 질문 + 가족 답변 fetch
  useEffect(() => {
    async function fetchData() {
      try {
        const q = await getTodayQuestion(familyCode);
        setQuestion(q);

        const a = await getAnswers(q.id);
        setAnswers(a);

        const mine = a.find((ans) => ans.memberId === userId);
        setHasAnswered(!!mine);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    }

    if (familyCode && userId) {
      fetchData();
    }
  }, [familyCode, userId]);

  // 답변 제출 핸들러
  const handleSubmit = async () => {
    if (!myAnswer.trim()) return;

    try {
      await postAnswer(question.id, myAnswer, nickname);      // nickname 포함
      await addFamilyPoints(familyCode, 50);                  // 포인트 +50

      const updatedAnswers = await getAnswers(question.id);
      setAnswers(updatedAnswers);
      setHasAnswered(true);
      setMyAnswer("");
      alert("답변이 저장되었고, 50포인트를 획득했어요!");
    } catch (err) {
      console.error("답변 제출 실패:", err);
      alert("답변 제출 중 문제가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "16px" }}>📝 오늘의 질문</h2>
      {question ? (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            marginBottom: "24px",
            fontSize: "18px",
          }}
        >
          {question.content}
        </div>
      ) : (
        <p>질문을 불러오는 중...</p>
      )}

      {hasAnswered ? (
        <p style={{ color: "gray", marginBottom: "32px" }}>
          이미 답변을 완료했어요.
        </p>
      ) : (
        <div style={{ marginBottom: "32px" }}>
          <textarea
            value={myAnswer}
            onChange={(e) => setMyAnswer(e.target.value)}
            placeholder={`${nickname}님의 답변을 입력하세요`}
            rows={3}
            style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "8px",
              padding: "10px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            제출하기 (+50P)
          </button>
        </div>
      )}

      <h3>👨‍👩‍👧‍👦 가족들의 답변</h3>
      {answers.length > 0 ? (
        <ul style={{ paddingLeft: "16px" }}>
          {answers.map((ans, i) => (
            <li key={i}>
              <strong>{ans.nickname}</strong>: {ans.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 아무도 답변하지 않았어요!!</p>
      )}
    </div>
  );
}

export default Question;


