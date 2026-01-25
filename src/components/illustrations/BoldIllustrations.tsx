// Bold line-art illustrations with realistic sketched details - Adult style

// Single character watermark for backgrounds
export function CharacterWatermark() {
  return (
    <svg viewBox="0 0 200 280" className="absolute right-0 bottom-0 h-full w-auto opacity-[0.15]" preserveAspectRatio="xMaxYMax meet">
      <g transform="translate(50, 20)">
        {/* Head and shoulders only - simplified silhouette */}
        
        {/* Shoulders/torso */}
        <path d="M20 180 L15 200 L18 240 L82 240 L85 200 L80 180 Q50 175 20 180" fill="#4B2E83" stroke="#1A1A2E" strokeWidth="3"/>
        
        {/* Neck */}
        <path d="M42 160 L40 175 L60 175 L58 160" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="3"/>
        
        {/* Head */}
        <ellipse cx="50" cy="120" rx="28" ry="32" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="3"/>
        
        {/* Hair - shoulder length */}
        <path d="M24 105 Q22 85 50 82 Q78 85 76 105" fill="#1A1A2E" stroke="#1A1A2E" strokeWidth="3"/>
        <path d="M22 105 L20 135 Q22 142 27 140" stroke="#1A1A2E" strokeWidth="3" fill="#1A1A2E"/>
        <path d="M78 105 L80 135 Q78 142 73 140" stroke="#1A1A2E" strokeWidth="3" fill="#1A1A2E"/>
        
        {/* Hair texture */}
        <path d="M28 112 Q32 108 36 112" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M40 108 Q45 104 50 108" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M54 108 Q59 104 64 108" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M68 112 Q72 108 76 112" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        
        {/* Ears */}
        <ellipse cx="22" cy="120" rx="5" ry="9" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <ellipse cx="78" cy="120" rx="5" ry="9" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        
        {/* Simplified face features */}
        {/* Eyebrows */}
        <path d="M34 110 Q39 108 44 110" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M56 110 Q61 108 66 110" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Eyes */}
        <ellipse cx="39" cy="118" rx="4" ry="5" fill="white" stroke="#1A1A2E" strokeWidth="2"/>
        <circle cx="39" cy="119" r="2.5" fill="#1A1A2E"/>
        <ellipse cx="61" cy="118" rx="4" ry="5" fill="white" stroke="#1A1A2E" strokeWidth="2"/>
        <circle cx="61" cy="119" r="2.5" fill="#1A1A2E"/>
        
        {/* Nose */}
        <path d="M50 118 L50 130 Q48 132 46 132" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        <ellipse cx="47" cy="132" rx="2.5" ry="2" fill="none" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Mouth - gentle smile */}
        <path d="M39 140 Q50 145 61 140" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M39 140 Q50 143 61 140" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
      </g>
    </svg>
  );
}

