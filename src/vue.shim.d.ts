declare module '*.vue'
declare module '*.md'
declare module '@vitejs/plugin-vue-jsx'
declare module 'tcplayer' {
  enum TcClarity {
    hd = 'hd',
    od = 'od',
    sd = 'sd'
  }
  enum TcEvents {
    error = 'error',
    timeupdate = 'timeupdate',
    load = 'load',
    loadedmetadata = 'loadedmetadata',
    loadeddata = 'loadeddata',
    progress = 'progress',
    fullscreen = 'fullscreen',
    play = 'play',
    playing = 'playing',
    pause = 'pause',
    ended = 'ended',
    seeking = 'seeking',
    seeked = 'seeked',
    resize = 'resize',
    volumechange = 'volumechange'
  }
  interface TcListenerMsg {
    type: TcEvents
    src: TcPlayer
    ts: number
    timeStamp: number
  }
  interface TcPlayerOptions {
    width?: number
    height?: number
    autoplay?: boolean
    clarity?: string
    clarityLabel?: object
    controls?: string
    flash?: boolean
    flashUrl?: string
    flv?: string
    flvConfig?: object
    flv_hd?: string
    flv_sd?: string
    h5_flv?: boolean
    hlsConfig?: object
    listener?(msg: TcListenerMsg): void
    live?: boolean
    m3u8?: string
    m3u8_hd?: string
    m3u8_sd?: string
    mp4?: string
    mp4_hd?: string
    mp4_sd?: string
    pausePosterEnabled?: boolean
    poster?: string | object
    preload?: string
    rtmp?: string
    rtmp_hd?: string
    rtmp_sd?: string
    systemFullscreen?: boolean
    volume?: number
    wording?: object
    x5_fullscreen?: string
    x5_orientation?: number
    x5_player?: boolean
    x5_type?: string
  }
  class TcPlayer {
    constructor(id: string, options: TcPlayerOptions)
    buffered(): void
    currentTime(time?: number): number
    destroy(): void
    duration(): number
    fullscreen(enter?: boolean): boolean
    load(url: string): void
    mute(muted?: boolean): boolean
    pause(): void
    play(): void
    playing(): boolean
    switchClarity(clarity?: TcClarity): string
    togglePlay(): void
    volume(val?: number): number
  }
}
