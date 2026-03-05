import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Code,
  Cpu,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const branches = [
  "CSE",
  "ECE",
  "ME",
  "CE",
  "EE",
  "IT",
  "Chemical",
  "Civil",
  "Aerospace",
];

const branchData: Record<
  string,
  {
    dsa: { name: string; url: string }[];
    core: string[];
    tools: { name: string; url: string }[];
    tips: string[];
  }
> = {
  CSE: {
    dsa: [
      {
        name: "GeeksforGeeks DSA",
        url: "https://www.geeksforgeeks.org/data-structures/",
      },
      { name: "IndiaBIX Aptitude", url: "https://www.indiabix.com" },
      { name: "CodeChef Practice", url: "https://www.codechef.com" },
    ],
    core: [
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "OOP",
      "System Design",
      "Algorithms",
    ],
    tools: [
      { name: "LeetCode (Free)", url: "https://leetcode.com" },
      { name: "HackerRank", url: "https://www.hackerrank.com" },
    ],
    tips: [
      "Array, LinkedList, Tree, Graph, DP - in order mein padhein",
      "Har roz 2-3 problems solve karein LeetCode par",
      "OOPS concepts bahut important hain",
      "System Design 6 mahine pehle shuru karein",
    ],
  },
  ECE: {
    dsa: [
      {
        name: "GeeksforGeeks ECE",
        url: "https://www.geeksforgeeks.org/electronics-engineering/",
      },
      {
        name: "IndiaBIX Electronics",
        url: "https://www.indiabix.com/electronics/",
      },
    ],
    core: [
      "Digital Electronics",
      "Analog Circuits",
      "Signals & Systems",
      "Communication",
      "Microprocessors",
      "VLSI",
    ],
    tools: [
      {
        name: "Electronics Tutorials",
        url: "https://www.electronics-tutorials.ws",
      },
      { name: "All About Circuits", url: "https://www.allaboutcircuits.com" },
    ],
    tips: [
      "Digital Electronics basics strong karein",
      "MATLAB/Simulink seekhein",
      "PCB design skills develop karein",
      "GATE ECE questions practice karein",
    ],
  },
  ME: {
    dsa: [
      {
        name: "GeeksforGeeks ME",
        url: "https://www.geeksforgeeks.org/mechanical-engineering/",
      },
      {
        name: "IndiaBIX Mechanical",
        url: "https://www.indiabix.com/mechanical-engineering/",
      },
    ],
    core: [
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      "Manufacturing",
      "Heat Transfer",
      "Theory of Machines",
    ],
    tools: [
      { name: "NPTEL Courses", url: "https://nptel.ac.in" },
      {
        name: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu/courses/mechanical-engineering/",
      },
    ],
    tips: [
      "AutoCAD aur SolidWorks seekhein",
      "GATE ME syllabus follow karein",
      "Core concepts: Thermodynamics pe strong focus",
      "Industrial training karo semester break mein",
    ],
  },
  CE: {
    dsa: [
      {
        name: "GeeksforGeeks Civil",
        url: "https://www.geeksforgeeks.org/civil-engineering/",
      },
      {
        name: "IndiaBIX Civil",
        url: "https://www.indiabix.com/civil-engineering/",
      },
    ],
    core: [
      "Structural Analysis",
      "Geotechnical",
      "Fluid Mechanics",
      "Transportation",
      "Environmental",
      "RCC Design",
    ],
    tools: [
      { name: "NPTEL Civil", url: "https://nptel.ac.in/courses/civil" },
      { name: "iStructE Resources", url: "https://www.istructe.org" },
    ],
    tips: [
      "AutoCAD 2D/3D seekhein",
      "STAAD Pro aur ETABS software",
      "GATE preparation parallel mein karein",
      "Site visits aur internships important hain",
    ],
  },
  EE: {
    dsa: [
      {
        name: "GeeksforGeeks EE",
        url: "https://www.geeksforgeeks.org/electrical-engineering/",
      },
      {
        name: "IndiaBIX Electrical",
        url: "https://www.indiabix.com/electrical-engineering/",
      },
    ],
    core: [
      "Power Systems",
      "Control Systems",
      "Electrical Machines",
      "Power Electronics",
      "Measurements",
      "EMT",
    ],
    tools: [
      { name: "NPTEL Electrical", url: "https://nptel.ac.in" },
      { name: "Electrical4U", url: "https://www.electrical4u.com" },
    ],
    tips: [
      "Power systems jobs bahut hain government mein",
      "GATE EE se PSU mein jaayein",
      "Matlab/Simulink important tool hai",
      "Control systems pe special focus",
    ],
  },
  IT: {
    dsa: [
      {
        name: "GeeksforGeeks DSA",
        url: "https://www.geeksforgeeks.org/data-structures/",
      },
      { name: "IndiaBIX Aptitude", url: "https://www.indiabix.com" },
    ],
    core: [
      "Web Development",
      "Cloud Computing",
      "Cybersecurity",
      "Networking",
      "Databases",
      "Software Engineering",
    ],
    tools: [
      { name: "GitHub Learning", url: "https://github.com" },
      { name: "AWS Free Tier", url: "https://aws.amazon.com/free" },
    ],
    tips: [
      "Full-stack development seekhein (React + Node)",
      "Cloud certifications valuable hain",
      "Open source contribute karein",
      "Portfolio projects banana zaroori hai",
    ],
  },
  Chemical: {
    dsa: [
      {
        name: "GeeksforGeeks Chemical",
        url: "https://www.geeksforgeeks.org/chemical-engineering/",
      },
      {
        name: "IndiaBIX Chemical",
        url: "https://www.indiabix.com/chemical-engineering/",
      },
    ],
    core: [
      "Mass Transfer",
      "Heat Transfer",
      "Reaction Engineering",
      "Process Control",
      "Thermodynamics",
      "Fluid Mechanics",
    ],
    tools: [
      { name: "NPTEL Chemical", url: "https://nptel.ac.in" },
      { name: "ChE Resources", url: "https://www.cheresources.com" },
    ],
    tips: [
      "GATE CH ek accha option hai",
      "Petrochemical industry mein jobs",
      "Process simulation software seekhein",
      "Safety regulations jaanna important hai",
    ],
  },
  Civil: {
    dsa: [
      {
        name: "GeeksforGeeks Civil",
        url: "https://www.geeksforgeeks.org/civil-engineering/",
      },
      {
        name: "IndiaBIX Civil",
        url: "https://www.indiabix.com/civil-engineering/",
      },
    ],
    core: [
      "Structural Engineering",
      "Geotechnics",
      "Water Resources",
      "Transportation",
      "Environmental",
      "Construction Management",
    ],
    tools: [
      { name: "NPTEL Civil", url: "https://nptel.ac.in" },
      {
        name: "Engineering Toolbox",
        url: "https://www.engineeringtoolbox.com",
      },
    ],
    tips: [
      "AutoCAD mandatory hai field mein",
      "Government projects mein bahut scope hai",
      "Site management experience lo",
      "GATE CE score PSU mein help karta hai",
    ],
  },
  Aerospace: {
    dsa: [
      { name: "GeeksforGeeks Aerospace", url: "https://www.geeksforgeeks.org" },
      { name: "NPTEL Aerospace", url: "https://nptel.ac.in" },
    ],
    core: [
      "Aerodynamics",
      "Propulsion",
      "Structures",
      "Flight Mechanics",
      "Avionics",
      "Spacecraft Systems",
    ],
    tools: [
      { name: "ISRO Careers", url: "https://www.isro.gov.in/careers.html" },
      {
        name: "HAL Careers",
        url: "https://hal-india.co.in/Common/pg.aspx?MId=6&CId=40",
      },
    ],
    tips: [
      "ISRO aur HAL main recruitment target karein",
      "GATE AE ek important path hai",
      "CAD/CAM tools seekhein",
      "Defense PSU mein acche opportunities hain",
    ],
  },
};

