import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContentItem, UserProfile } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetAllContentItems() {
  const { actor, isFetching } = useActor();
  return useQuery<ContentItem[]>({
    queryKey: ["contentItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContentItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContentItemsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ContentItem[]>({
    queryKey: ["contentItems", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContentItemsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetContentItemsByClassLevel(classLevel: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ContentItem[]>({
    queryKey: ["contentItems", "classLevel", classLevel],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContentItemsByClassLevel(classLevel);
    },
    enabled: !!actor && !isFetching && !!classLevel,
  });
}

export function useGetAllQuotes() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["quotes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllUserProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile[]>({
    queryKey: ["allUserProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUserProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUserProfile"] });
    },
  });
}

export function useAddContentItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: ContentItem) => {
      if (!actor) throw new Error("Not connected");
      return actor.addContentItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });
}

export function useDeleteContentItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContentItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentItems"] });
    },
  });
}

export function useAddQuote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quote: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.addQuote(quote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

export function useSaveQuizScore() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (score: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveQuizScore(score);
    },
  });
}
