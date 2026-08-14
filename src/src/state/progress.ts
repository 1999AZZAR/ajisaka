import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProgressState {
  completedLevels: number[]
  rewards: string[]
  bestByQuestion: Record<string, number>
  currentLevel?: number
  unfinished: string[]
  settings: { sound: boolean; dark: boolean }
  completeLevel: (level: number, reward?: string) => void
  setCurrentLevel: (level: number) => void
  recordScore: (questionId: string, score: number) => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completedLevels: [],
      rewards: [],
      bestByQuestion: {},
      unfinished: [],
      settings: { sound: true, dark: false },
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