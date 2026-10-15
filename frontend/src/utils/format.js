export function formatINR(amount) {
  const n = Number(amount || 0);
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatNumber(amount, decimals = 2) {
  const n = Number(amount || 0);
  return n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatDateDMY(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr.length <= 10 ? dateStr + 'T00:00:00' : dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Map standard English item names to pristine Tamil
export const TAMIL_ITEM_MAP = {
  'tomato': 'தக்காளி',
  'ladies finger': 'வெண்டைக்காய்',
  'chilli': 'மிளகாய்',
  'green chilli': 'பச்சை மிளகாய்',
  'curry leaves': 'கருவேப்பிலை',
  'raw mango': 'மாங்காய்',
  'striped brinjal': 'வரி கத்தரி',
  'brinjal': 'கத்தரிக்காய்',
  'onion': 'வெங்காயம்',
  'spring onion': 'கொத்து வெங்காயம்',
  'potato': 'உருளைக்கிழங்கு',
  'carrot': 'கேரட்',
  'beans': 'பீன்ஸ்',
  'drumstick': 'முருங்கைக்காய்',
  'drumstick leaves': 'முருங்கை இலை',
  'avarai beans': 'அவரைக்காய்',
  'bitter gourd': 'பாகற்காய்',
  'ridge gourd': 'புடலங்காய்',
  'snake gourd': 'பீர்க்கங்காய்',
  'bottle gourd': 'சுரைக்காய்',
  'pumpkin': 'பூசணிக்காய்',
  'ash gourd': 'வெள்ளைப்பூசணி',
  'cucumber': 'வெள்ளரிக்காய்',
  'ivy gourd': 'கோவைக்காய்',
  'cluster beans': 'கொத்தவரங்காய்',
  'radish': 'முள்ளங்கி',
  'beetroot': 'பீட்ரூட்',
  'cauliflower': 'காலிஃபிளவர்',
  'cabbage': 'முட்டைக்கோஸ்',
  'coriander leaves': 'கொத்தமல்லி',
  'mint leaves': 'புதினா',
  'greens': 'கீரை',
  'ginger': 'இஞ்சி',
  'garlic': 'பூண்டு',
  'raw banana': 'வாழைக்காய்',
  'banana flower': 'வாழைப்பூ',
  'colocasia': 'சேப்பங்கிழங்கு',
  'tapioca': 'மரவள்ளிக்கிழங்கு',
  'elephant yam': 'கருணைக்கிழங்கு',
  'raw turmeric': 'மஞ்சள் கிழங்கு',
  'sweet corn': 'சோளம்',
  'green peas': 'பட்டாணி',
  'nelli': 'நெல்லிக்காய்',
  'gooseberry': 'நெல்லிக்காய்',
  'lemon': 'எலுமிச்சை',
  'lime': 'எலுமிச்சை',
  'lorry freight': 'லாரி வாடகை',
  'cooli': 'கூலி'
};

/**
 * Checks if a string contains Greek/CP1252 corrupted mojibake characters.
 */
export function isMojibake(str) {
  if (!str) return false;
  return /[\u0370-\u03ff\u1f00-\u1fff«¬»çñúíâ€™Ã]/.test(str) || str.includes('?');
}

/**
 * Returns clean Tamil / English combined name, safely recovering from encoding issues.
 */
export function cleanTamilItem(nameTa, nameEn) {
  const en = (nameEn || '').trim();
  const ta = (nameTa || '').trim();

  // If ta has no Tamil characters (U+0B80 to U+0BFF) or has mojibake / question marks
  const hasTamil = /[\u0B80-\u0BFF]/.test(ta);
  const isGarbled = isMojibake(ta) || !hasTamil;

  if (isGarbled) {
    const key = (en || ta).toLowerCase();
    const mapped = TAMIL_ITEM_MAP[key];
    const cleanEn = en || (key !== mapped ? ta : '');
    if (mapped) {
      return cleanEn ? `${mapped} / ${cleanEn}` : mapped;
    }
    if (hasTamil) return ta;
    return en || ta || '—';
  }

  if (en && en.toLowerCase() !== ta.toLowerCase()) {
    return `${ta} / ${en}`;
  }
  return ta || en || '—';
}