export function CoupleIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      {/* Man (left) - casual standing */}
      <g>
        {/* Sneakers - detailed */}
        <path d="M45 275 L65 275 L68 270 L68 265 L45 265 Z" fill="white" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M45 270 L65 270" stroke="#1A1A2E" strokeWidth="2"/>
        <circle cx="60" cy="272" r="1.5" fill="#1A1A2E"/>
        <path d="M70 275 L90 275 L93 270 L93 265 L70 265 Z" fill="white" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M70 270 L90 270" stroke="#1A1A2E" strokeWidth="2"/>
        <circle cx="85" cy="272" r="1.5" fill="#1A1A2E"/>
        
        {/* Jeans/Pants - with seams and pockets */}
        <path d="M50 175 L48 230 L45 265 L68 265 L65 230 L63 175" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M70 175 L72 230 L70 265 L93 265 L90 230 L88 175" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Seams */}
        <line x1="56" y1="175" x2="56" y2="265" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        <line x1="79" y1="175" x2="79" y2="265" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        {/* Pocket detail */}
        <path d="M52 190 Q55 192 58 190" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        
        {/* T-shirt with details */}
        <path d="M40 115 L38 140 L40 175 L100 175 L102 140 L100 115 Q70 108 40 115" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Shirt wrinkles */}
        <path d="M55 130 Q60 132 65 130" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M50 150 Q60 152 70 150" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        
        {/* Arms - detailed with hands */}
        <path d="M38 125 L25 140 L18 165" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Hand with fingers */}
        <ellipse cx="18" cy="168" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="15" y1="168" x2="13" y2="175" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="18" y1="168" x2="17" y2="176" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="21" y1="168" x2="21" y2="176" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        <path d="M102 125 L115 140 L122 160" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="122" cy="163" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="119" y1="163" x2="117" y2="170" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="122" y1="163" x2="121" y2="171" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="125" y1="163" x2="125" y2="171" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Neck */}
        <path d="M62 95 L60 110 L80 110 L78 95" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* V-neck detail */}
        <path d="M62 110 L70 118 L78 110" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Head - realistic proportions */}
        <ellipse cx="70" cy="70" rx="22" ry="26" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Detailed hair - textured short hair */}
        <path d="M50 58 Q48 42 70 40 Q92 42 90 58" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M52 50 Q55 45 58 48" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M62 46 Q65 42 68 46" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M72 46 Q75 42 78 46" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M82 48 Q85 45 88 48" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Ears */}
        <ellipse cx="48" cy="70" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        <ellipse cx="92" cy="70" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Detailed face */}
        {/* Eyebrows */}
        <path d="M58 63 Q62 61 66 63" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M74 63 Q78 61 82 63" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="62" cy="68" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="62" cy="69" r="2" fill="#1A1A2E"/>
        <ellipse cx="78" cy="68" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="78" cy="69" r="2" fill="#1A1A2E"/>
        {/* Nose */}
        <path d="M70 68 L70 78 Q68 80 66 80" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        <ellipse cx="67" cy="80" rx="2" ry="1.5" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
        {/* Mouth */}
        <path d="M62 86 Q70 90 78 86" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M62 86 Q70 88 78 86" stroke="#1A1A2E" strokeWidth="1" fill="none"/>
      </g>
      
      {/* Woman (middle) - casual standing in dress */}
      <g>
        {/* Casual flats/shoes */}
        <path d="M175 275 L195 275 L198 270 L198 265 L175 265 Z" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="175" y1="270" x2="195" y2="270" stroke="#1A1A2E" strokeWidth="1.5"/>
        <path d="M200 275 L220 275 L223 270 L223 265 L200 265 Z" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="200" y1="270" x2="220" y2="270" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Dress - A-line casual dress */}
        <path d="M175 135 L170 180 L165 220 L163 265 L175 265 L198 265 L220 265 L223 265 L235 265 L233 220 L228 180 L223 135 Q200 130 175 135" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Dress details - waistline */}
        <path d="M177 155 Q200 157 221 155" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Dress details - flowy lines */}
        <path d="M185 170 Q200 172 215 170" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M180 200 Q200 202 220 200" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M175 230 Q200 232 225 230" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        
        {/* Dress pleats/folds */}
        <line x1="186" y1="155" x2="170" y2="265" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.3"/>
        <line x1="200" y1="155" x2="200" y2="265" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.3"/>
        <line x1="214" y1="155" x2="228" y2="265" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.3"/>
        
        {/* Arms with hands */}
        <path d="M175 145 L162 160 L155 180" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="155" cy="183" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="152" y1="183" x2="150" y2="190" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="155" y1="183" x2="154" y2="191" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="158" y1="183" x2="158" y2="191" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        <path d="M223 145 L236 160 L243 178" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="243" cy="181" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="240" y1="181" x2="238" y2="188" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="243" y1="181" x2="242" y2="189" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="246" y1="181" x2="246" y2="189" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Neck */}
        <path d="M192 100 L190 115 L210 115 L208 100" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Dress neckline - connects smoothly to neck */}
        <path d="M190 115 L185 125 L175 135" stroke="#1A1A2E" strokeWidth="2.5" fill="none"/>
        <path d="M210 115 L213 125 L223 135" stroke="#1A1A2E" strokeWidth="2.5" fill="none"/>
        <path d="M190 115 Q200 120 210 115" stroke="#1A1A2E" strokeWidth="2.5" fill="none"/>
        
        {/* Head */}
        <ellipse cx="200" cy="75" rx="22" ry="26" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Hair - shoulder length with texture */}
        <path d="M180 63 Q178 47 200 45 Q222 47 220 63" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M178 63 L176 85 Q178 90 182 88" stroke="#2D3561" strokeWidth="2.5" fill="#2D3561"/>
        <path d="M222 63 L224 85 Q222 90 218 88" stroke="#2D3561" strokeWidth="2.5" fill="#2D3561"/>
        {/* Hair texture */}
        <path d="M182 70 Q185 68 188 70" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M192 68 Q195 65 198 68" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M202 68 Q205 65 208 68" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M212 70 Q215 68 218 70" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        
        {/* Ears */}
        <ellipse cx="178" cy="75" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        <ellipse cx="222" cy="75" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Detailed face */}
        {/* Eyebrows */}
        <path d="M188 68 Q192 66 196 68" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M204 68 Q208 66 212 68" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="192" cy="73" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="192" cy="74" r="2" fill="#1A1A2E"/>
        <ellipse cx="208" cy="73" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="208" cy="74" r="2" fill="#1A1A2E"/>
        {/* Nose */}
        <path d="M200 73 L200 83 Q198 85 196 85" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        <ellipse cx="197" cy="85" rx="2" ry="1.5" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
        {/* Mouth */}
        <path d="M192 91 Q200 95 208 91" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M192 91 Q200 93 208 91" stroke="#1A1A2E" strokeWidth="1" fill="none"/>
      </g>
      
      {/* Woman (right) - professional standing */}
      <g>
        {/* Boots/shoes - detailed */}
        <path d="M295 275 L315 275 L318 268 L318 262 L295 262 Z" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="295" y1="268" x2="315" y2="268" stroke="#1A1A2E" strokeWidth="1.5"/>
        <path d="M320 275 L340 275 L343 268 L343 262 L320 262 Z" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="320" y1="268" x2="340" y2="268" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Pants - professional with details */}
        <path d="M300 180 L298 225 L295 262 L318 262 L315 225 L313 180" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M320 180 L322 225 L320 262 L343 262 L340 225 L338 180" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Seams */}
        <line x1="306" y1="180" x2="306" y2="262" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        <line x1="329" y1="180" x2="329" y2="262" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        {/* Pockets */}
        <path d="M302 195 L302 205 L310 205 L310 195" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        
        {/* Blouse/top with details */}
        <path d="M288 120 L285 145 L287 180 L351 180 L353 145 L350 120 Q319 113 288 120" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Shirt details */}
        <path d="M305 135 Q315 137 325 135" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M300 155 Q315 157 330 155" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        {/* Buttons */}
        <circle cx="319" cy="130" r="2" fill="none" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="319" cy="145" r="2" fill="none" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="319" cy="160" r="2" fill="none" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Arms with hands */}
        <path d="M285 135 L272 150 L265 170" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="265" cy="173" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="262" y1="173" x2="260" y2="180" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="265" y1="173" x2="264" y2="181" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="268" y1="173" x2="268" y2="181" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        <path d="M353 135 L366 150 L375 168" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="375" cy="171" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="372" y1="171" x2="370" y2="178" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="375" y1="171" x2="374" y2="179" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="378" y1="171" x2="378" y2="179" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Neck */}
        <path d="M312 100 L310 115 L328 115 L326 100" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Collar */}
        <path d="M310 115 L312 120 L319 118 L326 120 L328 115" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Head */}
        <ellipse cx="319" cy="75" rx="22" ry="26" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Detailed hair - ponytail/bun */}
        <path d="M299 63 Q297 47 319 45 Q341 47 339 63" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <ellipse cx="319" cy="48" rx="23" ry="12" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Hair texture */}
        <path d="M302 55 Q305 52 308 55" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M312 52 Q315 49 318 52" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M322 52 Q325 49 328 52" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        {/* Bun */}
        <circle cx="319" cy="48" r="8" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M313 48 Q319 52 325 48" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        
        {/* Ears */}
        <ellipse cx="297" cy="75" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        <ellipse cx="341" cy="75" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Detailed face */}
        {/* Eyebrows */}
        <path d="M307 68 Q311 66 315 68" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M323 68 Q327 66 331 68" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="311" cy="73" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="311" cy="74" r="2" fill="#1A1A2E"/>
        <ellipse cx="327" cy="73" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="327" cy="74" r="2" fill="#1A1A2E"/>
        {/* Nose */}
        <path d="M319 73 L319 83 Q317 85 315 85" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        <ellipse cx="316" cy="85" rx="2" ry="1.5" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
        {/* Mouth */}
        <path d="M311 91 Q319 94 327 91" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M311 91 Q319 93 327 91" stroke="#1A1A2E" strokeWidth="1" fill="none"/>
      </g>
      
      {/* Decorative elements - non-romantic */}
      <circle cx="25" cy="50" r="8" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="2"/>
      <circle cx="375" cy="60" r="6" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="2"/>
      <rect x="355" y="220" width="12" height="12" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2" transform="rotate(15 361 226)"/>
      <circle cx="30" cy="230" r="5" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2"/>
    </svg>
  );
}

