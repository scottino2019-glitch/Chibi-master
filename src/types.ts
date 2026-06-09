export type GenderBase = 'base' | 'slender' | 'baby_suit' | 'muscular' | 'chubby';

export type ArmPose = 'neutral' | 'waving' | 'hips' | 'holding';

export type EyeStyle = 'sparkle' | 'round' | 'sleeping' | 'joyful' | 'wink' | 'cool';

export type EyebrowStyle = 'neutral' | 'happy' | 'sad' | 'angry';

export type MouthStyle = 'dot' | 'cat' | 'smile' | 'surprise' | 'tongue' | 'blush';

export type NoseStyle = 'none' | 'dot' | 'cute' | 'button' | 'blush' | 'heart' | 'cat' | 'anime' | 'snout';

export type BangsStyle = 'straight' | 'spiky' | 'wispy' | 'side' | 'curly' | 'none';

export type BackHairStyle = 'short' | 'wavy' | 'twintails' | 'ponytail' | 'buns' | 'spiky' | 'none';

export type TopStyle = 'hoodie' | 'sailor' | 'shirt' | 'sweater' | 'gothic' | 'tshirt' | 'kimono' | 'armor' | 'maid' | 'party_suit' | 'none';

export type BottomStyle = 'skirt' | 'pants' | 'shorts' | 'dress_extension' | 'mermaid' | 'magical_dress' | 'frills' | 'none';

export type HeadwearStyle = 'cat_ears' | 'bear_beanie' | 'witch_hat' | 'flower' | 'halo' | 'horns' | 'none';

export type EyewearStyle = 'round' | 'nerd' | 'heart' | 'bandage' | 'none';

export type BackgroundStyle = 'solid' | 'circles' | 'stars' | 'hearts' | 'grid' | 'none';

export type FaceShape = 'round' | 'chubby' | 'pointed' | 'square';

export type EarStyle = 'round' | 'elf' | 'cat' | 'bear' | 'none';

export type BackItem = 'none' | 'angel_wings' | 'demon_wings' | 'butterfly_wings' | 'cape';

export type TailStyle = 'none' | 'cat_tail' | 'devil_tail' | 'bunny_tail' | 'fox_tail';

export type FaceAccessory = 'none' | 'whiskers' | 'band_aid' | 'freckles' | 'star_cheek' | 'blush_heart';

export interface PositionScale {
  x: number;
  y: number;
  scale: number;
}

export interface ChibiConfig {
  id: string;
  name: string;
  
  // Base
  gender: GenderBase; // Retain name for compatibility, labelled as Body Type in UI
  armPose: ArmPose;
  skinColor: string;
  faceShape: FaceShape;
  earStyle: EarStyle;
  
  // Eyes
  eyeStyle: EyeStyle;
  eyeColor: string;
  eyebrowStyle: EyebrowStyle;
  eyeSize: number;       // scale factor: e.g. 0.8 to 1.3
  eyeSpacing: number;    // offset X: e.g. 0 to 15
  eyeYOffset: number;    // offset Y: e.g. -10 to +10
  
  // Face / Features
  mouthStyle: MouthStyle;
  mouthYOffset: number;
  mouthSize: number;
  noseStyle: NoseStyle;
  noseYOffset: number;
  blushIntensity: number; // 0 to 1
  faceAccessory: FaceAccessory;
  
  // Hair
  bangsStyle: BangsStyle;
  backHairStyle: BackHairStyle;
  hairColor: string;
  hairAccentColor: string;
  hairSize: number;
  hairYOffset: number;
  
  // Clothes
  topStyle: TopStyle;
  clothesColor1: string;  // Primary
  clothesColor2: string;  // Secondary/Accent
  bottomStyle: BottomStyle;
  shoesColor: string;
  
  // Accessories
  headwearStyle: HeadwearStyle;
  headwearColor: string;
  headwearPos: PositionScale;
  
  eyewearStyle: EyewearStyle;
  eyewearColor: string;
  
  handItem: 'none' | 'balloon' | 'pet' | 'icecream' | 'wand';
  handItemColor: string;
  
  backItem: BackItem;
  tailStyle: TailStyle;
  
  // Background
  bgStyle: BackgroundStyle;
  bgColor1: string;
  bgColor2: string;
}
