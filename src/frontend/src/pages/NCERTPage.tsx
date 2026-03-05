import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// NCERT official URLs - government approved, copyright-free
const ncertData: Record<
  string,
  Record<string, { name: string; url: string; type: string }[]>
> = {
  "Class 1": {
    Mathematics: [
      {
        name: "Ganit Ka Jaadu",
        url: "https://ncert.nic.in/textbook.php?aemath1=0-13",
        type: "PDF",
      },
    ],
    Hindi: [
      {
        name: "Rimjhim",
        url: "https://ncert.nic.in/textbook.php?aehid1=0-23",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Marigold",
        url: "https://ncert.nic.in/textbook.php?aeen1=0-10",
        type: "PDF",
      },
    ],
  },
  "Class 2": {
    Mathematics: [
      {
        name: "Ganit Ka Jaadu 2",
        url: "https://ncert.nic.in/textbook.php?bemath1=0-13",
        type: "PDF",
      },
    ],
    Hindi: [
      {
        name: "Rimjhim 2",
        url: "https://ncert.nic.in/textbook.php?behid1=0-21",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Marigold 2",
        url: "https://ncert.nic.in/textbook.php?been1=0-10",
        type: "PDF",
      },
    ],
  },
  "Class 3": {
    Mathematics: [
      {
        name: "Math Magic 3",
        url: "https://ncert.nic.in/textbook.php?cemath1=0-14",
        type: "PDF",
      },
    ],
    Hindi: [
      {
        name: "Rimjhim 3",
        url: "https://ncert.nic.in/textbook.php?cehid1=0-19",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Marigold 3",
        url: "https://ncert.nic.in/textbook.php?ceen1=0-10",
        type: "PDF",
      },
    ],
    EVS: [
      {
        name: "Looking Around",
        url: "https://ncert.nic.in/textbook.php?ceevs1=0-23",
        type: "PDF",
      },
    ],
  },
  "Class 6": {
    Mathematics: [
      {
        name: "Mathematics (Class 6)",
        url: "https://ncert.nic.in/textbook.php?femh1=0-14",
        type: "PDF",
      },
    ],
    Science: [
      {
        name: "Science (Class 6)",
        url: "https://ncert.nic.in/textbook.php?fesc1=0-16",
        type: "PDF",
      },
    ],
    History: [
      {
        name: "Our Pasts - I",
        url: "https://ncert.nic.in/textbook.php?fehis1=0-8",
        type: "PDF",
      },
    ],
    Geography: [
      {
        name: "The Earth - Our Habitat",
        url: "https://ncert.nic.in/textbook.php?fesg1=0-7",
        type: "PDF",
      },
    ],
    Civics: [
      {
        name: "Social and Political Life - I",
        url: "https://ncert.nic.in/textbook.php?fessp1=0-9",
        type: "PDF",
      },
    ],
    Hindi: [
      {
        name: "Vasant - I",
        url: "https://ncert.nic.in/textbook.php?fehid1=0-17",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Honeysuckle",
        url: "https://ncert.nic.in/textbook.php?feen1=0-10",
        type: "PDF",
      },
    ],
  },
  "Class 9": {
    Mathematics: [
      {
        name: "Mathematics (Class 9)",
        url: "https://ncert.nic.in/textbook.php?iemh1=0-15",
        type: "PDF",
      },
    ],
    Science: [
      {
        name: "Science (Class 9)",
        url: "https://ncert.nic.in/textbook.php?iesc1=0-15",
        type: "PDF",
      },
    ],
    "Social Science": [
      {
        name: "Contemporary India - I",
        url: "https://ncert.nic.in/textbook.php?iesg1=0-6",
        type: "PDF",
      },
    ],
    Hindi: [
      {
        name: "Kshitij - I",
        url: "https://ncert.nic.in/textbook.php?iehd1=0-17",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Beehive",
        url: "https://ncert.nic.in/textbook.php?ieen1=0-11",
        type: "PDF",
      },
    ],
  },
  "Class 10": {
    Mathematics: [
      {
        name: "Mathematics (Class 10)",
        url: "https://ncert.nic.in/textbook.php?jemh1=0-15",
        type: "PDF",
      },
    ],
    Science: [
      {
        name: "Science (Class 10)",
        url: "https://ncert.nic.in/textbook.php?jejsc1=0-16",
        type: "PDF",
      },
    ],
    "Social Science": [
      {
        name: "India and the Contemporary World - II",
        url: "https://ncert.nic.in/textbook.php?jehs1=0-5",
        type: "PDF",
      },
    ],
    Hindi: [
      {
        name: "Kshitij - II",
        url: "https://ncert.nic.in/textbook.php?jehd1=0-17",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "First Flight",
        url: "https://ncert.nic.in/textbook.php?jeen1=0-11",
        type: "PDF",
      },
    ],
  },
  "Class 11": {
    Physics: [
      {
        name: "Physics Part 1 (Class 11)",
        url: "https://ncert.nic.in/textbook.php?keph1=0-8",
        type: "PDF",
      },
      {
        name: "Physics Part 2 (Class 11)",
        url: "https://ncert.nic.in/textbook.php?keph2=0-7",
        type: "PDF",
      },
    ],
    Chemistry: [
      {
        name: "Chemistry Part 1 (Class 11)",
        url: "https://ncert.nic.in/textbook.php?kech1=0-7",
        type: "PDF",
      },
      {
        name: "Chemistry Part 2 (Class 11)",
        url: "https://ncert.nic.in/textbook.php?kech2=0-7",
        type: "PDF",
      },
    ],
    Mathematics: [
      {
        name: "Mathematics (Class 11)",
        url: "https://ncert.nic.in/textbook.php?kemh1=0-16",
        type: "PDF",
      },
    ],
    Biology: [
      {
        name: "Biology (Class 11)",
        url: "https://ncert.nic.in/textbook.php?kebo1=0-22",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Hornbill",
        url: "https://ncert.nic.in/textbook.php?keen1=0-8",
        type: "PDF",
      },
    ],
    Economics: [
      {
        name: "Indian Economic Development",
        url: "https://ncert.nic.in/textbook.php?keec1=0-10",
        type: "PDF",
      },
    ],
  },
  "Class 12": {
    Physics: [
      {
        name: "Physics Part 1 (Class 12)",
        url: "https://ncert.nic.in/textbook.php?leph1=0-14",
        type: "PDF",
      },
      {
        name: "Physics Part 2 (Class 12)",
        url: "https://ncert.nic.in/textbook.php?leph2=0-9",
        type: "PDF",
      },
    ],
    Chemistry: [
      {
        name: "Chemistry Part 1 (Class 12)",
        url: "https://ncert.nic.in/textbook.php?lech1=0-8",
        type: "PDF",
      },
      {
        name: "Chemistry Part 2 (Class 12)",
        url: "https://ncert.nic.in/textbook.php?lech2=0-7",
        type: "PDF",
      },
    ],
    Mathematics: [
      {
        name: "Mathematics Part 1 (Class 12)",
        url: "https://ncert.nic.in/textbook.php?lemh1=0-7",
        type: "PDF",
      },
      {
        name: "Mathematics Part 2 (Class 12)",
        url: "https://ncert.nic.in/textbook.php?lemh2=0-6",
        type: "PDF",
      },
    ],
    Biology: [
      {
        name: "Biology (Class 12)",
        url: "https://ncert.nic.in/textbook.php?lebo1=0-16",
        type: "PDF",
      },
    ],
    English: [
      {
        name: "Flamingo",
        url: "https://ncert.nic.in/textbook.php?leen1=0-8",
        type: "PDF",
      },
    ],
    Economics: [
      {
        name: "Macroeconomics",
        url: "https://ncert.nic.in/textbook.php?leec1=0-6",
        type: "PDF",
      },
    ],
  },
};

