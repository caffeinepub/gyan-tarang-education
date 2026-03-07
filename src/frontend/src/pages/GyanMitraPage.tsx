import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import {
  BookOpen,
  Bot,
  Brain,
  GraduationCap,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  subject?: string;
  timestamp: Date;
}

const subjects = [
  { id: "maths", label: "Mathematics / गणित", icon: "📐" },
  { id: "science", label: "Science / विज्ञान", icon: "🔬" },
  { id: "english", label: "English", icon: "📖" },
  { id: "hindi", label: "Hindi / हिंदी", icon: "📝" },
  { id: "history", label: "History/SST / इतिहास", icon: "🏛️" },
  { id: "computer", label: "Computer Science", icon: "💻" },
  { id: "gk", label: "General Knowledge / GK", icon: "🌍" },
  { id: "career", label: "Career Guidance / कैरियर", icon: "🎯" },
  { id: "physics", label: "Physics / भौतिकी", icon: "⚡" },
  { id: "chemistry", label: "Chemistry / रसायन", icon: "🧪" },
  { id: "biology", label: "Biology / जीव विज्ञान", icon: "🌿" },
  { id: "economics", label: "Economics / अर्थशास्त्र", icon: "📊" },
];

// AI response generation based on subject and keywords
function generateAIResponse(question: string, subject: string): string {
  const q = question.toLowerCase();

  if (subject === "maths") {
    if (q.includes("theorem") || q.includes("pythagoras")) {
      return "📐 **Pythagoras Theorem:**\n\nRight triangle mein:\n**a² + b² = c²**\n\nJahan:\n• a, b = do shorter sides (legs)\n• c = hypotenuse (sabse badi side)\n\n**Example:**\nAgar a=3, b=4, toh:\nc² = 3² + 4² = 9 + 16 = 25\nc = √25 = **5**\n\n✅ Yaad rakhein: 3-4-5 Pythagorean triplet hai!\n\nKya aur koi concept samjhana hai? 🙂";
    }
    if (q.includes("quadratic") || q.includes("formula") || q.includes("ax²")) {
      return "📐 **Quadratic Formula:**\n\nEquation: ax² + bx + c = 0\n\n**Formula:**\nx = (-b ± √(b² - 4ac)) / 2a\n\n**Step-by-step:**\n1. a, b, c identify karein\n2. Discriminant calculate karein: D = b² - 4ac\n3. Agar D > 0: 2 real roots\n4. Agar D = 0: 1 real root\n5. Agar D < 0: no real roots\n\n**Example:**\nx² - 5x + 6 = 0\na=1, b=-5, c=6\nx = (5 ± √(25-24)) / 2 = (5 ± 1) / 2\nx = **3** ya **2** ✅";
    }
    if (
      q.includes("trigonometry") ||
      q.includes("sin") ||
      q.includes("cos") ||
      q.includes("tan")
    ) {
      return "📐 **Trigonometry Basics:**\n\n**Standard Values:**\n| Angle | sin | cos | tan |\n|-------|-----|-----|-----|\n| 0° | 0 | 1 | 0 |\n| 30° | 1/2 | √3/2 | 1/√3 |\n| 45° | 1/√2 | 1/√2 | 1 |\n| 60° | √3/2 | 1/2 | √3 |\n| 90° | 1 | 0 | ∞ |\n\n**Important Identities:**\n• sin²θ + cos²θ = 1\n• tan θ = sin θ / cos θ\n• 1 + tan²θ = sec²θ\n\nTrick: **All Silver Tea Cups** (All+, Sin+, Tan+, Cos+) - quadrant mein sign yaad karne ke liye! 🎯";
    }
    if (q.includes("algebra") || q.includes("equation")) {
      return "📐 **Algebra Tips:**\n\n**Golden Rules:**\n1. Jo ek side se hatao, doosri side mein jaata hai (with opposite sign)\n2. Multiplication hatane ke liye division karo\n3. Always simplify karein\n\n**Example:** 3x + 7 = 22\n• 3x = 22 - 7 = 15\n• x = 15/3 = **5** ✅\n\n**Verify:** 3(5) + 7 = 15 + 7 = 22 ✓\n\nHamesha answer verify karo! 💡";
    }
    return `📐 **Mathematics Help:**\n\nAapka sawaal: "${question}"\n\n🔑 **General Approach:**\n1. Pehle problem carefully padhen\n2. Known values identify karein\n3. Correct formula choose karein\n4. Step-by-step solve karein\n5. Answer check karein\n\n**Available Topics:**\n• Algebra, Trigonometry, Geometry\n• Calculus, Statistics, Mensuration\n• Number Theory, Probability\n\nKripya specific topic batayein jaise "quadratic equation", "trigonometry values", etc.! 😊`;
  }

  if (subject === "physics") {
    if (q.includes("newton") || q.includes("force") || q.includes("motion")) {
      return `⚡ **Newton's Laws of Motion:**\n\n**1st Law (Inertia):**\nJab tak koi force na lage, object apni state nahi badalta.\n\n**2nd Law:**\nF = ma (Force = mass × acceleration)\n\n**3rd Law:**\nHar action ka equal aur opposite reaction hota hai.\n\n**Example:**\n1kg ball pe 10N force lagao:\na = F/m = 10/1 = **10 m/s²** ✅\n\n**Trick:** "Every action has equal opposite reaction" - rocket launch isi principle se kaam karta hai! 🚀`;
    }
    if (
      q.includes("ohm") ||
      q.includes("current") ||
      q.includes("voltage") ||
      q.includes("resistance")
    ) {
      return `⚡ **Ohm's Law:**\n\nV = IR\n\nJahan:\n• V = Voltage (Volts)\n• I = Current (Amperes)\n• R = Resistance (Ohms Ω)\n\n**Derived formulas:**\n• I = V/R\n• R = V/I\n\n**Example:**\n12V battery, 4Ω resistance:\nI = V/R = 12/4 = **3 Amperes** ✅\n\n**Memory trick:** "VIR-gin" - V, I, R! 💡`;
    }
    return `⚡ **Physics Help:**\n\nAapka sawaal: "${question}"\n\n**Key Physics Concepts:**\n• Mechanics (Newton's Laws, Motion)\n• Electricity (Ohm's Law, Circuits)\n• Optics (Light, Reflection/Refraction)\n• Thermodynamics (Heat, Temperature)\n• Modern Physics (Atoms, Quantum)\n\nSpecific topic batayein! 🙂`;
  }

  if (subject === "chemistry") {
    if (
      q.includes("periodic") ||
      q.includes("element") ||
      q.includes("atomic")
    ) {
      return `🧪 **Periodic Table Tips:**\n\n**Groups (Columns) ki Properties:**\n• Group 1 (Alkali Metals): Very reactive, +1 charge\n• Group 2 (Alkaline Earth): +2 charge\n• Group 17 (Halogens): Very reactive, -1 charge\n• Group 18 (Noble Gases): Inert, no reaction\n\n**Period (Row) Trends:**\n• Left se right: atomic radius decreases\n• Left se right: electronegativity increases\n• Top se bottom: atomic radius increases\n\n**Memory Trick - First 20 elements:**\n"Hari Heli Bhavnagar Behosh Car Nahi Olivia Fariyad Nahi Na Mange, Alpha Si Pharma Suno Chlor Arjun Ka Ca" ✅`;
    }
    if (q.includes("acid") || q.includes("base") || q.includes("ph")) {
      return "🧪 **Acids, Bases & pH:**\n\n**pH Scale:** 0-14\n• 0-6: Acidic (HCl, Vinegar)\n• 7: Neutral (Pure water)\n• 8-14: Basic/Alkaline (NaOH, Soap)\n\n**Indicators:**\n• Litmus: Red in acid, Blue in base\n• Phenolphthalein: Pink in base, colorless in acid\n\n**Common Examples:**\n• Lemon juice: pH ~2 (Acidic)\n• Blood: pH ~7.4 (Slightly basic)\n• Milk of Magnesia: pH ~10 (Basic)\n\nNeutralisation: HCl + NaOH → NaCl + H₂O ✅";
    }
    return `🧪 **Chemistry Help:**\n\nAapka sawaal: "${question}"\n\n**Key Chemistry Areas:**\n• Physical Chemistry (Atomic structure, Thermodynamics)\n• Organic Chemistry (Carbon compounds, Reactions)\n• Inorganic Chemistry (Periodic table, Metals)\n\nKoई specific topic batayein! 🙂`;
  }

  if (subject === "science") {
    if (
      q.includes("photosynthesis") ||
      q.includes("plant") ||
      q.includes("chlorophyll")
    ) {
      return `🔬 **Photosynthesis:**\n\n**Equation:**\n6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\n**Kahan hota hai:** Chloroplast mein (green part)\n\n**Kya chahiye:**\n• Sunlight ☀️\n• Carbon Dioxide (CO₂)\n• Water (H₂O)\n• Chlorophyll (green pigment)\n\n**Products:**\n• Glucose (food for plant)\n• Oxygen (we breathe!)\n\n**Yaad rakhein:** Plants are "food factories" - sunlight use karke khana banate hain! 🌿✅`;
    }
    if (
      q.includes("cell") ||
      q.includes("nucleus") ||
      q.includes("mitochondria")
    ) {
      return `🔬 **Cell Biology:**\n\n**Cell = Life ki basic unit**\n\n**Key Organelles:**\n• **Nucleus** = Control center (DNA yahan)\n• **Mitochondria** = "Powerhouse" (ATP energy)\n• **Cell Membrane** = Security guard (entry/exit control)\n• **Ribosomes** = Protein factory\n• **Chloroplast** = Photosynthesis (only in plants)\n\n**Plant vs Animal Cell:**\n• Plant mein: Cell wall, Chloroplast, Large vacuole\n• Animal mein: Centriole, Small vacuoles\n\n**Memory:** "Mighty Cell Has Ribosome" → Mitochondria, Cell membrane, Nucleus, Ribosomes ✅`;
    }
    return `🔬 **Science Help:**\n\nAapka sawaal: "${question}"\n\n**Science Branches:**\n• Physics: Force, Motion, Electricity\n• Chemistry: Elements, Reactions, Bonds\n• Biology: Cells, Genetics, Evolution\n• Environmental Science\n\nSpecific topic batayein! 😊`;
  }

  if (subject === "english") {
    if (
      q.includes("tense") ||
      q.includes("present") ||
      q.includes("past") ||
      q.includes("future")
    ) {
      return `📖 **English Tenses:**\n\n**Present Tense:**\n• Simple: "I eat" (daily habit)\n• Continuous: "I am eating" (right now)\n• Perfect: "I have eaten" (completed, effect continues)\n\n**Past Tense:**\n• Simple: "I ate" (finished action)\n• Continuous: "I was eating" (ongoing in past)\n• Perfect: "I had eaten" (completed before another past action)\n\n**Future Tense:**\n• Simple: "I will eat"\n• Continuous: "I will be eating"\n• Perfect: "I will have eaten"\n\n**Trick:** Present/Past/Future + Simple/Continuous/Perfect = 12 tenses total! ✅`;
    }
    if (
      q.includes("grammar") ||
      q.includes("article") ||
      q.includes("noun") ||
      q.includes("verb")
    ) {
      return `📖 **English Grammar Basics:**\n\n**Parts of Speech:**\n1. **Noun** - Name of person/place/thing (Ram, India, book)\n2. **Pronoun** - Replace noun (he, she, it, they)\n3. **Verb** - Action word (run, eat, think)\n4. **Adjective** - Describes noun (big, beautiful, red)\n5. **Adverb** - Describes verb (quickly, very, always)\n6. **Preposition** - Shows relation (in, on, at, by)\n7. **Conjunction** - Joins (and, but, or, because)\n8. **Interjection** - Exclamation (Oh! Wow! Ouch!)\n\n**Articles:**\n• "a" - before consonant sound: a book, a university\n• "an" - before vowel sound: an apple, an hour\n• "the" - specific: the book (which one we know) ✅`;
    }
    return `📖 **English Help:**\n\nAapka sawaal: "${question}"\n\n**English Topics I can help with:**\n• Grammar (Tenses, Articles, Prepositions)\n• Vocabulary Building\n• Writing Skills (Essay, Letter, Story)\n• Reading Comprehension\n• Speaking Tips\n• IELTS/TOEFL preparation\n\n**Daily Tip:** Roz ek English newspaper padho aur 5 naye words seekho! 📰\n\nSpecific topic batayein! 🙂`;
  }

  if (subject === "hindi") {
    return `📝 **हिंदी सहायता:**\n\nआपका प्रश्न: "${question}"\n\n**हिंदी के महत्वपूर्ण विषय:**\n\n• **व्याकरण:** संज्ञा, सर्वनाम, क्रिया, विशेषण\n• **काल:** भूतकाल, वर्तमान काल, भविष्यकाल\n• **छंद:** दोहा, चौपाई, कवित्त, सवैया\n• **अलंकार:** अनुप्रास, यमक, उपमा, रूपक\n• **रस:** शृंगार, वीर, करुण, हास्य, आदि\n\n**परीक्षा टिप्स:**\n• NCERT पाठ्यपुस्तक को ध्यान से पढ़ें\n• मुहावरे और लोकोक्तियाँ याद करें\n• निबंध लेखन का अभ्यास करें\n\nविशेष विषय बताएं! 🙂`;
  }

  if (subject === "history") {
    if (q.includes("1857") || q.includes("mutiny") || q.includes("revolt")) {
      return "🏛️ **1857 Ki Kranti:**\n\n**Kab:** 10 May 1857\n**Kahan se shuru:** Meerut (UP)\n\n**Karan (Causes):**\n1. **Turant Karan:** Enfield rifle mein gaay/suar ki charbi\n2. Doctrine of Lapse (Dalhousie ki policy)\n3. Economic exploitation\n4. Cultural interference\n5. Sepoys mein dissatisfaction\n\n**Pramukh Neta:**\n• Mangal Pandey (first spark)\n• Rani Laxmibai (Jhansi)\n• Nana Sahib (Kanpur)\n• Tatya Tope\n• Bahadur Shah Zafar (nominal leader)\n\n**Parinaam:**\n• British East India Company khatam\n• Queen Victoria ka direct rule shuru (1858)\n\nYah independence ka pehla sangram tha! 🇮🇳✅";
    }
    if (
      q.includes("mughal") ||
      q.includes("akbar") ||
      q.includes("aurangzeb")
    ) {
      return `🏛️ **Mughal Empire:**\n\n**Rulers (in order):**\n1. **Babur** (1526-1530) - Founder, Battle of Panipat I\n2. **Humayun** (1530-1556) - Sher Shah ne nikala, wapas aaya\n3. **Akbar** (1556-1605) - Din-i-Ilahi, greatest Mughal\n4. **Jahangir** (1605-1627) - Nur Jahan ki power\n5. **Shah Jahan** (1627-1658) - Taj Mahal banaya\n6. **Aurangzeb** (1658-1707) - Last powerful emperor\n\n**Akbar ki Policies:**\n• Din-i-Ilahi - all religions equal\n• Rajput alliance (Jodha Bai se shaadi)\n• Navratnas (9 brilliant people in court)\n\nTrick: "Babur Had A Jolly Shah After" = Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb ✅`;
    }
    return `🏛️ **History/SST Help:**\n\nAapka sawaal: "${question}"\n\n**Topics Available:**\n• Ancient India (Vedic period, Maurya, Gupta)\n• Medieval India (Delhi Sultanate, Mughal Empire)\n• Modern India (British Rule, Independence Movement)\n• World History (World Wars, French Revolution)\n• Geography (Indian Geography, World Geography)\n• Civics (Indian Constitution, Government)\n• Economics (Basic concepts)\n\nSpecific topic batayein! 🙂`;
  }

  if (subject === "computer") {
    if (
      q.includes("binary") ||
      q.includes("number system") ||
      q.includes("hexadecimal")
    ) {
      return "💻 **Number Systems:**\n\n**Binary (Base 2):** 0, 1\n**Octal (Base 8):** 0-7\n**Decimal (Base 10):** 0-9\n**Hexadecimal (Base 16):** 0-9, A-F\n\n**Decimal to Binary:**\n13 = ?\n13 ÷ 2 = 6 rem **1**\n6 ÷ 2 = 3 rem **0**\n3 ÷ 2 = 1 rem **1**\n1 ÷ 2 = 0 rem **1**\nRead bottom to top: **1101** ✅\n\n**Binary to Decimal:**\n1101 = 1×8 + 1×4 + 0×2 + 1×1 = 8+4+0+1 = **13** ✅\n\n**1 Byte = 8 bits**\n**1 KB = 1024 Bytes** 💡";
    }
    if (q.includes("osi") || q.includes("network") || q.includes("protocol")) {
      return `💻 **OSI Model - 7 Layers:**\n\n7. **Application** - User ka interface (HTTP, FTP)\n6. **Presentation** - Data format (Encryption)\n5. **Session** - Connection manage\n4. **Transport** - Reliable delivery (TCP/UDP)\n3. **Network** - Routing (IP Address)\n2. **Data Link** - MAC Address\n1. **Physical** - Cables, Signals\n\n**Memory Trick (Top to Bottom):**\n"**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing"\nApplication, Presentation, Session, Transport, Network, Data Link, Physical ✅`;
    }
    return `💻 **Computer Science Help:**\n\nAapka sawaal: "${question}"\n\n**Topics:**\n• Programming (C, C++, Java, Python, Web)\n• Data Structures & Algorithms\n• Operating Systems\n• Database Management (SQL)\n• Computer Networks\n• Digital Electronics\n• Software Engineering\n\nSpecific topic batayein! 🙂`;
  }

  if (subject === "gk") {
    if (q.includes("india") || q.includes("bharat") || q.includes("capital")) {
      return "🌍 **India - Key Facts:**\n\n🏛️ **Government:**\n• Capital: New Delhi\n• President: Droupadi Murmu\n• Prime Minister: Narendra Modi\n• Parliament: Lok Sabha + Rajya Sabha\n\n🌏 **Geography:**\n• Area: 32.87 lakh km² (7th largest)\n• Population: ~143 crore (2nd largest)\n• States: 28 + 8 Union Territories\n• Longest river: Ganga\n• Highest peak: K2 (Karakoram)\n\n📜 **Constitution:**\n• Adopted: 26 Nov 1949\n• Effective: 26 Jan 1950 (Republic Day)\n• Articles: 448 (as amended)\n• Father of Constitution: B.R. Ambedkar ✅";
    }
    if (
      q.includes("current") ||
      q.includes("recent") ||
      q.includes("2024") ||
      q.includes("2025")
    ) {
      return `🌍 **Current Affairs 2025:**\n\n**Important Events:**\n• India's G20 Presidency (2023-24)\n• Chandrayaan-3 Mission (Moon South Pole, 2023)\n• UPI - World's most successful digital payment\n• PLI Schemes for Make in India\n\n**Important Organizations:**\n• UNESCO - Education, Culture\n• UNICEF - Children's welfare\n• WHO - World Health Organization\n• WTO - World Trade\n\n**Tips for Current Affairs:**\n1. Roz newspaper padho\n2. PIB (Press Information Bureau) follow karo\n3. Monthly current affairs magazines karo\n\nKisi specific topic ke baare mein puchein! 🙂`;
    }
    return `🌍 **General Knowledge:**\n\nAapka sawaal: "${question}"\n\n**GK Categories:**\n• Indian History & Culture\n• Geography (Indian & World)\n• Polity & Constitution\n• Science & Technology\n• Sports & Awards\n• Economy\n• Current Affairs\n\n**GK Preparation Tips:**\n1. Roz ek topic focus karo\n2. Notes banao - points mein\n3. Revision baar baar karo\n4. MCQ practice karo\n\nSpecific topic batayein! 🙂`;
  }

  if (subject === "career") {
    if (q.includes("jee") || q.includes("engineering") || q.includes("iit")) {
      return "🎯 **JEE / Engineering Career Guide:**\n\n**JEE Main:**\n• 4 attempts allowed (2 per year)\n• NIT, IIIT, GFTI admission\n• Subjects: Physics, Chemistry, Maths (PCM)\n\n**JEE Advanced:**\n• Top 2.5 lakh JEE Main qualifiers\n• IIT admission\n\n**Preparation Strategy:**\n1. **Class 11-12 NCERT** pehle complete karo\n2. **Standard books:** HC Verma (Physics), NCERT Chemistry, RD Sharma/Cengage (Maths)\n3. **Mock tests:** Weekly test series shuru karo\n4. **Revision:** Formulae roz revise\n5. **PYQ:** Last 10 years questions zaroor solve karo\n\n**Best Coaching (Free Online):**\n• NPTEL, Khan Academy, Unacademy Free\n• NCERT + PW (Physics Wallah) YouTube\n\nMehnath karo - IIT zaroor hoga! 💪✅";
    }
    if (q.includes("upsc") || q.includes("ias") || q.includes("civil")) {
      return "🎯 **UPSC IAS Career Guide:**\n\n**Exam Pattern:**\n• Prelims (MCQ)\n• Mains (Written)\n• Personality Test (Interview)\n\n**Eligibility:**\n• Graduate (any stream)\n• Age: 21-32 years (General)\n• Attempts: 6 (General)\n\n**Syllabus Overview:**\n• History, Geography, Polity, Economy\n• Current Affairs, Environment\n• Optional Subject (100+ choices)\n\n**Free Resources:**\n• NCERT books (Class 6-12)\n• PIB, The Hindu, Indian Express\n• Drishti IAS, Mrunal, Vision IAS (YouTube)\n\n**Timeline:** Minimum 1-2 years dedicated preparation\n\nYah safar mushkil hai, but impossible nahi! 🇮🇳💪";
    }
    return `🎯 **Career Guidance:**\n\nAapka sawaal: "${question}"\n\n**Popular Career Paths After 12th:**\n\n🔬 **Science Stream:**\n• Engineering (JEE) → B.Tech, M.Tech\n• Medical (NEET) → MBBS, BDS, Nursing\n• B.Sc + Research\n\n📊 **Commerce Stream:**\n• CA/CMA (Chartered/Cost Accountant)\n• BBA/MBA\n• Banking (IBPS, SBI)\n\n📚 **Arts/Humanities:**\n• BA + LLB (Law)\n• UPSC/Civil Services\n• Teaching (B.Ed, CTET)\n\n**My Advice:**\n"Apni strength pehchano, phir mehnat se goal achieve karo!"\n\nSpecific career ke baare mein puchein! 🙂`;
  }

  if (subject === "biology") {
    if (
      q.includes("dna") ||
      q.includes("genetics") ||
      q.includes("chromosome")
    ) {
      return `🌿 **DNA & Genetics:**\n\n**DNA (Deoxyribonucleic Acid):**\n• Cell ke nucleus mein hota hai\n• Double helix structure (Watson & Crick, 1953)\n• 4 bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)\n• A-T, G-C pair karte hain\n\n**Chromosomes:**\n• Human: 46 chromosomes (23 pairs)\n• Sex chromosomes: XX (female), XY (male)\n\n**Genetics:**\n• Mendel = "Father of Genetics"\n• Dominant gene: Capital letter (T)\n• Recessive gene: Small letter (t)\n\n**Central Dogma:**\nDNA → RNA → Protein\n(Transcription → Translation) ✅`;
    }
    return `🌿 **Biology Help:**\n\nAapka sawaal: "${question}"\n\n**Key Topics:**\n• Cell Biology (Cell structure, Division)\n• Genetics (DNA, Heredity)\n• Ecology (Ecosystem, Food chain)\n• Human Biology (Systems)\n• Plant Biology (Photosynthesis)\n• Evolution (Darwin's Theory)\n\nNEET ke liye: **NCERT ek baar poori tarah padho!** 💪\n\nSpecific topic batayein! 🙂`;
  }

  if (subject === "economics") {
    return `📊 **Economics Help:**\n\nAapka sawaal: "${question}"\n\n**Key Concepts:**\n\n**Microeconomics:**\n• Demand & Supply\n• Elasticity\n• Market structures\n\n**Macroeconomics:**\n• GDP (Gross Domestic Product)\n• Inflation & Deflation\n• Monetary Policy (RBI)\n• Fiscal Policy (Budget)\n\n**Indian Economy:**\n• GDP ~3 trillion USD (5th largest)\n• Mixed Economy model\n• Five Year Plans (now NITI Aayog)\n\n**Tip:** NCERT Class 11 & 12 Economics pehle complete karo! ✅`;
  }

  return `🤖 **Gyan Mitra - Aapka AI Study Partner**\n\nAapka sawaal: "${question}"\n\n**Mujhe madad karne ke liye:**\n1. Upar se subject select karein\n2. Specific question poochein\n\n**Main in subjects mein help kar sakta hoon:**\n📐 Mathematics | ⚡ Physics | 🧪 Chemistry\n🌿 Biology | 🔬 Science | 📖 English\n📝 Hindi | 🏛️ History/SST | 💻 Computer\n🌍 GK | 🎯 Career Guidance\n\n**Best Results ke liye:**\n• Clear aur specific question poochein\n• Topic mention karein (jaise "quadratic formula")\n• Ek baar mein ek topic poochein\n\n**Yaad rakhein:** नहीं आता है? सीखो! 💪🇮🇳`;
}