export function ShieldIllustration() {
  return (
    <svg viewBox="0 0 300 250" className="w-full h-auto">
      {/* Large shield */}
      <path 
        d="M150,40 L100,70 L100,130 Q100,180 150,210 Q200,180 200,130 L200,70 Z" 
        fill="#6C5CE7" 
        stroke="#1A1A2E" 
        strokeWidth="4"
      />
      {/* Lock symbol */}
      <rect x="135" y="120" width="30" height="35" rx="5" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="150" cy="135" r="6" fill="#1A1A2E"/>
      <line x1="150" y1="135" x2="150" y2="145" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round"/>
      <path d="M135,120 L135,105 Q135,90 150,90 Q165,90 165,105 L165,120" stroke="#1A1A2E" strokeWidth="3" fill="none"/>
      
      {/* Checkmark */}
      <path d="M120,90 L130,100 L155,70" stroke="#4ECDC4" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Stars around */}
      <path d="M60,100 l4,0 l1,-4 l1,4 l4,0 l-3,3 l1,4 l-3,-2 l-3,2 l1,-4 z" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="2"/>
      <path d="M230,120 l4,0 l1,-4 l1,4 l4,0 l-3,3 l1,4 l-3,-2 l-3,2 l1,-4 z" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2"/>
    </svg>
  );
}