const interviewQuestions = [
  {
    q: "Tell me about yourself.",
    a: "Apne background, skills, aur achievements ke baare mein briefly bolein. 2-3 minute se zyada nahi.",
  },
  {
    q: "Why do you want to join this company?",
    a: "Company research karein - unki products, culture, growth. Genuinely interested lagna chahiye.",
  },
  {
    q: "What are your strengths and weaknesses?",
    a: "Strength: Specific example ke saath. Weakness: Real par ek jo aap improve kar rahe ho.",
  },
  {
    q: "Where do you see yourself in 5 years?",
    a: "Company ke saath growth dikhayein. Leadership ya expertise mein growth - realistic baat karein.",
  },
  {
    q: "Why should we hire you?",
    a: "Apne unique skills aur past achievements mention karein jo company ke liye value add karein.",
  },
  {
    q: "Do you have any questions for us?",
    a: "Hamesha questions poocho - role ke baare mein, team ke baare mein, growth opportunities ke baare mein.",
  },
];

export default function PlacementPage() {
  const { t } = useAppContext();
  const [selectedBranch, setSelectedBranch] = useState("CSE");
  const data = branchData[selectedBranch];

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
              <Briefcase
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("Placement Preparation", "Placement Preparation")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "BTech सभी branches के लिए placement preparation - DSA, Core Subjects, Interview Tips",
                "Placement prep for all BTech branches - DSA, Core Subjects, Interview Tips",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Branch Selector */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-2">
            {t("अपनी Branch Select करें:", "Select Your Branch:")}
          </p>
          <div className="flex flex-wrap gap-2">
            {branches.map((branch) => (
              <button
                type="button"
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedBranch === branch
                    ? "text-white shadow-saffron"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={
                  selectedBranch === branch
                    ? { background: "oklch(0.22 0.12 260)" }
                    : {}
                }
                data-ocid="placement.tab"
              >
                {branch}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="dsa">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="dsa" className="text-xs sm:text-sm">
                  DSA
                </TabsTrigger>
                <TabsTrigger value="core" className="text-xs sm:text-sm">
                  Core
                </TabsTrigger>
                <TabsTrigger value="aptitude" className="text-xs sm:text-sm">
                  Aptitude
                </TabsTrigger>
                <TabsTrigger value="interview" className="text-xs sm:text-sm">
                  Interview
                </TabsTrigger>
              </TabsList>

              {/* DSA */}
              <TabsContent value="dsa" className="mt-4 space-y-4">
                <h3 className="font-display font-bold text-foreground">
                  DSA & Problem Solving
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.dsa.map((res) => (
                    <Card
                      key={res.name}
                      className="card-hover border border-border/50"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Code
                            className="h-5 w-5"
                            style={{ color: "oklch(0.72 0.18 55)" }}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {res.name}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(res.url, "_blank")}
                          className="gap-1 text-xs"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/20">
                  <h4 className="font-semibold text-foreground mb-2">
                    💡 {t("Tips", "Tips")}
                  </h4>
                  <ul className="space-y-1">
                    {data.tips.map((tip) => (
                      <li
                        key={tip}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <CheckCircle
                          className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.56 0.18 145)" }}
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* Core Subjects */}
              <TabsContent value="core" className="mt-4 space-y-4">
                <h3 className="font-display font-bold text-foreground">
                  Core Subjects - {selectedBranch}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.core.map((subject) => (
                    <div
                      key={subject}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                    >
                      <Cpu
                        className="h-4 w-4"
                        style={{ color: "oklch(0.22 0.12 260)" }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {subject}
                      </span>
                      <Badge variant="outline" className="ml-auto text-[10px]">
                        Important
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {data.tools.map((tool) => (
                    <Card
                      key={tool.name}
                      className="card-hover border border-border/50"
                    >
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen
                            className="h-4 w-4"
                            style={{ color: "oklch(0.56 0.18 145)" }}
                          />
                          <span className="text-sm">{tool.name}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(tool.url, "_blank")}
                          className="text-xs gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Open
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Aptitude */}
              <TabsContent value="aptitude" className="mt-4 space-y-4">
                <h3 className="font-display font-bold text-foreground">
                  Aptitude Preparation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "IndiaBIX Aptitude",
                      url: "https://www.indiabix.com/aptitude/questions-and-answers/",
                    },
                    {
                      name: "IndiaBIX Logical",
                      url: "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
                    },
                    {
                      name: "IndiaBIX Verbal",
                      url: "https://www.indiabix.com/verbal-ability/questions-and-answers/",
                    },
                    {
                      name: "RS Aggarwal (Ref)",
                      url: "https://www.indiabix.com",
                    },
                  ].map((res) => (
                    <Card
                      key={res.name}
                      className="card-hover border border-border/50"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <TrendingUp
                            className="h-5 w-5"
                            style={{ color: "oklch(0.72 0.18 55)" }}
                          />
                          <span className="text-sm font-medium">
                            {res.name}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(res.url, "_blank")}
                          className="gap-1 text-xs"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-india-green/5 border border-india-green/20">
                  <p className="text-sm font-semibold mb-2">
                    📊 Aptitude Topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Number System",
                      "Percentages",
                      "Profit & Loss",
                      "Time & Work",
                      "Speed & Distance",
                      "Probability",
                      "Logical Reasoning",
                      "Data Interpretation",
                    ].map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Interview */}
              <TabsContent value="interview" className="mt-4 space-y-4">
                <h3 className="font-display font-bold text-foreground">
                  Common Interview Questions
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {interviewQuestions.map((iq) => (
                    <AccordionItem
                      key={iq.q}
                      value={iq.q.slice(0, 20)}
                      className="border border-border/50 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                        {iq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-3">
                        {iq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="border border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display">
                  🎯 {t("Top Resources", "Top Resources")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "GeeksforGeeks",
                    url: "https://www.geeksforgeeks.org",
                    desc: "Free DSA & CS content",
                  },
                  {
                    name: "IndiaBIX",
                    url: "https://www.indiabix.com",
                    desc: "Aptitude & interview Q&A",
                  },
                  {
                    name: "NPTEL",
                    url: "https://nptel.ac.in",
                    desc: "IIT/IISc video lectures",
                  },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {r.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {r.desc}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(r.url, "_blank")}
                      className="h-7 px-2"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl border border-saffron/20 bg-saffron/5">
              <p className="text-sm font-semibold text-foreground mb-1">
                💼 {t("Placement Tips", "Placement Tips")}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>✅ Resume 1 page mein rakho</li>
                <li>✅ Projects portfolio banao</li>
                <li>✅ LinkedIn profile update karo</li>
                <li>✅ Mock interviews do</li>
                <li>✅ Communication skills improve karo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
