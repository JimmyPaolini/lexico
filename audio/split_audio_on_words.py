from pydub import AudioSegment
from pydub.silence import split_on_silence
import os
import re

sample = "cicero_de_anulo_gygis"
audio = AudioSegment.from_mp3("./speech_corpus/latinitiuim/%s/%s.mp3" % (sample, sample))
chunks = split_on_silence(audio, min_silence_len=200, silence_thresh=-20)
print(chunks)
folder_path = './split_audio'
for file_object in os.listdir(folder_path):
    file_object_path = os.path.join(folder_path, file_object)
    if os.path.isfile(file_object_path) or os.path.islink(file_object_path):
        os.unlink(file_object_path)

with open("./speech_corpus/latinitiuim/%s/%s.txt" % (sample, sample), "r") as text:
    words = re.findall("\w+", text.read().lower())
    print(words)
    for i, chunk in enumerate(chunks):
        print("exporting word %s %s" % (i, words[i]))
        chunk.export("./split_audio/%s_%s.mp3" % (i, words[i]), format="mp3")
    print("Total text words = %s" % len(words))