export function ThinkingPersonIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-auto">
      {/* Person in contemplative pose */}
      <g>
        {/* Sneakers */}
        <path d="M130 280 L150 280 L153 275 L153 270 L130 270 Z" fill="white" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M130 275 L150 275" stroke="#1A1A2E" strokeWidth="2"/>
        <circle cx="145" cy="277" r="1.5" fill="#1A1A2E"/>
        
        <path d="M155 280 L175 280 L178 275 L178 270 L155 270 Z" fill="white" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M155 275 L175 275" stroke="#1A1A2E" strokeWidth="2"/>
        <circle cx="170" cy="277" r="1.5" fill="#1A1A2E"/>
        
        {/* Pants */}
        <path d="M135 185 L133 235 L130 270 L153 270 L150 235 L148 185" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M155 185 L157 235 L155 270 L178 270 L175 235 L173 185" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="141" y1="185" x2="141" y2="270" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        <line x1="164" y1="185" x2="164" y2="270" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        
        {/* Hoodie/casual top */}
        <path d="M125 125 L120 155 L125 185 L185 185 L190 155 L185 125 Q155 118 125 125" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M140 140 Q155 142 170 140" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M135 165 Q155 167 175 165" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        {/* Hoodie pocket */}
        <path d="M140 160 L140 175 L170 175 L170 160" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Right arm down */}
        <path d="M120 140 L110 165 L105 185" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="105" cy="188" rx="6" ry="8" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2"/>
        
        {/* Left arm - hand on chin thinking pose */}
        <path d="M185 140 L175 155 L165 125" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="165" cy="122" rx="7" ry="9" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="162" y1="122" x2="160" y2="129" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="165" y1="122" x2="164" y2="130" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="168" y1="122" x2="168" y2="130" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Neck */}
        <path d="M147 105 L145 120 L165 120 L163 105" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        {/* Hood/collar */}
        <path d="M145 120 L148 125 L155 123 L162 125 L165 120" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Head */}
        <ellipse cx="155" cy="80" rx="23" ry="27" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Hair - casual messy */}
        <path d="M134 68 Q132 50 155 48 Q178 50 176 68" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M138 60 Q142 55 146 60" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M148 57 Q152 52 156 57" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M158 57 Q162 52 166 57" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M168 60 Q172 55 176 60" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Ears */}
        <ellipse cx="132" cy="80" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        <ellipse cx="178" cy="80" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Thoughtful face */}
        {/* Eyebrows - slightly concerned */}
        <path d="M142 73 Q146 71 150 73" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M160 73 Q164 71 168 73" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Eyes - looking slightly away */}
        <ellipse cx="146" cy="78" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="145" cy="79" r="2" fill="#1A1A2E"/>
        <ellipse cx="164" cy="78" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="163" cy="79" r="2" fill="#1A1A2E"/>
        {/* Nose */}
        <path d="M155 78 L155 88 Q153 90 151 90" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        <ellipse cx="152" cy="90" rx="2" ry="1.5" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
        {/* Mouth - neutral/thinking */}
        <path d="M147 96 Q155 98 163 96" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
      
      {/* Thought bubbles */}
      <circle cx="210" cy="70" r="15" fill="white" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="240" cy="50" r="20" fill="white" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="220" cy="40" r="8" fill="white" stroke="#1A1A2E" strokeWidth="2"/>
      
      {/* Question mark in bubble */}
      <text x="233" y="60" fontSize="24" fill="#6C5CE7" fontWeight="bold">?</text>
      
      {/* Sparkles */}
      <circle cx="80" cy="80" r="6" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2"/>
      <circle cx="70" cy="120" r="4" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="2"/>
    </svg>
  );
}

