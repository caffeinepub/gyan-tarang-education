import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Laptop,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Branch {
  id: string;
  name: string;
  fullName: string;
  icon: React.ElementType;
  color: string;
  semesters: {
    sem: number;
    subjects: {
      name: string;
      nptelUrl: string;
      type: "core" | "lab" | "math";
    }[];
  }[];
  tools: { name: string; url: string; desc: string }[];
  resources: { name: string; url: string; type: string }[];
}

const branches: Branch[] = [
  {
    id: "cse",
    name: "CSE",
    fullName: "Computer Science Engineering",
    icon: Laptop,
    color: "oklch(0.45 0.18 270)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Engineering Mathematics I",
            nptelUrl: "https://nptel.ac.in/courses/111105112",
            type: "math",
          },
          {
            name: "Engineering Physics",
            nptelUrl: "https://nptel.ac.in/courses/115105095",
            type: "core",
          },
          {
            name: "Programming in C",
            nptelUrl: "https://nptel.ac.in/courses/106105171",
            type: "core",
          },
        ],
      },
      {
        sem: 3,
        subjects: [
          {
            name: "Data Structures & Algorithms",
            nptelUrl: "https://nptel.ac.in/courses/106102064",
            type: "core",
          },
          {
            name: "Discrete Mathematics",
            nptelUrl: "https://nptel.ac.in/courses/111106086",
            type: "math",
          },
          {
            name: "OOPs with Java",
            nptelUrl: "https://nptel.ac.in/courses/106105191",
            type: "core",
          },
        ],
      },
      {
        sem: 5,
        subjects: [
          {
            name: "Operating Systems",
            nptelUrl: "https://nptel.ac.in/courses/106105078",
            type: "core",
          },
          {
            name: "Database Management Systems",
            nptelUrl: "https://nptel.ac.in/courses/106105175",
            type: "core",
          },
          {
            name: "Computer Networks",
            nptelUrl: "https://nptel.ac.in/courses/106105081",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "Virtual Labs - CS",
        url: "https://vlab.co.in/exp/list-the-program",
        desc: "IIT virtual labs for CS practicals",
      },
      {
        name: "NPTEL SWAYAM - CSE",
        url: "https://swayam.gov.in/explorer?searchText=computer+science",
        desc: "UGC/AICTE approved online courses",
      },
      {
        name: "GATE CS Resources",
        url: "https://nptel.ac.in/courses/106105085",
        type: "tool",
        desc: "IIT Prof. Gate preparation material",
      } as any,
    ],
    resources: [
      {
        name: "NPTEL All CSE Courses",
        url: "https://nptel.ac.in/courses?disciplineId=9",
        type: "Video",
      },
      {
        name: "IIT Kharagpur CSE PYQ",
        url: "https://www.iit.ac.in/student-activities/placement",
        type: "PYQ",
      },
      {
        name: "CBSE CS Notes",
        url: "https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSecondary/ComputerScience_SR_2024-25.pdf",
        type: "Notes",
      },
    ],
  },
  {
    id: "ece",
    name: "ECE",
    fullName: "Electronics & Communication Engineering",
    icon: Zap,
    color: "oklch(0.55 0.18 200)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Engineering Mathematics",
            nptelUrl: "https://nptel.ac.in/courses/111105112",
            type: "math",
          },
          {
            name: "Basic Electronics",
            nptelUrl: "https://nptel.ac.in/courses/117105082",
            type: "core",
          },
          {
            name: "C Programming",
            nptelUrl: "https://nptel.ac.in/courses/106105171",
            type: "core",
          },
        ],
      },
      {
        sem: 3,
        subjects: [
          {
            name: "Digital Electronics",
            nptelUrl: "https://nptel.ac.in/courses/117105080",
            type: "core",
          },
          {
            name: "Signals & Systems",
            nptelUrl: "https://nptel.ac.in/courses/117105084",
            type: "core",
          },
          {
            name: "Analog Circuits",
            nptelUrl: "https://nptel.ac.in/courses/117105082",
            type: "core",
          },
        ],
      },
      {
        sem: 5,
        subjects: [
          {
            name: "VLSI Design",
            nptelUrl: "https://nptel.ac.in/courses/117105123",
            type: "core",
          },
          {
            name: "Communication Systems",
            nptelUrl: "https://nptel.ac.in/courses/117101006",
            type: "core",
          },
          {
            name: "Microprocessors",
            nptelUrl: "https://nptel.ac.in/courses/117105053",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "Virtual Labs - ECE",
        url: "https://vlab.co.in/exp/list-the-program",
        desc: "Electronics virtual practicals",
      },
      {
        name: "SWAYAM - Electronics",
        url: "https://swayam.gov.in/explorer?searchText=electronics",
        desc: "UGC/AICTE approved",
      },
    ],
    resources: [
      {
        name: "NPTEL All ECE Courses",
        url: "https://nptel.ac.in/courses?disciplineId=12",
        type: "Video",
      },
      {
        name: "GATE ECE Resources",
        url: "https://nptel.ac.in/courses/117105084",
        type: "PYQ",
      },
    ],
  },
  {
    id: "me",
    name: "ME",
    fullName: "Mechanical Engineering",
    icon: Wrench,
    color: "oklch(0.60 0.14 40)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Engineering Mechanics",
            nptelUrl: "https://nptel.ac.in/courses/112104117",
            type: "core",
          },
          {
            name: "Engineering Drawing",
            nptelUrl: "https://nptel.ac.in/courses/112107148",
            type: "core",
          },
          {
            name: "Calculus",
            nptelUrl: "https://nptel.ac.in/courses/111105112",
            type: "math",
          },
        ],
      },
      {
        sem: 3,
        subjects: [
          {
            name: "Thermodynamics",
            nptelUrl: "https://nptel.ac.in/courses/112104117",
            type: "core",
          },
          {
            name: "Fluid Mechanics",
            nptelUrl: "https://nptel.ac.in/courses/112104118",
            type: "core",
          },
          {
            name: "Manufacturing Technology",
            nptelUrl: "https://nptel.ac.in/courses/112107085",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "Virtual Labs - ME",
        url: "https://vlab.co.in/exp/list-the-program",
        desc: "Mechanical virtual labs",
      },
      {
        name: "SWAYAM - Mechanical",
        url: "https://swayam.gov.in/explorer?searchText=mechanical",
        desc: "UGC/AICTE courses",
      },
    ],
    resources: [
      {
        name: "NPTEL All ME Courses",
        url: "https://nptel.ac.in/courses?disciplineId=17",
        type: "Video",
      },
    ],
  },
  {
    id: "ce",
    name: "CE",
    fullName: "Civil Engineering",
    icon: GraduationCap,
    color: "oklch(0.55 0.12 100)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Engineering Mechanics",
            nptelUrl: "https://nptel.ac.in/courses/112104117",
            type: "core",
          },
          {
            name: "Surveying",
            nptelUrl: "https://nptel.ac.in/courses/112105106",
            type: "core",
          },
          {
            name: "Engineering Maths",
            nptelUrl: "https://nptel.ac.in/courses/111105112",
            type: "math",
          },
        ],
      },
      {
        sem: 3,
        subjects: [
          {
            name: "Structural Analysis",
            nptelUrl: "https://nptel.ac.in/courses/105106116",
            type: "core",
          },
          {
            name: "Geotechnical Engineering",
            nptelUrl: "https://nptel.ac.in/courses/105106117",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "Virtual Labs - Civil",
        url: "https://vlab.co.in/exp/list-the-program",
        desc: "Civil engineering labs",
      },
    ],
    resources: [
      {
        name: "NPTEL All Civil Courses",
        url: "https://nptel.ac.in/courses?disciplineId=7",
        type: "Video",
      },
    ],
  },
  {
    id: "ee",
    name: "EE",
    fullName: "Electrical Engineering",
    icon: Zap,
    color: "oklch(0.65 0.16 90)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Circuit Theory",
            nptelUrl: "https://nptel.ac.in/courses/108105018",
            type: "core",
          },
          {
            name: "Basic Electrical Engineering",
            nptelUrl: "https://nptel.ac.in/courses/108105053",
            type: "core",
          },
        ],
      },
      {
        sem: 3,
        subjects: [
          {
            name: "Electrical Machines",
            nptelUrl: "https://nptel.ac.in/courses/108105053",
            type: "core",
          },
          {
            name: "Power Systems",
            nptelUrl: "https://nptel.ac.in/courses/108105018",
            type: "core",
          },
          {
            name: "Control Systems",
            nptelUrl: "https://nptel.ac.in/courses/108105060",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "Virtual Labs - EE",
        url: "https://vlab.co.in/exp/list-the-program",
        desc: "Electrical labs",
      },
    ],
    resources: [
      {
        name: "NPTEL All EE Courses",
        url: "https://nptel.ac.in/courses?disciplineId=11",
        type: "Video",
      },
    ],
  },
  {
    id: "it",
    name: "IT",
    fullName: "Information Technology",
    icon: Laptop,
    color: "oklch(0.55 0.15 280)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Programming Fundamentals",
            nptelUrl: "https://nptel.ac.in/courses/106105171",
            type: "core",
          },
          {
            name: "Mathematics for IT",
            nptelUrl: "https://nptel.ac.in/courses/111105112",
            type: "math",
          },
        ],
      },
      {
        sem: 3,
        subjects: [
          {
            name: "Web Technologies",
            nptelUrl: "https://nptel.ac.in/courses/106105078",
            type: "core",
          },
          {
            name: "Database Systems",
            nptelUrl: "https://nptel.ac.in/courses/106105175",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "SWAYAM IT Courses",
        url: "https://swayam.gov.in/explorer?searchText=information+technology",
        desc: "UGC approved IT courses",
      },
    ],
    resources: [
      {
        name: "NPTEL IT Courses",
        url: "https://nptel.ac.in/courses?disciplineId=9",
        type: "Video",
      },
    ],
  },
  {
    id: "ch",
    name: "CH",
    fullName: "Chemical Engineering",
    icon: FlaskConical,
    color: "oklch(0.50 0.16 170)",
    semesters: [
      {
        sem: 1,
        subjects: [
          {
            name: "Engineering Chemistry",
            nptelUrl: "https://nptel.ac.in/courses/104103001",
            type: "core",
          },
          {
            name: "Mass Transfer",
            nptelUrl: "https://nptel.ac.in/courses/103102022",
            type: "core",
          },
        ],
      },
    ],
    tools: [
      {
        name: "Virtual Labs - Chemical",
        url: "https://vlab.co.in/exp/list-the-program",
        desc: "Chemical engineering labs",
      },
    ],
    resources: [
      {
        name: "NPTEL Chemical Courses",
        url: "https://nptel.ac.in/courses?disciplineId=6",
        type: "Video",
      },
    ],
  },
];

