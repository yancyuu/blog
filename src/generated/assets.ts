import { readable } from 'svelte/store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Asset } from '$generated/asset';

import ASSETS_0 from '$generated/assets/404.webp?w=800&format=avif&imagetools';
import ASSETS_1 from '$generated/assets/404.webp?w=1280&format=avif&imagetools';
import ASSETS_2 from '$generated/assets/404.webp';
import ASSETS_3 from '$generated/assets/404.webp?w=768&h=320&format=avif&imagetools';
import ASSETS_4 from '$generated/assets/avatar.png?w=800&format=avif&imagetools';
import ASSETS_5 from '$generated/assets/avatar.png?w=1280&format=avif&imagetools';
import ASSETS_6 from '$generated/assets/avatar.png';
import ASSETS_7 from '$generated/assets/avatar.png?w=768&h=320&format=avif&imagetools';
import ASSETS_8 from '$generated/assets/default_og_card.webp?w=800&format=avif&imagetools';
import ASSETS_9 from '$generated/assets/default_og_card.webp?w=1280&format=avif&imagetools';
import ASSETS_10 from '$generated/assets/default_og_card.webp';
import ASSETS_11 from '$generated/assets/default_og_card.webp?w=768&h=320&format=avif&imagetools';
import ASSETS_12 from '$generated/assets/mobile-preview.png?w=800&format=avif&imagetools';
import ASSETS_13 from '$generated/assets/mobile-preview.png?w=1280&format=avif&imagetools';
import ASSETS_14 from '$generated/assets/mobile-preview.png';
import ASSETS_15 from '$generated/assets/mobile-preview.png?w=768&h=320&format=avif&imagetools';
import ASSETS_16 from '$generated/assets/mobile-preview.webp?w=800&format=avif&imagetools';
import ASSETS_17 from '$generated/assets/mobile-preview.webp?w=1280&format=avif&imagetools';
import ASSETS_18 from '$generated/assets/mobile-preview.webp';
import ASSETS_19 from '$generated/assets/mobile-preview.webp?w=768&h=320&format=avif&imagetools';
import ASSETS_20 from '$generated/assets/preview.png?w=800&format=avif&imagetools';
import ASSETS_21 from '$generated/assets/preview.png?w=1280&format=avif&imagetools';
import ASSETS_22 from '$generated/assets/preview.png';
import ASSETS_23 from '$generated/assets/preview.png?w=768&h=320&format=avif&imagetools';
import ASSETS_24 from '$generated/assets/preview.webp?w=800&format=avif&imagetools';
import ASSETS_25 from '$generated/assets/preview.webp?w=1280&format=avif&imagetools';
import ASSETS_26 from '$generated/assets/preview.webp';
import ASSETS_27 from '$generated/assets/preview.webp?w=768&h=320&format=avif&imagetools';
import ASSETS_28 from '$generated/assets/qwer.webp?w=800&format=avif&imagetools';
import ASSETS_29 from '$generated/assets/qwer.webp?w=1280&format=avif&imagetools';
import ASSETS_30 from '$generated/assets/qwer.webp';
import ASSETS_31 from '$generated/assets/qwer.webp?w=768&h=320&format=avif&imagetools';
import ASSETS_32 from '$generated/assets/example/cover.jpg?w=800&format=avif&imagetools';
import ASSETS_33 from '$generated/assets/example/cover.jpg?w=1280&format=avif&imagetools';
import ASSETS_34 from '$generated/assets/example/cover.jpg';
import ASSETS_35 from '$generated/assets/example/cover.jpg?w=768&h=320&format=avif&imagetools';
import ASSETS_36 from '$generated/assets/example/example1.jpg?w=800&format=avif&imagetools';
import ASSETS_37 from '$generated/assets/example/example1.jpg?w=1280&format=avif&imagetools';
import ASSETS_38 from '$generated/assets/example/example1.jpg';
import ASSETS_39 from '$generated/assets/example/example1.jpg?w=768&h=320&format=avif&imagetools';
import ASSETS_40 from '$generated/assets/hello-QWER/cover.jpg?w=800&format=avif&imagetools';
import ASSETS_41 from '$generated/assets/hello-QWER/cover.jpg?w=1280&format=avif&imagetools';
import ASSETS_42 from '$generated/assets/hello-QWER/cover.jpg';
import ASSETS_43 from '$generated/assets/hello-QWER/cover.jpg?w=768&h=320&format=avif&imagetools';
import ASSETS_44 from '$generated/assets/hello-QWER/reach.jpg?w=800&format=avif&imagetools';
import ASSETS_45 from '$generated/assets/hello-QWER/reach.jpg?w=1280&format=avif&imagetools';
import ASSETS_46 from '$generated/assets/hello-QWER/reach.jpg';
import ASSETS_47 from '$generated/assets/hello-QWER/reach.jpg?w=768&h=320&format=avif&imagetools';
import ASSETS_48 from '$generated/assets/hello-QWER/wait.jpg?w=800&format=avif&imagetools';
import ASSETS_49 from '$generated/assets/hello-QWER/wait.jpg?w=1280&format=avif&imagetools';
import ASSETS_50 from '$generated/assets/hello-QWER/wait.jpg';
import ASSETS_51 from '$generated/assets/hello-QWER/wait.jpg?w=768&h=320&format=avif&imagetools';
import ASSETS_52 from '$generated/assets/quick-start/cover.jpg?w=800&format=avif&imagetools';
import ASSETS_53 from '$generated/assets/quick-start/cover.jpg?w=1280&format=avif&imagetools';
import ASSETS_54 from '$generated/assets/quick-start/cover.jpg';
import ASSETS_55 from '$generated/assets/quick-start/cover.jpg?w=768&h=320&format=avif&imagetools';