const classes = Object.keys(ncertData);

export default function NCERTPage() {
  const { t } = useAppContext();
  const [selectedClass, setSelectedClass] = useState("Class 10");

  const subjects = Object.keys(ncertData[selectedClass] || {});
  const [activeSubject, setActiveSubject] = useState(subjects[0] || "");

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls);
    const newSubjects = Object.keys(ncertData[cls] || {});
    setActiveSubject(newSubjects[0] || "");
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <div className="bg-hero-pattern py-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <BookOpen
                className="h-8 w-8 text-saffron"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t("NCERT Books & Notes", "NCERT Books & Notes")}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "Class 1 से 12 तक सभी NCERT किताबें - सरकारी वेबसाइट से सीधे",
                "All NCERT books from Class 1-12 - directly from official website",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Government Approved</span>
              <span className="badge-govt">📖 Copyright Free</span>
              <span className="badge-made-in-india">🇮🇳 NCERT Official</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Class Selector */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-2">
            {t("Class Select करें:", "Select Class:")}
          </p>
          <div className="flex flex-wrap gap-2">
            {classes.map((cls) => (
              <button
                type="button"
                key={cls}
                onClick={() => handleClassChange(cls)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedClass === cls
                    ? "text-white shadow-saffron"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={
                  selectedClass === cls
                    ? { background: "oklch(0.72 0.18 55)" }
                    : {}
                }
                data-ocid="ncert.class.select"
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Tabs */}
        {subjects.length > 0 && (
          <div className="mb-6">
            <Tabs value={activeSubject} onValueChange={setActiveSubject}>
              <TabsList className="flex flex-wrap gap-1 h-auto p-1 justify-start">
                {subjects.map((sub) => (
                  <TabsTrigger
                    key={sub}
                    value={sub}
                    className="text-xs sm:text-sm"
                  >
                    {sub}
                  </TabsTrigger>
                ))}
              </TabsList>

              {subjects.map((sub) => (
                <TabsContent key={sub} value={sub} className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(ncertData[selectedClass]?.[sub] || []).map(
                      (book, idx) => (
                        <motion.div
                          key={book.name}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Card className="card-hover border border-border/50 overflow-hidden h-full">
                            <div
                              className="h-2"
                              style={{ background: "oklch(0.72 0.18 55)" }}
                            />
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-saffron/10 flex-shrink-0">
                                  <FileText
                                    className="h-5 w-5"
                                    style={{ color: "oklch(0.72 0.18 55)" }}
                                  />
                                </div>
                                <div>
                                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                                    {book.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {selectedClass} • {sub}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                <span className="badge-govt text-[10px]">
                                  ✅ Govt Approved
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-[10px]"
                                >
                                  <Shield className="h-2.5 w-2.5 mr-1" />
                                  Copyright Free
                                </Badge>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="flex-1 bg-saffron hover:bg-saffron/90 text-white gap-1.5 text-xs"
                                  onClick={() =>
                                    window.open(book.url, "_blank")
                                  }
                                  data-ocid="ncert.book.open_modal_button"
                                >
                                  <BookOpen className="h-3.5 w-3.5" />
                                  {t("PDF Kholein", "Open PDF")}
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1.5 text-xs"
                                  onClick={() =>
                                    window.open(book.url, "_blank")
                                  }
                                >
                                  <Download className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ),
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {/* NCERT Website Link */}
        <div className="mt-8 p-6 rounded-2xl border border-border/50 bg-card">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-foreground mb-1">
                {t("NCERT Official Website", "NCERT Official Website")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "सभी किताबें और resources NCERT की official website से",
                  "All books and resources from NCERT official website",
                )}
              </p>
            </div>
            <Button
              className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={() =>
                window.open("https://ncert.nic.in/textbook.php", "_blank")
              }
            >
              <ExternalLink className="h-4 w-4" />
              NCERT.NIC.IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
