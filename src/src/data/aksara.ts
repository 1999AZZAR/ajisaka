import type { Point } from '../engine/geometry'
import nglegenaContours from './nglegena_contours.json'
import sandanganContours from './sandangan_contours.json'
import pasanganContours from './pasangan_contours.json'
import rekanContours from './rekan_contours.json'

export type AksaraType = 'nglegena' | 'sandangan' | 'pasangan' | 'rekan' | 'murda' | 'swara' | 'angka'

export interface AksaraGlyph {
  id: string
  type: AksaraType
  label: string
  hint: string
  unicode: string
  /** True glyph outline from the font, Y-corrected (0..1 box, y down). */
  contour: Point[][]
  closed: true
}

type ContourEntry = { id: string; unicode: string; contour: unknown; roman?: string }

const HINTS: Record<string, string> = {
  ha: 'Kail besar: lengkung luar lalu dalam',
  na: 'Garis tegak dengan kepala melebar',
  ca: 'Bilah tajam dengan pengait',
  ra: 'Kepala kecil lalu batang turun',
  ka: 'Dua tonjolan seperti gapura',
  da: 'Lengkung bulat berpondasi pendek',
  ta: 'Tiang tegak berkepala besar',
  sa: 'Tiga gelombang menggantung',
  wa: 'Alunan lembut seperti ombak',
  la: 'Batang tegak berkepala lonjong',
  pa: 'Sayap melebar ke bawah',
  dha: 'Perut besar berekor pendek',
  ja: 'Bilah ramping menekuk',
  ya: 'Daun runcing bertangkai',
  nya: 'Dua lengkung tumpul sejajar',
  ma: 'Cekungan seperti pelana',
  ga: 'Siku tumpul lalu tungkai',
  ba: 'Cangkir bergagang',
  tha: 'Tiang berkepala melengkung',
  nga: 'Gelombang berkaki tegak',
  // sandangan
  wulu: 'Tanda vokal i — tulis kecil di atas',
  suku: 'Tanda vokal u — ekor kecil',
  pepet: 'Tanda vokal e — tumpul di atas',
  taling: 'Tanda vokal è — di kiri',
  tarung: 'Tanda vokal o — menggantung',
  cecak: 'Tanda ng — di atas',
  layar: 'Tanda r — di atas',
  wignyan: 'Tanda h — di atas',
  // rekan
  kha: 'Ka dengan tiga titik di atas',
  dza: 'Da dengan tiga titik di atas',
  fa: 'Pa dengan tiga titik di atas',
  za: 'Ja dengan tiga titik di atas',
  gha: 'Ga dengan tiga titik di atas',
}

function decodeUnicode(u: string): string {
  const m = /^\\u([0-9A-Fa-f]{4})$/.exec(u)
  return m ? String.fromCodePoint(parseInt(m[1], 16)) : u
}

function build(entry: ContourEntry, type: AksaraType, label?: string, roman?: string): AksaraGlyph {
  let u = decodeUnicode(entry.unicode)
  
  if (type === 'pasangan') {
    if (entry.id === 'ra') {
      u = '\uA9BF' // Cakra is the pasangan for Ra
    } else if (entry.id === 'ya') {
      u = '\uA9BE' // Pengkal is the pasangan for Ya
    } else if (!entry.unicode || entry.unicode === '\\u0000') {
      const baseId = entry.id.replace('.pas', '')
      const base = (nglegenaContours as ContourEntry[]).find(n => n.id === baseId)
      if (base) u = '\uA9C0' + decodeUnicode(base.unicode)
    }
  }

  // Prepend Dotted Circle (\u25CC) to sandangan so they render nicely.
  // Prepend ZWJ (\u200D) to pasangan so they shape into their subjoined form standalone!
  const isMedialSign = type === 'pasangan' && (entry.id === 'ra' || entry.id === 'ya')
  const displayUnicode = (type === 'sandangan' || isMedialSign)
    ? '\u25CC' + u 
    : (type === 'pasangan' ? '\u200D' + u : u)

  return {
    id: entry.id,
    type,
    label: label ?? entry.id,
    hint: type === 'pasangan' ? `Ikuti bentuk pasangan ${entry.id}` : (HINTS[entry.id] ?? (type === 'sandangan' ? `Tanda baca ${roman ?? entry.id}` : 'Ikuti bentuk huruf')),
    unicode: displayUnicode,
    contour: entry.contour as unknown as Point[][],
    closed: true,
  }
}

