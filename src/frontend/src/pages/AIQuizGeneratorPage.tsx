import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
import { useActor } from "@/hooks/useActor";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  Timer,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

type QBank = Record<string, Record<string, Question[]>>;

const questionBank: QBank = {
  Mathematics: {
    Algebra: [
      {
        q: "If 2x + 5 = 15, find x.",
        options: ["3", "5", "7", "10"],
        correct: 1,
        explanation: "2x = 15 - 5 = 10, x = 5",
      },
      {
        q: "What is the value of x² - 9 when x = 4?",
        options: ["7", "16", "25", "13"],
        correct: 0,
        explanation: "4² - 9 = 16 - 9 = 7",
      },
      {
        q: "Factorize: x² + 5x + 6",
        options: ["(x+2)(x+3)", "(x+1)(x+6)", "(x-2)(x-3)", "(x+6)(x-1)"],
        correct: 0,
        explanation: "Factors of 6 that sum to 5: 2 and 3",
      },
      {
        q: "Solve: 3(x - 2) = 12",
        options: ["x = 2", "x = 4", "x = 6", "x = 8"],
        correct: 2,
        explanation: "3x - 6 = 12, 3x = 18, x = 6",
      },
      {
        q: "The sum of two numbers is 20 and their difference is 4. Find the larger number.",
        options: ["10", "12", "14", "8"],
        correct: 1,
        explanation: "(a+b)=20, (a-b)=4 → a=12",
      },
      {
        q: "What is the HCF of 12 and 18?",
        options: ["3", "4", "6", "9"],
        correct: 2,
        explanation: "12=2²×3, 18=2×3², HCF=2×3=6",
      },
      {
        q: "Simplify: (a+b)² - (a-b)²",
        options: ["4ab", "2ab", "a²-b²", "4a²"],
        correct: 0,
        explanation: "= a²+2ab+b² - (a²-2ab+b²) = 4ab",
      },
      {
        q: "If a:b = 3:4, what is (a+b):(a-b)?",
        options: ["7:1", "7:-1", "1:7", "3:1"],
        correct: 0,
        explanation:
          "a=3k, b=4k → (7k):(-k) in terms of ratio 7:(-1), but for a>b, a+b=7k, a-b=-k abs is 7:1",
      },
      {
        q: "Find x: x/3 + x/4 = 7",
        options: ["10", "12", "14", "16"],
        correct: 1,
        explanation: "7x/12 = 7, x = 12",
      },
      {
        q: "The LCM of 4, 6, and 12 is:",
        options: ["12", "24", "48", "36"],
        correct: 0,
        explanation: "12 is divisible by 4, 6, and 12",
      },
      {
        q: "What is (x+y)² expanded?",
        options: ["x²+y²", "x²+2xy+y²", "x²-2xy+y²", "2x+2y"],
        correct: 1,
        explanation: "Standard identity: (a+b)²=a²+2ab+b²",
      },
      {
        q: "If 5x - 3 = 22, then x = ?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "5x = 25, x = 5",
      },
      {
        q: "What is the product of roots of x² - 5x + 6 = 0?",
        options: ["5", "-5", "6", "-6"],
        correct: 2,
        explanation: "By Vieta's: product of roots = c/a = 6/1 = 6",
      },
      {
        q: "Solve: |x - 3| = 5",
        options: ["x=8 only", "x=-2 only", "x=8 or x=-2", "x=2 or x=8"],
        correct: 2,
        explanation: "x-3=5 gives x=8; x-3=-5 gives x=-2",
      },
      {
        q: "The reciprocal of (2/5) is:",
        options: ["5/2", "2/5", "0.4", "10"],
        correct: 0,
        explanation: "Reciprocal flips numerator and denominator",
      },
    ],
    Geometry: [
      {
        q: "The sum of angles in a triangle is:",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        explanation: "Sum of interior angles of a triangle = 180°",
      },
      {
        q: "Area of a circle with radius 7 cm:",
        options: ["154 cm²", "44 cm²", "49 cm²", "22 cm²"],
        correct: 0,
        explanation: "πr² = (22/7)×7×7 = 154 cm²",
      },
      {
        q: "In a right triangle, if base=3 and height=4, hypotenuse=?",
        options: ["5", "6", "7", "12"],
        correct: 0,
        explanation: "By Pythagoras: 3²+4²=9+16=25, √25=5",
      },
      {
        q: "The perimeter of a square with side 8 cm:",
        options: ["32 cm", "64 cm", "16 cm", "24 cm"],
        correct: 0,
        explanation: "4 × 8 = 32 cm",
      },
      {
        q: "How many diagonals does a hexagon have?",
        options: ["6", "8", "9", "12"],
        correct: 2,
        explanation: "n(n-3)/2 = 6×3/2 = 9",
      },
    ],
  },
  Physics: {
    Mechanics: [
      {
        q: "Newton's 2nd law states: F = ?",
        options: ["mv", "ma", "mv²", "m/a"],
        correct: 1,
        explanation: "F = ma (Force = mass × acceleration)",
      },
      {
        q: "SI unit of force is:",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        correct: 2,
        explanation: "Newton (N) = kg·m/s²",
      },
      {
        q: "A body at rest has what kind of energy?",
        options: ["Kinetic", "Potential", "Thermal", "Both A&B"],
        correct: 1,
        explanation: "Object at height has gravitational potential energy",
      },
      {
        q: "g (acceleration due to gravity) ≈ ?",
        options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "11 m/s²"],
        correct: 1,
        explanation: "g ≈ 9.8 m/s² on Earth's surface",
      },
      {
        q: "Momentum = ?",
        options: [
          "force × time",
          "mass × velocity",
          "mass × acceleration",
          "force × distance",
        ],
        correct: 1,
        explanation: "p = mv (mass × velocity)",
      },
    ],
    "Waves & Light": [
      {
        q: "Speed of light in vacuum:",
        options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
        correct: 1,
        explanation: "c ≈ 3×10⁸ m/s",
      },
      {
        q: "Which color has the highest frequency in visible light?",
        options: ["Red", "Yellow", "Green", "Violet"],
        correct: 3,
        explanation: "VIBGYOR: Violet has highest frequency",
      },
      {
        q: "Sound cannot travel through:",
        options: ["Water", "Steel", "Vacuum", "Air"],
        correct: 2,
        explanation: "Sound needs a medium; vacuum has no particles",
      },
      {
        q: "Frequency × Wavelength = ?",
        options: ["Amplitude", "Speed", "Energy", "Period"],
        correct: 1,
        explanation: "v = fλ (wave equation)",
      },
      {
        q: "Concave mirror is used in:",
        options: [
          "Rear-view mirrors",
          "Headlights",
          "Periscopes",
          "Kaleidoscopes",
        ],
        correct: 1,
        explanation: "Concave mirrors converge light — used in headlights",
      },
    ],
  },
  Chemistry: {
    "Periodic Table": [
      {
        q: "Atomic number of Carbon is:",
        options: ["4", "6", "8", "12"],
        correct: 1,
        explanation: "Carbon (C) has atomic number 6 (6 protons)",
      },
      {
        q: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct: 2,
        explanation: "Nitrogen makes up ~78% of atmosphere",
      },
      {
        q: "Chemical formula of water is:",
        options: ["H₂O₂", "HO", "H₂O", "H₃O"],
        correct: 2,
        explanation: "Water = 2 Hydrogen + 1 Oxygen = H₂O",
      },
      {
        q: "pH of pure water at 25°C is:",
        options: ["0", "7", "14", "5"],
        correct: 1,
        explanation: "Pure water is neutral, pH = 7",
      },
      {
        q: "Alkali metals are in which group?",
        options: ["Group 1", "Group 2", "Group 17", "Group 18"],
        correct: 0,
        explanation: "Alkali metals (Li, Na, K...) are in Group 1",
      },
    ],
  },
  "Computer Science": {
    Programming: [
      {
        q: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correct: 2,
        explanation:
          "Binary search halves the search space each step: O(log n)",
      },
      {
        q: "Which data structure uses LIFO?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correct: 1,
        explanation: "Stack: Last In First Out",
      },
      {
        q: "What does RAM stand for?",
        options: [
          "Random Access Memory",
          "Read Access Memory",
          "Remote Access Module",
          "Run Access Module",
        ],
        correct: 0,
        explanation: "RAM = Random Access Memory",
      },
      {
        q: "HTML stands for:",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Transfer Markup Link",
          "Hot Text Markup Language",
        ],
        correct: 0,
        explanation: "HTML = HyperText Markup Language",
      },
      {
        q: "Which sorting algorithm has best average case O(n log n)?",
        options: [
          "Bubble Sort",
          "Insertion Sort",
          "Merge Sort",
          "Selection Sort",
        ],
        correct: 2,
        explanation: "Merge Sort consistently runs in O(n log n)",
      },
    ],
  },
  History: {
    "Indian History": [
      {
        q: "India gained independence in:",
        options: ["1945", "1947", "1950", "1952"],
        correct: 1,
        explanation: "India became independent on 15 August 1947",
      },
      {
        q: "Who is known as the Father of the Nation of India?",
        options: ["Nehru", "Patel", "Gandhi", "Bose"],
        correct: 2,
        explanation: "Mahatma Gandhi is the Father of the Nation",
      },
      {
        q: "The Mughal Empire was founded by:",
        options: ["Akbar", "Humayun", "Babur", "Aurangzeb"],
        correct: 2,
        explanation: "Babur founded the Mughal Empire in 1526",
      },
      {
        q: "Constitution of India came into effect on:",
        options: ["15 Aug 1947", "26 Jan 1950", "2 Oct 1952", "26 Jan 1947"],
        correct: 1,
        explanation: "Republic Day: 26 January 1950",
      },
      {
        q: "Which movement was launched in 1942?",
        options: [
          "Non-cooperation",
          "Civil Disobedience",
          "Quit India",
          "Swadeshi",
        ],
        correct: 2,
        explanation: "Quit India Movement was launched by Gandhi in 1942",
      },
    ],
  },
  English: {
    Grammar: [
      {
        q: "Which is a proper noun?",
        options: ["city", "happiness", "Gyan Tarang", "table"],
        correct: 2,
        explanation:
          "Proper nouns are specific names; Gyan Tarang is a specific platform",
      },
      {
        q: "'She ___ to school every day.' (correct form)",
        options: ["go", "goes", "going", "gone"],
        correct: 1,
        explanation: "Third person singular present: 'she goes'",
      },
      {
        q: "Antonym of 'ancient' is:",
        options: ["old", "modern", "historical", "classical"],
        correct: 1,
        explanation: "Ancient means very old; modern means new",
      },
      {
        q: "A word that describes a noun is called:",
        options: ["Verb", "Adverb", "Adjective", "Pronoun"],
        correct: 2,
        explanation: "Adjective modifies or describes a noun",
      },
      {
        q: "Passive voice of 'She wrote a letter':",
        options: [
          "A letter is written by her",
          "A letter was written by her",
          "A letter has been written by her",
          "A letter will be written by her",
        ],
        correct: 1,
        explanation: "Simple past passive: was + past participle",
      },
    ],
  },
};

