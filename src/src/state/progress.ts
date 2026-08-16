import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProgressState {
  completedLevels: number[]
  completedPhases: string[]
  rewards: string[]
  bestByQuestion: Record<string, number>
  currentLevel?: number
  unfinished: string[]
  settings: { sound: boolean; dark: boolean }
  completeLevel: (level: number, reward?: string) => void
  completePhase: (phaseId: string) => void
  setCurrentLevel: (level: number) => void
  recordScore: (questionId: string, score: number) => void
  savedSessions?: Record<string, number>
  saveSession: (id: string, qIndex: number) => void
  clearSession: (id: string) => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completedLevels: [],
      completedPhases: [],
      rewards: [],
      bestByQuestion: {},
      unfinished: [],
      settings: { sound: true, dark: false },
      savedSessions: {},
      saveSession: (id, qIndex) =>
        set((s) => ({
          savedSessions: { ...s.savedSessions, [id]: qIndex },
        })),
      clearSession: (id) =>
        set((s) => {
          const next = { ...s.savedSessions }
          delete next[id]
          return { savedSessions: next }
        }),
      completePhase: (phaseId) =>
        set((s) => ({
          completedPhases: s.completedPhases.includes(phaseId) ? s.completedPhases : [...s.completedPhases, phaseId],
        })),
      completeLevel: (level, reward) =>
        set((s) => ({
          completedLevels: s.completedLevels.includes(level)
            ? s.completedLevels
            : [...s.completedLevels, level],
          rewards: reward && !s.rewards.includes(reward) ? [...s.rewards, reward] : s.rewards,
        })),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      recordScore: (questionId, score) =>
        set((s) => ({
          bestByQuestion: {
            ...s.bestByQuestion,
            [questionId]: Math.max(s.bestByQuestion[questionId] ?? 0, score),
          },
        })),
    }),
    { name: 'ajisaka-progress' },
  ),
)

export const isLevelUnlocked = (level: number, completed: number[]): boolean =>
  level === 1 || completed.includes(level - 1)