const typeColors = {
  core: "oklch(0.22 0.12 260)",
  lab: "oklch(0.56 0.18 145)",
  math: "oklch(0.72 0.18 55)",
};

export default function BtechPage() {
  const { t } = useAppContext();
  const [activeBranch, setActiveBranch] = useState("cse");
  const [activeSem, setActiveSem] = useState(0);

  const branch = branches.find((b) => b.id === activeBranch) || branches[0];

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="bg-hero-pattern py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("BTech All Branches", "BTech All Branches")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "NPTEL + Virtual Labs + SWAYAM - सभी BTech branches के लिए सरकारी content",
                "NPTEL + Virtual Labs + SWAYAM - Government content for all BTech branches",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ NPTEL (UGC/AICTE)</span>
              <span className="badge-govt">🎓 IIT Professors</span>
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Branch selector */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-muted-foreground mb-3">
            {t("अपनी Branch चुनें:", "Select your Branch:")}
          </p>
          <div className="flex flex-wrap gap-2">
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setActiveBranch(b.id);
                  setActiveSem(0);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                style={
                  activeBranch === b.id
                    ? {
                        background: b.color,
                        color: "white",
                        boxShadow: `0 4px 14px ${b.color}50`,
                      }
                    : {
                        background: "oklch(0.96 0.01 80)",
                        color: "oklch(0.40 0.05 260)",
                        border: "1px solid oklch(0.88 0.02 260)",
                      }
                }
                data-ocid={`btech.${b.id}.tab`}
              >
                <b.icon className="h-4 w-4" />
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Branch header */}
        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="mb-6 p-6 rounded-2xl text-white"
            style={{
              background: `linear-gradient(135deg, ${branch.color}, ${branch.color}80)`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <branch.icon className="h-8 w-8 text-white/80" />
              <div>
                <h2 className="font-display text-2xl font-black">
                  {branch.name} - {branch.fullName}
                </h2>
                <p className="text-white/70 text-sm">
                  {t(
                    "NPTEL IIT Professor Lectures - UGC/AICTE Approved",
                    "NPTEL IIT Professor Lectures - UGC/AICTE Approved",
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mt-3">
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/20">
                ✅ Government Approved
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/20">
                📚 IIT & NIT Syllabus
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/20">
                100% Free
              </span>
            </div>
          </div>

          <Tabs defaultValue="subjects">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="subjects" data-ocid="btech.subjects.tab">
                📚 {t("Subjects", "Subjects")}
              </TabsTrigger>
              <TabsTrigger value="tools" data-ocid="btech.tools.tab">
                🛠️ {t("Tools", "Tools")}
              </TabsTrigger>
              <TabsTrigger value="resources" data-ocid="btech.resources.tab">
                📁 {t("Resources", "Resources")}
              </TabsTrigger>
            </TabsList>

            {/* SUBJECTS TAB */}
            <TabsContent value="subjects">
              <div className="mb-4">
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  {t("Semester चुनें:", "Select Semester:")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {branch.semesters.map((sem, idx) => (
                    <button
                      key={sem.sem}
                      type="button"
                      onClick={() => setActiveSem(idx)}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                      style={
                        activeSem === idx
                          ? {
                              background: branch.color,
                              color: "white",
                            }
                          : {
                              background: "oklch(0.95 0.01 80)",
                              color: "oklch(0.45 0.05 260)",
                            }
                      }
                      data-ocid={`btech.sem.${idx + 1}.tab`}
                    >
                      Semester {sem.sem}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(branch.semesters[activeSem]?.subjects || []).map(
                  (subj, idx) => (
                    <motion.div
                      key={subj.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      data-ocid={`btech.subject.item.${idx + 1}`}
                    >
                      <Card className="card-hover border border-border/50 h-full overflow-hidden">
                        <div
                          className="h-1"
                          style={{
                            background:
                              typeColors[subj.type as keyof typeof typeColors],
                          }}
                        />
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <h3 className="font-display font-bold text-sm text-foreground leading-tight">
                              {subj.name}
                            </h3>
                            <Badge
                              className="text-[10px] px-1.5 shrink-0"
                              style={{
                                background: `${typeColors[subj.type as keyof typeof typeColors]}15`,
                                color:
                                  typeColors[
                                    subj.type as keyof typeof typeColors
                                  ],
                                borderColor: `${typeColors[subj.type as keyof typeof typeColors]}30`,
                              }}
                            >
                              {subj.type}
                            </Badge>
                          </div>
                          <span className="badge-govt text-[10px] mb-3 inline-block">
                            ✅ NPTEL IIT
                          </span>
                          <Button
                            className="w-full gap-2 text-xs font-bold mt-2"
                            style={{ background: branch.color, color: "white" }}
                            onClick={() =>
                              window.open(
                                subj.nptelUrl,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                            data-ocid={`btech.subject.button.${idx + 1}`}
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            {t("NPTEL पर देखें", "View on NPTEL")}
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ),
                )}
              </div>
            </TabsContent>

            {/* TOOLS TAB */}
            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branch.tools.map((tool, idx) => (
                  <Card
                    key={tool.name}
                    className="card-hover border border-border/50"
                    data-ocid={`btech.tool.item.${idx + 1}`}
                  >
                    <CardContent className="p-5">
                      <h3 className="font-display font-bold text-foreground mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tool.desc}
                      </p>
                      <Button
                        size="sm"
                        className="gap-2"
                        style={{ background: branch.color, color: "white" }}
                        onClick={() =>
                          window.open(tool.url, "_blank", "noopener,noreferrer")
                        }
                        data-ocid={`btech.tool.button.${idx + 1}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("खोलें", "Open")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {/* SWAYAM */}
                <Card className="card-hover border border-border/50 col-span-full">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">
                          🏛️ SWAYAM - Free Online Courses
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          UGC & AICTE approved online courses from IIT/NIT
                          professors
                        </p>
                        <span className="badge-govt mt-2 inline-block">
                          ✅ UGC/AICTE Approved
                        </span>
                      </div>
                      <Button
                        className="gap-2 shrink-0 bg-saffron hover:bg-saffron/90 text-white"
                        onClick={() =>
                          window.open(
                            "https://swayam.gov.in",
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        data-ocid="btech.swayam.button"
                      >
                        <ExternalLink className="h-4 w-4" />
                        swayam.gov.in
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* RESOURCES TAB */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branch.resources.map((res, idx) => (
                  <Card
                    key={res.name}
                    className="card-hover border border-border/50"
                    data-ocid={`btech.resource.item.${idx + 1}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-sm text-foreground">
                          {res.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] shrink-0"
                        >
                          {res.type}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="gap-2 mt-2"
                        style={{ background: branch.color, color: "white" }}
                        onClick={() =>
                          window.open(res.url, "_blank", "noopener,noreferrer")
                        }
                        data-ocid={`btech.resource.button.${idx + 1}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {/* Virtual Labs */}
                <Card className="card-hover border border-border/50 col-span-full">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">
                          🔬 Virtual Labs - IIT Delhi
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Interactive virtual experiments for all engineering
                          branches
                        </p>
                        <span className="badge-govt mt-2 inline-block">
                          ✅ Govt Approved
                        </span>
                      </div>
                      <Button
                        className="gap-2 shrink-0 bg-secondary hover:bg-secondary/90 text-white"
                        onClick={() =>
                          window.open(
                            "https://vlab.co.in",
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        data-ocid="btech.vlabs.button"
                      >
                        <ExternalLink className="h-4 w-4" />
                        vlab.co.in
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* NPTEL */}
                <Card className="card-hover border border-border/50 col-span-full">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">
                          📺 NPTEL - All {branch.fullName} Courses
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          100+ free courses by IIT/IISc professors - AICTE
                          credited
                        </p>
                        <span className="badge-govt mt-2 inline-block">
                          ✅ AICTE Credits
                        </span>
                      </div>
                      <Button
                        className="gap-2 shrink-0"
                        style={{ background: branch.color, color: "white" }}
                        onClick={() =>
                          window.open(
                            "https://nptel.ac.in/courses",
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        data-ocid="btech.nptel.button"
                      >
                        <ExternalLink className="h-4 w-4" />
                        nptel.ac.in
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
