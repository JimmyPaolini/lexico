import { ComponentProps } from 'react'

import Image from 'next/image'

import { partofSpeechToIcon } from './partOfSpeechToIcon'

type Props = Partial<ComponentProps<typeof Image>> & { partOfSpeech: string }

export const PartOfSpeech = ({ partOfSpeech, ...props }: Props) => {
  const icon = partofSpeechToIcon(partOfSpeech)
  return icon ? (
    <Image src={icon} alt={partOfSpeech} width={28} height={28} {...props} />
  ) : null
}
