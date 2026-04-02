import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

import Nat "mo:core/Nat";
import Int "mo:core/Int";


actor {
  // Mixins/Components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    classOrBranch : Text;
    language : Text;
    role : Text;
  };

  module UserProfile {
    public func compare(u1 : UserProfile, u2 : UserProfile) : Order.Order {
      Text.compare(u1.email, u2.email);
    };
  };

  type ContentItem = {
    id : Text;
    title : Text;
    description : Text;
    url : Text;
    contentType : Text;
    category : Text;
    subject : Text;
    classLevel : Text;
    language : Text;
    governmentApproved : Bool;
    file : ?Storage.ExternalBlob;
  };

  module ContentItem {
    public func compareByClassLevel(c1 : ContentItem, c2 : ContentItem) : Order.Order {
      Text.compare(c1.classLevel, c2.classLevel);
    };

    public func compareByCategory(c1 : ContentItem, c2 : ContentItem) : Order.Order {
      Text.compare(c1.category, c2.category);
    };
  };

  type Group = {
    id : Text;
    name : Text;
    description : Text;
    members : Set.Set<Text>;
  };

  // Immutable view type for Group for public API
  type GroupView = {
    id : Text;
    name : Text;
    description : Text;
    members : [Text];
  };

  type PerformanceData = {
    topic : Text;
    score : Nat;
    total : Nat;
    timestamp : Int;
  };

  module PerformanceData {
    public func compareByScoreDescending(d1 : PerformanceData, d2 : PerformanceData) : Order.Order {
      Nat.compare(d2.score, d1.score);
    };

    public func compareByTimestampDescending(d1 : PerformanceData, d2 : PerformanceData) : Order.Order {
      Int.compare(d2.timestamp, d1.timestamp);
    };
  };

  // Storage variables
  let userProfiles = Map.empty<Principal, UserProfile>();
  let contentItems = Map.empty<Text, ContentItem>();
  let groups = Map.empty<Text, Group>();
  let quotes = List.empty<Text>();
  let quizScores = Map.empty<Principal, Nat>();
  let xpPoints = Map.empty<Principal, Nat>();
  let studyPlans = Map.empty<Principal, Text>();
  let userBadges = Map.empty<Principal, List.List<Text>>();
  let performanceData = Map.empty<Principal, List.List<PerformanceData>>();

  // Mutable state for random number generation
  var randomSeed : Nat = 0;

  // Simple pseudo-random number generator
  func nextRandom(max : Nat) : Nat {
    randomSeed := (randomSeed * 1103515245 + 12345) % 2147483648;
    randomSeed % max;
  };

  // User Profile Management
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other user profiles");
    };
    userProfiles.get(user);
  };

  public query ({ caller }) func getAllUserProfiles() : async [UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access all profiles");
    };
    userProfiles.values().toArray().sort();
  };

  // Content Management
  public shared ({ caller }) func addContentItem(item : ContentItem) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add content");
    };
    contentItems.add(item.id, item);
  };

  public shared ({ caller }) func updateContentItem(item : ContentItem) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    contentItems.add(item.id, item);
  };

  public shared ({ caller }) func deleteContentItem(id : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    contentItems.remove(id);
  };

  public query ({ caller }) func getContentItem(id : Text) : async ?ContentItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view content");
    };
    contentItems.get(id);
  };

  public query ({ caller }) func getContentItemsByClassLevel(classLevel : Text) : async [ContentItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can browse content");
    };
    let filtered = contentItems.values().toArray().filter(
      func(item) { item.classLevel == classLevel }
    );
    filtered.sort(ContentItem.compareByClassLevel);
  };

  public query ({ caller }) func getContentItemsByCategory(category : Text) : async [ContentItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can browse content");
    };
    let filtered = contentItems.values().toArray().filter(
      func(item) { item.category == category }
    );
    filtered.sort(ContentItem.compareByCategory);
  };

  public query ({ caller }) func getAllContentItems() : async [ContentItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can browse content");
    };
    contentItems.values().toArray();
  };

  public query ({ caller }) func getRandomContentItemByCategory(category : Text) : async ?ContentItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get content");
    };
    let items = contentItems.values().toArray().filter(
      func(item) { item.category == category }
    );
    if (items.size() == 0) {
      return null;
    };
    let randomIndex = nextRandom(items.size());
    ?items[randomIndex];
  };

  // Group Management
  public shared ({ caller }) func createGroup(id : Text, name : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create groups");
    };
    let group : Group = {
      id;
      name;
      description;
      members = Set.empty<Text>();
    };
    if (groups.get(id).isSome()) {
      Runtime.trap("Group already exists");
    } else {
      groups.add(id, group);
    };
  };

  public shared ({ caller }) func addMemberToGroup(groupId : Text, member : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add members to groups");
    };
    switch (groups.get(groupId)) {
      case (null) { Runtime.trap("Group not found") };
      case (?group) {
        group.members.add(member);
        groups.add(groupId, group);
      };
    };
  };

  // Query method to return immutable snapshot of group (repeat for all non-shared methods returning inner node of List/Map/Set or mutable structures)
  public query ({ caller }) func getGroup(id : Text) : async ?GroupView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view groups");
    };
    switch (groups.get(id)) {
      case (null) { null };
      case (?group) {
        ?{
          id = group.id;
          name = group.name;
          description = group.description;
          members = group.members.toArray();
        };
      };
    };
  };

  // Also query method to return immutable snapshot of all groups as it returns array of inner node of a mutable structure
  public query ({ caller }) func getAllGroups() : async [GroupView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view groups");
    };
    groups.values().toArray().map(
      func(group) {
        {
          id = group.id;
          name = group.name;
          description = group.description;
          members = group.members.toArray();
        };
      }
    );
  };

  // Motivational quotes
  public shared ({ caller }) func addQuote(quote : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add quotes");
    };
    quotes.add(quote);
  };

  public query ({ caller }) func getAllQuotes() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view quotes");
    };
    quotes.toArray();
  };

  public query ({ caller }) func getRandomQuote() : async ?Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get quotes");
    };
    let quoteArray = quotes.toArray();
    if (quoteArray.size() == 0) {
      return null;
    };
    let randomIndex = nextRandom(quoteArray.size());
    ?quoteArray[randomIndex];
  };

  // Quiz engine
  public shared ({ caller }) func saveQuizScore(score : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save quiz scores");
    };
    quizScores.add(caller, score);
  };

  public query ({ caller }) func getQuizScore(user : Principal) : async ?Nat {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own quiz scores");
    };
    quizScores.get(user);
  };

  // XP & Gamification
  public shared ({ caller }) func addXP(points : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add XP");
    };
    let currentXP = switch (xpPoints.get(caller)) {
      case (null) { 0 };
      case (?xp) { xp };
    };
    xpPoints.add(caller, currentXP + points);
  };

  public query ({ caller }) func getXP(user : Principal) : async ?Nat {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own XP");
    };
    xpPoints.get(user);
  };

  public shared ({ caller }) func addBadge(badge : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add badges");
    };
    let userBadgeList = switch (userBadges.get(caller)) {
      case (null) { List.empty<Text>() };
      case (?badges) { badges };
    };
    userBadgeList.add(badge);
    userBadges.add(caller, userBadgeList);
  };

  public query ({ caller }) func getBadges(user : Principal) : async [Text] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own badges");
    };
    switch (userBadges.get(user)) {
      case (null) { [] };
      case (?badges) { badges.toArray() };
    };
  };

  // AI Study Plan
  public shared ({ caller }) func saveStudyPlan(plan : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save study plans");
    };
    studyPlans.add(caller, plan);
  };

  public query ({ caller }) func getStudyPlan(user : Principal) : async ?Text {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own study plan");
    };
    studyPlans.get(user);
  };

  // Performance Data
  public shared ({ caller }) func savePerformanceData(topic : Text, score : Nat, total : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save performance data");
    };
    let attempt : PerformanceData = {
      topic;
      score;
      total;
      timestamp = Time.now();
    };
    let userData = switch (performanceData.get(caller)) {
      case (null) { List.empty<PerformanceData>() };
      case (?data) { data };
    };
    userData.add(attempt);
    performanceData.add(caller, userData);
  };

  public query ({ caller }) func getPerformanceData(user : Principal) : async [PerformanceData] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own performance data");
    };
    switch (performanceData.get(user)) {
      case (null) { [] };
      case (?data) { data.toArray() };
    };
  };

  public query ({ caller }) func getAllPerformanceData() : async [PerformanceData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view performance data");
    };
    var allData = List.empty<PerformanceData>();
    for ((user, data) in performanceData.entries()) {
      for (attempt in data.values()) {
        allData.add(attempt);
      };
    };
    allData.toArray();
  };

  public query ({ caller }) func getTopPerformanceData(limit : Nat) : async [PerformanceData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view leaderboard");
    };
    var allData = List.empty<PerformanceData>();
    for ((user, data) in performanceData.entries()) {
      for (attempt in data.values()) {
        allData.add(attempt);
      };
    };

    let sorted = allData.toArray().sort(PerformanceData.compareByScoreDescending);

    let size = sorted.size();
    let takeSize = if (limit > size) { size } else { limit };

    Array.tabulate<PerformanceData>(
      takeSize,
      func(i) { sorted[i] },
    );
  };

  public query ({ caller }) func getRecentPerformanceData(limit : Nat) : async [PerformanceData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view recent performance");
    };
    var allData = List.empty<PerformanceData>();
    for ((user, data) in performanceData.entries()) {
      for (attempt in data.values()) {
        allData.add(attempt);
      };
    };

    let sorted = allData.toArray().sort(PerformanceData.compareByTimestampDescending);

    let size = sorted.size();
    let takeSize = if (limit > size) { size } else { limit };

    Array.tabulate<PerformanceData>(
      takeSize,
      func(i) { sorted[i] },
    );
  };
};