const welcomeMessages: Message[] = [
  {
    id: "welcome",
    role: "ai",
    text: "🙏 **Namaste! Main Gyan Mitra hoon - Aapka AI Study Partner!**\n\n**Main kya kar sakta hoon:**\n• 📐 Maths step-by-step solutions\n• ⚡ Physics/Chemistry/Biology doubts\n• 📖 English Grammar help\n• 🏛️ History/GK explanations\n• 💻 Computer Science concepts\n• 🎯 Career Guidance\n\n**Kaise use karein:**\n1. Upar se subject select karein\n2. Apna sawaal poochein\n3. Detailed answer paayein!\n\n**शुरू करें - अपना पहला सवाल पूछें!** 🚀\n\n*नहीं आता है? सीखो!* 💪",
    timestamp: new Date(),
  },
];

export default function GyanMitraPage() {
  const { t } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(welcomeMessages);
  const [selectedSubject, setSelectedSubject] = useState("maths");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    const q = question.trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: q,
      subject: selectedSubject,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setIsLoading(true);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const aiResponse = generateAIResponse(q, selectedSubject);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      text: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);

    // Scroll to bottom
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedSubjectInfo = subjects.find((s) => s.id === selectedSubject);

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
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.65 0.15 40))",
                }}
              >
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-black text-white">
                  Gyan Mitra
                </h1>
                <p className="text-white/60 text-sm">
                  {t(
                    "आपका AI Study Partner - 24/7 Doubt Solver",
                    "Your AI Study Partner - 24/7 Doubt Solver",
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="badge-govt">✅ Government Approved</span>
              <span className="badge-made-in-india">🇮🇳 Made in India</span>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  background: "oklch(1 0 0 / 0.08)",
                  color: "oklch(0.95 0 0)",
                  borderColor: "oklch(1 0 0 / 0.2)",
                }}
              >
                <Sparkles className="h-3 w-3" />
                12+ Subjects
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Subject Selector Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border border-border/50 sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <BookOpen
                    className="h-4 w-4"
                    style={{ color: "oklch(0.72 0.18 55)" }}
                  />
                  {t("Subject चुनें", "Select Subject")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-1">
                  {subjects.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubject(sub.id)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2"
                      style={
                        selectedSubject === sub.id
                          ? {
                              background: "oklch(0.72 0.18 55)",
                              color: "white",
                              fontWeight: 600,
                            }
                          : {
                              color: "oklch(0.40 0.04 260)",
                            }
                      }
                      data-ocid={`gyan_mitra.subject.${sub.id}.button`}
                    >
                      <span className="text-base leading-none">{sub.icon}</span>
                      <span className="text-xs leading-tight">
                        {sub.label.split(" / ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="border border-border/50 flex flex-col h-[600px]">
              {/* Chat Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-border/50 shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 55 / 0.08), oklch(0.56 0.18 145 / 0.05))",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "oklch(0.72 0.18 55 / 0.15)" }}
                >
                  🤖
                </div>
                <div>
                  <div className="font-display font-bold text-foreground text-sm">
                    Gyan Mitra AI
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      {t("Online - 24/7 Available", "Online - 24/7 Available")}
                    </span>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge
                    className="text-xs"
                    style={{
                      background: "oklch(0.72 0.18 55 / 0.15)",
                      color: "oklch(0.55 0.18 55)",
                      border: "1px solid oklch(0.72 0.18 55 / 0.3)",
                    }}
                  >
                    {selectedSubjectInfo?.icon}{" "}
                    {selectedSubjectInfo?.label.split(" / ")[0]}
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea
                className="flex-1 p-4"
                ref={scrollRef as React.RefObject<HTMLDivElement>}
              >
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <AnimatePresence key={msg.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        data-ocid={`gyan_mitra.${msg.role}.item.${messages.indexOf(msg) + 1}`}
                      >
                        {/* Avatar */}
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-1"
                          style={{
                            background:
                              msg.role === "ai"
                                ? "oklch(0.72 0.18 55 / 0.15)"
                                : "oklch(0.22 0.12 260 / 0.15)",
                          }}
                        >
                          {msg.role === "ai" ? (
                            <Bot
                              className="h-4 w-4"
                              style={{ color: "oklch(0.72 0.18 55)" }}
                            />
                          ) : (
                            <User
                              className="h-4 w-4"
                              style={{ color: "oklch(0.22 0.12 260)" }}
                            />
                          )}
                        </div>

                        {/* Bubble */}
                        <div
                          className="max-w-[80%] rounded-2xl px-4 py-3 text-sm"
                          style={
                            msg.role === "ai"
                              ? {
                                  background: "oklch(0.97 0.005 80)",
                                  border: "1px solid oklch(0.90 0.02 260)",
                                  color: "oklch(0.20 0.02 260)",
                                  borderRadius: "4px 16px 16px 16px",
                                }
                              : {
                                  background:
                                    "linear-gradient(135deg, oklch(0.22 0.12 260), oklch(0.18 0.10 260))",
                                  color: "white",
                                  borderRadius: "16px 4px 16px 16px",
                                }
                          }
                        >
                          <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed">
                            {msg.text}
                          </pre>
                          <div
                            className="text-[10px] mt-1 opacity-60"
                            style={{
                              color:
                                msg.role === "ai"
                                  ? "oklch(0.50 0.04 260)"
                                  : "white",
                            }}
                          >
                            {msg.timestamp.toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                      data-ocid="gyan_mitra.loading_state"
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: "oklch(0.72 0.18 55 / 0.15)" }}
                      >
                        <Bot
                          className="h-4 w-4"
                          style={{ color: "oklch(0.72 0.18 55)" }}
                        />
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl flex items-center gap-2"
                        style={{
                          background: "oklch(0.97 0.005 80)",
                          border: "1px solid oklch(0.90 0.02 260)",
                        }}
                      >
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          style={{ color: "oklch(0.72 0.18 55)" }}
                        />
                        <span className="text-sm text-muted-foreground">
                          Gyan Mitra soch raha hai...
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50 shrink-0">
                <div className="mb-2">
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger
                      className="h-8 text-xs"
                      data-ocid="gyan_mitra.subject_select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.icon} {sub.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder={t(
                      "अपना सवाल यहाँ लिखें... (Enter दबाएं या Send करें)",
                      "Type your question here... (Press Enter or Send)",
                    )}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[48px] max-h-32 text-sm resize-none"
                    disabled={isLoading}
                    data-ocid="gyan_mitra.question_input"
                  />
                  <Button
                    className="h-auto px-4 font-bold shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 55), oklch(0.65 0.15 40))",
                      color: "white",
                    }}
                    onClick={handleSend}
                    disabled={!question.trim() || isLoading}
                    data-ocid="gyan_mitra.send_button"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 text-center">
                  💡 Specific sawaal karein jaise: "Pythagoras theorem explain
                  karo" ya "quadratic formula"
                </p>
              </div>
            </Card>

            {/* Quick Starters */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                {t("Quick Questions:", "Quick Questions:")}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Pythagoras theorem kya hai?",
                  "sin 30° = ?",
                  "Newton's Laws explain karo",
                  "DNA kya hota hai?",
                  "English tenses table",
                  "JEE ki preparation kaise karein?",
                ].map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => setQuestion(starter)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-80"
                    style={{
                      background: "oklch(0.72 0.18 55 / 0.1)",
                      color: "oklch(0.55 0.18 55)",
                      border: "1px solid oklch(0.72 0.18 55 / 0.25)",
                    }}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Info */}
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: Brain,
              title: "12+ Subjects",
              desc: "Maths, Science, English, GK aur bahut kuch",
              color: "oklch(0.72 0.18 55)",
            },
            {
              icon: MessageCircle,
              title: "Step-by-Step",
              desc: "Detailed explanations with examples",
              color: "oklch(0.22 0.12 260)",
            },
            {
              icon: GraduationCap,
              title: "Class 1-BTech",
              desc: "Sab levels ke liye content",
              color: "oklch(0.56 0.18 145)",
            },
            {
              icon: Sparkles,
              title: "Hindi + English",
              desc: "Dono languages mein help",
              color: "oklch(0.65 0.18 30)",
            },
          ].map((feat) => (
            <Card
              key={feat.title}
              className="border border-border/50 text-center"
            >
              <CardContent className="p-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${feat.color}15` }}
                >
                  <feat.icon
                    className="h-5 w-5"
                    style={{ color: feat.color }}
                  />
                </div>
                <div className="font-display font-bold text-sm text-foreground">
                  {feat.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {feat.desc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
