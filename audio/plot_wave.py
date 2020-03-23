from pyAudioAnalysis import audioBasicIO
from pyAudioAnalysis import ShortTermFeatures
import matplotlib.pyplot as plt

[Fs, x] = audioBasicIO.read_audio_file("./speech_corpus/latinitiuim/androclusetleo.wav")
mono = [stereo[0] for stereo in x]
# print(Fs)

# F, f_names = ShortTermFeatures.feature_extraction(mono, Fs, 0.050*Fs, 0.025*Fs)
# # print(f_names)
# plt.subplot(2, 1, 1); plt.plot(F[2, :]); plt.xlabel('Frame no'); plt.ylabel(f_names[2])
# plt.subplot(2, 1, 2); plt.plot(F[3, :]); plt.xlabel('Frame no'); plt.ylabel(f_names[3]); plt.show()
#
# v = ShortTermFeatures.spectrogram(mono, Fs, round(Fs/1000)*15, round(Fs/1000)*3, True)
# u = ShortTermFeatures.chromagram(mono, Fs, round(Fs/1000)*25, round(Fs/1000)*10, True)

