import { useIsBookmarkedLocal } from './useIsBookmarkedLocal'

export function useIsBookmarked(id: string): boolean {
  // Not checking for remote bookmarks since that data
  // is already returned on every Entry entity
  return useIsBookmarkedLocal(id)
}
