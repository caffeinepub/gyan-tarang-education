import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import { useActor } from "@/hooks/useActor";
import {
  Crown,
  Hash,
  MessageSquare,
  Plus,
  Search,
  Send,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  messages: Message[];
}

const defaultGroups: Group[] = [
  {
    id: "jee-2026",
    name: "JEE 2026 Batch",
    description: "JEE Main & Advanced 2026 ki preparation ke liye",
    members: 2847,
    category: "Engineering",
    messages: [
      {
        id: "1",
        sender: "Rahul Kumar",
        text: "Kal ka math paper kaisa laga? Integration ke questions tough the!",
        time: "10:30 AM",
        isMe: false,
      },
      {
        id: "2",
        sender: "Priya Singh",
        text: "Haan yaar, integration by parts waala part difficult tha. Koi resource share karo!",
        time: "10:35 AM",
        isMe: false,
      },
      {
        id: "3",
        sender: "Amit Sharma",
        text: "NCERT se padhna shuru karo, basics strong honge to baaki easy ho jayega 📚",
        time: "10:42 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "neet-aspirants",
    name: "NEET Aspirants",
    description: "NEET UG 2025-26 preparation group",
    members: 3521,
    category: "Medical",
    messages: [
      {
        id: "1",
        sender: "Dr. Anjali",
        text: "Biology mein taxonomy chapter important hai - sab padho!",
        time: "9:15 AM",
        isMe: false,
      },
      {
        id: "2",
        sender: "Vikas",
        text: "Chemistry organic reactions yaad karne ka koi shortcut hai?",
        time: "9:30 AM",
        isMe: false,
      },
      {
        id: "3",
        sender: "Sunita Verma",
        text: "Flashcards banao - main ye method use karti hoon, bahut helpful hai 🎯",
        time: "9:45 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "upsc-warriors",
    name: "UPSC Warriors",
    description: "UPSC CSE preparation - IAS/IPS/IFS dream",
    members: 1893,
    category: "Civil Services",
    messages: [
      {
        id: "1",
        sender: "IAS Aspirant",
        text: "Current affairs daily padhna zaroori hai. The Hindu recommend karoon?",
        time: "8:00 AM",
        isMe: false,
      },
      {
        id: "2",
        sender: "Shivam Tiwari",
        text: "NCERT ki books Class 6-12 sab padho - foundation build hogi",
        time: "8:20 AM",
        isMe: false,
      },
      {
        id: "3",
        sender: "Meera Gupta",
        text: "Answer writing practice karo daily - mains mein yahi kaam aata hai ✍️",
        time: "8:45 AM",
        isMe: false,
      },
    ],
  },
  {
    id: "btech-cse",
    name: "BTech CSE Group",
    description: "Computer Science Engineering - placement & studies",
    members: 1256,
    category: "BTech",
    messages: [
      {
        id: "1",
        sender: "Dev Singh",
        text: "DSA practice ke liye LeetCode best hai ya GeeksforGeeks?",
        time: "11:00 AM",
        isMe: false,
      },
      {
        id: "2",
        sender: "Ananya Roy",
        text: "Dono use karo! LeetCode interview prep, GFG concepts ke liye 💻",
        time: "11:15 AM",
        isMe: false,
      },
      {
        id: "3",
        sender: "Raju Mishra",
        text: "System design 6th sem se shuru karo - placement mein kaam aata hai!",
        time: "11:30 AM",
        isMe: false,
      },
    ],
  },
];

export default function StudyGroupsPage() {
  const { t, currentUser, isLoggedIn } = useAppContext();
  const { actor } = useActor();
  const [groups, setGroups] = useState<Group[]>(defaultGroups);
  const [activeGroup, setActiveGroup] = useState<Group>(defaultGroups[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    if (!isLoggedIn) {
      toast.error("Pehle login karein!");
      return;
    }

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: currentUser?.name || "User",
      text: messageText.trim(),
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    const updatedGroup = {
      ...activeGroup,
      messages: [...activeGroup.messages, newMsg],
    };

    setGroups((prev) =>
      prev.map((g) => (g.id === activeGroup.id ? updatedGroup : g)),
    );
    setActiveGroup(updatedGroup);
    setMessageText("");
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error("Group ka naam daalein");
      return;
    }
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      description: newGroupDesc || "Study group",
      members: 1,
      category: "General",
      messages: [],
    };
    if (actor) {
      try {
        await actor.createGroup(
          newGroup.id,
          newGroup.name,
          newGroup.description,
        );
      } catch {
        // continue without backend
      }
    }
    setGroups((prev) => [...prev, newGroup]);
    setCreateOpen(false);
    setNewGroupName("");
    setNewGroupDesc("");
    toast.success("Group create ho gaya! 🎉");
  };

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
              <Users
                className="h-8 w-8"
                style={{ color: "oklch(0.76 0.12 350)" }}
              />
              <h1 className="font-display text-3xl font-black text-foreground">
                {t("Study Groups", "Study Groups")}
              </h1>
            </div>
            <p className="text-foreground/70">
              {t(
                "Students ek doosre ke saath study groups mein join karein aur baat karein",
                "Students join study groups and communicate with each other",
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-280px)] min-h-[500px]">
          {/* Groups List */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder={t("Groups search karein...", "Search groups...")}
                  className="pl-8 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-ocid="study_groups.search_input"
                />
              </div>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="gap-1.5 bg-saffron hover:bg-saffron/90 text-foreground h-9 px-3"
                    data-ocid="study_groups.open_modal_button"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {t("New", "New")}
                  </Button>
                </DialogTrigger>
                <DialogContent data-ocid="study_groups.dialog">
                  <DialogHeader>
                    <DialogTitle>
                      {t(
                        "New Study Group Create Karein",
                        "Create New Study Group",
                      )}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label>Group ka Naam *</Label>
                      <Input
                        placeholder="e.g. JEE 2027 Aspirants"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="mt-1.5"
                        data-ocid="study_groups.input"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Group ke baare mein likhein..."
                        value={newGroupDesc}
                        onChange={(e) => setNewGroupDesc(e.target.value)}
                        className="mt-1.5"
                        data-ocid="study_groups.textarea"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setCreateOpen(false)}
                        data-ocid="study_groups.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 bg-saffron hover:bg-saffron/90 text-foreground"
                        onClick={handleCreateGroup}
                        data-ocid="study_groups.confirm_button"
                      >
                        Create Group
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <ScrollArea className="flex-1 rounded-xl border border-border/50">
              <div className="p-2 space-y-1">
                {filteredGroups.map((group, idx) => (
                  <button
                    type="button"
                    key={group.id}
                    onClick={() => setActiveGroup(group)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeGroup.id === group.id
                        ? "text-white"
                        : "hover:bg-muted"
                    }`}
                    style={
                      activeGroup.id === group.id
                        ? { background: "oklch(0.62 0.28 340)" }
                        : {}
                    }
                    data-ocid={`study_groups.item.${idx + 1}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            activeGroup.id === group.id
                              ? "oklch(0.72 0.18 55 / 0.3)"
                              : "oklch(0.72 0.18 55 / 0.12)",
                        }}
                      >
                        <Hash
                          className="h-4 w-4"
                          style={{ color: "oklch(0.76 0.12 350)" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`font-semibold text-sm truncate ${activeGroup.id === group.id ? "text-white" : "text-foreground"}`}
                        >
                          {group.name}
                        </div>
                        <div
                          className={`text-xs truncate mt-0.5 ${activeGroup.id === group.id ? "text-white/60" : "text-muted-foreground"}`}
                        >
                          <Users className="h-2.5 w-2.5 inline mr-1" />
                          {group.members.toLocaleString()} members
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {filteredGroups.length === 0 && (
                  <div
                    className="text-center py-8 text-muted-foreground text-sm"
                    data-ocid="study_groups.empty_state"
                  >
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    No groups found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col rounded-xl border border-border/50 overflow-hidden">
            {/* Group Header */}
            <div
              className="p-4 border-b border-border/50 flex items-center justify-between"
              style={{ background: "oklch(0.68 0.22 345)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "oklch(0.72 0.18 55 / 0.2)" }}
                >
                  <Hash
                    className="h-4 w-4"
                    style={{ color: "oklch(0.76 0.12 350)" }}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-foreground text-sm">
                    {activeGroup.name}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {activeGroup.members.toLocaleString()} members •{" "}
                    {activeGroup.category}
                  </div>
                </div>
              </div>
              <Badge className="bg-india-green/20 border-india-green/30 text-foreground text-xs">
                {t("Active", "Active")}
              </Badge>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-background">
              <div className="space-y-3">
                {activeGroup.messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex gap-2 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-foreground flex-shrink-0"
                      style={{
                        background: msg.isMe
                          ? "oklch(0.76 0.12 350)"
                          : "oklch(0.62 0.28 340)",
                      }}
                    >
                      {msg.sender.charAt(0).toUpperCase()}
                    </div>
                    <div
                      className={`max-w-[75%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col gap-0.5`}
                    >
                      {!msg.isMe && (
                        <span className="text-[10px] text-muted-foreground px-1">
                          {msg.sender}
                        </span>
                      )}
                      <div
                        className="px-3 py-2 rounded-xl text-sm"
                        style={{
                          background: msg.isMe
                            ? "oklch(0.76 0.12 350)"
                            : "oklch(0.95 0.01 80)",
                          color: msg.isMe ? "white" : "oklch(0.15 0.02 260)",
                        }}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-muted-foreground px-1">
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {activeGroup.messages.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Pehle message bhejein!</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <Input
                placeholder={
                  isLoggedIn
                    ? t(
                        `${activeGroup.name} mein message bhejein...`,
                        `Message in ${activeGroup.name}...`,
                      )
                    : "Login karke join karein..."
                }
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={!isLoggedIn}
                className="flex-1"
                data-ocid="study_groups.input"
              />
              <Button
                size="sm"
                className="bg-saffron hover:bg-saffron/90 text-foreground px-3"
                onClick={handleSendMessage}
                disabled={!messageText.trim() || !isLoggedIn}
                data-ocid="study_groups.send.button"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
