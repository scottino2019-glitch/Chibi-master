import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  RotateCcw,
  Sparkles,
  Heart,
  Save,
  Trash,
  Sliders,
  Palette,
  Layers,
  Bot,
  User,
  Scissors,
  Shirt,
  Smile,
  Glasses,
  Image as ImageIcon,
  Copy,
  FolderHeart,
  Check,
  Plus
} from 'lucide-react';

import { ChibiConfig, GenderBase, ArmPose, EyeStyle, EyebrowStyle, MouthStyle, NoseStyle, BangsStyle, BackHairStyle, TopStyle, BottomStyle, HeadwearStyle, EyewearStyle, BackgroundStyle } from './types';
import { DEFAULT_CHIBI, CHIBI_PRESETS, SKIN_COLORS, HAIR_COLORS, EYE_COLORS, CLOTHES_COLORS, BG_COLORS } from './constants';
import { ChibiParts } from './components/ChibiParts';

export default function App() {
  // Main Chibi Configuration State
  const [config, setConfig] = useState<ChibiConfig>({ ...DEFAULT_CHIBI });
  const [characterName, setCharacterName] = useState<string>('Momo');
  
  // Local Saved Gallery State
  const [gallery, setGallery] = useState<ChibiConfig[]>([]);
  
  // UI Tabs State
  const [activeTab, setActiveTab] = useState<'base' | 'face' | 'hair' | 'clothes' | 'accessories' | 'background'>('base');
  
  // Alert/Toast Notification State (for feedback when saving/downloading)
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  // High-Resolution Export Scale Setting (1 = 400x400, 3 = 1200x1200, 5 = 2000x2000)
  const [exportScale, setExportScale] = useState<number>(5);

  // Initialize gallery from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chibi_maker_gallery');
      if (stored) {
        setGallery(JSON.parse(stored));
      } else {
        // Hydrate with preset templates to give a lively starting experience
        setGallery(CHIBI_PRESETS);
        localStorage.setItem('chibi_maker_gallery', JSON.stringify(CHIBI_PRESETS));
      }
    } catch (e) {
      console.warn('LocalStorage not available or parse failed', e);
    }
  }, []);

  // Show a temporary toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Reset current config to base layout
  const handleReset = () => {
    setConfig({ ...DEFAULT_CHIBI, id: 'temp_' + Date.now() });
    setCharacterName('Momo');
    triggerToast('Resettato alla configurazione originale!');
  };

  // Randomize all attributes to get a super cute unexpected Chibi!
  const handleRandomize = () => {
    const genders: GenderBase[] = ['base', 'slender', 'baby_suit'];
    const armPoses: ArmPose[] = ['neutral', 'waving', 'hips', 'holding'];
    const eyeStyles: EyeStyle[] = ['sparkle', 'round', 'sleeping', 'joyful', 'wink', 'cool'];
    const eyebrows: EyebrowStyle[] = ['neutral', 'happy', 'sad', 'angry'];
    const mouths: MouthStyle[] = ['dot', 'cat', 'smile', 'surprise', 'tongue', 'blush'];
    const noses: NoseStyle[] = ['none', 'dot', 'cute', 'button'];
    const bangs: BangsStyle[] = ['straight', 'spiky', 'wispy', 'side', 'curly'];
    const backHairs: BackHairStyle[] = ['short', 'wavy', 'twintails', 'ponytail', 'buns', 'spiky'];
    const tops: TopStyle[] = ['hoodie', 'sailor', 'shirt', 'sweater', 'gothic', 'tshirt'];
    const bottoms: BottomStyle[] = ['skirt', 'pants', 'shorts', 'dress_extension'];
    const headwears: HeadwearStyle[] = ['cat_ears', 'bear_beanie', 'witch_hat', 'flower', 'halo', 'horns', 'none'];
    const eyewears: EyewearStyle[] = ['round', 'nerd', 'heart', 'bandage', 'none'];
    const bgs: BackgroundStyle[] = ['solid', 'circles', 'stars', 'hearts', 'grid'];

    // Select random colors
    const skin = SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)].value;
    const hair = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].value;
    const eye = EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)].value;
    const cl1 = CLOTHES_COLORS[Math.floor(Math.random() * CLOTHES_COLORS.length)].value;
    const cl2 = CLOTHES_COLORS[Math.floor(Math.random() * CLOTHES_COLORS.length)].value;
    const bg1 = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)].value;
    const bg2 = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)].value;

    const randomConfig: ChibiConfig = {
      id: 'temp_' + Date.now(),
      name: 'Chibi Casuale',
      gender: genders[Math.floor(Math.random() * genders.length)],
      armPose: armPoses[Math.floor(Math.random() * armPoses.length)],
      skinColor: skin,
      
      eyeStyle: eyeStyles[Math.floor(Math.random() * eyeStyles.length)],
      eyeColor: eye,
      eyebrowStyle: eyebrows[Math.floor(Math.random() * eyebrows.length)],
      eyeSize: parseFloat((0.85 + Math.random() * 0.35).toFixed(2)),
      eyeSpacing: Math.floor(30 + Math.random() * 10),
      eyeYOffset: Math.floor(-8 + Math.random() * 16),
      
      mouthStyle: mouths[Math.floor(Math.random() * mouths.length)],
      mouthYOffset: Math.floor(-6 + Math.random() * 12),
      mouthSize: parseFloat((0.8 + Math.random() * 0.4).toFixed(2)),
      noseStyle: noses[Math.floor(Math.random() * noses.length)],
      noseYOffset: Math.floor(-5 + Math.random() * 10),
      blushIntensity: parseFloat(Math.random().toFixed(2)),
      
      bangsStyle: bangs[Math.floor(Math.random() * bangs.length)],
      backHairStyle: backHairs[Math.floor(Math.random() * backHairs.length)],
      hairColor: hair,
      hairAccentColor: HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].value,
      hairSize: parseFloat((0.95 + Math.random() * 0.15).toFixed(2)),
      hairYOffset: Math.floor(-5 + Math.random() * 10),
      
      topStyle: tops[Math.floor(Math.random() * tops.length)],
      clothesColor1: cl1,
      clothesColor2: cl2,
      bottomStyle: bottoms[Math.floor(Math.random() * bottoms.length)],
      shoesColor: CLOTHES_COLORS[Math.floor(Math.random() * CLOTHES_COLORS.length)].value,
      
      headwearStyle: headwears[Math.floor(Math.random() * headwears.length)],
      headwearColor: CLOTHES_COLORS[Math.floor(Math.random() * CLOTHES_COLORS.length)].value,
      headwearPos: {
        x: Math.floor(-10 + Math.random() * 20),
        y: Math.floor(-10 + Math.random() * 15),
        scale: parseFloat((0.9 + Math.random() * 0.2).toFixed(2))
      },
      
      eyewearStyle: eyewears[Math.floor(Math.random() * eyewears.length)],
      eyewearColor: EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)].value,
      
      handItem: Math.random() > 0.5 ? (['none', 'balloon', 'pet', 'icecream', 'wand'] as const)[Math.floor(Math.random() * 5)] : 'none',
      handItemColor: EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)].value,
      
      bgStyle: bgs[Math.floor(Math.random() * bgs.length)],
      bgColor1: bg1,
      bgColor2: bg2,

      faceShape: (['round', 'chubby', 'pointed', 'square'] as const)[Math.floor(Math.random() * 4)],
      earStyle: (['round', 'elf', 'cat', 'bear'] as const)[Math.floor(Math.random() * 4)],
      faceAccessory: (['none', 'whiskers', 'band_aid', 'freckles', 'star_cheek', 'blush_heart'] as const)[Math.floor(Math.random() * 6)],
      backItem: (['none', 'angel_wings', 'demon_wings', 'butterfly_wings', 'cape'] as const)[Math.floor(Math.random() * 5)],
      tailStyle: (['none', 'cat_tail', 'devil_tail', 'bunny_tail', 'fox_tail'] as const)[Math.floor(Math.random() * 5)]
    };

    const randomNames = ['Kati', 'Pippo', 'Neko', 'Yuki', 'Koko', 'Sora', 'Hana', 'Haru', 'Choco', 'Susi', 'Pochi', 'Lulu'];
    const chosenName = randomNames[Math.floor(Math.random() * randomNames.length)] + ' ' + Math.floor(Math.random() * 99 + 1);
    
    setConfig(randomConfig);
    setCharacterName(chosenName);
    triggerToast('Generato Chibi casuale super carino! ✨');
  };

  // Save Chibi to Local Storage Gallery
  const handleSaveToGallery = () => {
    const freshId = 'chibi_' + Date.now();
    const saveObj: ChibiConfig = {
      ...config,
      id: freshId,
      name: characterName
    };

    // Filter out duplicates with the same name if user is updating, or append
    const updatedGallery = [saveObj, ...gallery.filter(item => item.id !== config.id)];
    setGallery(updatedGallery);
    localStorage.setItem('chibi_maker_gallery', JSON.stringify(updatedGallery));
    
    // Set config id so further edits update this item
    setConfig(prev => ({ ...prev, id: freshId }));
    triggerToast(`"${characterName}" salvato con successo in Galleria! ❤️`);
  };

  // Load a Chibi preset or custom saved record
  const handleLoadChibi = (item: ChibiConfig) => {
    setConfig({ ...item });
    setCharacterName(item.name);
    triggerToast(`Caricato Chibi "${item.name}"!`);
  };

  // Remove a saved Chibi from database
  const handleDeleteChibi = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid loading it
    const updatedGallery = gallery.filter(item => item.id !== id);
    setGallery(updatedGallery);
    localStorage.setItem('chibi_maker_gallery', JSON.stringify(updatedGallery));
    triggerToast('Chibi eliminato dalla galleria.');
  };

  // Trigger high-res serialization and download
  const handleDownload = (format: 'png' | 'svg') => {
    const svgElement = document.getElementById('chibi-vector-svg');
    if (!svgElement) {
      triggerToast('Errore: impossibile trovare il canvas SVG.');
      return;
    }

    const nameForFile = characterName.trim() ? characterName.trim().toLowerCase().replace(/\s+/g, '_') : 'my_chibi';

    if (format === 'svg') {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `chibi_${nameForFile}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      triggerToast('File SVG vettoriale scaricato! 🌟');
      return;
    }

    // Export as PNG High-Res
    triggerToast('Elaborazione immagine in alta risoluzione...');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const baseRenderResolution = 400;
      const targetSize = baseRenderResolution * exportScale; // e.g. 400 * 5 = 2000px
      
      canvas.width = targetSize;
      canvas.height = targetSize;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.clearRect(0, 0, targetSize, targetSize);
        ctx.drawImage(img, 0, 0, targetSize, targetSize);
        
        try {
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `chibi_${nameForFile}_${targetSize}x${targetSize}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          triggerToast(`Immagine PNG (${targetSize}x${targetSize}px) salvata! 📸`);
        } catch (e) {
          console.error(e);
          triggerToast('Errore durante la conversione in PNG.');
        }
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-pink-50 text-slate-800 font-sans selection:bg-pink-200">
      
      {/* Dynamic Toast Feedback Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-pink-600 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 border-2 border-pink-300"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-sm font-black tracking-wide uppercase">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Header */}
      <header className="border-b-4 border-pink-200 bg-white sticky top-0 z-30 shadow-none">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
              <span className="text-white font-black text-xl">★</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-pink-600 tracking-tight uppercase flex items-center gap-2">
                Chibi Studio Deluxe <span className="text-pink-500 text-xs font-bold bg-pink-100 px-2.5 py-0.5 rounded-full border border-pink-200 normal-case">v1.5</span>
              </h1>
              <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider font-mono hidden sm:block">
                Crea, vesti e scarica favolosi avatar in HD
              </p>
            </div>
          </div>

          {/* Quick Preset Buttons or Header Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 bg-pink-100/50 p-1.5 rounded-2xl border-2 border-pink-200">
              <span className="text-[10px] font-black uppercase text-pink-500 px-2 tracking-wider">Preset rapidi:</span>
              <div className="flex gap-1 max-w-[180px] sm:max-w-none overflow-x-auto">
                {CHIBI_PRESETS.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLoadChibi(item)}
                    className="text-xs bg-white hover:bg-pink-50 border-2 border-pink-100 font-bold text-pink-600 px-2.5 py-1 rounded-xl shadow-sm transition whitespace-nowrap uppercase tracking-tight"
                  >
                    {item.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN LEFT: Live Preview Canvas (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Chibi Canvas Screen */}
            <div className="bg-white rounded-[40px] border-4 border-pink-100 shadow-xl p-4 sm:p-6 flex flex-col items-center relative overflow-hidden">
              
              {/* Grid pattern behind style */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              {/* Cute corner tags */}
              <div className="absolute top-4 left-4 bg-pink-100 text-pink-600 rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase border border-pink-200 z-10">
                Studio Preview
              </div>

              {/* Character custom name input */}
              <div className="w-full max-w-[280px] mt-8 mb-4 relative z-10">
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value.slice(0, 24))}
                  className="w-full text-center text-xl font-black bg-pink-50 hover:bg-pink-100/50 focus:bg-white border-2 border-pink-200 rounded-3xl py-2 px-4 transition text-pink-600 outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300 font-sans tracking-tight uppercase"
                  placeholder="Nome del Chibi"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none text-sm">✏️</span>
              </div>

              {/* Live Render */}
              <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[340px] bg-pink-50/40 border-4 border-pink-100 shadow-inner rounded-[32px] overflow-hidden p-2 z-10">
                <ChibiParts config={config} size={400} className="w-full h-full drop-shadow-[0_10px_20px_rgba(236,72,153,0.15)]" />
              </div>

              {/* Canvas controls: Randomize, Reset, Save to gallery */}
              <div className="grid grid-cols-3 gap-3 w-full mt-6 z-10">
                <button
                  onClick={handleRandomize}
                  className="flex flex-col items-center justify-center gap-1 p-2.5 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-200/50 min-h-[56px] hover:bg-pink-600 active:scale-[0.98] transition border-b-4 border-pink-700 font-black text-xs uppercase tracking-wide"
                >
                  <Sparkles className="w-4 h-4 text-pink-100 animate-pulse" />
                  <span>Casuale</span>
                </button>

                <button
                  onClick={handleSaveToGallery}
                  className="flex flex-col items-center justify-center gap-1 p-2.5 bg-white text-pink-500 border-2 border-pink-200 rounded-2xl min-h-[56px] hover:bg-pink-50 active:scale-[0.98] transition font-black text-xs uppercase tracking-wide"
                >
                  <Save className="w-4 h-4 text-pink-500" />
                  <span>Salva</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex flex-col items-center justify-center gap-1 p-2.5 bg-pink-100 text-pink-600 rounded-2xl min-h-[56px] hover:bg-pink-200 transition font-black text-xs uppercase tracking-wide"
                >
                  <RotateCcw className="w-4 h-4 text-pink-500" />
                  <span>Reset</span>
                </button>
              </div>

            </div>

            {/* HIGH-RES DOWNLOAD INTERFACE CARD */}
            <div className="bg-white rounded-[32px] border-4 border-pink-100 shadow-xl p-4 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-pink-100 text-pink-500 rounded-xl">
                  <Download className="w-5 h-5 text-pink-500" />
                </span>
                <h3 className="font-black text-pink-600 text-sm tracking-tight uppercase">Esporta in Alta Risoluzione</h3>
              </div>

              <div className="bg-pink-50/50 p-3 rounded-2xl border-2 border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-pink-650 uppercase tracking-tight">Risoluzione di Download</span>
                  <span className="text-[10px] font-mono text-pink-400 font-bold">{400 * exportScale} x {400 * exportScale} Pixel (PNG)</span>
                </div>
                
                {/* Scale selection slider */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setExportScale(1)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black border-2 transition uppercase ${exportScale === 1 ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200' : 'bg-white text-pink-400 hover:bg-pink-100 border-pink-150'}`}
                  >
                    400p
                  </button>
                  <button
                    onClick={() => setExportScale(3)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black border-2 transition uppercase ${exportScale === 3 ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200' : 'bg-white text-pink-400 hover:bg-pink-100 border-pink-150'}`}
                  >
                    1200p
                  </button>
                  <button
                    onClick={() => setExportScale(5)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black border-2 transition uppercase ${exportScale === 5 ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200' : 'bg-white text-pink-400 hover:bg-pink-100 border-pink-150'}`}
                  >
                    2000p HD
                  </button>
                </div>
              </div>

              {/* Real download buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDownload('png')}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-pink-500 text-white rounded-2xl font-black text-xs shadow-lg shadow-pink-200 border-b-4 border-pink-700 hover:bg-pink-600 transition uppercase tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  Salva PNG
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-pink-100 text-pink-600 rounded-2xl font-black text-xs hover:bg-pink-200 transition border-2 border-pink-250 uppercase tracking-wider"
                >
                  <Scissors className="w-4 h-4 rotate-180" />
                  Salva SVG Vet
                </button>
              </div>
            </div>

            {/* GALLERIA INTERNA / SHOWCASE GRID */}
            <div className="bg-white rounded-[32px] border-4 border-pink-100 shadow-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-pink-600 text-sm flex items-center gap-1.5 uppercase tracking-tight">
                  <FolderHeart className="w-4 h-4 text-pink-500" />
                  I miei Chibi salvati
                </h3>
                <span className="text-[10px] bg-pink-100 px-2.5 py-0.5 rounded-full font-mono text-pink-500 font-black uppercase">
                  {gallery.length} salvati
                </span>
              </div>

              {gallery.length === 0 ? (
                <div className="bg-pink-50/50 rounded-2xl p-6 text-center border-2 border-dashed border-pink-200">
                  <Heart className="w-8 h-8 text-pink-300 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs text-pink-400 font-black uppercase">Nessun avatar salvato ancora.</p>
                  <p className="text-[10px] text-pink-400 mt-1 uppercase font-bold">Premi &quot;Salva&quot; per conservare i tuoi capolavori!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[190px] overflow-y-auto pr-1">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleLoadChibi(item)}
                      className={`group relative cursor-pointer p-1.5 rounded-2xl border-2 transition ${config.id === item.id ? 'bg-pink-100/50 border-pink-400 shadow-inner' : 'bg-pink-50/30 hover:bg-pink-100/20 border-pink-50'}`}
                    >
                      {/* Thumbnail frame */}
                      <div className="aspect-square rounded-xl bg-white overflow-hidden flex items-center justify-center p-0.5 border border-pink-100">
                        <ChibiParts config={item} size={90} className="w-full h-full transform scale-110" />
                      </div>
                      
                      {/* Name tag */}
                      <p className="text-[10px] font-black text-center mt-1 text-pink-600 truncate px-1 uppercase tracking-tight">
                        {item.name}
                      </p>

                      {/* Delete icon */}
                      <button
                        onClick={(e) => handleDeleteChibi(item.id, e)}
                        className="absolute -top-1.5 -right-1.5 bg-pink-600 hover:bg-red-550 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Elimina"
                      >
                        <Trash className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </section>

          {/* COLUMN RIGHT: Large Customization Controls (7 Cols) */}
          <section className="lg:col-span-7 bg-white rounded-[40px] border-4 border-pink-100 shadow-xl overflow-hidden flex flex-col">
            
            {/* Elegant Tab Headers */}
            <div className="border-b-4 border-pink-100 bg-pink-50/30 flex flex-wrap gap-0">
              
              <button
                onClick={() => setActiveTab('base')}
                className={`flex-1 min-w-[70px] py-4 px-2 text-center border-b-4 font-black text-xs flex flex-col items-center gap-1.5 transition uppercase tracking-tight ${activeTab === 'base' ? 'border-pink-500 text-pink-600 bg-white' : 'border-transparent text-pink-300 hover:text-pink-500 hover:bg-pink-100/10'}`}
              >
                <User className="w-4 h-4" />
                <span className="whitespace-nowrap">Base</span>
              </button>

              <button
                onClick={() => setActiveTab('face')}
                className={`flex-1 min-w-[70px] py-4 px-2 text-center border-b-4 font-black text-xs flex flex-col items-center gap-1.5 transition uppercase tracking-tight ${activeTab === 'face' ? 'border-pink-500 text-pink-600 bg-white' : 'border-transparent text-pink-300 hover:text-pink-500 hover:bg-pink-100/10'}`}
              >
                <Smile className="w-4 h-4" />
                <span className="whitespace-nowrap">Viso</span>
              </button>

              <button
                onClick={() => setActiveTab('hair')}
                className={`flex-1 min-w-[70px] py-4 px-2 text-center border-b-4 font-black text-xs flex flex-col items-center gap-1.5 transition uppercase tracking-tight ${activeTab === 'hair' ? 'border-pink-500 text-pink-600 bg-white' : 'border-transparent text-pink-300 hover:text-pink-500 hover:bg-pink-100/10'}`}
              >
                <Scissors className="w-4 h-4" />
                <span className="whitespace-nowrap">Capelli</span>
              </button>

              <button
                onClick={() => setActiveTab('clothes')}
                className={`flex-1 min-w-[70px] py-4 px-2 text-center border-b-4 font-black text-xs flex flex-col items-center gap-1.5 transition uppercase tracking-tight ${activeTab === 'clothes' ? 'border-pink-500 text-pink-600 bg-white' : 'border-transparent text-pink-300 hover:text-pink-500 hover:bg-pink-100/10'}`}
              >
                <Shirt className="w-4 h-4" />
                <span className="whitespace-nowrap">Vestiti</span>
              </button>

              <button
                onClick={() => setActiveTab('accessories')}
                className={`flex-1 min-w-[70px] py-4 px-2 text-center border-b-4 font-black text-xs flex flex-col items-center gap-1.5 transition uppercase tracking-tight ${activeTab === 'accessories' ? 'border-pink-500 text-pink-600 bg-white' : 'border-transparent text-pink-300 hover:text-pink-500 hover:bg-pink-100/10'}`}
              >
                <Glasses className="w-4 h-4" />
                <span className="whitespace-nowrap">Accessori</span>
              </button>

              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 min-w-[70px] py-4 px-2 text-center border-b-4 font-black text-xs flex flex-col items-center gap-1.5 transition uppercase tracking-tight ${activeTab === 'background' ? 'border-pink-500 text-pink-600 bg-white' : 'border-transparent text-pink-300 hover:text-pink-500 hover:bg-pink-100/10'}`}
              >
                <ImageIcon className="w-4 h-4" />
                <span className="whitespace-nowrap">Sfondo</span>
              </button>
            </div>

            {/* TAB INTERFACES WRAPPER */}
            <div className="p-5 sm:p-6 min-h-[460px]">
              
              {/* TAB 1: BASE & PHYSICAL (Genere, Posa, Pelle) */}
              {activeTab === 'base' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  
                  {/* Category description */}
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-mono mb-1">Base & Fisico</h3>
                    <p className="text-xs text-slate-500">Definisci il tipo di corpo base, le pose e la tonalità della pelle del tuo Chibi.</p>
                  </div>

                  {/* Body gender selection */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Tipo di Corpo & Costume</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { key: 'base', label: 'Chibi Base', tag: 'Standard' },
                        { key: 'slender', label: 'Snello', tag: 'Slender' },
                        { key: 'muscular', label: 'Muscoloso', tag: 'Muscular' },
                        { key: 'chubby', label: 'Paffuto', tag: 'Chubby' },
                        { key: 'baby_suit', label: 'Tutina 🍼', tag: 'Baby' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, gender: item.key as GenderBase }))}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition ${config.gender === item.key ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-500/20' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800 text-center">{item.label}</span>
                          <span className="text-[9px] font-mono font-medium text-slate-400 mt-0.5">{item.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Arm selection pose */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Posa delle Braccia</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { key: 'neutral', label: 'Neutrale', emoji: '🧍' },
                        { key: 'waving', label: 'Saluto', emoji: '👋' },
                        { key: 'hips', label: 'Fianchi', emoji: '💁' },
                        { key: 'holding', label: 'Presenta', emoji: '🖐️' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, armPose: item.key as ArmPose }))}
                          className={`flex flex-col items-center p-2.5 rounded-xl border transition ${config.armPose === item.key ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-500/15' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-lg mb-0.5">{item.emoji}</span>
                          <span className="text-[10px] font-bold text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skin Color Palette selection */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Colore della Pelle</label>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase bg-slate-100 px-2.5 py-0.5 rounded-full">{config.skinColor}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {SKIN_COLORS.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, skinColor: item.value }))}
                          className={`w-9 h-9 rounded-xl border relative shadow-sm transition active:scale-90 ${config.skinColor === item.value ? 'ring-2 ring-pink-500 ring-offset-2 scale-105' : 'border-slate-300 hover:scale-105'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        >
                          {config.skinColor === item.value && <Check className="w-4 h-4 text-slate-700 absolute inset-0 m-auto" />}
                        </button>
                      ))}
                      
                      {/* Advanced custom picker */}
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.skinColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, skinColor: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Blush intensity slider */}
                  <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Abbellimento Rossore (Blush)</span>
                      <span className="text-xs font-mono font-semibold text-slate-500">{Math.round(config.blushIntensity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.0"
                      step="0.05"
                      value={config.blushIntensity}
                      onChange={(e) => setConfig(prev => ({ ...prev, blushIntensity: parseFloat(e.target.value) }))}
                      className="w-full accent-pink-505"
                    />
                  </div>

                </motion.div>
              )}


              {/* TAB 2: VISO E OCCHI (Sguardo, Espressione, Dimensioni) */}
              {activeTab === 'face' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-mono mb-1">Occhi & Sguardo</h3>
                    <p className="text-xs text-slate-500">Imposta e calibra la personalità degli occhi, la bocca e i dettagli espressivi.</p>
                  </div>

                  {/* Eye style row */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Modello d&apos;Occhio</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { key: 'sparkle', label: 'Sparkle' },
                        { key: 'round', label: 'Tondo' },
                        { key: 'sleeping', label: 'Chiuso' },
                        { key: 'joyful', label: 'Felice' },
                        { key: 'wink', label: 'Wink' },
                        { key: 'cool', label: 'Cool' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, eyeStyle: item.key as EyeStyle }))}
                          className={`py-2 px-1.5 rounded-xl border text-center transition ${config.eyeStyle === item.key ? 'bg-pink-50 border-pink-500 ring-1 ring-pink-500/20' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-[11px] font-extrabold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Eye spacing / size sliders box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-4">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Geometria e Posizione Occhi</h4>
                    
                    {/* Dimension / scale of eye */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Dimensione Occhi</span>
                        <span className="font-mono text-slate-400">{config.eyeSize}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.75"
                        max="1.3"
                        step="0.05"
                        value={config.eyeSize}
                        onChange={(e) => setConfig(prev => ({ ...prev, eyeSize: parseFloat(e.target.value) }))}
                        className="w-full accent-pink-500"
                      />
                    </div>

                    {/* Spacing alignment */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Distanza Interoculare</span>
                        <span className="font-mono text-slate-400">{config.eyeSpacing}px</span>
                      </div>
                      <input
                        type="range"
                        min="26"
                        max="48"
                        step="1"
                        value={config.eyeSpacing}
                        onChange={(e) => setConfig(prev => ({ ...prev, eyeSpacing: parseInt(e.target.value) }))}
                        className="w-full accent-pink-500"
                      />
                    </div>

                    {/* Height offset */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Posizione Altezza Y</span>
                        <span className="font-mono text-slate-400">{config.eyeYOffset}px</span>
                      </div>
                      <input
                        type="range"
                        min="-14"
                        max="14"
                        step="1"
                        value={config.eyeYOffset}
                        onChange={(e) => setConfig(prev => ({ ...prev, eyeYOffset: parseInt(e.target.value) }))}
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>

                  {/* Eye colors layout */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Colore dell&apos;Iride</label>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-full">{config.eyeColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {EYE_COLORS.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, eyeColor: item.value }))}
                          className={`w-8 h-8 rounded-full border relative shadow-inner shadow-black/5 transition active:scale-90 ${config.eyeColor === item.value ? 'ring-2 ring-pink-500 ring-offset-2' : 'border-slate-300'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        >
                          {config.eyeColor === item.value && <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1.5 left-1.5" />}
                        </button>
                      ))}
                      
                      {/* Advanced custom color picker */}
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.eyeColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, eyeColor: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* MOUTH, NOSE & EYEBROWS CONTROLS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Eyebrows */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Modelli Sopracciglia</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: 'neutral', label: 'Normali' },
                          { key: 'happy', label: 'Arrotondate' },
                          { key: 'sad', label: 'Tristi 🥺' },
                          { key: 'angry', label: 'Arrabbiose' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setConfig(prev => ({ ...prev, eyebrowStyle: item.key as EyebrowStyle }))}
                            className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition ${config.eyebrowStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Nose styled selector */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Naso Chibi</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: 'none', label: 'Nessuno' },
                          { key: 'dot', label: 'Puntino 🔴' },
                          { key: 'cute', label: 'Lieve' },
                          { key: 'button', label: 'Bottoncino' },
                          { key: 'blush', label: 'Soft Rosa 🌸' },
                          { key: 'heart', label: 'Cuoricino ❤️' },
                          { key: 'cat', label: 'Micetto 🐱' },
                          { key: 'anime', label: 'Ombra Anime' },
                          { key: 'snout', label: 'Musetto 🐷' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setConfig(prev => ({ ...prev, noseStyle: item.key as NoseStyle }))}
                            className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition ${config.noseStyle === item.key ? 'bg-pink-50 border-pink-500 ring-1 ring-pink-500/10' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Mouth selection */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Espressione Bocca (Mouth Style)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { key: 'dot', label: 'Cute Dot' },
                        { key: 'cat', label: 'Faccia gatto :3' },
                        { key: 'smile', label: 'Sorrisetto' },
                        { key: 'surprise', label: 'Sorpreso' },
                        { key: 'tongue', label: 'Linguetta!' },
                        { key: 'blush', label: 'Confuso' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, mouthStyle: item.key as MouthStyle }))}
                          className={`py-2.5 px-1 rounded-xl border text-center transition ${config.mouthStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-[11px] font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Mouth Position Sliders */}
                    <div className="grid grid-cols-2 gap-3 mt-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                          <span>Altezza Bocca Y</span>
                          <span className="font-mono">{config.mouthYOffset}px</span>
                        </div>
                        <input
                          type="range"
                          min="-8"
                          max="12"
                          step="1"
                          value={config.mouthYOffset}
                          onChange={(e) => setConfig(prev => ({ ...prev, mouthYOffset: parseInt(e.target.value) }))}
                          className="w-full accent-slate-800"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                          <span>Dimensione Bocca</span>
                          <span className="font-mono">{config.mouthSize}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.7"
                          max="1.5"
                          step="0.05"
                          value={config.mouthSize}
                          onChange={(e) => setConfig(prev => ({ ...prev, mouthSize: parseFloat(e.target.value) }))}
                          className="w-full accent-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Face Shape, Ear Style, and Face Accessory customization */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-5 mt-2">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Forma Viso & Dettagli Orecchie</h4>
                    
                    {/* Face Shapes */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-700">Modello della Testa (Mandibola)</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { key: 'round', label: 'Tonda Standard' },
                          { key: 'chubby', label: 'Morbida Guance' },
                          { key: 'pointed', label: 'A Punta (V)' },
                          { key: 'square', label: 'Squadrata' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setConfig(prev => ({ ...prev, faceShape: item.key as any }))}
                            className={`py-2 px-1.5 rounded-xl border text-[11px] font-bold transition ${config.faceShape === item.key ? 'bg-pink-50 border-pink-500 text-pink-600 ring-1 ring-pink-500/10' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ear Styles */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-700">Forma delle Orecchie</span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                        {[
                          { key: 'round', label: 'Tonde Standard' },
                          { key: 'elf', label: 'Elfiche 🧝' },
                          { key: 'cat', label: 'Micetto 🐱' },
                          { key: 'bear', label: 'Orsetto 🐻' },
                          { key: 'none', label: 'Nascoste' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setConfig(prev => ({ ...prev, earStyle: item.key as any }))}
                            className={`py-2 px-1.5 rounded-xl border text-[11px] font-bold transition ${config.earStyle === item.key ? 'bg-pink-50 border-pink-500 text-pink-600 ring-1 ring-pink-500/10' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Face Accessories */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-700">Adesivi & Decorazioni del Viso</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { key: 'none', label: 'Senza Adesivi' },
                          { key: 'whiskers', label: 'Baffetti 🐈' },
                          { key: 'band_aid', label: 'Cerotto 🩹' },
                          { key: 'freckles', label: 'Lentiggini' },
                          { key: 'star_cheek', label: 'Stelle Gialle ⭐' },
                          { key: 'blush_heart', label: 'Cuoricini 💕' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setConfig(prev => ({ ...prev, faceAccessory: item.key as any }))}
                            className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition ${config.faceAccessory === item.key ? 'bg-pink-50 border-pink-500 text-pink-600 ring-1 ring-pink-500/10' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}


              {/* TAB 3: CAPELLI (Bangs, Back hair, Colors) */}
              {activeTab === 'hair' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-mono mb-1">Capelli & Acconciatura</h3>
                    <p className="text-xs text-slate-500">Componi l&apos;acconciatura preferita selezionando frangia e retro capelli separatamente.</p>
                  </div>

                  {/* Front Hair Bangs */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Frangetta Davanti (Bangs)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[
                        { key: 'straight', label: 'Dritti Pari' },
                        { key: 'spiky', label: 'Spiky Anime' },
                        { key: 'wispy', label: 'Sottili Soft' },
                        { key: 'side', label: 'Laterali' },
                        { key: 'curly', label: 'Riccioli' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, bangsStyle: item.key as BangsStyle }))}
                          className={`py-2 px-1.5 rounded-xl border text-center transition ${config.bangsStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-[11px] font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Back Hair Style */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Retro / Coda / Codini (Back Hair)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { key: 'short', label: 'Caschetto' },
                        { key: 'wavy', label: 'Lunghi Mossi' },
                        { key: 'twintails', label: 'Due Codini' },
                        { key: 'ponytail', label: 'Coda Alta' },
                        { key: 'buns', label: 'Space Buns' },
                        { key: 'spiky', label: 'Spiky' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, backHairStyle: item.key as BackHairStyle }))}
                          className={`py-2 px-1.5 rounded-xl border text-center transition ${config.backHairStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-[11px] font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Hair color selection */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Colore Capelli Principale</label>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">{config.hairColor}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {HAIR_COLORS.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, hairColor: item.value }))}
                          className={`w-8.5 h-8.5 rounded-xl border relative shadow-sm transition active:scale-95 ${config.hairColor === item.value ? 'ring-2 ring-pink-500 ring-offset-2 scale-105' : 'border-slate-300'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        >
                          {config.hairColor === item.value && <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1.5 left-1.5" />}
                        </button>
                      ))}
                      
                      {/* Advanced custom picker */}
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.hairColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, hairColor: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accent / Highlights Hair Color Selection */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Sfumature / Riflessi Capelli (Highlights)</label>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">{config.hairAccentColor}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {HAIR_COLORS.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, hairAccentColor: item.value }))}
                          className={`w-8 h-8 rounded-xl border relative transition active:scale-95 ${config.hairAccentColor === item.value ? 'ring-2 ring-pink-400 ring-offset-2' : 'border-slate-200'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        >
                          {config.hairAccentColor === item.value && <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-1.5 right-1.5 animate-ping" />}
                        </button>
                      ))}
                      
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.hairAccentColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, hairAccentColor: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hair Geometry fine tuning */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Regolazione Volumetrica Capelli</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Hair Size */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>Dimensione Capelli</span>
                          <span className="font-mono">{config.hairSize}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.9"
                          max="1.2"
                          step="0.02"
                          value={config.hairSize}
                          onChange={(e) => setConfig(prev => ({ ...prev, hairSize: parseFloat(e.target.value) }))}
                          className="w-full accent-pink-505"
                        />
                      </div>

                      {/* Hair Position Y */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>Altezza Posizione Y</span>
                          <span className="font-mono">{config.hairYOffset}px</span>
                        </div>
                        <input
                          type="range"
                          min="-8"
                          max="12"
                          step="1"
                          value={config.hairYOffset}
                          onChange={(e) => setConfig(prev => ({ ...prev, hairYOffset: parseInt(e.target.value) }))}
                          className="w-full accent-pink-505"
                        />
                      </div>

                    </div>
                  </div>

                </motion.div>
              )}


              {/* TAB 4: VESTITI (Tops, Bottoms, Outfit Colors) */}
              {activeTab === 'clothes' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-mono mb-1">Vestiario & Outfit</h3>
                    <p className="text-xs text-slate-500">Personalizza l&apos;outfit del tuo Chibi scegliendo maglia superiore e inferiore e modificando i colori.</p>
                  </div>

                  {/* Tops (Abito Superiore) */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Abito Superiore (Tops)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { key: 'hoodie', label: 'Cozy Felpa' },
                        { key: 'sailor', label: 'Marinaio' },
                        { key: 'shirt', label: 'Camicia' },
                        { key: 'sweater', label: 'Maglione' },
                        { key: 'gothic', label: 'Gothic Lol' },
                        { key: 'tshirt', label: 'T-Shirt' },
                        { key: 'kimono', label: 'Kimono 👘' },
                        { key: 'armor', label: 'Armatura ⚔️' },
                        { key: 'maid', label: 'Maid Gown 🍰' },
                        { key: 'party_suit', label: 'Gilet Elegante 🤵' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, topStyle: item.key as TopStyle }))}
                          className={`py-2 px-1 rounded-xl border text-center transition ${config.topStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-[11px] font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottoms (Abito Inferiore) */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Parte Inferiore (Bottoms)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'pants', label: 'Pantaloni 👖' },
                        { key: 'skirt', label: 'Gonnella 👗' },
                        { key: 'shorts', label: 'Calzoncini' },
                        { key: 'dress_extension', label: 'Gonna Lunga' },
                        { key: 'mermaid', label: 'Mermaid Tail 🧜‍♀️' },
                        { key: 'magical_dress', label: 'Principessa' },
                        { key: 'frills', label: 'Frange & Rouches' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, bottomStyle: item.key as BottomStyle }))}
                          className={`py-2 px-1 rounded-xl border text-center transition ${config.bottomStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-[11px] font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Costume color selection */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Colore Principale Vestito</label>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">{config.clothesColor1}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {CLOTHES_COLORS.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, clothesColor1: item.value }))}
                          className={`w-8 h-8 rounded-xl border relative shadow-sm transition active:scale-95 ${config.clothesColor1 === item.value ? 'ring-2 ring-pink-505 ring-offset-2' : 'border-slate-300'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        >
                          {config.clothesColor1 === item.value && <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5" />}
                        </button>
                      ))}
                      
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.clothesColor1}
                          onChange={(e) => setConfig(prev => ({ ...prev, clothesColor1: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary/Details color selection */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Colore Accenti / Dettagli Outfit</label>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">{config.clothesColor2}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {CLOTHES_COLORS.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, clothesColor2: item.value }))}
                          className={`w-8 h-8 rounded-xl border relative transition active:scale-95 ${config.clothesColor2 === item.value ? 'ring-2 ring-pink-505 ring-offset-2' : 'border-slate-250'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        >
                          {config.clothesColor2 === item.value && <div className="w-2 h-2 bg-white rounded-full absolute bottom-1.5 right-1.5" />}
                        </button>
                      ))}
                      
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.clothesColor2}
                          onChange={(e) => setConfig(prev => ({ ...prev, clothesColor2: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shoes custom color selection */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Colore delle Scarpine</label>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase">{config.shoesColor}</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {CLOTHES_COLORS.slice(0, 8).map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setConfig(prev => ({ ...prev, shoesColor: item.value }))}
                          className={`w-7 h-7 rounded-lg border transition ${config.shoesColor === item.value ? 'ring-2 ring-pink-500' : 'border-slate-300'}`}
                          style={{ backgroundColor: item.value }}
                          title={item.name}
                        />
                      ))}
                      
                      <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="color"
                          value={config.shoesColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, shoesColor: e.target.value }))}
                          className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}


              {/* TAB 5: ACCESSORI (Copricapi, Occhiali, Oggetti in mano) */}
              {activeTab === 'accessories' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-mono mb-1">Accessori & Gioielli</h3>
                    <p className="text-xs text-slate-500">Definisci cappelli di testa, occhiali ed elementi speciali che il Chibi reggerà in mano.</p>
                  </div>

                  {/* Headwear selection */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Accessorio per Capelli / Testa</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { key: 'none', label: 'Nessuno ❌' },
                        { key: 'cat_ears', label: 'Orecchie Gatto 🐱' },
                        { key: 'bear_beanie', label: 'Cuffia Orso 🐻' },
                        { key: 'witch_hat', label: 'Cappello Strega 🧙‍♀️' },
                        { key: 'flower', label: 'Margherita 🌸' },
                        { key: 'halo', label: 'Aureola ✨' },
                        { key: 'horns', label: 'Corna Diavoletto 😈' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, headwearStyle: item.key as HeadwearStyle }))}
                          className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition ${config.headwearStyle === item.key ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-500/15' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Headwear position offset (only if headwear is not none) */}
                  {config.headwearStyle !== 'none' && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col gap-3">
                      <h4 className="text-[11.5px] font-black text-slate-500 uppercase tracking-wider">
                        🔧 Regolazione Posizionamento Copricapo
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-semibold text-slate-600">Sposta X: {config.headwearPos.x}px</span>
                          <input
                            type="range"
                            min="-25"
                            max="25"
                            value={config.headwearPos.x}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setConfig(prev => ({ ...prev, headwearPos: { ...prev.headwearPos, x: v } }));
                            }}
                            className="accent-pink-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-semibold text-slate-600">Sposta Y: {config.headwearPos.y}px</span>
                          <input
                            type="range"
                            min="-40"
                            max="40"
                            value={config.headwearPos.y}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setConfig(prev => ({ ...prev, headwearPos: { ...prev.headwearPos, y: v } }));
                            }}
                            className="accent-pink-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-semibold text-slate-600">Scala: {config.headwearPos.scale}x</span>
                          <input
                            type="range"
                            min="0.8"
                            max="1.3"
                            step="0.02"
                            value={config.headwearPos.scale}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              setConfig(prev => ({ ...prev, headwearPos: { ...prev.headwearPos, scale: v } }));
                            }}
                            className="accent-pink-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Eyewear section selection */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Occhiali / Visiera (Eyewear)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { key: 'none', label: 'Nessuno' },
                        { key: 'round', label: 'Tondi Retrò 👓' },
                        { key: 'nerd', label: 'Hipster Spessi' },
                        { key: 'heart', label: 'Lenti Cuore 💕' },
                        { key: 'bandage', label: 'Cerotto Anime' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, eyewearStyle: item.key as EyewearStyle }))}
                          className={`p-2.5 rounded-xl border text-center transition ${config.eyewearStyle === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hand Items Selection */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Oggetto in Mano (Handheld Items)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { key: 'none', label: 'Nessuno' },
                        { key: 'balloon', label: 'Palloncino 🎈' },
                        { key: 'icecream', label: 'Gelato 🍦' },
                        { key: 'wand', label: 'Bacchetta ⭐' },
                        { key: 'pet', label: 'Gattino 🐱' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, handItem: item.key as any }))}
                          className={`p-2.5 rounded-xl border text-center transition ${config.handItem === item.key ? 'bg-pink-50 border-pink-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Back Items Selection (Wings and Capes) */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Accessorio Posteriore / Ali (Back Items)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { key: 'none', label: 'Nessuno' },
                        { key: 'angel_wings', label: 'Ali d\'Angelo 👼' },
                        { key: 'demon_wings', label: 'Ali da Demone 😈' },
                        { key: 'butterfly_wings', label: 'Ali Farfalla 🦋' },
                        { key: 'cape', label: 'Mantello Regale' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, backItem: item.key as any }))}
                          className={`p-2.5 rounded-xl border text-center transition ${config.backItem === item.key ? 'bg-pink-50 border-pink-500 ring-1 ring-pink-500/10' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tails selection */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Coda Animale (Tails)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { key: 'none', label: 'Nessuno' },
                        { key: 'cat_tail', label: 'Coda Micio 🐱' },
                        { key: 'devil_tail', label: 'Coda Diavoletto' },
                        { key: 'bunny_tail', label: 'Coda Coniglio 🐇' },
                        { key: 'fox_tail', label: 'Coda di Volpe 🦊' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, tailStyle: item.key as any }))}
                          className={`p-2.5 rounded-xl border text-center transition ${config.tailStyle === item.key ? 'bg-pink-50 border-pink-500 ring-1 ring-pink-500/10' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customizable accessory colors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    
                    {/* Headwear color */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-slate-700">Colore Copricapo</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.headwearColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, headwearColor: e.target.value }))}
                          className="w-8 h-8 rounded border-none cursor-pointer"
                        />
                        <span className="text-xs font-mono font-medium text-slate-500">{config.headwearColor}</span>
                      </div>
                    </div>

                    {/* Handheld Item color */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-slate-700">Colore Oggetto o Dettagli</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.handItemColor}
                          onChange={(e) => setConfig(prev => ({ ...prev, handItemColor: e.target.value }))}
                          className="w-8 h-8 rounded border-none cursor-pointer"
                        />
                        <span className="text-xs font-mono font-medium text-slate-500">{config.handItemColor}</span>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}


              {/* TAB 6: BACKGROUNDS & SCENARIOS */}
              {activeTab === 'background' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                  
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-wider uppercase font-mono mb-1">Scenario & Sfondi</h3>
                    <p className="text-xs text-slate-500">Definisci l&apos;atmosfera dietro al tuo Chibi, configurando pattern e accoppiando gradienti.</p>
                  </div>

                  {/* Background styled choices */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Modelli Grafici dello Sfondo</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { key: 'none', label: 'Trasparente' },
                        { key: 'solid', label: 'Sfondo Solido' },
                        { key: 'circles', label: 'Cerchi Concentrici' },
                        { key: 'stars', label: 'Scintille & Luna 💫' },
                        { key: 'hearts', label: 'Cuori Volanti' },
                        { key: 'grid', label: 'Quadrettato Chic' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setConfig(prev => ({ ...prev, bgStyle: item.key as BackgroundStyle }))}
                          className={`p-3 rounded-2xl border text-center transition ${config.bgStyle === item.key ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-500/10' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                        >
                          <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors for Background (BgColor 1 and 2) */}
                  {config.bgStyle !== 'none' && (
                    <div className="flex flex-col gap-4">
                      
                      {/* Color 1 */}
                      <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Sfondo: Colore Primario</label>
                        
                        <div className="flex flex-wrap gap-2.5">
                          {BG_COLORS.map((item) => (
                            <button
                              key={item.value}
                              onClick={() => setConfig(prev => ({ ...prev, bgColor1: item.value }))}
                              className={`w-8 h-8 rounded-xl border relative shadow-sm transition active:scale-95 ${config.bgColor1 === item.value ? 'ring-2 ring-pink-500 ring-offset-1' : 'border-slate-350'}`}
                              style={{ backgroundColor: item.value }}
                              title={item.name}
                            >
                              {config.bgColor1 === item.value && <div className="w-2 h-2 bg-slate-900 rounded-full absolute top-1.5 left-1.5" />}
                            </button>
                          ))}
                          <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-2 bg-slate-50">
                            <Palette className="w-3.5 h-3.5 text-slate-400" />
                            <input
                              type="color"
                              value={config.bgColor1}
                              onChange={(e) => setConfig(prev => ({ ...prev, bgColor1: e.target.value }))}
                              className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Color 2 (only if gradient/pattern uses two colors) */}
                      {['circles', 'stars', 'hearts', 'grid'].includes(config.bgStyle) && (
                        <div className="flex flex-col gap-2.5">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Sfondo: Colore Elemento di Contrasto</label>
                          
                          <div className="flex flex-wrap gap-2.5">
                            {BG_COLORS.map((item) => (
                              <button
                                key={item.value}
                                onClick={() => setConfig(prev => ({ ...prev, bgColor2: item.value }))}
                                className={`w-8 h-8 rounded-xl border relative shadow-sm transition active:scale-95 ${config.bgColor2 === item.value ? 'ring-2 ring-pink-550 ring-offset-1' : 'border-slate-350'}`}
                                style={{ backgroundColor: item.value }}
                                title={item.name}
                              >
                                {config.bgColor2 === item.value && <div className="w-2 h-2 bg-slate-900 rounded-full absolute bottom-1.5 right-1.5" />}
                              </button>
                            ))}
                            <div className="flex items-center gap-1.5 border border-slate-200/80 rounded-xl px-1.5 bg-slate-50">
                              <Palette className="w-3.5 h-3.5 text-slate-400" />
                              <input
                                type="color"
                                value={config.bgColor2}
                                onChange={(e) => setConfig(prev => ({ ...prev, bgColor2: e.target.value }))}
                                className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </motion.div>
              )}

            </div>

            {/* Customizer Footer Guide */}
            <div className="bg-pink-50/40 border-t-4 border-pink-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-pink-600 font-bold uppercase tracking-tight">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-pink-500 animate-pulse" />
                Spaziatura, colori e forme sono completamente interattive!
              </span>
              <span className="font-mono text-[9px] bg-pink-100 text-pink-500 px-2.5 py-1 rounded-md font-black border border-pink-200">
                Tip: Clicca sul nome del Chibi per cambiarlo
              </span>
            </div>

          </section>

        </div>

      </main>

      {/* Decorative presentation space/Gallery Room */}
      <footer className="bg-pink-100 border-t-4 border-pink-200 mt-20 py-12 text-pink-750 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
          <p className="font-black text-pink-600 text-sm uppercase tracking-tight">Chibi Maker Studio Deluxe — Creato con Amore</p>
          <p className="text-pink-550 max-w-md mx-auto leading-relaxed font-medium uppercase text-[10px] tracking-wide">
            Personalizza ogni minimo dettaglio dei tuoi piccoli personaggi anime, sperimenta combinazioni selvagge, salva i tuoi design per modificarli in seguito e scarica file trasparenti o decorati perfetti per i tuoi profili social!
          </p>
          <div className="mt-4 text-pink-400 font-bold uppercase text-[9px] tracking-widest">
            • 2026 • Chibi Maker • Tutti i diritti generati sono tuoi!
          </div>
        </div>
      </footer>

    </div>
  );
}
