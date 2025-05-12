import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useRoutines } from '../hooks/useRoutines'

type RoutinesContextType = ReturnType<typeof useRoutines>
const RoutinesContext = createContext<RoutinesContextType | undefined>(undefined)

export function RoutinesProvider({ children }: { children: ReactNode }) {
  const routinesState = useRoutines()
  return (
    <RoutinesContext.Provider value={routinesState}>
      {children}
    </RoutinesContext.Provider>
  )
}

export function useRoutinesContext() {
  const ctx = useContext(RoutinesContext)
  if (!ctx) throw new Error('useRoutinesContext must be inside RoutinesProvider')
  return ctx
}
