export class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private baseUrl = import.meta.env.BASE_URL;
  constructor() {
    this.loadSounds();
  }

  private loadSounds() {
    const path = (filename: string) =>
      `${this.baseUrl}/sounds/${filename}`.replace(/\/+/g, "/");
    this.sounds = {
      beep: new Audio(path("beep.wav")),
      bell: new Audio(path("bell.wav")),
      interval: new Audio(path("interval.wav")),
      shoot: new Audio(path("shoot.wav")),
    };

    Object.values(this.sounds).forEach((audio) => audio.load());
  }

  public play(soundName: "beep" | "bell" | "interval" | "shoot") {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound
        .play()
        .catch((e) => console.error("Error al reproducir audio: ", e));
    }
  }
}