export const NGGLEGENA: AksaraGlyph[] = (nglegenaContours as ContourEntry[]).map((e) => build(e, 'nglegena'))
export const SANDANGAN: AksaraGlyph[] = [
  ...(sandanganContours as (ContourEntry & { roman?: string })[]).map((e) =>
    build(e, 'sandangan', `${e.id} ${e.roman ? `(${e.roman})` : ''}`.trim(), e.roman),
  ),
  ...[
    { id: 'pangkon', unicode: '꧀' },
    { id: 'pada lingsa', unicode: '꧈' },
    { id: 'pada lungsi', unicode: '꧉' },
    { id: 'pada pangkat', unicode: '꧇' },
    { id: 'pada adeg-adeg', unicode: '꧋' },
    { id: 'cakra ra', unicode: 'ꦿ' },
    { id: 'cakra keret', unicode: 'ꦽ' },
    { id: 'cakra la', unicode: '\u200D\uA9C0\uA9AD' },
    { id: 'cakra wa', unicode: '\u200D\uA9C0\uA9AE' },
    { id: 'pengkal', unicode: 'ꦾ' },
    { id: 'pa ceret', unicode: 'ꦉ' },
    { id: 'nga lelet', unicode: 'ꦊ' },
  ].map((e) => build({ ...e, contour: [] }, 'sandangan', e.id)),
]
export const PASANGAN: AksaraGlyph[] = (pasanganContours as ContourEntry[]).map((e) =>
  build(e, 'pasangan', `${e.id} (pasangan)`),
)
const REKAN: AksaraGlyph[] = (rekanContours as ContourEntry[]).map((e) => build(e, 'rekan'))

const MURDA: AksaraGlyph[] = [
  { id: 'na.murda', unicode: 'ꦟ' },
  { id: 'ka.murda', unicode: 'ꦑ' },
  { id: 'ta.murda', unicode: 'ꦡ' },
  { id: 'sa.murda', unicode: 'ꦯ' },
  { id: 'pa.murda', unicode: 'ꦦ' },
  { id: 'nya.murda', unicode: 'ꦘ' },
  { id: 'ga.murda', unicode: 'ꦓ' },
].map((e) => build({ ...e, contour: [] }, 'murda', `${e.id.replace('.murda', '')} (murda)`))

const SWARA: AksaraGlyph[] = [
  { id: 'A', unicode: 'ꦄ' },
  { id: 'I', unicode: 'ꦆ' },
  { id: 'U', unicode: 'ꦈ' },
  { id: 'E', unicode: 'ꦌ' },
  { id: 'O', unicode: 'ꦎ' },
].map((e) => build({ ...e, contour: [] }, 'swara', `${e.id} (swara)`))

const ANGKA: AksaraGlyph[] = [
  { id: '1', unicode: '꧑' },
  { id: '2', unicode: '꧒' },
  { id: '3', unicode: '꧓' },
  { id: '4', unicode: '꧔' },
  { id: '5', unicode: '꧕' },
  { id: '6', unicode: '꧖' },
  { id: '7', unicode: '꧗' },
  { id: '8', unicode: '꧘' },
  { id: '9', unicode: '꧙' },
  { id: '0', unicode: '꧐' },
].map((e) => build({ ...e, contour: [] }, 'angka', `Angka ${e.id}`))

export const LIBRARY: Record<AksaraType, AksaraGlyph[]> = {
  nglegena: NGGLEGENA,
  sandangan: SANDANGAN,
  pasangan: PASANGAN,
  rekan: REKAN,
  murda: MURDA,
  swara: SWARA,
  angka: ANGKA,
}

/** Level 1: 10 Aksara Dasar pertama (ha-la) */
export const STARTER_QUESTIONS = NGGLEGENA.slice(0, 10)

/** Level 2: Semua 8 Sandangan + 5 Rekan */
export const SANDANGAN_QUESTIONS = [...SANDANGAN, ...REKAN]

/** Level 3: 10 Pasangan pertama (ha-la) */
export const PASANGAN_QUESTIONS = PASANGAN.slice(0, 10)