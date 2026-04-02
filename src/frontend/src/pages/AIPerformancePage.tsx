import type { PerformanceData } from "@/backend.d.ts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useActor } from "@/hooks/useActor";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const mockData: PerformanceData[] = [
  {
    topic: "Algebra",
    score: BigInt(8),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 7 * 86400000),
  },
  {
    topic: "Mechanics",
    score: BigInt(6),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 6 * 86400000),
  },
  {
    topic: "Periodic Table",
    score: BigInt(9),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 5 * 86400000),
  },
  {
    topic: "Grammar",
    score: BigInt(7),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 4 * 86400000),
  },
  {
    topic: "Indian History",
    score: BigInt(5),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 3 * 86400000),
  },
  {
    topic: "Programming",
    score: BigInt(10),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 2 * 86400000),
  },
  {
    topic: "Geometry",
    score: BigInt(4),
    total: BigInt(10),
    timestamp: BigInt(Date.now() - 1 * 86400000),
  },
];

const improvementTips: Record<string, string[]> = {
  default: [
    "Use NCERT textbooks for concept clarity",
    "Watch video lectures on DIKSHA / NPTEL",
    "Practice with Gyan Mitra AI for doubts",
    "Attempt mock tests regularly",
  ],
  Algebra: [
    "Practice 20 problems daily",
    "Focus on formula memorization",
    "Try AI Quiz Generator for Algebra",
  ],
  Mechanics: [
    "Draw free body diagrams",
    "Understand Newton's laws deeply",
    "Watch NPTEL Physics lectures",
  ],
  "Indian History": [
    "Create timeline charts",
    "Use NCERT History books",
    "Watch SWAYAM history courses",
  ],
  Geometry: [
    "Practice construction daily",
    "Learn all formulas and theorems",
    "Solve NCERT exercise problems",
  ],
};

function getPercentage(p: PerformanceData) {
  const total = Number(p.total);
  if (total === 0) return 0;
  return Math.round((Number(p.score) / total) * 100);
}

function getGrade(pct: number) {
  if (pct >= 90) return { label: "A+", color: "oklch(0.45 0.20 145)" };
  if (pct >= 75) return { label: "A", color: "oklch(0.50 0.22 290)" };
  if (pct >= 60) return { label: "B", color: "oklch(0.55 0.22 55)" };
  if (pct >= 40) return { label: "C", color: "oklch(0.45 0.22 290)" };
  return { label: "D", color: "oklch(0.65 0.25 27)" };
}