export const assets = (() => {
  const _data = new Map<string, Asset.Image>([
    ['/404.webp', { 800: ASSETS_0, 1280: ASSETS_1, original: ASSETS_2, banner: ASSETS_3 } as Asset.Image],
    ['/avatar.png', { 800: ASSETS_4, 1280: ASSETS_5, original: ASSETS_6, banner: ASSETS_7 } as Asset.Image],
    ['/default_og_card.webp', { 800: ASSETS_8, 1280: ASSETS_9, original: ASSETS_10, banner: ASSETS_11 } as Asset.Image],
    ['/mobile-preview.png', { 800: ASSETS_12, 1280: ASSETS_13, original: ASSETS_14, banner: ASSETS_15 } as Asset.Image],
    [
      '/mobile-preview.webp',
      { 800: ASSETS_16, 1280: ASSETS_17, original: ASSETS_18, banner: ASSETS_19 } as Asset.Image,
    ],
    ['/preview.png', { 800: ASSETS_20, 1280: ASSETS_21, original: ASSETS_22, banner: ASSETS_23 } as Asset.Image],
    ['/preview.webp', { 800: ASSETS_24, 1280: ASSETS_25, original: ASSETS_26, banner: ASSETS_27 } as Asset.Image],
    ['/qwer.webp', { 800: ASSETS_28, 1280: ASSETS_29, original: ASSETS_30, banner: ASSETS_31 } as Asset.Image],
    ['/example/cover.jpg', { 800: ASSETS_32, 1280: ASSETS_33, original: ASSETS_34, banner: ASSETS_35 } as Asset.Image],
    [
      '/example/example1.jpg',
      { 800: ASSETS_36, 1280: ASSETS_37, original: ASSETS_38, banner: ASSETS_39 } as Asset.Image,
    ],
    [
      '/hello-QWER/cover.jpg',
      { 800: ASSETS_40, 1280: ASSETS_41, original: ASSETS_42, banner: ASSETS_43 } as Asset.Image,
    ],
    [
      '/hello-QWER/reach.jpg',
      { 800: ASSETS_44, 1280: ASSETS_45, original: ASSETS_46, banner: ASSETS_47 } as Asset.Image,
    ],
    [
      '/hello-QWER/wait.jpg',
      { 800: ASSETS_48, 1280: ASSETS_49, original: ASSETS_50, banner: ASSETS_51 } as Asset.Image,
    ],
    [
      '/quick-start/cover.jpg',
      { 800: ASSETS_52, 1280: ASSETS_53, original: ASSETS_54, banner: ASSETS_55 } as Asset.Image,
    ],
  ]);

  const { subscribe } = readable<Map<string, Asset.Image>>(_data);

  return {
    subscribe,
  };
})();
