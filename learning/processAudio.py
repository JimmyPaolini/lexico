import os
import re
import json
from pydub import AudioSegment
from pydub.silence import detect_nonsilent
from pydub.generators import Sine

min_silence_len = 500  # 500 works better
silence_thresh = -24  # -24 works well
shift = 300  # 300 works well


def remake_dir(directory):
    directory = "./data/processed/" + directory
    if not os.path.exists(directory):
        os.mkdir(directory)
    for file_name in os.listdir(directory):
        path = os.path.join(directory, file_name)
        if os.path.isfile(path) or os.path.islink(path):
            os.unlink(path)
    print('Remade directory: "%s"' % directory)


def tone(frequency=256, duration=500, fade_in=100, fade_out=300):
    return Sine(frequency).to_audio_segment(duration) \
        .apply_gain(0).fade_in(fade_in).fade_out(fade_out)


def generate_speech_annotator(src, tgt):
    audio = AudioSegment.from_mp3("./data/original/speech/" + src)
    ranges = detect_nonsilent(audio, min_silence_len, silence_thresh)
    annotator = AudioSegment.silent(duration=0)
    for i in range(len(ranges)):
        start = ranges[i][0] - shift
        end = (ranges[i + 1][0] if i + 1 < len(ranges) else ranges[i][1]) - shift
        annotator += audio[start:end] + tone()
    annotator.export("./data/annotated/" + tgt + "/%s_annotator.wav" % src.split('/')[-1].split('.')[0], format="wav")
    print('Speech annotator: "%s_annotator"' % src.split('/')[-1].split('.')[0])


def generate_speech_splits(src, tgt):
    min_silence_len = 500  # 500 works better
    silence_thresh = -24  # -24 works well
    shift = 300  # 300 works well
    audio = AudioSegment.from_mp3("./data/original/speech/" + src)
    ranges = detect_nonsilent(audio, min_silence_len, silence_thresh)
    longest = (0, '')
    for i in range(len(ranges)):
        start = ranges[i][0] - shift
        end = ranges[i+1][0] - shift if i + 1 < len(ranges) else len(audio)
        audio[start:end].export("./data/labelled/" + tgt + "/%s_%s.wav" %
                                (src.split('/')[-1].split('.')[0], i), format="wav")
        if end - start > longest[0]:
            longest = ((end-start), "%s_%s.wav" % (src.split('/')[-1].split('.')[0], i))
    print("Longest audio: %sms - %s" % longest)


def normalize_text(src):
    with open("./data/original/text/" + src, 'r') as text:
        text = text.read().lower()
        text = re.sub("[^A-Za-z.\s]|\.$", '', text)
        text = re.sub("\s+|\/", ' ', text)
        text = re.sub("(?<!\.[A-Za-z])\.[^A-Za-z]", ' ', text)
        return text


def generate_text_annotator(src, tgt):
    normalized = normalize_text(src)
    with open("./data/annotated/" + tgt + "/%s_annotator.txt" % src.split('/')[-1].split('.')[0], 'w') as target:
        target.write(normalized)
    print('Text annotator: "%s"' % src.split('/')[-1].split('.')[0])


# for file in os.listdir("data/original/speech/latinitium"):
#     name = file[:-4]
name = 'androclus_et_leo'
srcSpeech = "latinitium/%s.mp3" % name
srcText = "latinitium/%s.txt" % name

remake_dir(name)
generate_speech_annotator(srcSpeech, name)
generate_text_annotator(srcText, name)