function getQuestions(
  subject: string,
  topic: string,
  count: number,
  difficulty: string,
): Question[] {
  const bank = questionBank[subject]?.[topic] || [];
  let pool = [...bank];
  if (difficulty === "Easy") pool = pool.slice(0, Math.ceil(pool.length * 0.6));
  if (difficulty === "Hard") pool = pool.slice(Math.floor(pool.length * 0.4));
  // Shuffle and take count
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export default function AIQuizGeneratorPage() {
  const { addXP, earnBadge } = useAppContext();
  const { actor } = useActor();
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState("5");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [generating, setGenerating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const subjects = Object.keys(questionBank);
  const topics = subject ? Object.keys(questionBank[subject] || {}) : [];

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGenerate = async () => {
    if (!subject || !topic) {
      toast.error("Please select subject and topic");
      return;
    }
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 800));
    const q = getQuestions(subject, topic, Number(count), difficulty);
    if (q.length === 0) {
      toast.error(
        "No questions available for this combination. Try different topic.",
      );
      setGenerating(false);
      return;
    }
    setQuiz(q);
    setAnswers({});
    setSubmitted(false);
    setGenerating(false);
    const totalSecs = Number(count) * 60;
    startTimer(totalSecs);
    addXP(10);
    earnBadge("AI Explorer");
    toast.success("⭐ Quiz generated! Timer started. +10 XP");
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setSubmitted(true);
    const score = quiz.filter((q, i) => answers[i] === q.correct).length;
    addXP(score * 20);
    if (score === quiz.length) earnBadge("Perfect Score");
    if (score >= quiz.length * 0.7) earnBadge("Quiz Master");
    if (actor) {
      actor
        .savePerformanceData(topic, BigInt(score), BigInt(quiz.length))
        .catch(() => {});
    }
    toast.success(
      `Quiz done! Score: ${score}/${quiz.length} | +${score * 20} XP`,
    );
  };

  const score = quiz.filter((q, i) => answers[i] === q.correct).length;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="min-h-screen bg-cosmic page-enter">
      {/* Hero */}
      <div
        className="relative py-16 px-4"
        style={{ background: "oklch(0.97 0.02 290)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.85 0.25 145 / 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "oklch(0.45 0.20 145 / 0.12)",
                border: "1px solid oklch(0.45 0.20 145 / 0.25)",
              }}
            >
              <Zap
                className="h-4 w-4"
                style={{ color: "oklch(0.45 0.20 145)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.45 0.20 145)" }}
              >
                AI Quiz Engine
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-neon-gradient">
              AI Quiz Generator
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.05 220)" }}
            >
              Apne subject aur topic se instant MCQ quiz generate karein.
              Government-approved curriculum based.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Config */}
        <Card className="cosmic-card mb-8">
          <CardHeader>
            <CardTitle className="text-neon-green flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Configure Your Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.45 0.03 260)" }}
                >
                  Subject
                </p>
                <Select
                  value={subject}
                  onValueChange={(v) => {
                    setSubject(v);
                    setTopic("");
                  }}
                >
                  <SelectTrigger
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      borderColor: "oklch(0.88 0.02 270)",
                      color: "white",
                    }}
                    data-ocid="quiz.subject.select"
                  >
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.45 0.03 260)" }}
                >
                  Topic
                </p>
                <Select
                  value={topic}
                  onValueChange={setTopic}
                  disabled={!subject}
                >
                  <SelectTrigger
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      borderColor: "oklch(0.88 0.02 270)",
                      color: "white",
                    }}
                    data-ocid="quiz.topic.select"
                  >
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.45 0.03 260)" }}
                >
                  Difficulty
                </p>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      borderColor: "oklch(0.88 0.02 270)",
                      color: "white",
                    }}
                    data-ocid="quiz.difficulty.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Easy", "Medium", "Hard"].map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.45 0.03 260)" }}
                >
                  Questions
                </p>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger
                    style={{
                      background: "oklch(0.97 0.01 260)",
                      borderColor: "oklch(0.88 0.02 270)",
                      color: "white",
                    }}
                    data-ocid="quiz.count.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["5", "10", "15"].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c} Questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="mt-5 w-full sm:w-auto font-bold"
              onClick={handleGenerate}
              disabled={generating}
              data-ocid="quiz.generate.primary_button"
              style={{
                background: "oklch(0.45 0.20 145)",
                color: "oklch(0.99 0 0)",
              }}
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Quiz
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Quiz */}
        <AnimatePresence>
          {quiz.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Timer & Header */}
              {!submitted && (
                <div
                  className="flex items-center justify-between mb-6 p-4 rounded-xl"
                  style={{
                    background: "oklch(0.97 0.01 260)",
                    border: "1px solid oklch(0.88 0.02 270)",
                  }}
                >
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.40 0.03 260)" }}
                    >
                      {subject} — {topic} — {difficulty}
                    </p>
                    <p className="font-semibold text-foreground">
                      {Object.keys(answers).length} / {quiz.length} answered
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer
                      className="h-5 w-5"
                      style={{
                        color:
                          timeLeft < 60
                            ? "oklch(0.65 0.25 27)"
                            : "oklch(0.50 0.22 290)",
                      }}
                    />
                    <span
                      className="font-mono text-xl font-bold"
                      style={{
                        color:
                          timeLeft < 60
                            ? "oklch(0.65 0.25 27)"
                            : "oklch(0.50 0.22 290)",
                      }}
                      data-ocid="quiz.timer.panel"
                    >
                      {String(mins).padStart(2, "0")}:
                      {String(secs).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              )}

              {/* Result Banner */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 rounded-2xl text-center"
                  style={{
                    background:
                      score >= quiz.length * 0.7
                        ? "oklch(0.45 0.20 145 / 0.10)"
                        : "oklch(0.55 0.25 27 / 0.1)",
                    border: `1px solid ${score >= quiz.length * 0.7 ? "oklch(0.45 0.20 145 / 0.35)" : "oklch(0.55 0.25 27 / 0.4)"}`,
                  }}
                  data-ocid="quiz.result.panel"
                >
                  <Trophy
                    className="h-12 w-12 mx-auto mb-3"
                    style={{
                      color:
                        score >= quiz.length * 0.7
                          ? "oklch(0.45 0.20 145)"
                          : "oklch(0.55 0.22 55)",
                    }}
                  />
                  <h2
                    className="font-display text-3xl font-black mb-1"
                    style={{
                      color:
                        score >= quiz.length * 0.7
                          ? "oklch(0.45 0.20 145)"
                          : "oklch(0.55 0.22 55)",
                    }}
                  >
                    {score}/{quiz.length}
                  </h2>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "oklch(0.40 0.03 260)" }}
                  >
                    {score >= quiz.length
                      ? "🌟 Perfect Score! You earned Perfect Score badge!"
                      : score >= quiz.length * 0.7
                        ? "👍 Great Job! Quiz Master badge earned!"
                        : score >= quiz.length * 0.5
                          ? "💪 Good effort! Keep practicing."
                          : "📚 Keep studying — you'll do better next time!"}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Progress
                      value={(score / quiz.length) * 100}
                      className="h-3 w-48"
                    />
                    <span
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.45 0.20 145)" }}
                    >
                      {Math.round((score / quiz.length) * 100)}%
                    </span>
                  </div>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      setQuiz([]);
                      setAnswers({});
                      setSubmitted(false);
                    }}
                    data-ocid="quiz.retry.button"
                    style={{
                      background: "oklch(0.50 0.22 290)",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                </motion.div>
              )}

              {/* Questions */}
              <div className="space-y-5">
                {quiz.map((q, qi) => (
                  <motion.div
                    key={q.q.slice(0, 20) + String(qi)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qi * 0.05 }}
                    data-ocid={`quiz.question.item.${qi + 1}`}
                  >
                    <Card className="cosmic-card">
                      <CardContent className="p-5">
                        <p
                          className="font-semibold mb-4 text-sm"
                          style={{ color: "oklch(0.88 0.02 220)" }}
                        >
                          <span style={{ color: "oklch(0.50 0.22 290)" }}>
                            Q{qi + 1}.
                          </span>{" "}
                          {q.q}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            let bg = "oklch(0.97 0.01 260)";
                            let border = "oklch(0.88 0.02 270)";
                            let color = "oklch(0.25 0.03 260)";
                            if (answers[qi] === oi) {
                              bg = "oklch(0.50 0.22 290 / 0.15)";
                              border = "oklch(0.50 0.22 290 / 0.50)";
                              color = "oklch(0.50 0.22 290)";
                            }
                            if (submitted) {
                              if (oi === q.correct) {
                                bg = "oklch(0.45 0.20 145 / 0.15)";
                                border = "oklch(0.85 0.25 145 / 0.6)";
                                color = "oklch(0.45 0.20 145)";
                              } else if (
                                answers[qi] === oi &&
                                oi !== q.correct
                              ) {
                                bg = "oklch(0.55 0.25 27 / 0.15)";
                                border = "oklch(0.55 0.25 27 / 0.6)";
                                color = "oklch(0.65 0.25 27)";
                              }
                            }
                            return (
                              <button
                                type="button"
                                key={opt.slice(0, 8) + String(oi)}
                                onClick={() =>
                                  !submitted &&
                                  setAnswers({ ...answers, [qi]: oi })
                                }
                                className="text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-2"
                                style={{
                                  background: bg,
                                  border: `1px solid ${border}`,
                                  color,
                                  cursor: submitted ? "default" : "pointer",
                                }}
                                data-ocid={`quiz.option.${qi + 1}.${oi + 1}`}
                              >
                                {submitted && oi === q.correct && (
                                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                )}
                                {submitted &&
                                  answers[qi] === oi &&
                                  oi !== q.correct && (
                                    <XCircle className="h-4 w-4 flex-shrink-0" />
                                  )}
                                {!submitted && answers[qi] === oi && (
                                  <CheckCircle className="h-4 w-4 flex-shrink-0 opacity-60" />
                                )}
                                {String.fromCharCode(65 + oi)}. {opt}
                              </button>
                            );
                          })}
                        </div>
                        {submitted && (
                          <div
                            className="mt-3 p-2 rounded-lg text-xs"
                            style={{
                              background: "oklch(0.97 0.01 260)",
                              color: "oklch(0.45 0.03 260)",
                            }}
                          >
                            <AlertCircle
                              className="h-3 w-3 inline mr-1"
                              style={{ color: "oklch(0.50 0.22 290)" }}
                            />
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {!submitted && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleSubmit}
                    className="font-bold px-8"
                    data-ocid="quiz.submit.primary_button"
                    style={{
                      background: "oklch(0.45 0.20 145)",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    <Trophy className="h-4 w-4 mr-2" /> Submit Quiz
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {quiz.length === 0 && !generating && (
          <div
            className="flex flex-col items-center justify-center py-16"
            data-ocid="quiz.empty_state"
          >
            <Zap
              className="h-20 w-20 mb-4"
              style={{ color: "oklch(0.45 0.20 145 / 0.15)" }}
            />
            <p style={{ color: "oklch(0.45 0.03 260)" }}>
              Configure and generate your quiz above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
