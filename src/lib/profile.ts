export type ContactProfile = { name: string; company: string; email: string };
export const profileKey = "lets-soar-contact-profile";
export const emptyProfile: ContactProfile = { name: "", company: "", email: "" };
export function readProfile(): ContactProfile { try { return { ...emptyProfile, ...JSON.parse(localStorage.getItem(profileKey) || "{}") }; } catch { return emptyProfile; } }
export function saveProfile(profile: ContactProfile) { localStorage.setItem(profileKey, JSON.stringify(profile)); }
