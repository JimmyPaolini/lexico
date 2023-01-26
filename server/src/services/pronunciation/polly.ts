import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

export const polly = new PollyClient({ region: 'us-east-1' })

export async function speech(phonemes: string) {
  console.log('🐋 ~ phonemes', phonemes)
  const synthesizeSpeechCommandOutput = await polly.send(
    new SynthesizeSpeechCommand({
      Engine: 'neural',
      LanguageCode: 'es-US',
      VoiceId: 'Pedro',
      OutputFormat: 'mp3',
      TextType: 'ssml',
      Text: `<prosody rate="x-slow"><phoneme alphabet="ipa" ph="${phonemes}"/></prosody>`,
    })
  )
  const audioStream = synthesizeSpeechCommandOutput.AudioStream
  if (!audioStream) throw new Error('audio error')
  const uInt8Array = await audioStream.transformToByteArray()
  return Buffer.from(uInt8Array).toString('base64')
}
