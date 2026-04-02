import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import {
  useAddContentItem,
  useAddQuote,
  useDeleteContentItem,
  useGetAllContentItems,
  useGetAllQuotes,
  useGetAllUserProfiles,
  useIsCallerAdmin,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  FileText,
  Info,
  Loader2,
  Plus,
  Quote,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ContentItem } from "../backend.d.ts";

type AnnouncementType = "info" | "success" | "warning";

interface Announcement {
  id: string;
  text: string;
  type: AnnouncementType;
  createdAt: string;
}

export default function AdminPage() {
  const { isLoggedIn, currentUser } = useAppContext();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  const { data: contentItems, isLoading: contentLoading } =
    useGetAllContentItems();
  const { data: userProfiles, isLoading: usersLoading } =
    useGetAllUserProfiles();
  const { data: quotes, isLoading: quotesLoading } = useGetAllQuotes();

  const { mutate: addContent, isPending: addingContent } = useAddContentItem();
  const { mutate: deleteContent, isPending: deletingContent } =
    useDeleteContentItem();
  const { mutate: addQuote, isPending: addingQuote } = useAddQuote();

  // New content form
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState("book");
  const [newCategory, setNewCategory] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLang, setNewLang] = useState("hi");
  const [newGovtApproved, setNewGovtApproved] = useState(true);

  // New quote
  const [newQuoteText, setNewQuoteText] = useState("");

  // User role management (local state only)
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});

  // Announcements (local state)
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      text: "Gyan Tarang platform par aapka swagat hai! Naye features aur content ab available hain.",
      type: "success",
      createdAt: new Date().toLocaleDateString("hi-IN"),
    },
    {
      id: "2",
      text: "JEE 2025 ke liye naye study material NCERT se add kiye gaye hain.",
      type: "info",
      createdAt: new Date().toLocaleDateString("hi-IN"),
    },
  ]);
  const [newAnnouncementText, setNewAnnouncementText] = useState("");
  const [newAnnouncementType, setNewAnnouncementType] =
    useState<AnnouncementType>("info");

  if (!isLoggedIn) {
    navigate({ to: "/auth" });
    return null;
  }

  if (adminLoading) {
    return (
      <div
        className="container mx-auto px-4 py-16 text-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Checking admin access...</p>
      </div>
    );
  }

  const isAdminUser = isAdmin || currentUser?.role === "admin";
  if (!isAdminUser && !adminLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="font-display text-xl font-bold text-foreground mb-2">
          Access Denied
        </h2>
        <p className="text-muted-foreground mb-4">
          Sirf admins hi yahan access kar sakte hain.
        </p>
        <Button onClick={() => navigate({ to: "/dashboard" })}>
          Dashboard par jaayein
        </Button>
      </div>
    );
  }

  const handleAddContent = () => {
    if (!newTitle || !newUrl) {
      toast.error("Title aur URL zaroori hain");
      return;
    }
    const item: ContentItem = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      contentType: newType,
      category: newCategory,
      classLevel: newClass,
      subject: newSubject,
      description: newDesc,
      language: newLang,
      governmentApproved: newGovtApproved,
    };
    addContent(item, {
      onSuccess: () => {
        toast.success("Content add ho gaya!");
        setNewTitle("");
        setNewUrl("");
        setNewDesc("");
        setNewCategory("");
        setNewClass("");
        setNewSubject("");
      },
      onError: () => toast.error("Error: Content add nahi ho saka"),
    });
  };

  const handleDeleteContent = (id: string) => {
    deleteContent(id, {
      onSuccess: () => toast.success("Content delete ho gaya"),
      onError: () => toast.error("Error deleting content"),
    });
  };

  const handleAddQuote = () => {
    if (!newQuoteText.trim()) {
      toast.error("Quote likhein");
      return;
    }
    addQuote(newQuoteText, {
      onSuccess: () => {
        toast.success("Quote add ho gaya!");
        setNewQuoteText("");
      },
      onError: () => toast.error("Error adding quote"),
    });
  };

  const handleSetUserRole = (email: string, role: string) => {
    setUserRoles((prev) => ({ ...prev, [email]: role }));
    toast.success(`${email} ka role "${role}" set ho gaya`);
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncementText.trim()) {
      toast.error("Announcement text likhein");
      return;
    }
    const ann: Announcement = {
      id: Date.now().toString(),
      text: newAnnouncementText.trim(),
      type: newAnnouncementType,
      createdAt: new Date().toLocaleDateString("hi-IN"),
    };
    setAnnouncements((prev) => [ann, ...prev]);
    setNewAnnouncementText("");
    toast.success("Announcement add ho gayi!");
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    toast.success("Announcement delete ho gayi");
  };

  const announcementColors: Record<
    AnnouncementType,
    { bg: string; border: string; text: string; label: string }
  > = {
    info: {
      bg: "oklch(0.45 0.18 220 / 0.1)",
      border: "oklch(0.45 0.18 220 / 0.4)",
      text: "oklch(0.99 0 0)",
      label: "Info",
    },
    success: {
      bg: "oklch(0.56 0.18 145 / 0.1)",
      border: "oklch(0.56 0.18 145 / 0.4)",
      text: "oklch(0.99 0 0)",
      label: "Success",
    },
    warning: {
      bg: "oklch(0.72 0.18 55 / 0.1)",
      border: "oklch(0.72 0.18 55 / 0.4)",
      text: "oklch(0.68 0.18 350)",
      label: "Warning",
    },
  };

  // Stats
  const totalContent = contentItems?.length ?? 0;
  const totalUsers = userProfiles?.length ?? 0;
  const totalQuotes = quotes?.length ?? 0;
  const totalAnnouncements = announcements.length;

  const statCards = [
    {
      label: "Total Content",
      value: totalContent,
      icon: FileText,
      color: "oklch(0.76 0.12 350)",
      bg: "oklch(0.72 0.18 55 / 0.1)",
    },
    {
      label: "Registered Users",
      value: totalUsers,
      icon: Users,
      color: "oklch(0.70 0.18 220)",
      bg: "oklch(0.45 0.18 220 / 0.1)",
    },
    {
      label: "Motivational Quotes",
      value: totalQuotes,
      icon: Quote,
      color: "oklch(0.65 0.22 340)",
      bg: "oklch(0.56 0.18 145 / 0.1)",
    },
    {
      label: "Announcements",
      value: totalAnnouncements,
      icon: Bell,
      color: "oklch(0.65 0.18 30)",
      bg: "oklch(0.65 0.18 30 / 0.1)",
    },
  ];

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
              <Settings
                className="h-8 w-8"
                style={{ color: "oklch(0.76 0.12 350)" }}
              />
              <h1 className="font-display text-3xl font-black text-foreground">
                Admin Panel
              </h1>
            </div>
            <p className="text-foreground/70">
              Content Manager, Users, Quotes aur Announcements manage karein
            </p>
            <Badge className="mt-2 bg-saffron/20 border-saffron/30 text-foreground">
              Admin Access
            </Badge>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          data-ocid="admin.stats.panel"
        >
          {statCards.map((stat) => (
            <Card
              key={stat.label}
              className="border border-border/50 overflow-hidden"
              style={{ background: stat.bg }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {stat.label}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${stat.color}20` }}
                  >
                    <stat.icon
                      className="h-4 w-4"
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
                <div
                  className="font-display text-3xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-4 w-full mb-6 h-auto p-1">
            <TabsTrigger
              value="content"
              className="gap-1.5 py-2 data-[state=active]:shadow-sm"
              data-ocid="admin.content.tab"
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="gap-1.5 py-2 data-[state=active]:shadow-sm"
              data-ocid="admin.users.tab"
            >
              <Users className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="quotes"
              className="gap-1.5 py-2 data-[state=active]:shadow-sm"
              data-ocid="admin.quotes.tab"
            >
              <Quote className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Quotes</span>
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="gap-1.5 py-2 data-[state=active]:shadow-sm"
              data-ocid="admin.announcements.tab"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Announce</span>
            </TabsTrigger>
          </TabsList>

          {/* CONTENT TAB */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Content Form */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Naya Content Add Karein
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Title *</Label>
                      <Input
                        placeholder="Content title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="mt-1"
                        data-ocid="admin.content.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">URL *</Label>
                      <Input
                        placeholder="https://..."
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="mt-1"
                        data-ocid="admin.content.url.input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Type</Label>
                      <Select value={newType} onValueChange={setNewType}>
                        <SelectTrigger
                          className="mt-1"
                          data-ocid="admin.content.type.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["book", "video", "note", "quiz", "tool"].map(
                            (t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Category</Label>
                      <Input
                        placeholder="e.g. NCERT"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Class Level</Label>
                      <Input
                        placeholder="e.g. Class 10"
                        value={newClass}
                        onChange={(e) => setNewClass(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Subject</Label>
                      <Input
                        placeholder="e.g. Mathematics"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      placeholder="Content description..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="mt-1 h-16"
                      data-ocid="admin.content.textarea"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Language</Label>
                      <Select value={newLang} onValueChange={setNewLang}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi-en">Hinglish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                      <Switch
                        checked={newGovtApproved}
                        onCheckedChange={setNewGovtApproved}
                        data-ocid="admin.content.switch"
                      />
                      <Label className="text-xs">Govt Approved</Label>
                    </div>
                  </div>
                  <Button
                    className="w-full text-foreground gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.76 0.12 350), oklch(0.65 0.20 350))",
                    }}
                    onClick={handleAddContent}
                    disabled={addingContent}
                    data-ocid="admin.content.add_button"
                  >
                    {addingContent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    Add Content
                  </Button>
                </CardContent>
              </Card>

              {/* Content List */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <TrendingUp
                      className="h-4 w-4"
                      style={{ color: "oklch(0.76 0.12 350)" }}
                    />
                    Content Library ({contentItems?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    {contentLoading ? (
                      <div className="p-4 space-y-2">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-12 rounded-lg" />
                        ))}
                      </div>
                    ) : contentItems && contentItems.length > 0 ? (
                      <div className="p-3 space-y-2">
                        {contentItems.map((item, idx) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/30"
                            data-ocid={`admin.content.row.${idx + 1}`}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.contentType} • {item.classLevel}
                              </p>
                            </div>
                            {item.governmentApproved && (
                              <span className="badge-govt text-[10px] shrink-0">
                                ✅ Govt
                              </span>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteContent(item.id)}
                              disabled={deletingContent}
                              data-ocid="admin.content.delete_button"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="p-8 text-center text-muted-foreground"
                        data-ocid="admin.content.empty_state"
                      >
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Koi content nahi hai abhi</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Users
                    className="h-4 w-4"
                    style={{ color: "oklch(0.70 0.18 220)" }}
                  />
                  Registered Users ({userProfiles?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {usersLoading ? (
                  <div className="p-4 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <ScrollArea className="h-96">
                    {userProfiles && userProfiles.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Class/Branch</TableHead>
                            <TableHead>Current Role</TableHead>
                            <TableHead>Set Role</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody data-ocid="admin.users.table">
                          {userProfiles.map((u, idx) => {
                            const currentRole = userRoles[u.email] ?? u.role;
                            return (
                              <TableRow
                                key={u.email}
                                data-ocid={`admin.users.row.${idx + 1}`}
                              >
                                <TableCell className="font-medium text-sm">
                                  {u.name}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                  {u.email}
                                </TableCell>
                                <TableCell className="text-xs">
                                  {u.classOrBranch}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      currentRole === "admin"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="text-[10px]"
                                    style={
                                      currentRole === "admin"
                                        ? {
                                            background: "oklch(0.76 0.12 350)",
                                            color: "white",
                                            border: "none",
                                          }
                                        : {}
                                    }
                                  >
                                    {currentRole}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={currentRole}
                                    onValueChange={(val) =>
                                      handleSetUserRole(u.email, val)
                                    }
                                  >
                                    <SelectTrigger
                                      className="h-7 text-xs w-28"
                                      data-ocid={`admin.users.role.select.${idx + 1}`}
                                    >
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="student">
                                        student
                                      </SelectItem>
                                      <SelectItem value="admin">
                                        admin
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <div
                        className="p-8 text-center text-muted-foreground"
                        data-ocid="admin.users.empty_state"
                      >
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Koi user profile nahi hai</p>
                      </div>
                    )}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* QUOTES TAB */}
          <TabsContent value="quotes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-display">
                    Naya Quote Add Karein
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Motivational quote likhein... (Hindi ya English)"
                    value={newQuoteText}
                    onChange={(e) => setNewQuoteText(e.target.value)}
                    className="h-24"
                    data-ocid="admin.quotes.textarea"
                  />
                  <Button
                    className="w-full text-foreground gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.22 340), oklch(0.45 0.18 145))",
                    }}
                    onClick={handleAddQuote}
                    disabled={addingQuote}
                    data-ocid="admin.quotes.add_button"
                  >
                    {addingQuote ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    Add Quote
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-display">
                    Existing Quotes ({quotes?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-60">
                    {quotesLoading ? (
                      <div className="p-4 space-y-2">
                        {[1, 2].map((i) => (
                          <Skeleton key={i} className="h-12 rounded-lg" />
                        ))}
                      </div>
                    ) : quotes && quotes.length > 0 ? (
                      <div className="p-3 space-y-2">
                        {quotes.map((q, idx) => (
                          <div
                            key={q.slice(0, 30)}
                            className="p-3 rounded-lg border border-border/50 bg-muted/30"
                            data-ocid={`admin.quotes.item.${idx + 1}`}
                          >
                            <p className="text-sm text-foreground italic">
                              "{q}"
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="p-8 text-center text-muted-foreground"
                        data-ocid="admin.quotes.empty_state"
                      >
                        <Quote className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Koi quotes nahi hain</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ANNOUNCEMENTS TAB */}
          <TabsContent value="announcements">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Announcement Form */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Bell
                      className="h-4 w-4"
                      style={{ color: "oklch(0.65 0.18 30)" }}
                    />
                    Naya Announcement Add Karein
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs mb-1 block">
                      Announcement Type
                    </Label>
                    <Select
                      value={newAnnouncementType}
                      onValueChange={(v) =>
                        setNewAnnouncementType(v as AnnouncementType)
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        data-ocid="admin.announcement.type.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">
                          <div className="flex items-center gap-2">
                            <Info className="h-3.5 w-3.5 text-blue-500" />
                            Info
                          </div>
                        </SelectItem>
                        <SelectItem value="success">
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 text-xs font-bold">
                              ✓
                            </span>
                            Success
                          </div>
                        </SelectItem>
                        <SelectItem value="warning">
                          <div className="flex items-center gap-2">
                            <span className="text-orange-500 text-xs font-bold">
                              !
                            </span>
                            Warning
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">
                      Announcement Text
                    </Label>
                    <Textarea
                      placeholder="Students ke liye announcement likhein..."
                      value={newAnnouncementText}
                      onChange={(e) => setNewAnnouncementText(e.target.value)}
                      className="h-24"
                      data-ocid="admin.announcement.textarea"
                    />
                  </div>
                  <Button
                    className="w-full text-foreground gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 30), oklch(0.76 0.12 350))",
                    }}
                    onClick={handleAddAnnouncement}
                    data-ocid="admin.announcement.add_button"
                  >
                    <Bell className="h-4 w-4" />
                    Publish Announcement
                  </Button>
                </CardContent>
              </Card>

              {/* Announcements List */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-display flex items-center justify-between">
                    <span>Active Announcements ({announcements.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-80">
                    {announcements.length > 0 ? (
                      <div className="p-3 space-y-3">
                        {announcements.map((ann, idx) => {
                          const colors = announcementColors[ann.type];
                          return (
                            <div
                              key={ann.id}
                              className="p-3 rounded-lg"
                              style={{
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                              }}
                              data-ocid={`admin.announcements.item.${idx + 1}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge
                                      className="text-[10px] px-1.5 py-0 h-4"
                                      style={{
                                        background: colors.bg,
                                        color: colors.text,
                                        border: `1px solid ${colors.border}`,
                                      }}
                                    >
                                      {colors.label}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground">
                                      {ann.createdAt}
                                    </span>
                                  </div>
                                  <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: colors.text }}
                                  >
                                    {ann.text}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                                  onClick={() =>
                                    handleDeleteAnnouncement(ann.id)
                                  }
                                  data-ocid={`admin.announcements.delete_button.${idx + 1}`}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        className="p-8 text-center text-muted-foreground"
                        data-ocid="admin.announcements.empty_state"
                      >
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Koi announcements nahi hain</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground text-center">
              Note: Announcements abhi local state mein stored hain. Page
              refresh karne par reset ho jayenge.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
