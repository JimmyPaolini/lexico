import { CustomText } from 'src/graphql/generated'

export function validateUserText({ title, text }: CustomText): CustomText {
  const errors = {} as CustomText
  if (!title) errors.title = 'Title cannot be empty'
  if (!text) errors.text = 'Text cannot be empty'
  if (title.length >= 100) {
    errors.title = 'Title must be less than 100 characters'
  }
  if (text.length >= 100000) {
    errors.text = 'Text must be less than 100,000 characters'
  }
  return errors
}
