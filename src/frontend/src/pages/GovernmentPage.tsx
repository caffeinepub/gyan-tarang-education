import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import {
  Award,
  Briefcase,
  Building2,
  Clock,
  ExternalLink,
  GraduationCap,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

const jobs = [
  {
    title: "National Career Service Portal",
    desc: "Government jobs ka sabse bada portal - all India vacancy",
    url: "https://www.ncs.gov.in",
    badge: "Official GOI",
    urgent: false,
  },
  {
    title: "Sarkari Result",
    desc: "Latest government job notifications, results, admit cards",
    url: "https://sarkariresult.com",
    badge: "Popular",
    urgent: false,
  },
  {
    title: "Rojgar Samachar",
    desc: "Ministry of Labour ka official employment newspaper",
    url: "https://rojgarsamachar.gov.in",
    badge: "Official GOI",
    urgent: false,
  },
  {
    title: "SSC.NIC.IN",
    desc: "Staff Selection Commission - Group B & C posts",
    url: "https://ssc.nic.in",
    badge: "SSC",
    urgent: false,
  },
  {
    title: "UPSC.GOV.IN",
    desc: "IAS/IPS/IFS aur other civil services",
    url: "https://upsc.gov.in",
    badge: "UPSC",
    urgent: false,
  },
  {
    title: "RRB - Indian Railways",
    desc: "Railway Recruitment Boards - lakh posts available",
    url: "https://indianrailways.gov.in",
    badge: "Railway",
    urgent: false,
  },
  {
    title: "IBPS - Banking",
    desc: "PO, Clerk, SO - banking jobs recruitment",
    url: "https://ibps.in",
    badge: "Banking",
    urgent: false,
  },
  {
    title: "CSBC Bihar Police",
    desc: "Bihar Police constable, SI recruitment",
    url: "https://csbc.bih.nic.in",
    badge: "Bihar Police",
    urgent: true,
  },
];

const scholarships = [
  {
    title: "National Scholarship Portal",
    org: "Ministry of Education",
    desc: "50+ scholarships - SC/ST, OBC, Minority, Merit-based - ek hi jagah sab milega",
    url: "https://scholarships.gov.in",
    amount: "₹5,000 - ₹36,200 per year",
    deadline: "October-November",
    official: true,
  },
  {
    title: "PM Scholarship Scheme",
    org: "Prime Minister's Office",
    desc: "Ex-servicemen ke bacchon ke liye scholarship - BTech/MBBS/BBA/BCA mein admission le sakte ho",
    url: "https://ksb.gov.in/pm-scholarship.htm",
    amount: "₹2,500 - ₹3,000 per month",
    deadline: "Yearly in October",
    official: true,
  },
  {
    title: "AICTE Scholarship",
    org: "AICTE",
    desc: "Technical education mein admission lene wale students ke liye - BTech approved colleges",
    url: "https://scholarships.gov.in",
    amount: "₹30,000 per year",
    deadline: "November",
    official: true,
  },
  {
    title: "State Scholarship Bihar",
    org: "Bihar Government",
    desc: "Bihar ke students ke liye State scholarship - Class 10 pass karo aur apply karo",
    url: "https://scholarships.gov.in",
    amount: "₹10,000 - ₹25,000",
    deadline: "December",
    official: true,
  },
  {
    title: "INSPIRE Scholarship",
    org: "DST, Government of India",
    desc: "Science mein interested students ke liye - top 1% students ko milti hai",
    url: "http://www.online-inspire.gov.in",
    amount: "₹80,000 per year",
    deadline: "July-August",
    official: true,
  },
  {
    title: "Post Matric Scholarship OBC",
    org: "Ministry of Social Justice",
    desc: "OBC students ke liye Class 11 se PhD tak",
    url: "https://scholarships.gov.in",
    amount: "₹5,000 - ₹10,000",
    deadline: "October-November",
    official: true,
  },
];

const schemes = [
  {
    title: "PM Free Silai Machine Yojana",
    org: "GOI",
    desc: "Mahilaon ke liye free sewing machine - self-employment",
    url: "https://www.india.gov.in",
    category: "Women",
  },
  {
    title: "Pradhan Mantri Garib Kalyan Yojana",
    org: "GOI",
    desc: "Garib logo ke liye food security aur basic needs",
    url: "https://www.india.gov.in",
    category: "Welfare",
  },
  {
    title: "Skill India Mission",
    org: "MSDE",
    desc: "Skill development training - free skill courses",
    url: "https://www.skillindia.gov.in",
    category: "Skill",
  },
  {
    title: "Startup India",
    org: "DPIIT",
    desc: "Students apna startup shuru kar sakte hain - government help milegi",
    url: "https://www.startupindia.gov.in",
    category: "Startup",
  },
  {
    title: "PM Kaushal Vikas Yojana",
    org: "MSDE",
    desc: "Free skill training with certificate - government approved",
    url: "https://www.pmkvyofficial.org",
    category: "Skill",
  },
  {
    title: "Beti Bachao Beti Padhao",
    org: "Ministry of WCD",
    desc: "Girl child education aur welfare scheme",
    url: "https://www.india.gov.in",
    category: "Education",
  },
];

export default function GovernmentPage() {
  const { t } = useAppContext();

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
              <Building2
                className="h-8 w-8"
                style={{ color: "oklch(0.72 0.18 55)" }}
              />
              <h1 className="font-display text-3xl font-black text-white">
                {t(
                  "Government Jobs, Scholarships & Schemes",
                  "Government Jobs, Scholarships & Schemes",
                )}
              </h1>
            </div>
            <p className="text-white/70">
              {t(
                "सभी सरकारी नौकरियाँ, छात्रवृत्तियाँ और योजनाएं - Official Links",
                "All government jobs, scholarships and schemes - Official Links",
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Official Links Only</span>
              <span className="badge-made-in-india">
                🇮🇳 Government of India
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="jobs">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="jobs" className="gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              {t("Jobs", "Jobs")}
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              {t("Scholarships", "Scholarships")}
            </TabsTrigger>
            <TabsTrigger value="schemes" className="gap-1.5">
              <Award className="h-3.5 w-3.5" />
              {t("Schemes", "Schemes")}
            </TabsTrigger>
          </TabsList>

          {/* JOBS TAB */}
          <TabsContent value="jobs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                >
                  <Card className="card-hover border border-border/50 h-full overflow-hidden">
                    {job.urgent && <div className="h-1.5 bg-destructive" />}
                    {!job.urgent && (
                      <div
                        className="h-1.5"
                        style={{ background: "oklch(0.22 0.12 260)" }}
                      />
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-foreground text-sm leading-tight">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] shrink-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {job.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="badge-govt text-[10px]">
                          ✅ {job.badge}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs gap-1.5 h-7"
                          onClick={() => window.open(job.url, "_blank")}
                          data-ocid="govt.link"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Apply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 rounded-xl border border-border/50 bg-muted/30 flex items-start gap-3">
              <Shield className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Gyan Tarang sirf official government websites ke links provide
                karta hai. Hum kisi third party recruitment agency ko promote
                nahi karte. Hamesha official websites par jaayein aur verify
                karein.
              </p>
            </div>
          </TabsContent>

          {/* SCHOLARSHIPS TAB */}
          <TabsContent value="scholarships">
            <div className="mb-4 p-4 rounded-xl border border-india-green/20 bg-india-green/5">
              <p className="text-sm font-semibold text-foreground mb-1">
                🏆 National Scholarship Portal (NSP) - One Stop Solution
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Sabse pehle <strong>scholarships.gov.in</strong> par register
                karein. Ek hi jagah sab scholarships ke liye apply kar sakte
                hain.
              </p>
              <Button
                className="gap-2 bg-india-green hover:bg-india-green/90 text-white text-xs h-8"
                style={{ background: "oklch(0.56 0.18 145)" }}
                onClick={() =>
                  window.open("https://scholarships.gov.in", "_blank")
                }
              >
                <ExternalLink className="h-3.5 w-3.5" />
                NSP Portal Open Karein
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scholarships.map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="card-hover border border-border/50 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-foreground text-sm leading-tight">
                          {s.title}
                        </h3>
                        {s.official && (
                          <Badge
                            className="text-[10px] shrink-0"
                            style={{
                              background: "oklch(0.56 0.18 145 / 0.12)",
                              color: "oklch(0.35 0.15 145)",
                              borderColor: "oklch(0.56 0.18 145 / 0.3)",
                            }}
                          >
                            ✅ Official
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {s.org}
                      </p>
                      <p className="text-xs text-foreground/80 mb-3 line-clamp-2">
                        {s.desc}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-[10px] text-muted-foreground">
                            Amount
                          </p>
                          <p className="text-xs font-semibold text-foreground">
                            {s.amount}
                          </p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-[10px] text-muted-foreground">
                            Deadline
                          </p>
                          <p className="text-xs font-semibold text-foreground flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {s.deadline}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full gap-1.5 text-xs"
                        style={{
                          background: "oklch(0.22 0.12 260)",
                          color: "white",
                        }}
                        onClick={() => window.open(s.url, "_blank")}
                        data-ocid="govt.link"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* SCHEMES TAB */}
          <TabsContent value="schemes">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemes.map((scheme, idx) => (
                <motion.div
                  key={scheme.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                >
                  <Card className="card-hover border border-border/50 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ background: "oklch(0.72 0.18 55 / 0.12)" }}
                        >
                          <Award
                            className="h-4 w-4"
                            style={{ color: "oklch(0.72 0.18 55)" }}
                          />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground text-sm leading-tight">
                            {scheme.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {scheme.org}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-foreground/80 mb-3">
                        {scheme.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px]">
                          {scheme.category}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs gap-1 h-7"
                          onClick={() => window.open(scheme.url, "_blank")}
                          data-ocid="govt.link"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* India.gov.in */}
            <div className="mt-6 p-5 rounded-2xl border border-saffron/20 bg-saffron/5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">
                    🇮🇳 India.gov.in - National Portal
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Government of India ki sabhi schemes ek jagah
                  </p>
                </div>
                <Button
                  className="gap-2 bg-saffron hover:bg-saffron/90 text-white"
                  onClick={() =>
                    window.open("https://www.india.gov.in", "_blank")
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit India.gov.in
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
