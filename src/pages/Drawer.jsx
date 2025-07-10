import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/questions";
import { getAnswers } from "../api/answers";
import Footer from "../components/Footer";

function Drawer() {
  const [history, setHistory] = useState([]);
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
        const familyQuestions = allQuestions.filter((q) => q.code === code);
        familyQuestions.sort((a, b) => b.date.localeCompare(a.date));

        const actual = await Promise.all(
          familyQuestions.map(async (q) => {
            const answers = await getAnswers(String(q.id));
            return {
              date: q.date,
              content: q.content,
              answers,
              isMock: false, // ✅ 실제 데이터
            };
          })
        );

        const mockData = [
          {
            date: "2025-07-10",
            content: "오늘 나를 웃게 한 일은?",
            answers: [
              { nickname: "이보연", content: ": 고양이가 캣타워에서 떨어졌어요ㅋㅋ" },
              { nickname: "지윤", content: ": 친구가 이상한 춤췄어" },
            ],
            isMock: true, // ✅ 목업 표시
          },
          {
            date: "2025-07-09",
            content: "요즘 내가 좋아하는 것 3가지?",
            answers: [
              { nickname: "김진", content: ": 산책, 코딩, 파스타" },
              { nickname: "지윤", content: ": 고양이, 수박, 하늘" },
              { nickname: "이보연", content: ": 독서, 커피, 산책" },
            ],
            isMock: true,
          },
          {
            date: "2025-07-08",
            content: "우리 가족 여행 가고 싶은 곳은?",
            answers: [
              { nickname: "강태은", content: ": 제주도! 바다 보고 싶어요" },
              { nickname: "지윤", content: ": 오사카~ 유니버셜 가자!" },
              { nickname: "김진", content: ": 속초. 조용해서 좋더라" },
            ],
            isMock: true,
          },
        ];

        // ✅ 실제 + 목업 데이터를 합쳐서 최신순 정렬
        const allCombined = [...actual, ...mockData].sort(
          (a, b) => b.date.localeCompare(a.date)
        );

        setHistory(allCombined);
      } catch (err) {
        console.error("히스토리 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [code]);

  return (
    <>
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
                {item.isMock && (
                  <span style={{ color: "#888", fontSize: "14px" }}>
                    {" "}
                    (※ 목업 데이터입니다)
                  </span>
                )}
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

      <Footer />
    </>
  );
}

export default Drawer;

