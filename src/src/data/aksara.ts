import type { Point } from '../engine/geometry'
import nglegenaContours from './nglegena_contours.json'
import sandanganContours from './sandangan_contours.json'
import pasanganContours from './pasangan_contours.json'

export type AksaraType = 'nglegena' | 'sandangan' | 'pasangan'

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
}

function decodeUnicode(u: string): string {
  const m = /^\\u([0-9A-Fa-f]{4})$/.exec(u)
  return m ? String.fromCodePoint(parseInt(m[1], 16)) : u
}

function build(entry: ContourEntry, type: AksaraType, label?: string, roman?: string): AksaraGlyph {
  let u = decodeUnicode(entry.unicode)
  
  if (type === 'pasangan') {
    // If the unicode is empty, construct it from Pangkon + base
    if (entry.unicode === '\\u0000') {
      const base = (nglegenaContours as ContourEntry[]).find(n => n.id === entry.id)
      if (base) u = '\uA9C0' + decodeUnicode(base.unicode)
    }
  }

  // Prepend Dotted Circle (\u25CC) to sandangan and pasangan so they render
  // correctly as standalone characters in the UI details without shifting or having 0-width.
  const displayUnicode = (type === 'sandangan' || type === 'pasangan') ? '\u25CC' + u : u

  return {
    id: entry.id,
    type,
    label: label ?? entry.id,
    hint: type === 'pasangan' ? `Ikuti bentuk pasangan ${entry.id}` : (HINTS[entry.id] ?? (type === 'sandangan' ? `Tanda baca ${roman ?? entry.id}` : 'Ikuti bentuk huruf')),
    unicode: displayUnicode,
    contour: entry.contour as unknown as Point[],
    closed: true,
  }
}

export const NGGLEGENA: AksaraGlyph[] = (nglegenaContours as ContourEntry[]).map((e) => build(e, 'nglegena'))
export const SANDANGAN: AksaraGlyph[] = (sandanganContours as (ContourEntry & { roman?: string })[]).map((e) =>
  build(e, 'sandangan', `${e.id} ${e.roman ? `(${e.roman})` : ''}`.trim(), e.roman),
)
export const PASANGAN: AksaraGlyph[] = (pasanganContours as ContourEntry[]).map((e) =>
  build(e, 'pasangan', `${e.id} (pasangan)`),
)

export const LIBRARY: Record<AksaraType, AksaraGlyph[]> = {
  nglegena: NGGLEGENA,
  sandangan: SANDANGAN,
  pasangan: PASANGAN,
}

/** Full ordered teaching set used by Level 1 (all 20 Nglegena). */
export const STARTER_QUESTIONS = NGGLEGENA

/** Level 2 set: Sandangan practice. */
export const SANDANGAN_QUESTIONS = SANDANGAN

/** Level 3 Fase 1: Pasangan practice. */
export const PASANGAN_QUESTIONS = PASANGAN