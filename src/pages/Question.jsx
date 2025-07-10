import { useEffect, useState } from "react";
import { getTodayQuestion } from "../api/questions.js";
import { postAnswer, getAnswers } from "../api/answers.js";
import { addFamilyPoints } from "../api/points.js";

function Question() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [myAnswer, setMyAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const userId = localStorage.getItem("userId");
  const nickname = localStorage.getItem("nickname");
  const code = localStorage.getItem("code");

  useEffect(() => {
    async function fetchData() {
      try {
        const q = await getTodayQuestion(code);
        if (!q?.id) throw new Error("질문 ID가 없습니다.");
        setQuestion(q);

        const a = await getAnswers(q.id);
        setAnswers(a);

        const mine = a.find((ans) => ans.memberId === userId);
        setHasAnswered(!!mine);
      } catch (err) {
        console.error("질문/답변 불러오기 실패:", err);
      }
    }

    if (code && userId) {
      fetchData();
    }
  }, [code, userId]);

  const handleSubmit = async () => {
    if (!myAnswer.trim()) return;

    if (!question || !question.id) {
      alert("질문 정보가 없습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    try {
      await postAnswer(question.id, myAnswer);  // ✔️ 불필요한 인자 제거!

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