export function TrendUpIllustration() {
  return (
    <svg viewBox="0 0 300 250" className="w-full h-auto">
      {/* Graph lines */}
      <line x1="50" y1="200" x2="50" y2="50" stroke="#1A1A2E" strokeWidth="3"/>
      <line x1="50" y1="200" x2="270" y2="200" stroke="#1A1A2E" strokeWidth="3"/>
      
      {/* Trend line going up */}
      <path 
        d="M60,180 L100,160 L140,140 L180,100 L220,70 L260,50" 
        stroke="#6C5CE7" 
        strokeWidth="4" 
        fill="none" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points */}
      <circle cx="60" cy="180" r="8" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="100" cy="160" r="8" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="140" cy="140" r="8" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="180" cy="100" r="8" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="220" cy="70" r="8" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="260" cy="50" r="8" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="3"/>
      
      {/* Arrow at end */}
      <path d="M260,50 l-10,5 l3,-5 l-3,-5 z" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2"/>
      
      {/* Happy face icon */}
      <circle cx="240" cy="170" r="25" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="3"/>
      <circle cx="232" cy="165" r="3" fill="#1A1A2E"/>
      <circle cx="248" cy="165" r="3" fill="#1A1A2E"/>
      <path d="M230,178 Q240,185 250,178" stroke="#1A1A2E" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function ConversationIllustration() {
  return (
    <svg viewBox="0 0 320 300" className="w-full h-auto">
      {/* Two adults in casual conversation */}
      
      {/* Left person */}
      <g>
        {/* Shoes */}
        <path d="M65 280 L82 280 L85 275 L85 270 L65 270 Z" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="65" y1="275" x2="82" y2="275" stroke="#1A1A2E" strokeWidth="1.5"/>
        <path d="M88 280 L105 280 L108 275 L108 270 L88 270 Z" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="88" y1="275" x2="105" y2="275" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Pants */}
        <path d="M70 185 L68 235 L65 270 L85 270 L82 235 L80 185" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M88 185 L90 235 L88 270 L108 270 L105 235 L103 185" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="76" y1="185" x2="76" y2="270" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        <line x1="96" y1="185" x2="96" y2="270" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        
        {/* Shirt */}
        <path d="M60 130 L57 160 L60 185 L115 185 L118 160 L115 130 Q87 123 60 130" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M75 145 Q87 147 100 145" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        
        {/* Arms */}
        <path d="M57 145 L45 160 L38 178" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="38" cy="181" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="35" y1="181" x2="33" y2="188" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="38" y1="181" x2="37" y2="189" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        <path d="M118 145 L128 158 L133 172" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="133" cy="175" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        
        {/* Neck */}
        <path d="M82 110 L80 125 L98 125 L96 110" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M80 125 L83 130 L88 128 L93 130 L96 125" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Head */}
        <ellipse cx="88" cy="85" rx="21" ry="25" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Hair */}
        <path d="M69 73 Q67 55 88 53 Q109 55 107 73" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M72 65 Q75 61 78 65" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M82 62 Q85 58 88 62" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        <path d="M92 62 Q95 58 98 62" stroke="#2D3561" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Ears */}
        <ellipse cx="67" cy="85" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        <ellipse cx="109" cy="85" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Face */}
        <path d="M79 78 Q82 76 85 78" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M91 78 Q94 76 97 78" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx="82" cy="83" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="82" cy="84" r="2" fill="#1A1A2E"/>
        <ellipse cx="94" cy="83" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="94" cy="84" r="2" fill="#1A1A2E"/>
        <path d="M88 83 L88 93 Q86 95 84 95" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        <ellipse cx="85" cy="95" rx="2" ry="1.5" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
        <path d="M81 101 Q88 104 95 101" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
      
      {/* Right person */}
      <g>
        {/* Shoes */}
        <path d="M215 280 L232 280 L235 275 L235 270 L215 270 Z" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="215" y1="275" x2="232" y2="275" stroke="#1A1A2E" strokeWidth="1.5"/>
        <path d="M238 280 L255 280 L258 275 L258 270 L238 270 Z" fill="#6C5CE7" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="238" y1="275" x2="255" y2="275" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Pants */}
        <path d="M220 185 L218 235 L215 270 L235 270 L232 235 L230 185" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M238 185 L240 235 L238 270 L258 270 L255 235 L253 185" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <line x1="226" y1="185" x2="226" y2="270" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        <line x1="246" y1="185" x2="246" y2="270" stroke="#1A1A2E" strokeWidth="1.5" opacity="0.4"/>
        
        {/* Shirt */}
        <path d="M210 135 L207 160 L210 185 L268 185 L271 160 L268 135 Q239 128 210 135" fill="#FF6B6B" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M225 150 Q239 152 253 150" stroke="#1A1A2E" strokeWidth="1.5" fill="none" opacity="0.3"/>
        
        {/* Arms */}
        <path d="M207 150 L195 165 L188 180" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="188" cy="183" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        
        <path d="M271 150 L283 165 L290 180" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="290" cy="183" rx="6" ry="8" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2"/>
        <line x1="287" y1="183" x2="285" y2="190" stroke="#1A1A2E" strokeWidth="1.5"/>
        <line x1="290" y1="183" x2="289" y2="191" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Neck */}
        <path d="M232 115 L230 130 L248 130 L246 115" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M230 130 L233 135 L239 133 L245 135 L248 130" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
        
        {/* Head */}
        <ellipse cx="239" cy="90" rx="21" ry="25" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="2.5"/>
        
        {/* Hair - different style */}
        <path d="M220 78 Q218 60 239 58 Q260 60 258 78" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <ellipse cx="239" cy="63" rx="22" ry="11" fill="#2D3561" stroke="#1A1A2E" strokeWidth="2.5"/>
        <path d="M223 70 Q226 66 229 70" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M233 67 Q236 63 239 67" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        
        {/* Ears */}
        <ellipse cx="218" cy="90" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        <ellipse cx="260" cy="90" rx="4" ry="7" fill="#FFC4A3" stroke="#1A1A2E" strokeWidth="1.5"/>
        
        {/* Face */}
        <path d="M230 83 Q233 81 236 83" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M242 83 Q245 81 248 83" stroke="#2D3561" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx="233" cy="88" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="233" cy="89" r="2" fill="#1A1A2E"/>
        <ellipse cx="245" cy="88" rx="3" ry="4" fill="white" stroke="#1A1A2E" strokeWidth="1.5"/>
        <circle cx="245" cy="89" r="2" fill="#1A1A2E"/>
        <path d="M239 88 L239 98 Q237 100 235 100" stroke="#1A1A2E" strokeWidth="1.5" fill="none"/>
        <ellipse cx="236" cy="100" rx="2" ry="1.5" fill="none" stroke="#1A1A2E" strokeWidth="1"/>
        <path d="M232 106 Q239 109 246 106" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
      
      {/* Speech bubbles */}
      <g>
        <rect x="110" y="55" width="85" height="50" rx="12" fill="white" stroke="#1A1A2E" strokeWidth="3"/>
        <path d="M110,75 L95,88 L110,88" fill="white" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round"/>
        <line x1="120" y1="70" x2="185" y2="70" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round"/>
        <line x1="120" y1="82" x2="175" y2="82" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round"/>
        <line x1="120" y1="94" x2="180" y2="94" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round"/>
        
        <rect x="125" y="130" width="85" height="50" rx="12" fill="white" stroke="#1A1A2E" strokeWidth="3"/>
        <path d="M210,150 L225,163 L210,163" fill="white" stroke="#1A1A2E" strokeWidth="3" strokeLinejoin="round"/>
        <line x1="135" y1="145" x2="200" y2="145" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round"/>
        <line x1="135" y1="157" x2="195" y2="157" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round"/>
        <line x1="135" y1="169" x2="190" y2="169" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round"/>
      </g>
      
      {/* Decorative elements */}
      <circle cx="30" cy="90" r="6" fill="#FFD93D" stroke="#1A1A2E" strokeWidth="2"/>
      <circle cx="295" cy="120" r="5" fill="#4ECDC4" stroke="#1A1A2E" strokeWidth="2"/>
    </svg>
  );
}

// Decorative pattern elements
export function PatternDots() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="#1A1A2E"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"/>
      </svg>
    </div>
  );
}

export function PatternWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-15">
      <svg viewBox="0 0 1200 120" className="w-full" preserveAspectRatio="none">
        <path d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 L1200,120 L0,120 Z" fill="#1A1A2E"/>
      </svg>
    </div>
  );
}
