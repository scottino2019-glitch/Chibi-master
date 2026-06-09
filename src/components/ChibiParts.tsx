import React from 'react';
import { ChibiConfig } from '../types';

interface ChibiPartsProps {
  config: ChibiConfig;
  className?: string;
  size?: number; // Visual size for thumbnail vs main canvas
}

export const ChibiParts: React.FC<ChibiPartsProps> = ({ config, className = "", size = 400 }) => {
  const {
    skinColor,
    eyeColor,
    hairColor,
    hairAccentColor,
    clothesColor1,
    clothesColor2,
    headwearColor,
    eyewearColor,
    handItemColor,
    bgStyle,
    bgColor1,
    bgColor2,
    blushIntensity,
    eyeSize,
    eyeSpacing,
    eyeYOffset,
    hairSize,
    hairYOffset,
    mouthYOffset,
    mouthSize,
    noseStyle,
    noseYOffset,
    armPose,
    gender,
    eyeStyle,
    eyebrowStyle,
    mouthStyle,
    bangsStyle,
    backHairStyle,
    topStyle,
    bottomStyle,
    headwearStyle,
    eyewearStyle,
    handItem,
    shoesColor,
    faceShape,
    earStyle,
    faceAccessory,
    backItem,
    tailStyle
  } = config;

  // Symmetrical spacing for eyes
  const leftEyeX = 200 - eyeSpacing;
  const rightEyeX = 200 + eyeSpacing;
  const eyesY = 175 + eyeYOffset;

  // Mouth and nose coordinates
  const mouthY = 205 + mouthYOffset;
  const noseY = 193 + noseYOffset;

  // Arm positions based on stance
  // Left Arm
  const renderLeftArm = () => {
    switch (armPose) {
      case 'waving':
        return (
          <g id="left_arm_waving">
            {/* Upper arm raised */}
            <path d="M 160,265 C 130,240 125,230 115,220 C 105,210 115,200 125,210 C 140,225 150,240 165,260 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'hips':
        return (
          <g id="left_arm_hips">
            {/* Hand on hip */}
            <path d="M 160,270 Q 140,285 145,300 C 148,308 158,308 162,300 Q 165,285 165,270 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'holding':
        return (
          <g id="left_arm_holding">
            {/* Front holding stance */}
            <path d="M 160,270 Q 135,265 130,285 C 125,295 138,305 145,295 Q 155,285 165,270 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'neutral':
      default:
        return (
          <g id="left_arm_neutral">
            {/* Relaxed hanging side arm */}
            <path d="M 160,270 C 150,290 145,305 145,315 C 145,325 155,325 158,315 C 160,305 162,290 165,270 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
    }
  };

  // Right Arm
  const renderRightArm = () => {
    switch (armPose) {
      case 'hips':
        return (
          <g id="right_arm_hips">
            <path d="M 240,270 Q 260,285 255,300 C 252,308 242,308 238,300 Q 235,285 235,270 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'holding':
      case 'waving':
        return (
          <g id="right_arm_raised">
            {/* Slightly forward-holding / presenting arm */}
            <path d="M 240,270 Q 265,270 270,290 C 275,300 262,310 255,298 Q 248,285 235,270 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'neutral':
      default:
        return (
          <g id="right_arm_neutral">
            <path d="M 240,270 C 250,290 255,305 255,315 C 255,325 245,325 242,315 C 240,305 238,290 235,270 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
    }
  };

  // Render Back Hair
  const renderBackHair = () => {
    switch (backHairStyle) {
      case 'short':
        return (
          <g id="back_hair_short" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Neat neck bob */}
            <path d="M 120,160 C 115,210 130,235 200,235 C 270,235 285,210 280,160 C 290,165 295,200 275,230 C 255,250 145,250 125,230 C 105,200 110,165 120,160 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
          </g>
        );
      case 'wavy':
        return (
          <g id="back_hair_wavy" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Long wavy strands cascading behind body */}
            <path d="M 120,150 C 90,180 80,240 90,290 C 95,315 110,325 125,300 C 135,280 130,225 140,180 H 260 C 270,225 265,280 275,300 C 290,325 305,315 310,290 C 320,240 310,180 280,150 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            {/* Inner highlights */}
            <path d="M 105,220 Q 95,260 115,285" fill="none" stroke={hairAccentColor} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M 295,220 Q 305,260 285,285" fill="none" stroke={hairAccentColor} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </g>
        );
      case 'twintails':
        return (
          <g id="back_hair_twintails" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Twin tails with ribbons */}
            {/* Left tail */}
            <path d="M 115,130 C 80,120 50,150 45,200 C 40,240 70,270 75,250 C 85,220 90,180 115,160 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            <path d="M 60,170 Q 55,210 70,230" fill="none" stroke={hairAccentColor} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            {/* Right tail */}
            <path d="M 285,130 C 320,120 350,150 355,200 C 360,240 330,270 325,250 C 315,220 310,180 285,160 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            <path d="M 340,170 Q 345,210 330,230" fill="none" stroke={hairAccentColor} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            {/* Hair ties */}
            <circle cx="115" cy="145" r="7" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" />
            <circle cx="285" cy="145" r="7" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" />
          </g>
        );
      case 'ponytail':
        return (
          <g id="back_hair_ponytail" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Side-swept high ponytail */}
            <path d="M 115,130 C 110,80 70,60 55,90 C 40,120 60,170 85,185 C 105,195 115,170 120,150" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            <path d="M 285,130 C 290,70 330,50 345,80 C 360,110 340,165 315,185 C 295,195 285,170 280,150" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            {/* Pony ribbon */}
            <path d="M 275,135 Q 285,130 295,135 Q 285,150 275,135" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="2" />
          </g>
        );
      case 'buns':
        return (
          <g id="back_hair_buns" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Two lovely space buns */}
            <circle cx="110" cy="95" r="28" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            <circle cx="290" cy="95" r="28" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            {/* Bun highlights */}
            <path d="M 95,95 A 15,15 0 0,1 120,85" fill="none" stroke={hairAccentColor} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            <path d="M 275,95 A 15,15 0 0,1 300,85" fill="none" stroke={hairAccentColor} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            {/* Ribbon wraps */}
            <path d="M 92,112 Q 110,116 128,112" fill="none" stroke={clothesColor1} strokeWidth="6" strokeLinecap="round" />
            <path d="M 272,112 Q 290,116 308,112" fill="none" stroke={clothesColor1} strokeWidth="6" strokeLinecap="round" />
          </g>
        );
      case 'spiky':
        return (
          <g id="back_hair_spiky" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Fluffy/wild spiky anime hair behind */}
            <path d="M 120,150 L 95,180 L 110,195 L 80,230 L 115,235 L 90,270 L 135,260 L 150,275 L 200,265 L 250,275 L 265,260 L 310,270 L 285,235 L 320,230 L 290,195 L 305,180 L 280,150 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  // Render Eyes
  const renderEyes = () => {
    // Utility for Sparkle Eyes
    const getSparkleEye = (cx: number, isWink: boolean) => {
      if (isWink) {
        // Joyful wink line
        return (
          <g transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
            <path d={`M ${cx - 20},${eyesY - 5} Q ${cx},${eyesY + 15} ${cx + 20},${eyesY - 5}`} fill="none" stroke="#1f1f1f" strokeWidth="5" strokeLinecap="round" />
            <path d={`M ${cx - 15},${eyesY + 4} L ${cx - 20},${eyesY + 10}`} stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
            <path d={`M ${cx + 15},${eyesY + 4} L ${cx + 20},${eyesY + 10}`} stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      }

      return (
        <g id="sparkle_eye" transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
          {/* Eyeline / Shadow */}
          <ellipse cx={cx} cy={eyesY + 2} rx="22" ry="24" fill="#ffffff" stroke="#1f1f1f" strokeWidth="3" />
          {/* Iris color */}
          <ellipse cx={cx} cy={eyesY + 3} rx="18" ry="20" fill={eyeColor} />
          {/* Pupil gradient (simulated with dark dark circle) */}
          <ellipse cx={cx} cy={eyesY + 5} rx="11" ry="13" fill="#1b1c21" />
          
          {/* Shading/Inner glares */}
          <ellipse cx={cx - 6} cy={eyesY - 5} rx="6" ry="6" fill="#ffffff" />
          <ellipse cx={cx + 6} cy={eyesY + 7} rx="3" ry="3" fill="#ffffff" />
          <circle cx={cx - 3} cy={eyesY + 11} r="1.5" fill="#ffffff" opacity="0.8" />
          
          {/* Cute eyelashes styling */}
          <path d={`M ${cx - 22},${eyesY - 14} Q ${cx},${eyesY - 24} ${cx + 22},${eyesY - 14}`} fill="none" stroke="#1d1d1f" strokeWidth="5" strokeLinecap="round" />
          <path d={`M ${cx - 18},${eyesY - 18} Q ${cx - 26},${eyesY - 24} ${cx - 25},${eyesY - 16}`} fill="none" stroke="#1d1d1f" strokeWidth="3.5" strokeLinecap="round" />
          <path d={`M ${cx + 18},${eyesY - 18} Q ${cx + 26},${eyesY - 24} ${cx + 25},${eyesY - 16}`} fill="none" stroke="#1d1d1f" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    };

    const getRoundEye = (cx: number, isWink: boolean) => {
      if (isWink) {
        return (
          <g transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
            <path d={`M ${cx - 16},${eyesY + 5} Q ${cx},${eyesY - 10} ${cx + 16},${eyesY + 5}`} fill="none" stroke="#1f1f1f" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        );
      }
      return (
        <g id="round_eye" transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
          <circle cx={cx} cy={eyesY} r="18" fill="#1c1c1f" />
          {/* Cute large glint */}
          <circle cx={cx - 5} cy={eyesY - 5} r="6" fill="#ffffff" />
          <circle cx={cx + 5} cy={eyesY + 5} r="2.5" fill="#ffffff" />
          {/* Eyelash lid */}
          <path d={`M ${cx - 21},${eyesY - 10} Q ${cx},${eyesY - 18} ${cx + 21},${eyesY - 10}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    };

    const getSleepingEye = (cx: number) => {
      return (
        <g transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
          <path d={`M ${cx - 20},${eyesY - 5} Q ${cx},${eyesY + 12} ${cx + 20},${eyesY - 5}`} fill="none" stroke="#1f1f1f" strokeWidth="5.5" strokeLinecap="round" />
          {/* Small eyelashes flares */}
          <path d={`M ${cx - 12},${eyesY + 4} L ${cx - 17},${eyesY + 12}`} stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
          <path d={`M ${cx + 12},${eyesY + 4} L ${cx + 17},${eyesY + 12}`} stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    };

    const getJoyfulEye = (cx: number) => {
      return (
        <g transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
          <path d={`M ${cx - 18},${eyesY + 5} Q ${cx},${eyesY - 13} ${cx + 18},${eyesY + 5}`} fill="none" stroke="#1f1f1f" strokeWidth="5.5" strokeLinecap="round" />
          <path d={`M ${cx - 15},${eyesY - 3} L ${cx - 22},${eyesY - 10}`} stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
          <path d={`M ${cx + 15},${eyesY - 3} L ${cx + 22},${eyesY - 10}`} stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    };

    const getCoolEye = (cx: number) => {
      return (
        <g transform={`scale(${eyeSize})`} transformOrigin={`${cx} ${eyesY}`}>
          {/* Half shut cool focus eyes */}
          <path d={`M ${cx - 20},${eyesY - 10} L ${cx + 20},${eyesY - 10} L ${cx + 16},${eyesY + 10} L ${cx - 16},${eyesY + 10} Z`} fill="#ffffff" stroke="#1f1f1f" strokeWidth="3.5" />
          <path d={`M ${cx - 15},${eyesY - 8} L ${cx + 15},${eyesY - 8} L ${cx + 12},${eyesY + 8} L ${cx - 12},${eyesY + 8} Z`} fill={eyeColor} />
          <circle cx={cx} cy={eyesY} r="7" fill="#1f1f1f" />
          <circle cx={cx - 3} cy={eyesY - 3} r="3" fill="#ffffff" />
          {/* Serious brow-line */}
          <path d={`M ${cx - 22},${eyesY - 10} L ${cx + 22},${eyesY - 10}`} stroke="#1f1f1f" strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    };

    switch (eyeStyle) {
      case 'sparkle':
        return (
          <>
            {getSparkleEye(leftEyeX, false)}
            {getSparkleEye(rightEyeX, false)}
          </>
        );
      case 'round':
        return (
          <>
            {getRoundEye(leftEyeX, false)}
            {getRoundEye(rightEyeX, false)}
          </>
        );
      case 'sleeping':
        return (
          <>
            {getSleepingEye(leftEyeX)}
            {getSleepingEye(rightEyeX)}
          </>
        );
      case 'joyful':
        return (
          <>
            {getJoyfulEye(leftEyeX)}
            {getJoyfulEye(rightEyeX)}
          </>
        );
      case 'wink':
        return (
          <>
            {getSparkleEye(leftEyeX, false)}
            {getSparkleEye(rightEyeX, true)}
          </>
        );
      case 'cool':
        return (
          <>
            {getCoolEye(leftEyeX)}
            {getCoolEye(rightEyeX)}
          </>
        );
      default:
        return null;
    }
  };

  // Eyebrows
  const renderEyebrows = () => {
    const getEyebrow = (cx: number, isRight: boolean) => {
      const directionFactor = isRight ? 1 : -1;
      const baseEyebrowY = eyesY - 22;

      switch (eyebrowStyle) {
        case 'happy':
          // Highly arched cute eyebrow
          return (
            <path d={`M ${cx - 15},${baseEyebrowY + 2} Q ${cx},${baseEyebrowY - 8} ${cx + 15},${baseEyebrowY + 2}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
          );
        case 'sad':
          // Downward slanted worried eyebrow
          return (
            <path d={`M ${cx - 14 * directionFactor},${baseEyebrowY - 4} L ${cx + 14 * directionFactor},${baseEyebrowY + 5}`} fill="none" stroke="#1f1f1f" strokeWidth="4.5" strokeLinecap="round" />
          );
        case 'angry':
          // Inward slanted angry eyebrow
          return (
            <path d={`M ${cx - 14 * directionFactor},${baseEyebrowY + 5} L ${cx + 14 * directionFactor},${baseEyebrowY - 5}`} fill="none" stroke="#1f1f1f" strokeWidth="5" strokeLinecap="round" />
          );
        case 'neutral':
        default:
          // Slightly arched soft eyebrow
          return (
            <path d={`M ${cx - 15},${baseEyebrowY} Q ${cx},${baseEyebrowY - 4} ${cx + 15},${baseEyebrowY}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
          );
      }
    };

    return (
      <g id="eyebrows">
        {getEyebrow(leftEyeX, false)}
        {getEyebrow(rightEyeX, true)}
      </g>
    );
  };

  // Render Mouth
  const renderMouth = () => {
    switch (mouthStyle) {
      case 'cat':
        return (
          <path d={`M ${200 - 8 * mouthSize},${mouthY} Q ${200 - 4 * mouthSize},${mouthY + 5 * mouthSize} 200,${mouthY} Q ${200 + 4 * mouthSize},${mouthY + 5 * mouthSize} ${200 + 8 * mouthSize},${mouthY}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" id="mouth_cat" />
        );
      case 'smile':
        return (
          <path d={`M ${200 - 10 * mouthSize},${mouthY - 2} Q 200,${mouthY + 8 * mouthSize} ${200 + 10 * mouthSize},${mouthY - 2}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" id="mouth_smile" />
        );
      case 'surprise':
        return (
          <g id="mouth_surprise">
            <ellipse cx="200" cy={mouthY + 3} rx={7 * mouthSize} ry={10 * mouthSize} fill="#82142d" stroke="#1f1f1f" strokeWidth="3.5" />
            <path d={`M ${200 - 5 * mouthSize},${mouthY + 1} Q 200,${mouthY + 6 * mouthSize} ${200 + 5 * mouthSize},${mouthY + 1}`} fill="#ff7096" />
          </g>
        );
      case 'tongue':
        return (
          <g id="mouth_tongue">
            {/* Smile outline */}
            <path d={`M ${200 - 10},${mouthY} Q 200,${mouthY + 6} ${200 + 10},${mouthY}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
            {/* Cute sticking out pink tongue */}
            <path d={`M 195,${mouthY + 2} C 195,${mouthY + 15} 205,${mouthY + 15} 205,${mouthY + 2} Z`} fill="#ff7096" stroke="#1f1f1f" strokeWidth="2.5" />
            <line x1="200" y1={mouthY + 2} x2="200" y2={mouthY + 8} stroke="#1f1f1f" strokeWidth="1.5" />
          </g>
        );
      case 'blush':
        // Embarrassed wiggle mouth
        return (
          <path d={`M 190,${mouthY + 2} Q 195,${mouthY - 3} 200,${mouthY + 2} Q 205,${mouthY + 7} 210,${mouthY + 2}`} fill="none" stroke="#1f1f1f" strokeWidth="3.5" strokeLinecap="round" />
        );
      case 'dot':
      default:
        return (
          <circle cx="200" cy={mouthY} r={3 * mouthSize} fill="#1f1f1f" id="mouth_dot" />
        );
    }
  };

  // Render Nose
  const renderNose = () => {
    switch (noseStyle) {
      case 'dot':
        return <circle cx="200" cy={noseY} r="2.2" fill="#1f1f1f" id="nose_dot" />;
      case 'cute':
        return <path d={`M 197,${noseY - 1} Q 200,${noseY + 2} 203,${noseY - 1}`} fill="none" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" id="nose_cute" />;
      case 'button':
        return (
          <g id="nose_button">
            <ellipse cx="200" cy={noseY} rx="4" ry="2.2" fill="#fca311" stroke="#1f1f1f" strokeWidth="1.5" />
          </g>
        );
      case 'blush':
        return (
          <g id="nose_blush">
            <ellipse cx="200" cy={noseY} rx="5" ry="3.5" fill="#ff4d6d" opacity="0.75" />
            <circle cx="198" cy={noseY - 1} r="1.5" fill="#ffffff" />
          </g>
        );
      case 'heart':
        return (
          <path d={`M 200,${noseY + 2.5} L 196.5,${noseY - 1} C 195,${noseY - 3.5} 197.5,${noseY - 5} 200,${noseY - 2.5} C 202.5,${noseY - 5} 205,${noseY - 3.5} 203.5,${noseY - 1} Z`} fill="#ff7096" stroke="#1f1f1f" strokeWidth="1" id="nose_heart" />
        );
      case 'cat':
        return (
          <polygon points={`195,${noseY - 2.5} 205,${noseY - 2.5} 200,${noseY + 2}`} fill="#1f1f1f" stroke="#1f1f1f" strokeWidth="1" strokeLinejoin="round" id="nose_cat" />
        );
      case 'anime':
        return (
          <g stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round" id="nose_anime">
            <line x1="199.5" y1={noseY - 2.5} x2="199.5" y2={noseY + 1.5} />
            <line x1="201.5" y1={noseY - 1} x2="201.5" y2={noseY + 1.5} />
          </g>
        );
      case 'snout':
        return (
          <g id="nose_snout">
            <ellipse cx="200" cy={noseY} rx="8" ry="5.5" fill="#ffa6c9" stroke="#1f1f1f" strokeWidth="2" />
            <circle cx="197" cy={noseY} r="1.3" fill="#1f1f1f" />
            <circle cx="203" cy={noseY} r="1.3" fill="#1f1f1f" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  // Render Front Hair (Bangs)
  const renderBangs = () => {
    switch (bangsStyle) {
      case 'straight':
        return (
          <g id="bangs_straight" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Sleek straight block with gaps */}
            <path d="M 125,145 C 135,100 265,100 275,145 C 285,150 280,175 270,175 C 265,160 255,140 250,165 C 245,175 235,175 230,160 C 225,145 215,145 210,170 C 205,182 195,182 190,170 C 185,145 175,145 170,160 C 165,175 155,175 150,165 C 145,140 135,160 130,175 C 120,175 115,150 125,145 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            {/* Highlights */}
            <path d="M 150,125 Q 200,115 250,125" fill="none" stroke={hairAccentColor} strokeWidth="4.5" strokeLinecap="round" opacity="0.6" />
          </g>
        );
      case 'spiky':
        return (
          <g id="bangs_spiky" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Sharp split strands */}
            <path d="M 125,145 C 135,105 265,105 275,145 L 265,175 L 255,160 L 240,185 L 230,160 L 210,195 L 190,195 L 170,160 L 160,185 L 145,160 L 135,175 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            {/* Highlights */}
            <path d="M 160,130 L 180,120 L 220,120 L 240,130" fill="none" stroke={hairAccentColor} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          </g>
        );
      case 'wispy':
        return (
          <g id="bangs_wispy" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Elegant light strands draping near eyes */}
            <path d="M 125,145 C 135,100 265,100 275,145 C 280,150 270,165 265,155 C 260,140 250,135 245,170 C 240,180 232,180 228,160 C 220,135 210,135 202,175 C 198,175 192,150 188,160 C 180,175 174,175 170,165 C 160,135 150,140 145,155 C 140,165 130,150 125,145 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
          </g>
        );
      case 'side':
        return (
          <g id="bangs_side" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Classic side-swept fringe covering one eye area */}
            <path d="M 125,145 C 135,95 265,95 275,145 C 285,155 255,190 235,195 C 215,200 185,185 170,170 C 160,155 145,178 135,178 C 120,178 115,155 125,145 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
            <path d="M 185,125 Q 230,140 255,160" fill="none" stroke={hairAccentColor} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          </g>
        );
      case 'curly':
        return (
          <g id="bangs_curly" transform={`translate(0, ${hairYOffset}) scale(${hairSize})`} transformOrigin="200 160">
            {/* Bouncy fluffy ringlets at top */}
            <path d="M 125,140 C 115,110 160,90 190,110 C 210,95 255,110 270,130 C 285,150 270,172 255,165 C 245,155 235,168 225,160 Q 210,178 190,165 C 175,178 160,160 145,170 C 130,175 120,155 125,140 Z" fill={hairColor} stroke="#1f1f1f" strokeWidth="3" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  // Render Head Decor (Headwear)
  const renderHeadwear = () => {
    const { x, y, scale } = config.headwearPos;
    // Base headwear height center is around (200, 100)
    switch (headwearStyle) {
      case 'cat_ears':
        return (
          <g id="headwear_cat_ears" transform={`translate(${x}, ${y - 12}) scale(${scale})`} transformOrigin="200 100">
            {/* Left ear */}
            <path d="M 115,110 L 90,55 C 85,45 105,45 118,65 L 140,100 Z" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            <path d="M 120,100 L 102,67 C 100,63 110,63 118,74 L 132,100 Z" fill="#ff7096" />
            {/* Right ear */}
            <path d="M 285,110 L 310,55 C 315,45 295,45 282,65 L 260,100 Z" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            <path d="M 280,100 L 298,67 C 300,63 290,63 282,74 L 268,100 Z" fill="#ff7096" />
          </g>
        );
      case 'bear_beanie':
        return (
          <g id="headwear_bear_beanie" transform={`translate(${x}, ${y}) scale(${scale})`} transformOrigin="200 100">
            {/* Dome beanie */}
            <path d="M 120,140 C 115,60 285,60 280,140 Z" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            {/* Bear ears on top */}
            <circle cx="135" cy="70" r="18" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            <circle cx="135" cy="70" r="9" fill="#ffd166" />
            <circle cx="265" cy="70" r="18" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            <circle cx="265" cy="70" r="9" fill="#ffd166" />
            {/* Beanie rim tag */}
            <rect x="185" y="115" width="30" height="15" rx="3" fill="#e76f51" stroke="#1f1f1f" strokeWidth="2" />
            {/* Cute face print on beanie */}
            <circle cx="193" cy="122" r="1.5" fill="#ffffff" />
            <circle cx="207" cy="122" r="1.5" fill="#ffffff" />
            <path d="M 198,125 Q 200,127 202,125" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        );
      case 'witch_hat':
        return (
          <g id="headwear_witch_hat" transform={`translate(${x}, ${y - 30}) scale(${scale * 1.15})`} transformOrigin="200 100">
            {/* Broad brim */}
            <ellipse cx="200" cy="115" rx="100" ry="20" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            {/* Witch cone */}
            <path d="M 130,110 C 130,110 180,30 220,15 C 240,8 245,25 220,40 C 200,52 270,110 270,110 Z" fill={headwearColor} stroke="#1f1f1f" strokeWidth="3.5" />
            {/* Golden belt on hat */}
            <path d="M 148,106 Q 200,116 252,106 L 253,115 Q 200,124 147,115 Z" fill="#ffd166" stroke="#1f1f1f" strokeWidth="2" />
            {/* Gold buckle */}
            <rect x="188" y="102" width="24" height="18" rx="2" fill="#ffd166" stroke="#1f1f1f" strokeWidth="2.5" />
            <rect x="194" y="107" width="12" height="8" rx="1" fill="#1f1f1f" />
          </g>
        );
      case 'flower':
        return (
          <g id="headwear_flower" transform={`translate(${x + 55}, ${y + 20}) scale(${scale * 0.9})`} transformOrigin="255 120">
            {/* 5 Petal Blossom */}
            <g fill="#ffb703" stroke="#1f1f1f" strokeWidth="2.5">
              <circle cx="240" cy="120" r="12" />
              <circle cx="270" cy="120" r="12" />
              <circle cx="255" cy="100" r="12" />
              <circle cx="245" cy="138" r="12" />
              <circle cx="265" cy="138" r="12" />
            </g>
            {/* Center pistil */}
            <circle cx="255" cy="121" r="10" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2" />
          </g>
        );
      case 'halo':
        return (
          <g id="headwear_halo" transform={`translate(${x}, ${y - 25}) scale(${scale})`} transformOrigin="200 65" opacity="0.95">
            {/* Floating angel ring */}
            <ellipse cx="200" cy="65" rx="45" ry="14" fill="none" stroke="#ffe347" strokeWidth="8" filter="drop-shadow(0px 0px 4px rgba(255, 227, 71, 0.8))" />
            <ellipse cx="200" cy="65" rx="45" ry="14" fill="none" stroke="#ffffff" strokeWidth="3" />
            {/* Invisible support stems (optional illustration details) */}
            <line x1="200" y1="79" x2="200" y2="92" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3,1" opacity="0.6" />
          </g>
        );
      case 'horns':
        return (
          <g id="headwear_horns" transform={`translate(${x}, ${y - 10}) scale(${scale})`} transformOrigin="200 95">
            {/* Cute demon horns */}
            <path d="M 132,100 C 130,80 115,70 100,75 C 92,79 98,90 105,90 C 115,90 125,95 126,102 Z" fill="#d90429" stroke="#1f1f1f" strokeWidth="3" />
            <path d="M 268,100 C 270,80 285,70 300,75 C 308,79 302,90 295,90 C 285,90 275,95 274,102 Z" fill="#d90429" stroke="#1f1f1f" strokeWidth="3" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  // Eyewear Render
  const renderEyewear = () => {
    switch (eyewearStyle) {
      case 'round':
        return (
          <g id="eyewear_round" stroke="#1f1f1f" strokeWidth="4.5" fill="none">
            {/* Left Frame */}
            <circle cx={leftEyeX} cy={eyesY} r="25" />
            {/* Right Frame */}
            <circle cx={rightEyeX} cy={eyesY} r="25" />
            {/* Connector bridge */}
            <path d={`M ${leftEyeX + 25},${eyesY} Q 200,${eyesY - 4} ${rightEyeX - 25},${eyesY}`} strokeWidth="4" strokeLinecap="round" />
            {/* Temples sides */}
            <path d={`M ${leftEyeX - 25},${eyesY} L ${leftEyeX - 42},${eyesY - 3}`} strokeWidth="3" strokeLinecap="round" />
            <path d={`M ${rightEyeX + 25},${eyesY} L ${rightEyeX + 42},${eyesY - 3}`} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'nerd':
        return (
          <g id="eyewear_nerd">
            {/* Thick black hipster rim glasses */}
            <g fill="none" stroke="#22252a" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round">
              <rect x={leftEyeX - 26} y={eyesY - 20} width="50" height="40" rx="8" />
              <rect x={rightEyeX - 24} y={eyesY - 20} width="50" height="40" rx="8" />
              {/* Bridge */}
              <line x1={leftEyeX + 24} y1={eyesY - 5} x2={rightEyeX - 24} y2={eyesY - 5} strokeWidth="5" />
              {/* Frame wings */}
              <line x1={leftEyeX - 26} y1={eyesY - 10} x2={leftEyeX - 42} y2={eyesY - 14} strokeWidth="3.5" />
              <line x1={rightEyeX + 26} y1={eyesY - 10} x2={rightEyeX + 42} y2={eyesY - 14} strokeWidth="3.5" />
            </g>
          </g>
        );
      case 'heart':
        return (
          <g id="eyewear_heart">
            {/* Gorgeous colorful heart shades */}
            <g fill={eyewearColor} stroke="#1f1f1f" strokeWidth="3.5" opacity="0.8" strokeLinejoin="round">
              {/* Left Heart */}
              <path d={`M ${leftEyeX},${eyesY - 18} C ${leftEyeX - 35},${eyesY - 35} ${leftEyeX - 35},${eyesY + 10} ${leftEyeX},${eyesY + 25} C ${leftEyeX + 35},${eyesY + 10} ${leftEyeX + 35},${eyesY - 35} ${leftEyeX},${eyesY - 18} Z`} />
              {/* Right Heart */}
              <path d={`M ${rightEyeX},${eyesY - 18} C ${rightEyeX - 35},${eyesY - 35} ${rightEyeX - 35},${eyesY + 10} ${rightEyeX},${eyesY + 25} C ${rightEyeX + 35},${eyesY + 10} ${rightEyeX + 35},${eyesY - 35} ${rightEyeX},${eyesY - 18} Z`} />
            </g>
            {/* Glare line */}
            <path d={`M ${leftEyeX - 12},${eyesY - 12} L ${leftEyeX - 4},${eyesY - 4}`} stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <path d={`M ${rightEyeX - 12},${eyesY - 12} L ${rightEyeX - 4},${eyesY - 4}`} stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            {/* Frame outline only */}
            <path d={`M ${leftEyeX + 24},${eyesY - 5} Q 200,${eyesY - 10} ${rightEyeX - 24},${eyesY - 5}`} fill="none" stroke="#1f1f1f" strokeWidth="4" />
          </g>
        );
      case 'bandage':
        return (
          <g id="eyewear_bandage" transform={`translate(0, ${noseYOffset})`}>
            {/* Cheek/nose cross bandage */}
            <path d="M 188,198 L 212,188" stroke="#f6ddd1" strokeWidth="7" strokeLinecap="round" />
            <path d="M 212,198 L 188,188" stroke="#f6ddd1" strokeWidth="7" strokeLinecap="round" />
            <path d="M 188,198 L 212,188" stroke="#1f1f1f" strokeWidth="1" strokeLinecap="round" strokeDasharray="3,3" />
            <path d="M 212,198 L 188,188" stroke="#1f1f1f" strokeWidth="1" strokeLinecap="round" strokeDasharray="3,3" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  // Render Hand Held Item (held near waving or neutral hand)
  const renderHandItem = () => {
    // Coordinate anchor for the held item: (125, 250) or (275, 280) depending on pose.
    // If neutral pose, placed near left leg (140, 310) or right leg (260, 310).
    const handX = armPose === 'waving' ? 115 : 135;
    const handY = armPose === 'waving' ? 210 : 290;

    switch (handItem) {
      case 'balloon':
        return (
          <g id="hand_item_balloon">
            {/* Balloon string */}
            <path d={`M ${handX},${handY} Q ${handX - 20},${handY - 60} ${handX - 5},${handY - 120}`} fill="none" stroke="gray" strokeWidth="2.5" />
            {/* Heart Balloon */}
            <path d={`M ${handX - 5},${handY - 120} C ${handX - 45},${handY - 165} ${handX - 45},${handY - 110} ${handX - 5},${handY - 80} C ${handX + 35},${handY - 110} ${handX + 35},${handY - 165} ${handX - 5},${handY - 120} Z`} fill={handItemColor} stroke="#1f1f1f" strokeWidth="3" />
            {/* Highlight bubble */}
            <ellipse cx={handX + 10} cy={handY - 110} rx="4" ry="7" transform={`rotate(-30, ${handX + 10}, ${handY - 110})`} fill="#ffffff" opacity="0.6" />
          </g>
        );
      case 'icecream':
        return (
          <g id="hand_item_icecream" transform={`translate(${handX - 10}, ${handY - 25}) scale(0.85)`}>
            {/* Waffle Cone */}
            <polygon points="10,35 25,35 17,65" fill="#e9c46a" stroke="#1f1f1f" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Ice scoops */}
            <circle cx="17" cy="30" r="11" fill="#f4a261" stroke="#1f1f1f" strokeWidth="2" />
            <circle cx="17" cy="18" r="9" fill={handItemColor} stroke="#1f1f1f" strokeWidth="2" />
            {/* Cherry on top */}
            <circle cx="17" cy="7" r="4.5" fill="#e63946" />
            <path d="M 17,4 Q 21,-2 25,0" fill="none" stroke="#e63946" strokeWidth="1.5" />
          </g>
        );
      case 'wand':
        return (
          <g id="hand_item_wand" transform={`translate(${handX}, ${handY}) rotate(-35)`} transformOrigin={`${handX} ${handY}`}>
            {/* Magic Wand rod */}
            <line x1={handX} y1={handY + 20} x2={handX} y2={handY - 40} stroke="#8e9aaf" strokeWidth="5.5" strokeLinecap="round" />
            {/* Golden Star Head */}
            <path d={`M ${handX},${handY - 60} L ${handX + 6},${handY - 46} L ${handX + 20},${handY - 46} L ${handX + 9},${handY - 37} L ${handX + 14},${handY - 23} L ${handX},${handY - 32} L ${handX - 14},${handY - 23} L ${handX - 9},${handY - 37} L ${handX - 20},${handY - 46} L ${handX - 6},${handY - 46} Z`} fill="#f9c74f" stroke="#1f1f1f" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Glow dots */}
            <circle cx={handX - 15} cy={handY - 55} r="2.5" fill="#ffd166" opacity="0.8" />
            <circle cx={handX + 18} cy={handY - 35} r="2" fill="#ffd166" opacity="0.8" />
          </g>
        );
      case 'pet':
        return (
          <g id="hand_item_pet" transform={`translate(${handX - 35}, ${handY + 5})`}>
            {/* Adorable desk cat / puppy sitting beside feet */}
            <ellipse cx="25" cy="40" rx="18" ry="15" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2.5" />
            <circle cx="25" cy="24" r="14" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2.5" />
            {/* Ears */}
            <polygon points="12,17 10,6 20,13" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2.5" />
            <polygon points="38,17 40,6 30,13" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2.5" />
            {/* Pet Eyes & Nose */}
            <circle cx="21" cy="23" r="2.5" fill="#1f1f1f" />
            <circle cx="29" cy="23" r="2.5" fill="#1f1f1f" />
            <polygon points="24,27 26,27 25,29" fill="#ff7096" />
            {/* Cheeks */}
            <ellipse cx="17" cy="26" rx="3" ry="1.5" fill="#ffccd5" />
            <ellipse cx="33" cy="26" rx="3" ry="1.5" fill="#ffccd5" />
            {/* Tail */}
            <path d="M 40,43 Q 48,35 45,28" fill="none" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  // Render Outfits (Tops and Bottoms)
  const renderOutfit = () => {
    // Coordinates: Neck is around (200, 255)
    // Shoulder width 50 (from 175 to 225)
    // Waist width around 45 (at 310)

    const renderTop = () => {
      switch (topStyle) {
        case 'hoodie':
          return (
            <g id="outfit_hoodie">
              {/* Cozy oversize neck hood backdrop */}
              <path d="M 160,240 Q 200,270 240,240 Q 255,270 250,285 Q 200,300 150,285 Q 145,270 160,240 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Hoodie Front Main Body */}
              <path d="M 168,260 L 232,260 L 236,310 C 236,325 164,325 164,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Pocket pouch */}
              <path d="M 180,290 L 220,290 L 225,310 L 175,310 Z" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Hoodie strings */}
              <line x1="193" y1="262" x2="191" y2="285" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="207" y1="262" x2="209" y2="285" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="191" cy="285" r="2.5" fill="#ffd166" />
              <circle cx="209" cy="285" r="2.5" fill="#ffd166" />
            </g>
          );
        case 'sailor':
          return (
            <g id="outfit_sailor">
              {/* Sailor shirt body */}
              <path d="M 170,258 L 230,258 L 234,310 L 166,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Sailor Collar */}
              <polygon points="170,258 230,258 220,282 200,290 180,282" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" />
              {/* Sailor Red Scarf Tie */}
              <polygon points="194,286 206,286 200,305" fill="#e63946" stroke="#1f1f1f" strokeWidth="2" />
              <circle cx="200" cy="287" r="3.5" fill="#e63946" />
            </g>
          );
        case 'shirt':
          return (
            <g id="outfit_shirt">
              {/* Elegant formal shirt */}
              <path d="M 170,258 L 230,258 L 234,310 L 166,310 Z" fill="#ffffff" stroke="#1f1f1f" strokeWidth="3" />
              {/* Dark suit jacket over shoulder sides */}
              <path d="M 170,258 L 185,258 L 188,310 L 166,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="2.5" />
              <path d="M 230,258 L 215,258 L 212,310 L 234,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="2.5" />
              {/* Left / Right shirt collars */}
              <polygon points="188,258 200,272 200,258" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2" />
              <polygon points="212,258 200,272 200,258" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2" />
              {/* Business Tie */}
              <polygon points="197,272 203,272 200,298" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2" />
            </g>
          );
        case 'sweater':
          return (
            <g id="outfit_sweater">
              {/* Comfy knitted sweater */}
              <path d="M 166,258 C 172,250 228,250 234,258 L 236,312 C 236,322 164,322 164,312 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Knitted stitch textures (v shapes) */}
              <g stroke={clothesColor2} strokeWidth="2" opacity="0.6" strokeLinecap="round" fill="none">
                <path d="M 185,270 L 190,275 L 195,270" />
                <path d="M 205,270 L 210,275 L 215,270" />
                <path d="M 185,290 L 190,295 L 195,290" />
                <path d="M 205,290 L 210,295 L 215,290" />
              </g>
              {/* Thick soft round crewneck collar */}
              <path d="M 182,258 Q 200,268 218,258" fill="none" stroke="#1f1f1f" strokeWidth="4" strokeLinecap="round" />
            </g>
          );
        case 'gothic':
          return (
            <g id="outfit_gothic">
              {/* Frilly gothic dark dress blouse */}
              <path d="M 168,258 L 232,258 L 235,310 L 165,310 Z" fill="#1d1d1f" stroke="#1f1f1f" strokeWidth="3" />
              {/* Lacy white corset bib */}
              <polygon points="185,258 215,258 210,292 190,292" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2.5" />
              {/* Ribbon cross lacing */}
              <g stroke="#d90429" strokeWidth="1.5">
                <line x1="192" y1="264" x2="208" y2="280" />
                <line x1="208" y1="264" x2="192" y2="280" />
              </g>
              {/* Big cute ribbon tie at waist/chest */}
              <circle cx="200" cy="287" r="4.5" fill="#d90429" />
              <path d="M 191,280 Q 200,287 195,296" fill="none" stroke="#d90429" strokeWidth="2.5" />
              <path d="M 209,280 Q 200,287 205,296" fill="none" stroke="#d90429" strokeWidth="2.5" />
            </g>
          );
        case 'tshirt':
          return (
            <g id="outfit_tshirt">
              {/* Simple casual sportswear t-shirt */}
              <path d="M 170,258 L 230,258 L 234,310 L 166,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Graphic design print on shirt */}
              <polygon points="200,270 208,284 192,284" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="1" />
              <circle cx="200" cy="287" r="4" fill="#ffd166" />
              {/* V collar trim */}
              <polygon points="186,258 200,268 214,258" fill={skinColor} stroke="#1f1f1f" strokeWidth="2.5" />
            </g>
          );
        case 'kimono':
          return (
            <g id="outfit_kimono">
              {/* Wrap-around traditional kimono */}
              <path d="M 168,258 L 232,258 L 236,310 L 164,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Cross collars and sash */}
              <line x1="175" y1="258" x2="200" y2="292" stroke="#1f1f1f" strokeWidth="3" />
              <line x1="225" y1="258" x2="200" y2="292" stroke="#1f1f1f" strokeWidth="3" />
              <rect x="165" y="288" width="70" height="15" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" />
              <circle cx="200" cy="295" r="4.5" fill="#ffd166" stroke="#1f1f1f" strokeWidth="1.5" />
            </g>
          );
        case 'armor':
          return (
            <g id="outfit_armor">
              {/* Heavy iron plate protector */}
              <path d="M 168,258 L 232,258 L 235,310 L 165,310 Z" fill="#cfdbd5" stroke="#1f1f1f" strokeWidth="3" />
              {/* Golden layout accents */}
              <polygon points="200,264 212,284 188,284" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="1.5" />
              <line x1="200" y1="284" x2="200" y2="308" stroke="#1f1f1f" strokeWidth="2.5" />
              <path d="M 164,258 Q 185,248 185,268" fill="none" stroke={clothesColor2} strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 236,258 Q 215,248 215,268" fill="none" stroke={clothesColor2} strokeWidth="4.5" strokeLinecap="round" />
            </g>
          );
        case 'maid':
          return (
            <g id="outfit_maid">
              {/* White-frill tea service maid */}
              <path d="M 168,258 L 232,258 L 235,310 L 165,310 Z" fill="#1b1c1e" stroke="#1f1f1f" strokeWidth="3" />
              <path d="M 184,258 C 184,285 216,285 216,258 Z" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2" />
              <circle cx="200" cy="264" r="3.5" fill={clothesColor1} />
              <polygon points="194,261 198,264 194,267" fill={clothesColor1} />
              <polygon points="206,261 202,264 206,267" fill={clothesColor1} />
              <line x1="184" y1="258" x2="190" y2="284" stroke="#1f1f1f" strokeWidth="2" />
              <line x1="216" y1="258" x2="210" y2="284" stroke="#1f1f1f" strokeWidth="2" />
            </g>
          );
        case 'party_suit':
          return (
            <g id="outfit_party_suit">
              {/* Formal high class tuxedo vest */}
              <path d="M 168,258 L 232,258 L 235,310 L 165,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              <polygon points="185,258 215,258 200,285" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2" />
              <polygon points="194,262 200,266 194,270" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="1.5" />
              <polygon points="206,262 200,266 206,270" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="1.5" />
              <circle cx="200" cy="266" r="3" fill={clothesColor2} />
              <circle cx="200" cy="290" r="2.5" fill="#ffd166" />
              <circle cx="200" cy="300" r="2.5" fill="#ffd166" />
            </g>
          );
        case 'none':
        default:
          return null;
      }
    };

    const renderBottom = () => {
      // Bottom goes from waist (310) down to legs line (335)
      switch (bottomStyle) {
        case 'skirt':
          return (
            <g id="outfit_skirt">
              {/* Flaring cute pleated skirt */}
              <path d="M 166,310 Q 200,312 234,310 L 244,336 C 244,336 200,342 156,336 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" strokeLinejoin="round" />
              {/* Pleats styling stripes */}
              <g stroke={clothesColor2} strokeWidth="2" strokeLinecap="round">
                <line x1="180" y1="311" x2="175" y2="335" />
                <line x1="200" y1="311" x2="200" y2="337" />
                <line x1="220" y1="311" x2="225" y2="335" />
              </g>
            </g>
          );
        case 'pants':
          return (
            <g id="outfit_pants">
              {/* Comfy casual folded leg pants */}
              <path d="M 166,310 L 234,310 L 234,337 L 214,337 L 200,318 L 186,337 L 166,337 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" strokeLinejoin="round" />
              {/* Belts straps details */}
              <rect x="190" y="310" width="20" height="5" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="1" />
            </g>
          );
        case 'shorts':
          return (
            <g id="outfit_shorts">
              {/* Active hot pants */}
              <path d="M 167,310 L 233,310 L 233,326 L 210,326 L 200,317 L 190,326 L 167,326 Z" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="3" strokeLinejoin="round" />
            </g>
          );
        case 'dress_extension':
          return (
            <g id="outfit_dress_extension">
              {/* Long bridal or classy evening gown flow */}
              <path d="M 166,310 Q 200,313 234,310 L 253,350 C 253,350 200,360 147,350 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" strokeLinejoin="round" />
              {/* Lace trim along bottom */}
              <path d="M 147,350 Q 160,354 173,350 Q 186,354 200,350 Q 213,354 226,350 Q 239,354 253,350" fill="none" stroke="#ffffff" strokeWidth="3" />
            </g>
          );
        case 'mermaid':
          return (
            <g id="outfit_mermaid">
              {/* Coiling fish/mermaid tail from waist downwards */}
              <path d="M 166,310 Q 200,314 234,310 C 238,335 220,365 200,378 C 180,365 162,335 166,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Scale marks */}
              <path d="M 185,330 Q 193,334 200,330 Q 207,334 215,330" fill="none" stroke={clothesColor2} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 190,346 Q 200,350 210,346" fill="none" stroke={clothesColor2} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              {/* Beautiful fanning wide fin tail */}
              <path d="M 200,375 Q 170,396 160,392 C 175,380 195,378 200,375 Q 230,396 240,392 C 225,380 205,378 200,375 Z" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" />
            </g>
          );
        case 'magical_dress':
          return (
            <g id="outfit_magical_dress">
              {/* Super puffy magical girl balloon dress skirt */}
              <path d="M 166,310 C 140,320 135,350 155,355 C 180,360 220,360 245,355 C 265,350 260,320 234,310 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Lace lining layer */}
              <path d="M 153,353 Q 200,362 247,353 Z" fill="none" stroke="#ffffff" strokeWidth="4.5" />
              <polygon points="200,314 206,325 194,325" fill="#ffd166" stroke="#1f1f1f" strokeWidth="1" />
              <circle cx="200" cy="326" r="2.5" fill="#ffd166" />
            </g>
          );
        case 'frills':
          return (
            <g id="outfit_frills">
              {/* Layer 1 (Upper) */}
              <path d="M 168,310 Q 200,313 232,310 L 238,326 Q 200,332 162,326 Z" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3" />
              {/* Layer 2 (Middle) */}
              <path d="M 160,324 Q 200,331 240,324 L 246,340 Q 200,348 154,340 Z" fill={clothesColor2} stroke="#1f1f1f" strokeWidth="2.5" />
              {/* Layer 3 (Lower white petticoat) */}
              <path d="M 152,338 Q 200,346 248,338 L 253,348 Q 200,356 147,348 Z" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2" />
            </g>
          );
        case 'none':
        default:
          return null;
      }
    };

    return (
      <g id="clothing_assembly">
        {renderTop()}
        {renderBottom()}
      </g>
    );
  };

  // Render Base Chibi Body, head, blush
  const renderBaseBodyHead = () => {
    const isSpecialLegsOff = gender === 'baby_suit' || bottomStyle === 'mermaid';

    return (
      <g id="chibi_physical_body">
        {/* Legs and Shoes (Foot base aligned around Y=340-350) */}
        {!isSpecialLegsOff && (
          <g id="chibi_legs_shoes">
            {gender === 'slender' ? (
              <>
                {/* Left Leg - slender */}
                <rect x="176" y="323" width="12" height="25" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="182" cy="349" rx="8" ry="6.5" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
                {/* Right Leg - slender */}
                <rect x="212" y="323" width="12" height="25" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="218" cy="349" rx="8" ry="6.5" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
              </>
            ) : gender === 'chubby' ? (
              <>
                {/* Left Leg - chubby */}
                <rect x="172" y="325" width="18" height="16" rx="4" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="181" cy="343" rx="11" ry="8" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
                {/* Right Leg - chubby */}
                <rect x="210" y="325" width="18" height="16" rx="4" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="219" cy="343" rx="11" ry="8" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
              </>
            ) : gender === 'muscular' ? (
              <>
                {/* Left Leg - muscular/athletic */}
                <path d="M 172,325 L 189,325 L 187,346 L 174,346 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="181" cy="347" rx="8.5" ry="6.5" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
                {/* Right Leg - muscular/athletic */}
                <path d="M 211,325 L 228,325 L 226,346 L 213,346 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="219" cy="347" rx="8.5" ry="6.5" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
              </>
            ) : (
              <>
                {/* Left Leg - base standard */}
                <rect x="175" y="325" width="14" height="20" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="182" cy="346" rx="9" ry="7" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
                {/* Right Leg - base standard */}
                <rect x="211" y="325" width="14" height="20" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <ellipse cx="218" cy="346" rx="9" ry="7" fill={shoesColor} stroke="#2b2b2b" strokeWidth="3" />
              </>
            )}
          </g>
        )}

        {/* Baby costume special fat legs/suit feet */}
        {gender === 'baby_suit' && (
          <g id="chibi_baby_suit_legs">
            {/* Lower pajama onesie curves */}
            <path d="M 165,310 L 235,310 L 238,340 C 238,352 208,352 202,338 C 196,352 162,352 162,340 Z" fill={clothesColor1} stroke="#2b2b2b" strokeWidth="3" />
            {/* Rounded small baby boots feet */}
            <circle cx="178" cy="346" r="11" fill={shoesColor} stroke="#2b2b2b" strokeWidth="2.5" />
            <circle cx="222" cy="346" r="11" fill={shoesColor} stroke="#2b2b2b" strokeWidth="2.5" />
            {/* Pajama tummy patch */}
            <ellipse cx="200" cy="295" rx="20" ry="16" fill="#ffffff" opacity="0.9" />
            <circle cx="200" cy="290" r="3" fill="#ef476f" />
            <circle cx="200" cy="301" r="3" fill="#ef476f" />
          </g>
        )}

        {/* Torso outlines based on selection */}
        {gender !== 'baby_suit' && (
          <>
            {gender === 'muscular' ? (
              <g id="muscular_torso">
                <path d="M 170,260 L 230,260 L 218,325 L 182,325 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                {/* Muscle shadow sketches */}
                <path d="M 190,278 Q 200,283 210,278" fill="none" stroke="#2b2b2b" strokeWidth="1.5" opacity="0.35" />
                <path d="M 192,298 Q 200,302 208,298" fill="none" stroke="#2b2b2b" strokeWidth="1.5" opacity="0.35" />
                <line x1="200" y1="270" x2="200" y2="315" stroke="#2b2b2b" strokeWidth="1.5" opacity="0.25" />
              </g>
            ) : gender === 'chubby' ? (
              <g id="chubby_torso">
                <path d="M 175,260 C 160,285 170,325 180,325 L 220,325 C 230,325 240,285 225,260 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                {/* Chubby belly curve line */}
                <path d="M 186,305 Q 200,314 214,305" fill="none" stroke="#2b2b2b" strokeWidth="1.5" opacity="0.4" />
              </g>
            ) : gender === 'slender' ? (
              <path d="M 178,260 L 222,260 L 216,325 L 184,325 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" id="torso" />
            ) : (
              <path d="M 175,260 L 225,260 L 220,325 L 180,325 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" id="torso" />
            )}
          </>
        )}

        {/* Render Hands based on pose selection */}
        {renderLeftArm()}
        {renderRightArm()}

        {/* Neck connector */}
        <rect x="188" y="222" width="24" height="42" fill={skinColor} stroke="#2b2b2b" strokeWidth="2.5" />

        {/* HEAD BASE SHAPE WITH CHUBBY CHEEKS */}
        <g id="chibi_head">
          {/* Left / Right ears based on earStyle */}
          <g id="ears">
            {earStyle === 'elf' ? (
              <>
                {/* Pointy Elf Ears */}
                <path d="M 124,180 C 114,180 96,168 98,154 C 100,144 116,158 124,166 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 121,173 C 116,172 106,165 107,159" fill="none" stroke="#ffcad4" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                <path d="M 276,180 C 286,180 304,168 302,154 C 300,144 284,158 276,166 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 279,173 C 284,172 294,165 293,159" fill="none" stroke="#ffcad4" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              </>
            ) : earStyle === 'cat' ? (
              <>
                {/* Horizontal furry cat ears */}
                <path d="M 125,182 C 105,185 96,170 100,158 C 104,146 118,158 125,166 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <path d="M 121,174 C 110,176 106,166 112,161 Z" fill="#ffccd5" />
                <path d="M 275,182 C 295,185 304,170 300,158 C 296,146 282,158 275,166 Z" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <path d="M 279,174 C 290,178 294,166 288,161 Z" fill="#ffccd5" />
              </>
            ) : earStyle === 'bear' ? (
              <>
                {/* Round Bear Ears */}
                <circle cx="118" cy="172" r="15" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <circle cx="118" cy="172" r="8" fill="#ffccd5" />
                <circle cx="282" cy="172" r="15" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <circle cx="282" cy="172" r="8" fill="#ffccd5" />
              </>
            ) : earStyle === 'none' ? (
              null
            ) : (
              <>
                {/* Human standard round ears */}
                <circle cx="122" cy="172" r="14" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <circle cx="123" cy="172" r="7" fill="#ffcad4" opacity="0.4" />
                <circle cx="278" cy="172" r="14" fill={skinColor} stroke="#2b2b2b" strokeWidth="3" />
                <circle cx="277" cy="172" r="7" fill="#ffcad4" opacity="0.4" />
              </>
            )}
          </g>

          {/* Chubby Head Outline rendered dynamically based on faceShape */}
          {faceShape === 'chubby' ? (
            <path d="M 125,160 C 120,85 280,85 275,160 C 285,212 255,236 200,236 C 145,236 115,212 125,160 Z" fill={skinColor} stroke="#1f1f1f" strokeWidth="3.5" />
          ) : faceShape === 'pointed' ? (
            <path d="M 125,160 C 120,85 280,85 275,160 C 275,200 230,227 200,231 C 170,227 125,200 125,160 Z" fill={skinColor} stroke="#1f1f1f" strokeWidth="3.5" />
          ) : faceShape === 'square' ? (
            <path d="M 125,160 C 120,85 280,85 275,160 C 275,195 235,218 200,220 C 165,218 125,195 125,160 Z" fill={skinColor} stroke="#1f1f1f" strokeWidth="3.5" />
          ) : (
            <path d="M 125,160 C 120,85 280,85 275,160 C 275,205 245,225 200,225 C 155,225 125,205 125,160 Z" fill={skinColor} stroke="#1f1f1f" strokeWidth="3.5" />
          )}
          
          {/* Cheek Blush */}
          <g id="blush_effects">
            <ellipse cx="146" cy="194" rx="14" ry="6" fill="#ff4d6d" opacity={0.35 * blushIntensity} />
            <ellipse cx="254" cy="194" rx="14" ry="6" fill="#ff4d6d" opacity={0.35 * blushIntensity} />
            {/* Cute anime diagonal blush lines */}
            {blushIntensity > 0.4 && (
              <g stroke="#ff4d6d" strokeWidth="1.5" strokeLinecap="round" opacity={blushIntensity}>
                <line x1="140" y1="196" x2="144" y2="191" />
                <line x1="145" y1="196" x2="149" y2="191" />
                <line x1="150" y1="196" x2="154" y2="191" />

                <line x1="246" y1="196" x2="250" y2="191" />
                <line x1="251" y1="196" x2="255" y2="191" />
                <line x1="256" y1="196" x2="260" y2="191" />
              </g>
            )}
          </g>
        </g>
      </g>
    );
  };

  // Background Designs
  const renderBackground = () => {
    switch (bgStyle) {
      case 'solid':
        return <rect width="400" height="400" fill={bgColor1} rx="30" />;
      case 'circles':
        return (
          <g id="bg_circles">
            <rect width="400" height="400" fill={bgColor1} rx="30" />
            <circle cx="200" cy="200" r="140" fill={bgColor2} opacity="0.4" />
            <circle cx="200" cy="200" r="90" fill={bgColor1} opacity="0.25" />
            <circle cx="80" cy="80" r="30" fill={bgColor2} opacity="0.3" />
            <circle cx="320" cy="320" r="45" fill={bgColor2} opacity="0.3" />
          </g>
        );
      case 'stars':
        return (
          <g id="bg_stars">
            <rect width="400" height="400" fill={bgColor1} rx="30" />
            {/* Sparkly stars scattered helper */}
            <path d="M 60,60 L 65,50 L 70,60 L 80,65 L 70,70 L 65,80 L 60,70 L 50,65 Z" fill={bgColor2} opacity="0.5" />
            <path d="M 320,80 L 323,73 L 330,70 L 323,67 L 320,60 L 317,67 L 310,70 L 317,73 Z" fill={bgColor2} opacity="0.4" />
            <path d="M 80,300 L 84,290 L 92,286 L 84,282 L 80,272 L 76,282 L 68,286 L 76,290 Z" fill={bgColor2} opacity="0.5" />
            <path d="M 330,280 L 336,268 L 348,262 L 336,256 L 330,244 L 324,256 L 312,262 L 324,268 Z" fill={bgColor2} opacity="0.6" />
            {/* Big cute background crescent moon or bubble */}
            <circle cx="200" cy="200" r="130" fill="none" stroke={bgColor2} strokeWidth="8" strokeDasharray="15,10" opacity="0.3" />
          </g>
        );
      case 'hearts':
        return (
          <g id="bg_hearts">
            <rect width="400" height="400" fill={bgColor1} rx="30" />
            <g fill={bgColor2} opacity="0.35">
              {/* Double hearts layout */}
              <path d="M 120,120 C 100,100 80,110 80,130 C 80,150 120,180 120,180 C 120,180 160,150 160,130 C 160,110 140,100 120,120 Z" transform="scale(0.8) translate(50, 40)" />
              <path d="M 120,120 C 100,100 80,110 80,130 C 80,150 120,180 120,180 C 120,180 160,150 160,130 C 160,110 140,100 120,120 Z" transform="scale(0.6) translate(400, 150)" />
              <path d="M 120,120 C 100,100 80,110 80,130 C 80,150 120,180 120,180 C 120,180 160,150 160,130 C 160,110 140,100 120,120 Z" transform="scale(0.9) translate(150, 240)" opacity="0.7" />
            </g>
          </g>
        );
      case 'grid':
        return (
          <g id="bg_grid">
            <rect width="400" height="400" fill={bgColor1} rx="30" />
            <g stroke={bgColor2} strokeWidth="1.5" opacity="0.25">
              <line x1="40" y1="0" x2="40" y2="400" />
              <line x1="80" y1="0" x2="80" y2="400" />
              <line x1="120" y1="0" x2="120" y2="400" />
              <line x1="160" y1="0" x2="160" y2="400" />
              <line x1="200" y1="0" x2="200" y2="400" />
              <line x1="240" y1="0" x2="240" y2="400" />
              <line x1="280" y1="0" x2="280" y2="400" />
              <line x1="320" y1="0" x2="320" y2="400" />
              <line x1="360" y1="0" x2="360" y2="400" />
              
              <line x1="0" y1="40" x2="400" y2="40" />
              <line x1="0" y1="80" x2="400" y2="80" />
              <line x1="0" y1="120" x2="400" y2="120" />
              <line x1="0" y1="160" x2="400" y2="160" />
              <line x1="0" y1="200" x2="400" y2="200" />
              <line x1="0" y1="240" x2="400" y2="240" />
              <line x1="0" y1="280" x2="400" y2="280" />
              <line x1="0" y1="320" x2="400" y2="320" />
              <line x1="0" y1="360" x2="400" y2="360" />
            </g>
          </g>
        );
      case 'none':
      default:
        return <rect width="400" height="400" fill="transparent" rx="30" />;
    }
  };

  const renderBackItem = () => {
    switch (backItem) {
      case 'angel_wings':
        return (
          <g id="back_angel_wings" fill="#ffffff" stroke="#1f1f1f" strokeWidth="3.5" strokeLinejoin="round">
            {/* Left wing */}
            <path d="M 180,260 C 140,240 100,200 70,225 C 50,242 60,270 85,275 C 65,280 50,295 65,310 C 80,320 120,310 160,285" />
            <path d="M 98,245 C 88,255 85,268 95,272" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
            {/* Right wing */}
            <path d="M 220,260 C 260,240 300,200 330,225 C 350,242 340,270 315,275 C 335,280 350,295 335,310 C 320,320 280,310 240,285" />
            <path d="M 302,245 C 312,255 315,268 305,272" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'demon_wings':
        return (
          <g id="back_demon_wings" fill="#3a0ca3" stroke="#1f1f1f" strokeWidth="3.5">
            {/* Left dragon/demon wing */}
            <path d="M 180,265 C 130,230 90,210 65,240 L 70,268 L 50,280 L 80,295 L 60,315 C 100,315 140,300 170,280" />
            {/* Inner wings spine detailing */}
            <path d="M 65,240 Q 110,260 170,280" fill="none" stroke="#ffd166" strokeWidth="2.5" />
            {/* Right dragon/demon wing */}
            <path d="M 220,265 C 270,230 310,210 335,240 L 330,268 L 350,280 L 320,295 L 340,315 C 300,315 260,300 230,280" />
            <path d="M 335,240 Q 290,260 230,280" fill="none" stroke="#ffd166" strokeWidth="2.5" />
          </g>
        );
      case 'butterfly_wings':
        return (
          <g id="back_butterfly_wings" fill="#ff7096" stroke="#1f1f1f" strokeWidth="3.5" opacity="0.9">
            {/* Left Butterfly Wings */}
            <path d="M 180,265 C 130,220 75,200 65,245 C 55,290 120,310 170,280 C 120,315 85,320 80,345 C 75,370 125,370 175,300 Z" fill="#ff85a1" />
            <circle cx="95" cy="245" r="8" fill="#ffd166" />
            <circle cx="115" cy="315" r="5" fill="#ffd166" />
            {/* Right Butterfly Wings */}
            <path d="M 220,265 C 270,220 325,200 335,245 C 345,290 280,310 230,280 C 280,315 315,320 320,345 C 325,370 275,370 225,300 Z" fill="#ff85a1" />
            <circle cx="305" cy="245" r="8" fill="#ffd166" />
            <circle cx="285" cy="315" r="5" fill="#ffd166" />
          </g>
        );
      case 'cape':
        return (
          <g id="back_cape" fill={clothesColor1} stroke="#1f1f1f" strokeWidth="3.5">
            {/* Flowing cape behind shoulder levels */}
            <path d="M 165,255 C 145,290 120,340 115,365 C 145,375 255,375 285,365 C 280,340 255,290 235,255 Z" strokeLinejoin="round" />
            <path d="M 175,255 Q 200,268 225,255" fill="none" stroke={clothesColor2} strokeWidth="4" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  const renderTailStyle = () => {
    switch (tailStyle) {
      case 'cat_tail':
        return (
          <g id="tail_cat" stroke="#1f1f1f" strokeWidth="3" fill="none">
            {/* Adorable s-curve furry cat tail */}
            <path d="M 215,315 C 240,315 270,290 260,250 C 255,230 230,240 235,225" stroke={hairColor} strokeWidth="12" strokeLinecap="round" />
            <path d="M 235,225 Q 235,217 238,216" stroke={clothesColor2} strokeWidth="10" strokeLinecap="round" />
          </g>
        );
      case 'devil_tail':
        return (
          <g id="tail_devil" fill="#d90429" stroke="#1f1f1f" strokeWidth="2.5">
            {/* Devil dynamic tail with pointed arrow tip */}
            <path d="M 215,315 Q 255,320 255,280 T 280,285" fill="none" stroke="#d90429" strokeWidth="3.5" strokeLinecap="round" />
            {/* Pointy tip arrowhead */}
            <polygon points="280,285 276,274 292,282 284,295" />
          </g>
        );
      case 'bunny_tail':
        return (
          <g id="tail_bunny" fill="#ffffff" stroke="#1f1f1f" strokeWidth="3">
            {/* Fluffy round cotton tail */}
            <circle cx="225" cy="324" r="12" fill="#ffffff" />
            <circle cx="222" cy="320" r="10" fill={hairColor} opacity="0.3" />
          </g>
        );
      case 'fox_tail':
        return (
          <g id="tail_fox" stroke="#1f1f1f" strokeWidth="3" fill="#f77f00">
            {/* Huge majestic fluffy fox tail */}
            <path d="M 215,315 C 245,315 285,320 290,270 C 295,240 265,220 255,260 Z" strokeLinejoin="round" />
            {/* White tip */}
            <path d="M 265,220 C 260,230 255,245 255,260 C 263,264 275,255 290,270" fill="#ffffff" stroke="#1f1f1f" strokeWidth="2.5" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  const renderFaceAccessory = () => {
    switch (faceAccessory) {
      case 'whiskers':
        return (
          <g stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" id="acc_whiskers">
            {/* Left whiskers */}
            <line x1="145" y1="194" x2="133" y2="190" />
            <line x1="144" y1="200" x2="132" y2="201" />
            {/* Right whiskers */}
            <line x1="255" y1="194" x2="267" y2="190" />
            <line x1="256" y1="200" x2="268" y2="201" />
          </g>
        );
      case 'band_aid':
        return (
          <g id="acc_band_aid">
            <rect x="186" y={noseY - 5} width="28" height="9" rx="2.5" fill="#ffe5b4" stroke="#1f1f1f" strokeWidth="2.2" transform={`rotate(-6, 200, ${noseY})`} />
            <rect x="196" y={noseY - 4.5} width="8" height="8" fill="#ffd166" opacity="0.8" transform={`rotate(-6, 200, ${noseY})`} />
          </g>
        );
      case 'freckles':
        return (
          <g fill="#bf815c" id="acc_freckles" opacity="0.85">
            <circle cx="140" cy="192" r="1.5" />
            <circle cx="145" cy="195" r="1.1" />
            <circle cx="149" cy="191" r="1.3" />
            <circle cx="260" cy="192" r="1.5" />
            <circle cx="255" cy="195" r="1.1" />
            <circle cx="251" cy="191" r="1.3" />
          </g>
        );
      case 'star_cheek':
        return (
          <g fill="#ffd166" stroke="#1f1f1f" strokeWidth="1.5" id="acc_star_cheek">
            {/* Left Cheek Star */}
            <path d="M 142,194 L 144,188 L 146,194 L 152,194 L 147,198 L 149,204 L 144,200 L 139,204 L 141,198 L 136,194 Z" transform="scale(0.8) translate(30, 40)" />
            {/* Right Cheek Star */}
            <path d="M 252,194 L 254,188 L 256,194 L 262,194 L 257,198 L 259,204 L 254,200 L 249,204 L 251,198 L 246,194 Z" transform="scale(0.8) translate(66, 40)" />
          </g>
        );
      case 'blush_heart':
        return (
          <g fill="#ff4d6d" stroke="#1f1f1f" strokeWidth="1.2" id="acc_blush_heart">
            {/* Left cheek heart */}
            <path d="M 144,196 C 141,192 137,193 137,196 C 137,199 144,203 144,203 C 144,203 151,199 151,196 C 151,193 147,192 144,196 Z" />
            {/* Right cheek heart */}
            <path d="M 256,196 C 253,192 249,193 249,196 C 249,199 256,203 256,203 C 256,203 263,199 263,196 C 263,193 259,192 256,196 Z" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <svg
      id="chibi-vector-svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={`${className} overflow-hidden select-none`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Background layer */}
      {renderBackground()}

      {/* 1.5 Back item layer (wings/capes) */}
      {renderBackItem()}

      {/* 1.6 Tail item layer */}
      {renderTailStyle()}

      {/* 2. Back hair layer (behind body/head) */}
      {renderBackHair()}

      {/* 3. Base body & Head outline layer */}
      {renderBaseBodyHead()}

      {/* 3.5 Face accessories cheek stickers/bandage */}
      {renderFaceAccessory()}

      {/* 4. Eyes & expression overlays */}
      {renderEyes()}
      {renderEyebrows()}

      {/* 5. Nose & Mouth overlay */}
      {renderNose()}
      {renderMouth()}

      {/* 6. Front Bangs layer (rests over cheeks/forehead) */}
      {renderBangs()}

      {/* 7. Clothing layer (renders over torso/legs) */}
      {renderOutfit()}

      {/* 8. Eyewear layer */}
      {renderEyewear()}

      {/* 9. Headwear layer */}
      {renderHeadwear()}

      {/* 10. Hand held items layer */}
      {renderHandItem()}
    </svg>
  );
};
