"use client";

import { create } from "zustand";

type ContactState = {
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
};

export const useContactStore = create<ContactState>((set) => ({
  submitted: false,
  setSubmitted: (submitted) => set({ submitted }),
}));
