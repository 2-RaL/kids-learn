// src/config/characterProfiles.ts
// Comprehensive Character Visual Profiles (Consistency Lock)
// Reused in every Gemini generation to guarantee 100% identity preservation.

export interface CharacterVisualProfile {
  characterId: string;
  prefix: string;
  name: string;
  gender: 'girl' | 'boy';
  age: string;
  faceDescription: string;
  hair: string;
  eyes: string;
  skin: string;
  bodyProportions: string;
  defaultClothes: string;
  shoeStyle: string;
  renderStyle: string;
  primaryReferencePath: string;
  portraitReferencePath: string;
  allowedOutfits: {
    sleep: string;
    bathe: string;
    paint: string;
    rideBike: string;
  };
}

export const CHARACTER_PROFILES: Record<string, CharacterVisualProfile> = {
  'girl-1': {
    characterId: 'girl-1',
    prefix: 'leyla',
    name: 'Leyla',
    gender: 'girl',
    age: '6 years old',
    faceDescription: 'Round friendly face, soft rosy cheeks, warm joyful smile, cute button nose, expressive eyebrows',
    hair: 'Long dark brown hair neatly tied in two symmetrical pigtails with vibrant red ribbons, wispy front fringe',
    eyes: 'Large expressive dark brown sparkling almond-shaped eyes with clear black pupils and white highlights',
    skin: 'Warm light peach skin tone with gentle natural subsurface scattering',
    bodyProportions: 'Cute 6-year-old child proportions, 1:4 head-to-body ratio, slightly rounded limbs, natural child anatomy',
    defaultClothes: 'Casual cozy red zippered hoodie with white drawstrings, dark indigo denim jeans',
    shoeStyle: 'Crisp white low-top child sneakers with red accents and flexible rubber soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, octane render, subsurface scattering, cinematic lighting',
    primaryReferencePath: 'public/assets/characters/leyla_standing.png',
    portraitReferencePath: 'public/assets/portraits/girl_leyla.jpg',
    allowedOutfits: {
      sleep: 'Cozy pastel pink long-sleeve cotton pajama set with tiny red strawberry patterns',
      bathe: 'Appropriate modesty child bathrobe or clean cute one-piece swim rashguard with towel',
      paint: 'Light canvas artist apron over her red hoodie with tiny colorful paint smudges',
      rideBike: 'Her default outfit with a matching glossy red children safety bicycle helmet',
    },
  },
  'girl-2': {
    characterId: 'girl-2',
    prefix: 'amara',
    name: 'Amara',
    gender: 'girl',
    age: '6 years old',
    faceDescription: 'Warm beaming smile, wide happy dimples, soft rounded jawline, energetic and bright countenance',
    hair: 'Beautiful dark curly afro puffs secured high on both sides with sunny bright yellow ribbons',
    eyes: 'Deep sparkling dark amber-brown eyes full of curiosity and radiance',
    skin: 'Rich warm deep brown skin with radiant golden undertones and realistic soft lighting',
    bodyProportions: 'Athletic and joyful 6-year-old child proportions, natural posture, healthy build',
    defaultClothes: 'Bright sunny yellow short-sleeve t-shirt with classic blue denim dungarees / overalls',
    shoeStyle: 'Cheerful bright yellow canvas sneakers with white laces and toe caps',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, cinematic soft lighting',
    primaryReferencePath: 'public/assets/characters/amara_standing.png',
    portraitReferencePath: 'public/assets/portraits/girl_amara.jpg',
    allowedOutfits: {
      sleep: 'Soft buttercup yellow cotton pajamas with tiny smiling star prints',
      bathe: 'Fluffy yellow child terrycloth bathrobe with cute hood',
      paint: 'Protective blue waterproof craft smock over yellow shirt',
      rideBike: 'Default overalls and shirt with a bright yellow safety helmet with cute star decal',
    },
  },
  'girl-3': {
    characterId: 'girl-3',
    prefix: 'mei',
    name: 'Mei',
    gender: 'girl',
    age: '6 years old',
    faceDescription: 'Delicate porcelain features, gentle crescent smiling eyes, cheerful sweet expression',
    hair: 'Glossy straight jet-black bob cut just above the shoulders, straight front bangs, two pastel pink snap clips on the right side',
    eyes: 'Warm dark brown eyes with soft curved eyelashes and gentle cheerful glint',
    skin: 'Fair porcelain skin tone with subtle natural peach blush on cheeks',
    bodyProportions: 'Slender, graceful 6-year-old child proportions, light and nimble stance',
    defaultClothes: 'Cute pastel pink knitted crewneck sweater, dark navy pleated school skirt, white knee-high socks',
    shoeStyle: 'Glossy pink mary-jane style child shoes with cushioned soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, soft depth of field',
    primaryReferencePath: 'public/assets/characters/mei_standing.png',
    portraitReferencePath: 'public/assets/portraits/girl_mei.jpg',
    allowedOutfits: {
      sleep: 'Soft lilac two-piece pajamas with cute bunny silhouette patterns',
      bathe: 'Clean pastel pink hooded bathrobe with bunny ears on the hood',
      paint: 'Translucent pink art apron over her sweater',
      rideBike: 'Pink sweater with a sleek aerodynamic pink bicycle helmet',
    },
  },
  'girl-4': {
    characterId: 'girl-4',
    prefix: 'zara',
    name: 'Zara',
    gender: 'girl',
    age: '6 years old',
    faceDescription: 'Graceful oval face, kind intelligent gaze, sweet gentle smile, poised demeanor',
    hair: 'Neatly wrapped child-friendly soft lavender/purple cotton hijab framing her cheerful face beautifully',
    eyes: 'Expressive hazel-green eyes with warm honey flecks, clear and thoughtful',
    skin: 'Warm light olive / tan skin with gentle natural lighting',
    bodyProportions: 'Poised and balanced 6-year-old child proportions, calm and confident stance',
    defaultClothes: 'Modest teal tunic with delicate embroidery along the neckline, matching teal relaxed-fit trousers',
    shoeStyle: 'Slip-on lavender sneakers with cushioned athletic soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, cinematic global illumination',
    primaryReferencePath: 'public/assets/characters/zara_standing.png',
    portraitReferencePath: 'public/assets/portraits/girl_zara.jpg',
    allowedOutfits: {
      sleep: 'Soft breathable lavender long-sleeve loungewear with cute floral embroidery',
      bathe: 'Full-coverage modest child hooded bathrobe in gentle mint green',
      paint: 'Long-sleeve teal painter smock covering clothes',
      rideBike: 'Teal tunic and trousers with an ergonomic lavender bike helmet fitted over hijab',
    },
  },
  'boy-1': {
    characterId: 'boy-1',
    prefix: 'tom',
    name: 'Tom',
    gender: 'boy',
    age: '6 years old',
    faceDescription: 'Playful grin, small dusting of light freckles across bridge of nose, cheerful bright face',
    hair: 'Messy textured sandy-blonde hair with natural side-swept cowlick strands',
    eyes: 'Bright vibrant sky-blue eyes full of enthusiasm and energy',
    skin: 'Fair sun-kissed skin tone with light rosy warmth on cheeks',
    bodyProportions: 'Energetic 6-year-old boy build, active dynamic posture, natural anatomy',
    defaultClothes: 'Royal blue hoodie with front pouch pocket, comfortable heather grey cotton jogger pants',
    shoeStyle: 'Sporty blue and white athletic running sneakers with rubber grip soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, sharp textures, volumetric light',
    primaryReferencePath: 'public/assets/characters/tom_standing.png',
    portraitReferencePath: 'public/assets/portraits/boy_tom.jpg',
    allowedOutfits: {
      sleep: 'Navy blue pajama set with tiny printed white rocket ships',
      bathe: 'Royal blue hooded child towel/bathrobe',
      paint: 'Grey craft apron with blue trim over hoodie',
      rideBike: 'Blue hoodie with an athletic blue aerodynamic bike helmet with visor',
    },
  },
  'boy-2': {
    characterId: 'boy-2',
    prefix: 'leo',
    name: 'Leo',
    gender: 'boy',
    age: '6 years old',
    faceDescription: 'Warm radiant smile, confident upbeat expression, friendly warm eyes',
    hair: 'Wavy tousled chocolate-brown hair with natural curl volume and healthy shine',
    eyes: 'Warm amber-brown eyes with joyful friendly sparkle',
    skin: 'Warm golden tan skin tone with natural sunlit highlights',
    bodyProportions: 'Sporty and sturdy 6-year-old boy proportions, athletic stance',
    defaultClothes: 'Kelly green short-sleeve athletic polo shirt with white collar stripe, khaki cargo shorts',
    shoeStyle: 'Durable green and black trail sneakers with sturdy rubber soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, realistic cloth simulation',
    primaryReferencePath: 'public/assets/characters/leo_standing.png',
    portraitReferencePath: 'public/assets/portraits/boy_leo.jpg',
    allowedOutfits: {
      sleep: 'Sage green striped soft cotton pajamas',
      bathe: 'Forest green plush child bathrobe',
      paint: 'Khaki art smock over polo',
      rideBike: 'Green athletic shirt with a cool forest-green bicycle helmet',
    },
  },
  'boy-3': {
    characterId: 'boy-3',
    prefix: 'ali',
    name: 'Ali',
    gender: 'boy',
    age: '6 years old',
    faceDescription: 'Smart cheerful face, bright intelligent gaze, warm polite smile, neat appearance',
    hair: 'Neat short dark brown hair, cleanly trimmed around ears with a soft natural comb-over',
    eyes: 'Deep warm brown eyes reflecting curiosity, focus and enthusiasm',
    skin: 'Warm Mediterranean / Caucasian peach skin tone with gentle natural warmth',
    bodyProportions: 'Balanced and active 6-year-old boy proportions, neat upright posture',
    defaultClothes: 'Navy blue athletic zip-up jacket with white chest racing stripe, dark blue jeans',
    shoeStyle: 'Navy and orange sporty athletic sneakers with clean white soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, cinematic studio lighting',
    primaryReferencePath: 'public/assets/characters/ali_standing.png',
    portraitReferencePath: 'public/assets/portraits/boy_ali.jpg',
    allowedOutfits: {
      sleep: 'Midnight blue two-piece pajamas with small glowing constellation prints',
      bathe: 'Navy blue child terry bathrobe',
      paint: 'Navy protective apron over shirt',
      rideBike: 'Navy jacket and jeans with a sporty navy and orange bike helmet',
    },
  },
  'boy-4': {
    characterId: 'boy-4',
    prefix: 'murad',
    name: 'Murad',
    gender: 'boy',
    age: '6 years old',
    faceDescription: 'Dynamic cheerful face, stylish appearance, spirited warm grin',
    hair: 'Modern styled chestnut-brown hair with slight upward texture on top, neat sides',
    eyes: 'Intense warm dark brown eyes with mischievous, fun-loving glint',
    skin: 'Warm light tan skin tone with healthy natural glow',
    bodyProportions: 'Energetic, agile 6-year-old boy build, ready to move and play',
    defaultClothes: 'Orange and white horizontally striped athletic crewneck t-shirt, dark denim jeans',
    shoeStyle: 'Orange and black modern street sneakers with cushioned soles',
    renderStyle: 'Masterpiece 3D Disney Pixar studio animation character render, octane render, soft shadows',
    primaryReferencePath: 'public/assets/characters/murad_standing.png',
    portraitReferencePath: 'public/assets/portraits/boy_murad.jpg',
    allowedOutfits: {
      sleep: 'Warm orange and charcoal grey cotton pajamas with geometric shapes',
      bathe: 'Orange hooded bathrobe with soft white lining',
      paint: 'Dark craft apron protecting striped shirt',
      rideBike: 'Striped shirt and jeans with an orange and black skater-style bike helmet',
    },
  },
};

export function getProfileByPrefix(prefix: string): CharacterVisualProfile {
  for (const p of Object.values(CHARACTER_PROFILES)) {
    if (p.prefix === prefix) return p;
  }
  return CHARACTER_PROFILES['girl-1'];
}
