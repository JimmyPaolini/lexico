import { ComponentMeta, ComponentStory, forceReRender } from '@storybook/react'

import { BookmarkButton } from 'src/components/bookmarks/BookmarkButton/BookmarkButton'
import { searchEntry } from 'src/utils/stories'

export default {
  title: 'Cards/Entry/PrincipalPartsRow/BookmarkButton',
  component: BookmarkButton,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          gap: 20,
        }}
        onClick={() => forceReRender()}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof BookmarkButton>

export const Default: ComponentStory<typeof BookmarkButton> = (
  args,
  { loaded }
) => (
  <>
    <BookmarkButton {...args} {...loaded} />
    <div>localStorage.bookmarks = {window.localStorage.bookmarks}</div>
    <div>
      localStorage.showBookmarkInstructions =
      {window.localStorage.showBookmarkInstructions}
    </div>
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        delete window.localStorage.bookmarks
        delete window.localStorage.showBookmarkInstructions
        forceReRender()
      }}
    >
      Click here to reset localStorage
    </div>
  </>
)
Default.args = { bookmarked: false }
Default.loaders = [
  async () => {
    const { id } = await searchEntry('amat')
    return { id }
  },
]
