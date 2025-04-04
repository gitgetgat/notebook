<script lang="ts" setup>
// Import styles.
import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/audio.css";
import "vidstack/player/styles/default/layouts/video.css";
// Register elements.
import "vidstack/player";
import "vidstack/player/layouts";
import "vidstack/player/ui";

import {
  isHLSProvider,
  type MediaCanPlayEvent,
  type MediaProviderChangeEvent,
} from "vidstack";
import type { MediaPlayerElement } from "vidstack/elements";

import type { TextTrackInit } from "vidstack";

const textTracks: TextTrackInit[] = [
  // Subtitles
  {
    src: "https://files.vidstack.io/sprite-fight/subs/english.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles",
    default: true,
  },
  {
    src: "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
    label: "Spanish",
    language: "es-ES",
    kind: "subtitles",
  },
  // Chapters
  {
    src: "https://files.vidstack.io/sprite-fight/chapters.vtt",
    kind: "chapters",
    language: "en-US",
    default: true,
  },
];

import { onMounted, ref } from "vue";

const $player = ref<MediaPlayerElement>(),
  $src = ref(""),
  $type = ref("video");

// Initialize src.
changeSource("video");

onMounted(() => {
  /**
   * You can add these tracks using HTML as well.
   *
   * @example
   * ```html
   * <media-provider>
   *   <track label="..." src="..." kind="..." srclang="..." default />
   *   <track label="..." src="..." kind="..." srclang="..." />
   * </media-provider>
   * ```
   */
  for (const track of textTracks) $player.value!.textTracks.add(track);

  // Subscribe to state updates - you can connect them to Vue refs if needed.
  return $player.value!.subscribe(({ paused, viewType }) => {
    // console.log('is paused?', '->', paused);
    // console.log('is audio view?', '->', viewType === 'audio');
  });
});

function onProviderChange(event: MediaProviderChangeEvent) {
  const provider = event.detail;
  // We can configure provider's here.
  if (isHLSProvider(provider)) {
    provider.config = {};
  }
}

// We can listen for the `can-play` event to be notified when the player is ready.
function onCanPlay(event: MediaCanPlayEvent) {
  // ...
}

function changeSource(type: string) {
  $type.value = type;
  switch (type) {
    case "audio":
      $src.value = "https://files.vidstack.io/sprite-fight/audio.mp3";
      break;
    case "video":
      $src.value = "https://files.vidstack.io/sprite-fight/720p.mp4";
      break;
    case "hls":
      $src.value = "https://files.vidstack.io/sprite-fight/hls/stream.m3u8";
      break;
    case "youtube":
      $src.value = "youtube/_cMxraX_5RE";
      break;
    case "vimeo":
      $src.value = "vimeo/640499893";
      break;
  }
}
</script>

<template>
  <media-player
    class="player"
    title="Sprite Fight"
    :src="$src"
    crossOrigin
    playsInline
    @provider-change="onProviderChange"
    @can-play="onCanPlay"
    ref="$player"
  >
    <media-provider>
      <media-poster
        class="vds-poster"
        src="https://files.vidstack.io/sprite-fight/poster.webp"
        alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
      />
    </media-provider>
    <!-- Layouts -->
    <media-audio-layout />
    <media-video-layout
      thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
    />
  </media-player>

  <div class="src-buttons">
    <button
      @click="changeSource('audio')"
      :class="$type === 'audio' ? 'actived' : ''"
    >
      Audio
    </button>
    <button
      @click="changeSource('video')"
      :class="$type === 'video' ? 'actived' : ''"
    >
      Video
    </button>
    <button
      @click="changeSource('hls')"
      :class="$type === 'hls' ? 'actived' : ''"
    >
      HLS
    </button>
    <button
      @click="changeSource('youtube')"
      :class="$type === 'youtube' ? 'actived' : ''"
    >
      YouTube
    </button>
    <button
      @click="changeSource('vimeo')"
      :class="$type === 'vimeo' ? 'actived' : ''"
    >
      Vimeo
    </button>
  </div>
</template>

<style scoped>
.player {
  --brand-color: #f5f5f5;
  --focus-color: #4e9cf6;

  --audio-brand: var(--brand-color);
  --audio-focus-ring-color: var(--focus-color);
  --audio-border-radius: 2px;

  --video-brand: var(--brand-color);
  --video-focus-ring-color: var(--focus-color);
  --video-border-radius: 2px;

  /* 👉 https://vidstack.io/docs/player/components/layouts/default#css-variables for more. */
}

.player[data-view-type="audio"] media-poster {
  display: none;
}

.player[data-view-type="video"] {
  aspect-ratio: 16 /9;
}

.src-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
  margin-inline: auto;
  max-width: 300px;
}

.src-buttons .actived {
  color: var(--vp-c-brand-1);
}
</style>