export default function AIPerformancePage() {
  const { actor, isFetching } = useActor();
  const [data, setData] = useState<PerformanceData[]>(mockData);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getRecentPerformanceData(BigInt(20))
      .then((res) => {
        if (res && res.length > 0) setData(res);
      })
      .catch(() => {});
  }, [actor, isFetching]);

  const weakAreas = data.filter((p) => getPercentage(p) < 60);
  const strongAreas = data.filter((p) => getPercentage(p) >= 75);
  const avgScore = data.length
    ? Math.round(data.reduce((s, p) => s + getPercentage(p), 0) / data.length)
    : 0;

  // Subject-wise aggregation
  const subjectMap = data.reduce<
    Record<string, { total: number; count: number }>
  >((acc, p) => {
    if (!acc[p.topic]) acc[p.topic] = { total: 0, count: 0 };
    acc[p.topic].total += getPercentage(p);
    acc[p.topic].count++;
    return acc;
  }, {});

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
              "radial-gradient(circle at 70% 40%, oklch(0.78 0.18 280 / 0.08) 0%, transparent 50%)",
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
                background: "oklch(0.78 0.18 280 / 0.12)",
                border: "1px solid oklch(0.78 0.18 280 / 0.3)",
              }}
            >
              <LineChart
                className="h-4 w-4"
                style={{ color: "oklch(0.45 0.22 290)" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.45 0.22 290)" }}
              >
                AI Analytics
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-neon-gradient">
              AI Performance Analyzer
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.65 0.05 220)" }}
            >
              Apne quiz performance ka deep analysis. Weak areas identify karein
              aur improvement tips paaein.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              icon: BarChart3,
              label: "Total Attempts",
              value: String(data.length),
              color: "oklch(0.50 0.22 290)",
            },
            {
              icon: TrendingUp,
              label: "Avg Score",
              value: `${avgScore}%`,
              color: "oklch(0.45 0.20 145)",
            },
            {
              icon: CheckCircle,
              label: "Strong Topics",
              value: String(strongAreas.length),
              color: "oklch(0.55 0.22 55)",
            },
            {
              icon: AlertTriangle,
              label: "Weak Areas",
              value: String(weakAreas.length),
              color: "oklch(0.65 0.25 27)",
            },
          ].map((stat) => (
            <Card key={stat.label} className="cosmic-card">
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon
                  className="h-8 w-8 flex-shrink-0"
                  style={{ color: stat.color }}
                />
                <div>
                  <p
                    className="text-2xl font-black"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.03 260)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="text-neon-cyan flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Topic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.map((p, i) => {
                    const pct = getPercentage(p);
                    const grade = getGrade(pct);
                    return (
                      <div
                        key={p.topic + String(i)}
                        data-ocid={`performance.topic.item.${i + 1}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "oklch(0.25 0.03 260)" }}
                          >
                            {p.topic}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded"
                              style={{
                                background: `${grade.color}22`,
                                color: grade.color,
                              }}
                            >
                              {grade.label}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{ color: grade.color }}
                            >
                              {pct}%
                            </span>
                          </div>
                        </div>
                        <Progress value={pct} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Averages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="cosmic-card mb-6">
              <CardHeader>
                <CardTitle className="text-neon-green flex items-center gap-2">
                  <Brain className="h-5 w-5" /> Subject Averages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(subjectMap).map(([topic, val]) => {
                    const avg = Math.round(val.total / val.count);
                    const grade = getGrade(avg);
                    return (
                      <div
                        key={topic}
                        className="flex items-center justify-between"
                      >
                        <span
                          className="text-sm"
                          style={{ color: "oklch(0.35 0.03 260)" }}
                        >
                          {topic}
                        </span>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-24 h-2 rounded-full overflow-hidden"
                            style={{ background: "oklch(0.95 0.02 260)" }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${avg}%`,
                                background: grade.color,
                              }}
                            />
                          </div>
                          <span
                            className="text-sm font-bold w-10 text-right"
                            style={{ color: grade.color }}
                          >
                            {avg}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Weak Areas */}
            {weakAreas.length > 0 && (
              <Card
                className="cosmic-card"
                style={{ borderColor: "oklch(0.55 0.25 27 / 0.4)" }}
              >
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2 text-base"
                    style={{ color: "oklch(0.65 0.25 27)" }}
                  >
                    <TrendingDown className="h-5 w-5" /> Weak Areas (below 60%)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weakAreas.map((p, i) => (
                    <div
                      key={p.topic + String(i)}
                      className="p-3 rounded-lg"
                      style={{
                        background: "oklch(0.55 0.25 27 / 0.08)",
                        border: "1px solid oklch(0.55 0.25 27 / 0.2)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          style={{
                            background: "oklch(0.55 0.25 27 / 0.2)",
                            color: "oklch(0.65 0.25 27)",
                            borderColor: "oklch(0.55 0.25 27 / 0.4)",
                          }}
                        >
                          {p.topic}
                        </Badge>
                        <span
                          className="font-bold"
                          style={{ color: "oklch(0.65 0.25 27)" }}
                        >
                          {getPercentage(p)}%
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {(
                          improvementTips[p.topic] || improvementTips.default
                        ).map((tip, ti) => (
                          <li
                            key={tip.slice(0, 10) + String(ti)}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "oklch(0.40 0.03 260)" }}
                          >
                            <BookOpen
                              className="h-3 w-3 flex-shrink-0 mt-0.5"
                              style={{ color: "oklch(0.50 0.22 290)" }}
                            />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Strong Areas */}
        {strongAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card
              className="cosmic-card"
              style={{ borderColor: "oklch(0.45 0.20 145 / 0.25)" }}
            >
              <CardHeader>
                <CardTitle className="text-neon-green flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Strong Areas — Keep it Up!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {strongAreas.map((p, i) => (
                    <Badge
                      key={p.topic + String(i)}
                      className="text-sm py-1 px-3"
                      style={{
                        background: "oklch(0.45 0.20 145 / 0.15)",
                        color: "oklch(0.45 0.20 145)",
                        borderColor: "oklch(0.45 0.20 145 / 0.25)",
                      }}
                    >
                      ⭐ {p.topic} ({getPercentage(p)}%)
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
