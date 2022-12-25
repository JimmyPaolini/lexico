import { isBookmarkedLocal } from './isBookmarkedLocal'

export function useIsBookmarked(id: string): boolean {
  // Not checking for remote bookmarks since that data
  // is already returned on every Entry entity
  return isBookmarkedLocal(id)
}
