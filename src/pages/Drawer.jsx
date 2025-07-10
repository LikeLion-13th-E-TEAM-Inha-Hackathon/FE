import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/questions";
import { getAnswers } from "../api/answers";

function Drawer() {
  const [history, setHistory] = useState([]); // 날짜별 질문+답변 리스트
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(null);

  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    if (!storedCode) {
      console.error("가족 코드 없음");
      return;
    }
    setCode(storedCode);
  }, []);

  useEffect(() => {
    if (!code) return;

    async function fetchHistory() {
      try {
        const allQuestions = await getAllQuestions(code);
        const familyQuestions = allQuestions.filter(
          (q) => q.code === code
        );

        // 날짜 내림차순 정렬
        familyQuestions.sort((a, b) => b.date.localeCompare(a.date));

        const combined = await Promise.all(
          familyQuestions.map(async (q) => {
            const answers = await getAnswers(String(q.id));
            return {
              date: q.date,
              content: q.content,
              answers,
            };
          })
        );

        setHistory(combined);
      } catch (err) {
        console.error("히스토리 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [code]);

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "24px" }}>📚 지난 질문과 답변 모아보기</h2>

      {loading ? (
        <p>불러오는 중...</p>
      ) : history.length === 0 ? (
        <p>아직 기록이 없습니다.</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <h4 style={{ marginBottom: "4px", color: "#777" }}>{item.date}</h4>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              {item.content}
            </p>

            {item.answers.length > 0 ? (
              <ul>
                {item.answers.map((ans, i) => (
                  <li key={i}>
                    <strong>{ans.nickname}</strong>: {ans.content}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "gray" }}>아직 답변이 없습니다.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Drawer;
