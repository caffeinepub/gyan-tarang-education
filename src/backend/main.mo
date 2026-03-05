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

actor {
  // Mixins/Components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

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

  let userProfiles = Map.empty<Principal, UserProfile>();

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

  // Content Catalog Types and Storage
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

  let contentItems = Map.empty<Text, ContentItem>();

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

  public query ({ caller }) func getContentItem(id : Text) : async {
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
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view content");
    };
    switch (contentItems.get(id)) {
      case (null) { Runtime.trap("Content Item does not exist") };
      case (?item) {
        {
          title = item.title;
          description = item.description;
          url = item.url;
          contentType = item.contentType;
          category = item.category;
          subject = item.subject;
          classLevel = item.classLevel;
          language = item.language;
          governmentApproved = item.governmentApproved;
          file = item.file;
        };
      };
    };
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

  // Chat Types & Maps
  type Group = {
    id : Text;
    name : Text;
    description : Text;
    members : Set.Set<Text>;
  };

  let groups = Map.empty<Text, Group>();

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

  // Motivational quotes
  let quotes = List.empty<Text>();

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

  // Quiz engine
  let quizScores = Map.empty<Principal, Nat>();

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
};
