import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Character, CharacterCommand, AnimationSpeed } from '../../types';

interface CharacterAvatarProps {
  character: Character;
  command: CharacterCommand;
  speed: AnimationSpeed;
}

const SPEED_MAP: Record<AnimationSpeed, number> = {
  slow: 1.4,
  normal: 1.0,
  fast: 0.65,
};

// Map character ID to sprite filename prefix
function getCharacterPrefix(characterId: string): string {
  const map: Record<string, string> = {
    'girl-1': 'leyla',
    'girl-2': 'amara',
    'girl-3': 'mei',
    'girl-4': 'zara',
    'boy-1': 'tom',
    'boy-2': 'leo',
    'boy-3': 'ali',
    'boy-4': 'murad',
  };
  return map[characterId] || 'leyla';
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ character, command, speed }) => {
  const duration = SPEED_MAP[speed];
  const prefix = getCharacterPrefix(character.id);
  const [imgFallbackLevel, setImgFallbackLevel] = useState(0);

  useEffect(() => {
    setImgFallbackLevel(0);
  }, [character.id, command]);

  const handleImgError = () => {
    setImgFallbackLevel((prev) => prev + 1);
  };

  // Select 3D rendered sprite pose based on the active command
  const poseType = useMemo(() => {
    switch (command) {
      case 'jump':
      case 'stretch':
      case 'slide':
        return 'jumping';
      case 'laugh':
      case 'dance':
      case 'clap':
      case 'surprised':
        return 'laugh';
      case 'cry':
        return 'cry';
      case 'playInstrument':
      case 'sing':
        return 'playInstrument';
      case 'wave':
      case 'point':
      case 'talk':
      case 'hug':
      case 'holdHands':
      case 'nod':
      case 'shakeHead':
      case 'lightMatch':
      case 'waterPlant':
        return 'waving';
      case 'sit':
      case 'sleep':
      case 'read':
      case 'write':
      case 'draw':
      case 'paint':
      case 'cut':
      case 'build':
      case 'playToy':
        return 'sitting';
      case 'run':
      case 'rideBike':
      case 'walk':
      case 'bring':
      case 'takeAway':
      case 'carry':
      case 'pull':
        return 'running';
      case 'stand':
      case 'walkForward':
      case 'walkBackward':
      case 'moveLeft':
      case 'moveRight':
      case 'spin':
      case 'stop':
      case 'idle':
      case 'think':
      case 'count':
      case 'eat':
      case 'drink':
      case 'wakeUp':
      case 'bathe':
      case 'wash':
      case 'comb':
      case 'dress':
      case 'openDoor':
      case 'closeDoor':
      case 'putAway':
      case 'collect':
      case 'clean':
      case 'help':
      case 'scatter':
      default:
        return 'standing';
    }
  }, [command]);

  // 3-Level Robust Action Sprite Loader:
  // Level 0: Dedicated command sprite (/assets/characters/${prefix}_${command}.png)
  // Level 1: Base pose sprite (/assets/characters/${prefix}_${poseType}.png)
  // Level 2: Safe standing fallback (/assets/characters/${prefix}_standing.png)
  const poseImage = useMemo(() => {
    if (imgFallbackLevel === 0) {
      return `/assets/characters/${prefix}_${command}.png`;
    }
    if (imgFallbackLevel === 1) {
      return `/assets/characters/${prefix}_${poseType}.png`;
    }
    return `/assets/characters/${prefix}_standing.png`;
  }, [prefix, command, poseType, imgFallbackLevel]);

  // Motion variants for natural human physics
  const motionConfig = useMemo(() => {
    switch (command) {
      case 'jump':
        return {
          animate: {
            y: [0, -115, -135, -115, 0, 8, 0],
            scaleY: [1, 0.88, 1.12, 1.06, 0.92, 1.02, 1],
            scaleX: [1, 1.08, 0.92, 0.96, 1.08, 0.99, 1],
          },
          transition: {
            duration: duration * 1.1,
            times: [0, 0.2, 0.45, 0.65, 0.85, 0.93, 1],
            ease: 'easeInOut',
          },
          shadowAnimate: {
            scaleX: [1, 0.55, 0.35, 0.55, 1.25, 1],
            opacity: [0.65, 0.25, 0.12, 0.25, 0.75, 0.65],
          },
        };

      case 'wave':
        return {
          animate: {
            rotate: [0, 1.5, -1.5, 1.5, -1, 0],
            y: [0, -3, 0, -3, 0],
          },
          transition: {
            duration: duration * 1.0,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'sit':
        return {
          animate: {
            y: 38,
            scaleY: 0.96,
            scaleX: 1.02,
          },
          transition: {
            duration: duration * 0.7,
            ease: [0.34, 1.56, 0.64, 1],
          },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'stand':
        return {
          animate: {
            y: [38, -8, 0],
            scaleY: [0.96, 1.05, 1],
            scaleX: [1.02, 0.98, 1],
          },
          transition: {
            duration: duration * 0.75,
            ease: 'easeOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'run':
        return {
          animate: {
            x: [-60, 60, -60],
            y: [0, -14, 0, -14, 0],
            rotate: [2, -2, 2],
          },
          transition: {
            duration: duration * 1.6,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: {
            scaleX: [0.9, 1.1, 0.9],
            opacity: [0.6, 0.7, 0.6],
          },
        };

      case 'walkForward':
        return {
          animate: {
            y: [0, 42],
            scale: [1, 1.15],
          },
          transition: {
            duration: duration * 1.2,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: 1.15, opacity: 0.7 },
        };

      case 'walkBackward':
        return {
          animate: {
            y: [0, -36],
            scale: [1, 0.88],
          },
          transition: {
            duration: duration * 1.2,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: 0.88, opacity: 0.55 },
        };

      case 'moveLeft':
        return {
          animate: {
            x: [0, -80, -70],
            y: [0, -8, 0],
          },
          transition: {
            duration: duration * 0.9,
            ease: 'easeOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'moveRight':
        return {
          animate: {
            x: [0, 80, 70],
            y: [0, -8, 0],
          },
          transition: {
            duration: duration * 0.9,
            ease: 'easeOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'spin':
        return {
          animate: {
            rotateY: [0, 180, 360],
            y: [0, -24, 0],
          },
          transition: {
            duration: duration * 1.2,
            ease: 'easeInOut',
          },
          shadowAnimate: {
            scaleX: [1, 0.6, 1],
            opacity: [0.65, 0.35, 0.65],
          },
        };

      case 'nod':
        return {
          animate: {
            y: [0, 8, 0, 8, 0],
            scaleY: [1, 0.97, 1, 0.97, 1],
          },
          transition: {
            duration: duration * 0.9,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'shakeHead':
        return {
          animate: {
            rotate: [0, -6, 6, -5, 5, 0],
          },
          transition: {
            duration: duration * 1.0,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'clap':
        return {
          animate: {
            y: [0, -12, 0, -12, 0],
            scaleY: [1, 1.04, 0.98, 1.04, 1],
          },
          transition: {
            duration: duration * 1.0,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: {
            scaleX: [1, 0.85, 1, 0.85, 1],
            opacity: [0.65, 0.45, 0.65, 0.45, 0.65],
          },
        };

      case 'dance':
        return {
          animate: {
            rotate: [0, -8, 8, -6, 6, 0],
            x: [0, -18, 18, -12, 12, 0],
            y: [0, -14, 0, -14, 0],
          },
          transition: {
            duration: duration * 1.4,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: {
            scaleX: [1, 0.85, 1.15, 0.9, 1],
            opacity: [0.65, 0.5, 0.7, 0.55, 0.65],
          },
        };

      case 'read':
        return {
          animate: {
            y: [38, 41, 38, 41, 38],
            rotate: [0, -2, 2, -2, 0],
          },
          transition: { duration: duration * 1.8, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'write':
        return {
          animate: {
            y: [38, 40, 38],
            x: [0, 4, -4, 4, 0],
          },
          transition: { duration: duration * 1.0, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'drink':
        return {
          animate: {
            y: [0, -6, -8, -6, 0],
            rotate: [0, 2, 4, 2, 0],
          },
          transition: { duration: duration * 1.4, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'eat':
        return {
          animate: {
            y: [0, -5, 0, -5, 0],
            scaleY: [1, 1.03, 0.97, 1.03, 1],
          },
          transition: { duration: duration * 1.1, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'sleep':
        return {
          animate: {
            rotate: [0, -6, -7, -6, 0],
            y: [38, 40, 42, 40, 38],
            scaleY: [0.96, 0.98, 0.96, 0.98, 0.96],
          },
          transition: { duration: duration * 2.8, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.2, opacity: 0.75 },
        };

      case 'think':
        return {
          animate: {
            rotate: [0, 4, 5, 4, 0],
            y: [0, -4, -6, -4, 0],
          },
          transition: { duration: duration * 2.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'cry':
        return {
          animate: {
            y: [0, 8, 3, 8, 0],
            scaleY: [1, 0.96, 0.98, 0.96, 1],
          },
          transition: { duration: duration * 0.8, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.05, opacity: 0.65 },
        };

      case 'laugh':
        return {
          animate: {
            y: [0, -14, 0, -14, 0],
            rotate: [0, -3, 3, -3, 0],
            scaleY: [1, 1.05, 0.97, 1.05, 1],
          },
          transition: { duration: duration * 0.85, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 0.9, 1, 0.9, 1], opacity: 0.65 },
        };

      case 'draw':
        return {
          animate: {
            x: [0, 10, -10, 8, -8, 0],
            y: [0, -5, 5, -3, 0],
          },
          transition: { duration: duration * 1.5, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'sing':
        return {
          animate: {
            scale: [1, 1.03, 0.98, 1.03, 1],
            y: [0, -8, 0, -8, 0],
            rotate: [0, 3, -3, 3, 0],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 0.95, 1, 0.95, 1], opacity: 0.65 },
        };

      case 'stretch':
        return {
          animate: {
            scaleY: [1, 1.12, 1.15, 1.12, 1],
            scaleX: [1, 0.92, 0.9, 0.92, 1],
            y: [0, -22, -26, -22, 0],
          },
          transition: { duration: duration * 1.8, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 0.8, 0.75, 0.8, 1], opacity: [0.65, 0.45, 0.4, 0.45, 0.65] },
        };

      case 'count':
        return {
          animate: {
            y: [0, -6, 0, -6, 0],
            scale: [1, 1.02, 1, 1.02, 1],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'point':
        return {
          animate: {
            x: [0, 18, 22, 18, 0],
            rotate: [0, 2, 3, 2, 0],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'stop':
        return {
          animate: {
            x: 0,
            y: 0,
            scaleX: [1, 1.06, 0.98, 1],
          },
          transition: {
            duration: 0.4,
            ease: 'easeOut',
          },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'playInstrument':
        return {
          animate: {
            rotate: [-2.5, 2.5, -2.5],
            y: [0, -5, 0, -5, 0],
            scaleX: [1, 1.015, 1],
          },
          transition: {
            duration: duration * 1.1,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: [1, 0.95, 1], opacity: 0.65 },
        };

      case 'walk':
        return {
          animate: {
            x: [-20, 20, -20],
            y: [0, -8, 0, -8, 0],
            rotate: [1.5, -1.5, 1.5],
          },
          transition: {
            duration: duration * 1.4,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: [1, 0.9, 1, 0.9, 1], opacity: 0.65 },
        };

      case 'slide':
        return {
          animate: {
            x: [-60, 40],
            y: [-30, 25],
            rotate: [-8, 4, 0],
          },
          transition: {
            duration: duration * 1.3,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: [0.8, 1.2], opacity: [0.4, 0.75] },
        };

      case 'rideBike':
        return {
          animate: {
            x: [-40, 40, -40],
            y: [0, -6, 0, -6, 0],
            rotate: [1.5, -1.5, 1.5],
          },
          transition: {
            duration: duration * 1.5,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: [0.95, 1.05, 0.95], opacity: 0.65 },
        };

      case 'surprised':
        return {
          animate: {
            y: [0, -28, -22, -26, 0],
            scale: [1, 1.12, 1.06, 1.1, 1],
          },
          transition: {
            duration: duration * 0.9,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: { scaleX: [1, 0.8, 1], opacity: [0.65, 0.4, 0.65] },
        };

      case 'playToy':
        return {
          animate: {
            y: [38, 42, 38],
            rotate: [0, -2.5, 2.5, 0],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'wakeUp':
        return {
          animate: {
            y: [25, -18, 0],
            scaleY: [0.95, 1.08, 1],
            scaleX: [1.03, 0.95, 1],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1.1, 0.85, 1], opacity: 0.65 },
        };

      case 'bathe':
        return {
          animate: {
            y: [0, -6, 0, -6, 0],
            rotate: [-2, 2, -2],
          },
          transition: { duration: duration * 1.1, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 0.95, 1], opacity: 0.65 },
        };

      case 'wash':
        return {
          animate: {
            y: [0, -4, 0],
            rotate: [-1.5, 1.5, -1.5],
          },
          transition: { duration: duration * 0.7, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'comb':
        return {
          animate: {
            rotate: [0, 4, -2, 4, 0],
            y: [0, -4, 0],
          },
          transition: { duration: duration * 1.0, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'dress':
        return {
          animate: {
            rotateY: [0, 180, 360],
            scale: [1, 1.05, 1],
          },
          transition: { duration: duration * 1.5, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 0.7, 1], opacity: 0.65 },
        };

      case 'paint':
        return {
          animate: {
            x: [0, 14, -10, 14, 0],
            y: [0, -6, 4, -4, 0],
          },
          transition: { duration: duration * 1.4, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'cut':
        return {
          animate: {
            scale: [1, 1.03, 0.98, 1.02, 1],
            y: [38, 40, 38],
          },
          transition: { duration: duration * 0.9, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'talk':
        return {
          animate: {
            y: [0, -6, 0, -4, 0],
            rotate: [0, 2, -2, 1, 0],
          },
          transition: { duration: duration * 1.1, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'build':
        return {
          animate: {
            y: [38, 34, 40, 38],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'hug':
        return {
          animate: {
            scale: [1, 1.08, 0.96, 1.06, 1],
            y: [0, -4, 0],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 1.05, 1], opacity: 0.65 },
        };

      case 'holdHands':
        return {
          animate: {
            x: [0, 8, -8, 0],
            rotate: [-2, 2, -2],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'help':
        return {
          animate: {
            y: [0, -8, 0],
            scale: [1, 1.04, 1],
          },
          transition: { duration: duration * 1.1, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'openDoor':
        return {
          animate: {
            x: [0, 16, 0],
            rotate: [0, -3, 0],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'closeDoor':
        return {
          animate: {
            x: [0, -12, 0],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'putAway':
        return {
          animate: {
            y: [38, 44, 38],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'collect':
        return {
          animate: {
            x: [-12, 12, -12],
            y: [38, 42, 38],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1.15, opacity: 0.75 },
        };

      case 'clean':
        return {
          animate: {
            x: [-18, 18, -18],
            rotate: [-4, 4, -4],
          },
          transition: { duration: duration * 1.0, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'bring':
        return {
          animate: {
            x: [-25, 25, -25],
            y: [0, -10, 0, -10, 0],
          },
          transition: { duration: duration * 1.4, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [0.9, 1.1, 0.9], opacity: 0.65 },
        };

      case 'takeAway':
        return {
          animate: {
            x: [0, 45, 0],
            y: [0, -10, 0],
          },
          transition: { duration: duration * 1.4, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [0.9, 1.1, 0.9], opacity: 0.65 },
        };

      case 'carry':
        return {
          animate: {
            y: [0, -12, 0, -12, 0],
            rotate: [2, -2, 2],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [0.95, 1.05, 0.95], opacity: 0.65 },
        };

      case 'pull':
        return {
          animate: {
            x: [10, -25, 0],
            y: [0, -8, 0],
          },
          transition: { duration: duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'scatter':
        return {
          animate: {
            scale: [0.95, 1.12, 0.98, 1],
            rotate: [-4, 4, 0],
          },
          transition: { duration: duration * 0.9, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: [1, 1.15, 1], opacity: 0.65 },
        };

      case 'waterPlant':
        return {
          animate: {
            rotate: [0, 5, 8, 5, 0],
            y: [0, -4, 0],
          },
          transition: { duration: duration * 1.4, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'lightMatch':
        return {
          animate: {
            y: [0, -4, -2, 0],
            scale: [1, 1.02, 1],
          },
          transition: { duration: duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          shadowAnimate: { scaleX: 1, opacity: 0.65 },
        };

      case 'idle':
      default:
        return {
          animate: {
            y: [0, -3, 0],
            scaleY: [1, 1.015, 1],
          },
          transition: {
            duration: 2.8,
            repeat: Infinity,
            repeatType: 'mirror' as const,
            ease: 'easeInOut',
          },
          shadowAnimate: {
            scaleX: [1, 1.02, 1],
            opacity: [0.65, 0.68, 0.65],
          },
        };
    }
  }, [command, duration]);

  return (
    <div className="relative flex flex-col items-center justify-end select-none">
      {/* Dynamic Floor Shadow beneath character */}
      <motion.div
        className="absolute -bottom-3 w-48 sm:w-56 h-9 rounded-full bg-black/35 blur-[6px] pointer-events-none z-0"
        animate={motionConfig.shadowAnimate as any}
        transition={{ duration: 0.3 }}
      />

      {/* Main Animated 3D Character Body */}
      <motion.div
        className="relative z-10 flex flex-col items-center origin-bottom will-change-transform"
        animate={motionConfig.animate as any}
        transition={motionConfig.transition as any}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={poseImage}
            src={poseImage}
            alt={character.name}
            onError={handleImgError}
            initial={{ opacity: 0.9, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.9 }}
            transition={{ duration: 0.15 }}
            className="w-auto h-[230px] xs:h-[270px] sm:h-[340px] md:h-[420px] lg:h-[480px] max-h-[48vh] sm:max-h-[58vh] md:max-h-[68vh] object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.24)] pointer-events-none"
            draggable={false}
          />
        </AnimatePresence>



        {/* Dynamic Jump Dust / Landing FX */}
        {command === 'jump' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.6, 2.0] }}
            transition={{ duration: 0.6, delay: duration * 0.7 }}
            className="absolute bottom-0 w-36 h-6 rounded-full bg-white/40 blur-sm pointer-events-none"
          />
        )}

        
      </motion.div>
    </div>
  );
};

export default CharacterAvatar;
