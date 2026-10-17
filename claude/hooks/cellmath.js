// core/vendor/pi-width.js
var ambiguousMinimalCodePoint = 161;
var ambiguousMaximumCodePoint = 1114109;
var ambiguousRanges = [161, 161, 164, 164, 167, 168, 170, 170, 173, 174, 176, 180, 182, 186, 188, 191, 198, 198, 208, 208, 215, 216, 222, 225, 230, 230, 232, 234, 236, 237, 240, 240, 242, 243, 247, 250, 252, 252, 254, 254, 257, 257, 273, 273, 275, 275, 283, 283, 294, 295, 299, 299, 305, 307, 312, 312, 319, 322, 324, 324, 328, 331, 333, 333, 338, 339, 358, 359, 363, 363, 462, 462, 464, 464, 466, 466, 468, 468, 470, 470, 472, 472, 474, 474, 476, 476, 593, 593, 609, 609, 708, 708, 711, 711, 713, 715, 717, 717, 720, 720, 728, 731, 733, 733, 735, 735, 768, 879, 913, 929, 931, 937, 945, 961, 963, 969, 1025, 1025, 1040, 1103, 1105, 1105, 8208, 8208, 8211, 8214, 8216, 8217, 8220, 8221, 8224, 8226, 8228, 8231, 8240, 8240, 8242, 8243, 8245, 8245, 8251, 8251, 8254, 8254, 8308, 8308, 8319, 8319, 8321, 8324, 8364, 8364, 8451, 8451, 8453, 8453, 8457, 8457, 8467, 8467, 8470, 8470, 8481, 8482, 8486, 8486, 8491, 8491, 8531, 8532, 8539, 8542, 8544, 8555, 8560, 8569, 8585, 8585, 8592, 8601, 8632, 8633, 8658, 8658, 8660, 8660, 8679, 8679, 8704, 8704, 8706, 8707, 8711, 8712, 8715, 8715, 8719, 8719, 8721, 8721, 8725, 8725, 8730, 8730, 8733, 8736, 8739, 8739, 8741, 8741, 8743, 8748, 8750, 8750, 8756, 8759, 8764, 8765, 8776, 8776, 8780, 8780, 8786, 8786, 8800, 8801, 8804, 8807, 8810, 8811, 8814, 8815, 8834, 8835, 8838, 8839, 8853, 8853, 8857, 8857, 8869, 8869, 8895, 8895, 8978, 8978, 9312, 9449, 9451, 9547, 9552, 9587, 9600, 9615, 9618, 9621, 9632, 9633, 9635, 9641, 9650, 9651, 9654, 9655, 9660, 9661, 9664, 9665, 9670, 9672, 9675, 9675, 9678, 9681, 9698, 9701, 9711, 9711, 9733, 9734, 9737, 9737, 9742, 9743, 9756, 9756, 9758, 9758, 9792, 9792, 9794, 9794, 9824, 9825, 9827, 9829, 9831, 9834, 9836, 9837, 9839, 9839, 9886, 9887, 9919, 9919, 9926, 9933, 9935, 9939, 9941, 9953, 9955, 9955, 9960, 9961, 9963, 9969, 9972, 9972, 9974, 9977, 9979, 9980, 9982, 9983, 10045, 10045, 10102, 10111, 11094, 11097, 12872, 12879, 57344, 63743, 65024, 65039, 65533, 65533, 127232, 127242, 127248, 127277, 127280, 127337, 127344, 127373, 127375, 127376, 127387, 127404, 917760, 917999, 983040, 1048573, 1048576, 1114109];
var fullwidthMinimalCodePoint = 12288;
var fullwidthMaximumCodePoint = 65510;
var fullwidthRanges = [12288, 12288, 65281, 65376, 65504, 65510];
var wideMinimalCodePoint = 4352;
var wideMaximumCodePoint = 262141;
var wideRanges = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];
var isInRange = (ranges, codePoint) => {
  let low = 0;
  let high = Math.floor(ranges.length / 2) - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = mid * 2;
    if (codePoint < ranges[i]) {
      high = mid - 1;
    } else if (codePoint > ranges[i + 1]) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
};
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
  let fastPathStart = ranges[0];
  let fastPathEnd = ranges[1];
  for (let index = 0; index < ranges.length; index += 2) {
    const start = ranges[index];
    const end = ranges[index + 1];
    if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) {
      return [start, end];
    }
    if (end - start > fastPathEnd - fastPathStart) {
      fastPathStart = start;
      fastPathEnd = end;
    }
  }
  return [fastPathStart, fastPathEnd];
}
var isAmbiguous = (codePoint) => {
  if (codePoint < ambiguousMinimalCodePoint || codePoint > ambiguousMaximumCodePoint) {
    return false;
  }
  return isInRange(ambiguousRanges, codePoint);
};
var isFullWidth = (codePoint) => {
  if (codePoint < fullwidthMinimalCodePoint || codePoint > fullwidthMaximumCodePoint) {
    return false;
  }
  return isInRange(fullwidthRanges, codePoint);
};
var isWide = (codePoint) => {
  if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) {
    return true;
  }
  if (codePoint < wideMinimalCodePoint || codePoint > wideMaximumCodePoint) {
    return false;
  }
  return isInRange(wideRanges, codePoint);
};
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}
var graphemeSegmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
var wordSegmenter = new Intl.Segmenter(void 0, { granularity: "word" });
function couldBeEmoji(segment) {
  const cp = segment.codePointAt(0);
  return cp >= 126976 && cp <= 130047 || cp >= 8960 && cp <= 9215 || cp >= 9728 && cp <= 10175 || cp >= 11088 && cp <= 11093 || segment.includes("\uFE0F") || segment.length > 2;
}
var zeroWidthRegex = /^(?:\p{Default_Ignorable_Code_Point}|\p{Control}|\p{Mark}|\p{Surrogate})+$/v;
var leadingNonPrintingRegex = /^[\p{Default_Ignorable_Code_Point}\p{Control}\p{Format}\p{Mark}\p{Surrogate}]+/v;
var nonPrintingCharRegex = /^(?:\p{Default_Ignorable_Code_Point}|\p{Control}|\p{Format}|\p{Mark}|\p{Surrogate})$/v;
var markCharRegex = /^\p{Mark}$/v;
var terminalSpacingMarkRegex = /^(?:[\p{Spacing_Mark}--[\u1734\u302E\u302F]]|[\u065F\u0F7F\u102B\u102C\u1031\u1033-\u1035\u1038\u103A-\u103E])+$/v;
var rgiEmojiRegex = /^\p{RGI_Emoji}$/v;
var WIDTH_CACHE_SIZE = 512;
var widthCache = /* @__PURE__ */ new Map();
var cjkBreakRegex = /[\p{Script_Extensions=Han}\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}\p{Script_Extensions=Hangul}\p{Script_Extensions=Bopomofo}]/u;
var cjkPunctuationRegex = new RegExp(`(?:(?=\\p{Punctuation})${cjkBreakRegex.source}|[\uFF0C\uFF0E\uFF1A\uFF1B\uFF01\uFF1F\uFF08\uFF09\uFF3B\uFF3D\uFF5B\uFF5D\u201C\u201D\u2018\u2019\u2026\u2014])`, "u");
var autocompleteSeparatorRegex = new RegExp(`(?:\\s|${cjkPunctuationRegex.source})`, "u");
var autocompleteBoundaryRegex = new RegExp(`(?:^|${autocompleteSeparatorRegex.source})`, "u");
function graphemeWidth(segment) {
  if (segment.length === 1) {
    const code = segment.charCodeAt(0);
    if (code >= 32 && code <= 126) return 1;
    if (code === 9) return 3;
  }
  if (terminalSpacingMarkRegex.test(segment)) {
    return [...segment].length;
  }
  if (zeroWidthRegex.test(segment)) {
    return 0;
  }
  if (couldBeEmoji(segment) && rgiEmojiRegex.test(segment)) {
    return 2;
  }
  const base = segment.replace(leadingNonPrintingRegex, "");
  const cp = base.codePointAt(0);
  if (cp === void 0) {
    return 0;
  }
  if (cp >= 127462 && cp <= 127487) {
    return 2;
  }
  let width = eastAsianWidth(cp);
  let followsMark = false;
  const chars = [...base];
  for (const char of chars.slice(1)) {
    if (terminalSpacingMarkRegex.test(char)) {
      width += 1;
      followsMark = false;
    } else if (markCharRegex.test(char)) {
      followsMark = true;
    } else if (!nonPrintingCharRegex.test(char)) {
      const c = char.codePointAt(0);
      if (followsMark || c >= 65280 && c <= 65519) {
        width += eastAsianWidth(c);
      } else if (c === 3635 || c === 3763) {
        width += 1;
      }
      followsMark = false;
    }
  }
  return width;
}
function visibleWidth(str) {
  if (str.length === 0) {
    return 0;
  }
  const asciiWidth = asciiVisibleWidth(str);
  if (asciiWidth !== -1) {
    return asciiWidth;
  }
  const cached = widthCache.get(str);
  if (cached !== void 0) {
    return cached;
  }
  let clean = str;
  if (str.includes("	")) {
    clean = clean.replace(/\t/g, "   ");
  }
  let escapeIndex = clean.indexOf("\x1B");
  if (escapeIndex !== -1) {
    let stripped = "";
    let copyFrom = 0;
    while (escapeIndex !== -1) {
      const length = ansiCodeLength(clean, escapeIndex);
      if (length > 0) {
        stripped += clean.slice(copyFrom, escapeIndex);
        escapeIndex += length;
        copyFrom = escapeIndex;
      } else {
        escapeIndex++;
      }
      escapeIndex = clean.indexOf("\x1B", escapeIndex);
    }
    clean = stripped + clean.slice(copyFrom);
  }
  let width = 0;
  for (const { segment } of graphemeSegmenter.segment(clean)) {
    width += graphemeWidth(segment);
  }
  if (widthCache.size >= WIDTH_CACHE_SIZE) {
    const firstKey = widthCache.keys().next().value;
    if (firstKey !== void 0) {
      widthCache.delete(firstKey);
    }
  }
  widthCache.set(str, width);
  return width;
}
function asciiVisibleWidth(str) {
  let width = 0;
  let i = 0;
  while (i < str.length) {
    const code = str.charCodeAt(i);
    if (code >= 32 && code <= 126) {
      width++;
      i++;
    } else if (code === 9) {
      width += 3;
      i++;
    } else if (code === 27) {
      const length = ansiCodeLength(str, i);
      if (length === 0) return -1;
      i += length;
    } else {
      return -1;
    }
  }
  return width;
}
function ansiCodeLength(str, pos) {
  if (pos >= str.length || str.charCodeAt(pos) !== 27) return 0;
  const next = str[pos + 1];
  if (next === "[") {
    for (let j = pos + 2; j < str.length; j++) {
      const c = str.charCodeAt(j);
      if (c === 109 || c === 71 || c === 75 || c === 72 || c === 74) return j + 1 - pos;
    }
    return 0;
  }
  if (next === "]" || next === "_") {
    for (let j = pos + 2; j < str.length; j++) {
      const c = str.charCodeAt(j);
      if (c === 7) return j + 1 - pos;
      if (c === 27 && str[j + 1] === "\\") return j + 2 - pos;
    }
    return 0;
  }
  return 0;
}
function parseOsc8Hyperlink(ansiCode) {
  if (!ansiCode.startsWith("\x1B]8;")) {
    return void 0;
  }
  const terminator = ansiCode.endsWith("\x07") ? "\x07" : "\x1B\\";
  const body = ansiCode.slice(4, terminator === "\x07" ? -1 : -2);
  const separatorIndex = body.indexOf(";");
  if (separatorIndex === -1) {
    return void 0;
  }
  const params = body.slice(0, separatorIndex);
  const url = body.slice(separatorIndex + 1);
  if (!url) {
    return null;
  }
  return { params, url, terminator };
}
function formatOsc8Hyperlink(hyperlink) {
  return `\x1B]8;${hyperlink.params};${hyperlink.url}${hyperlink.terminator}`;
}
function formatOsc8Close(terminator) {
  return `\x1B]8;;${terminator}`;
}
var AnsiCodeTracker = class {
  bold = false;
  dim = false;
  italic = false;
  underline = false;
  blink = false;
  inverse = false;
  hidden = false;
  strikethrough = false;
  fgColor = null;
  bgColor = null;
  activeHyperlink = null;
  process(ansiCode) {
    const hyperlink = parseOsc8Hyperlink(ansiCode);
    if (hyperlink !== void 0) {
      this.activeHyperlink = hyperlink;
      return;
    }
    if (!ansiCode.endsWith("m")) {
      return;
    }
    const match = ansiCode.match(/\x1b\[([\d;]*)m/);
    if (!match) return;
    const params = match[1];
    if (params === "" || params === "0") {
      this.reset();
      return;
    }
    const parts = params.split(";");
    let i = 0;
    while (i < parts.length) {
      const code = Number.parseInt(parts[i], 10);
      if (code === 38 || code === 48) {
        if (parts[i + 1] === "5" && parts[i + 2] !== void 0) {
          const colorCode = `${parts[i]};${parts[i + 1]};${parts[i + 2]}`;
          if (code === 38) {
            this.fgColor = colorCode;
          } else {
            this.bgColor = colorCode;
          }
          i += 3;
          continue;
        } else if (parts[i + 1] === "2" && parts[i + 4] !== void 0) {
          const colorCode = `${parts[i]};${parts[i + 1]};${parts[i + 2]};${parts[i + 3]};${parts[i + 4]}`;
          if (code === 38) {
            this.fgColor = colorCode;
          } else {
            this.bgColor = colorCode;
          }
          i += 5;
          continue;
        }
      }
      switch (code) {
        case 0:
          this.reset();
          break;
        case 1:
          this.bold = true;
          break;
        case 2:
          this.dim = true;
          break;
        case 3:
          this.italic = true;
          break;
        case 4:
          this.underline = true;
          break;
        case 5:
          this.blink = true;
          break;
        case 7:
          this.inverse = true;
          break;
        case 8:
          this.hidden = true;
          break;
        case 9:
          this.strikethrough = true;
          break;
        case 21:
          this.bold = false;
          break;
        case 22:
          this.bold = false;
          this.dim = false;
          break;
        case 23:
          this.italic = false;
          break;
        case 24:
          this.underline = false;
          break;
        case 25:
          this.blink = false;
          break;
        case 27:
          this.inverse = false;
          break;
        case 28:
          this.hidden = false;
          break;
        case 29:
          this.strikethrough = false;
          break;
        case 39:
          this.fgColor = null;
          break;
        case 49:
          this.bgColor = null;
          break;
        default:
          if (code >= 30 && code <= 37 || code >= 90 && code <= 97) {
            this.fgColor = String(code);
          } else if (code >= 40 && code <= 47 || code >= 100 && code <= 107) {
            this.bgColor = String(code);
          }
          break;
      }
      i++;
    }
  }
  reset() {
    this.bold = false;
    this.dim = false;
    this.italic = false;
    this.underline = false;
    this.blink = false;
    this.inverse = false;
    this.hidden = false;
    this.strikethrough = false;
    this.fgColor = null;
    this.bgColor = null;
  }
  clear() {
    this.reset();
    this.activeHyperlink = null;
  }
  getActiveCodes() {
    const codes = [];
    if (this.bold) codes.push("1");
    if (this.dim) codes.push("2");
    if (this.italic) codes.push("3");
    if (this.underline) codes.push("4");
    if (this.blink) codes.push("5");
    if (this.inverse) codes.push("7");
    if (this.hidden) codes.push("8");
    if (this.strikethrough) codes.push("9");
    if (this.fgColor) codes.push(this.fgColor);
    if (this.bgColor) codes.push(this.bgColor);
    let result = codes.length > 0 ? `\x1B[${codes.join(";")}m` : "";
    if (this.activeHyperlink) {
      result += formatOsc8Hyperlink(this.activeHyperlink);
    }
    return result;
  }
  getActiveBackgroundCode() {
    return this.bgColor ? `\x1B[${this.bgColor}m` : "";
  }
  hasActiveCodes() {
    return this.bold || this.dim || this.italic || this.underline || this.blink || this.inverse || this.hidden || this.strikethrough || this.fgColor !== null || this.bgColor !== null || this.activeHyperlink !== null;
  }
  getLineEndReset() {
    let result = "";
    if (this.underline) {
      result += "\x1B[24m";
    }
    if (this.activeHyperlink) {
      result += formatOsc8Close(this.activeHyperlink.terminator);
    }
    return result;
  }
};
var pooledStyleTracker = new AnsiCodeTracker();

// core/convert.ts
var SYMBOLS = {
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03F5",
  varepsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  vartheta: "\u03D1",
  iota: "\u03B9",
  kappa: "\u03BA",
  varkappa: "\u03F0",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  pi: "\u03C0",
  varpi: "\u03D6",
  rho: "\u03C1",
  varrho: "\u03F1",
  sigma: "\u03C3",
  varsigma: "\u03C2",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03D5",
  varphi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  Gamma: "\u0393",
  Delta: "\u0394",
  Theta: "\u0398",
  Lambda: "\u039B",
  Xi: "\u039E",
  Pi: "\u03A0",
  Sigma: "\u03A3",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Psi: "\u03A8",
  Omega: "\u03A9",
  pm: "\xB1",
  mp: "\u2213",
  times: "\xD7",
  div: "\xF7",
  cdot: "\xB7",
  ast: "\u2217",
  star: "\u22C6",
  circ: "\u2218",
  bullet: "\u2022",
  oplus: "\u2295",
  ominus: "\u2296",
  otimes: "\u2297",
  oslash: "\u2298",
  odot: "\u2299",
  bigcirc: "\u25CB",
  dagger: "\u2020",
  ddagger: "\u2021",
  amalg: "\u2A3F",
  uplus: "\u228E",
  sqcap: "\u2293",
  sqcup: "\u2294",
  bowtie: "\u22C8",
  Join: "\u22C8",
  ltimes: "\u22C9",
  rtimes: "\u22CA",
  leftouterjoin: "\u27D5",
  rightouterjoin: "\u27D6",
  fullouterjoin: "\u27D7",
  triangleleft: "\u25C1",
  triangleright: "\u25B7",
  wr: "\u2240",
  cap: "\u2229",
  cup: "\u222A",
  bigcap: "\u22C2",
  bigcup: "\u22C3",
  bigwedge: "\u22C0",
  bigvee: "\u22C1",
  bigsqcup: "\u2A06",
  biguplus: "\u2A04",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigodot: "\u2A00",
  setminus: "\u2216",
  in: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  subset: "\u2282",
  supset: "\u2283",
  subseteq: "\u2286",
  supseteq: "\u2287",
  sqsubset: "\u228F",
  sqsupset: "\u2290",
  sqsubseteq: "\u2291",
  sqsupseteq: "\u2292",
  prec: "\u227A",
  preceq: "\u227C",
  succ: "\u227B",
  succeq: "\u227D",
  ll: "\u226A",
  gg: "\u226B",
  le: "\u2264",
  leq: "\u2264",
  leqslant: "\u2264",
  ge: "\u2265",
  geq: "\u2265",
  geqslant: "\u2265",
  ne: "\u2260",
  neq: "\u2260",
  equiv: "\u2261",
  approx: "\u2248",
  sim: "\u223C",
  simeq: "\u2243",
  cong: "\u2245",
  asymp: "\u224D",
  doteq: "\u2250",
  propto: "\u221D",
  parallel: "\u2225",
  perp: "\u22A5",
  mid: "\u2223",
  vdash: "\u22A2",
  dashv: "\u22A3",
  models: "\u22A8",
  Vdash: "\u22A9",
  Vvdash: "\u22AA",
  nvdash: "\u22AC",
  nvDash: "\u22AD",
  forall: "\u2200",
  exists: "\u2203",
  nexists: "\u2204",
  neg: "\xAC",
  land: "\u2227",
  wedge: "\u2227",
  lor: "\u2228",
  vee: "\u2228",
  to: "\u2192",
  rightarrow: "\u2192",
  longrightarrow: "\u2192",
  leftarrow: "\u2190",
  longleftarrow: "\u2190",
  gets: "\u2190",
  leftrightarrow: "\u2194",
  longleftrightarrow: "\u2194",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  leftharpoonup: "\u21BC",
  leftharpoondown: "\u21BD",
  rightharpoonup: "\u21C0",
  rightharpoondown: "\u21C1",
  rightleftharpoons: "\u21CC",
  leftrightharpoons: "\u21CB",
  nearrow: "\u2197",
  searrow: "\u2198",
  swarrow: "\u2199",
  nwarrow: "\u2196",
  rightsquigarrow: "\u21DD",
  leadsto: "\u21DD",
  Rightarrow: "\u21D2",
  Longrightarrow: "\u21D2",
  Leftarrow: "\u21D0",
  Longleftarrow: "\u21D0",
  Leftrightarrow: "\u21D4",
  Longleftrightarrow: "\u21D4",
  implies: "\u21D2",
  iff: "\u21D4",
  mapsto: "\u21A6",
  longmapsto: "\u21A6",
  uparrow: "\u2191",
  downarrow: "\u2193",
  partial: "\u2202",
  nabla: "\u2207",
  int: "\u222B",
  iint: "\u222C",
  iiint: "\u222D",
  oint: "\u222E",
  sum: "\u2211",
  prod: "\u220F",
  coprod: "\u2210",
  infty: "\u221E",
  emptyset: "\u2205",
  varnothing: "\u2205",
  angle: "\u2220",
  therefore: "\u2234",
  because: "\u2235",
  aleph: "\u2135",
  beth: "\u2136",
  gimel: "\u2137",
  daleth: "\u2138",
  top: "\u22A4",
  bot: "\u22A5",
  triangle: "\u25B3",
  square: "\u25A1",
  lozenge: "\u25CA",
  checkmark: "\u2713",
  complement: "\u2201",
  wp: "\u2118",
  prime: "\u2032",
  ldots: "\u2026",
  dots: "\u2026",
  cdots: "\u22EF",
  vdots: "\u22EE",
  ddots: "\u22F1",
  ell: "\u2113",
  hbar: "\u210F",
  Im: "\u2111",
  Re: "\u211C",
  langle: "\u27E8",
  rangle: "\u27E9",
  vert: "|",
  lvert: "|",
  rvert: "|",
  Vert: "\u2016",
  lVert: "\u2016",
  rVert: "\u2016",
  lbrace: "{",
  rbrace: "}",
  backslash: "\\",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lceil: "\u2308",
  rceil: "\u2309",
  colon: ":"
};
var NAMED_OPERATORS = /* @__PURE__ */ new Set([
  "arccos",
  "arcsin",
  "arctan",
  "arg",
  "cos",
  "cosh",
  "cot",
  "coth",
  "csc",
  "deg",
  "det",
  "dim",
  "exp",
  "gcd",
  "hom",
  "inf",
  "ker",
  "lg",
  "lim",
  "liminf",
  "limsup",
  "ln",
  "log",
  "max",
  "min",
  "Pr",
  "sec",
  "sin",
  "sinh",
  "sup",
  "tan",
  "tanh"
]);
var LIMIT_OPERATORS = /* @__PURE__ */ new Set([
  "argmax",
  "argmin",
  "inf",
  "injlim",
  "lim",
  "liminf",
  "limsup",
  "max",
  "min",
  "projlim",
  "sup"
]);
var DISPLAY_LIMIT_SYMBOLS = /* @__PURE__ */ new Set([
  "bigcap",
  "bigcup",
  "bigodot",
  "bigoplus",
  "bigotimes",
  "bigsqcup",
  "biguplus",
  "bigvee",
  "bigwedge",
  "coprod",
  "int",
  "iint",
  "iiint",
  "oint",
  "prod",
  "sum"
]);
var RELATION_COMMANDS = /* @__PURE__ */ new Set([
  "Leftarrow",
  "Leftrightarrow",
  "Longleftarrow",
  "Longleftrightarrow",
  "Longrightarrow",
  "Rightarrow",
  "Join",
  "Vdash",
  "Vvdash",
  "approx",
  "asymp",
  "bowtie",
  "cong",
  "dashv",
  "fullouterjoin",
  "doteq",
  "downarrow",
  "equiv",
  "ge",
  "geq",
  "geqslant",
  "gets",
  "gg",
  "hookleftarrow",
  "hookrightarrow",
  "iff",
  "implies",
  "in",
  "leadsto",
  "le",
  "leftarrow",
  "leftharpoondown",
  "leftharpoonup",
  "leftrightarrow",
  "leftrightharpoons",
  "leftouterjoin",
  "leq",
  "leqslant",
  "ll",
  "longleftarrow",
  "longleftrightarrow",
  "longmapsto",
  "longrightarrow",
  "ltimes",
  "mapsto",
  "mid",
  "models",
  "ne",
  "nearrow",
  "neq",
  "ni",
  "notin",
  "nvdash",
  "nvDash",
  "nwarrow",
  "parallel",
  "perp",
  "prec",
  "preceq",
  "propto",
  "rightharpoondown",
  "rightharpoonup",
  "rightleftharpoons",
  "rightouterjoin",
  "rightarrow",
  "rightsquigarrow",
  "rtimes",
  "searrow",
  "sim",
  "simeq",
  "sqsubset",
  "sqsubseteq",
  "sqsupset",
  "sqsupseteq",
  "subset",
  "subseteq",
  "succ",
  "succeq",
  "supset",
  "supseteq",
  "swarrow",
  "to",
  "triangleleft",
  "triangleright",
  "twoheadleftarrow",
  "twoheadrightarrow",
  "uparrow",
  "vdash"
]);
var NEGATED_SYMBOLS = {
  "<": "\u226E",
  ">": "\u226F",
  "=": "\u2260",
  "\u2208": "\u2209",
  "\u220B": "\u220C",
  "\u2223": "\u2224",
  "\u2225": "\u2226",
  "\u223C": "\u2241",
  "\u2243": "\u2244",
  "\u2245": "\u2247",
  "\u2248": "\u2249",
  "\u2261": "\u2262",
  "\u2264": "\u2270",
  "\u2265": "\u2271",
  "\u227A": "\u2280",
  "\u227B": "\u2281",
  "\u2282": "\u2284",
  "\u2283": "\u2285",
  "\u2286": "\u2288",
  "\u2287": "\u2289",
  "\u22A2": "\u22AC",
  "\u22A8": "\u22AD",
  "\u2194": "\u21AE",
  "\u2190": "\u219A",
  "\u2192": "\u219B",
  "\u21D2": "\u21CF",
  "\u21D0": "\u21CD",
  "\u21D4": "\u21CE",
  "\u227C": "\u22E0",
  "\u227D": "\u22E1"
};
var SUPERSCRIPTS = {
  "0": "\u2070",
  "1": "\xB9",
  "2": "\xB2",
  "3": "\xB3",
  "4": "\u2074",
  "5": "\u2075",
  "6": "\u2076",
  "7": "\u2077",
  "8": "\u2078",
  "9": "\u2079",
  "+": "\u207A",
  "-": "\u207B",
  "=": "\u207C",
  "(": "\u207D",
  ")": "\u207E",
  a: "\u1D43",
  b: "\u1D47",
  c: "\u1D9C",
  d: "\u1D48",
  e: "\u1D49",
  f: "\u1DA0",
  g: "\u1D4D",
  h: "\u02B0",
  i: "\u2071",
  j: "\u02B2",
  k: "\u1D4F",
  l: "\u02E1",
  m: "\u1D50",
  n: "\u207F",
  o: "\u1D52",
  p: "\u1D56",
  r: "\u02B3",
  s: "\u02E2",
  t: "\u1D57",
  u: "\u1D58",
  v: "\u1D5B",
  w: "\u02B7",
  x: "\u02E3",
  y: "\u02B8",
  z: "\u1DBB",
  A: "\u1D2C",
  B: "\u1D2E",
  D: "\u1D30",
  E: "\u1D31",
  G: "\u1D33",
  H: "\u1D34",
  I: "\u1D35",
  J: "\u1D36",
  K: "\u1D37",
  L: "\u1D38",
  M: "\u1D39",
  N: "\u1D3A",
  O: "\u1D3C",
  P: "\u1D3E",
  R: "\u1D3F",
  T: "\u1D40",
  U: "\u1D41",
  V: "\u2C7D",
  W: "\u1D42",
  // No raised capitals exist for these; the lowercase forms share their shapes.
  C: "\u1D9C",
  S: "\u02E2",
  X: "\u02E3",
  Z: "\u1DBB",
  "\u03B1": "\u1D45",
  "\u03B2": "\u1D5D",
  "\u03B3": "\u1D5E",
  "\u03B4": "\u1D5F",
  "\u03B5": "\u1D4B",
  "\u03F5": "\u1D4B",
  "\u03B8": "\u1DBF",
  "\u03B9": "\u1DA5",
  "\u03C5": "\u1DB7",
  "\u03C6": "\u1D60",
  "\u03D5": "\u1D60",
  "\u03C7": "\u1D61",
  "*": "*",
  "\u2217": "*",
  "\u22C6": "\u22C6"
};
var SUBSCRIPTS = {
  "0": "\u2080",
  "1": "\u2081",
  "2": "\u2082",
  "3": "\u2083",
  "4": "\u2084",
  "5": "\u2085",
  "6": "\u2086",
  "7": "\u2087",
  "8": "\u2088",
  "9": "\u2089",
  "+": "\u208A",
  "-": "\u208B",
  "=": "\u208C",
  "(": "\u208D",
  ")": "\u208E",
  a: "\u2090",
  e: "\u2091",
  h: "\u2095",
  i: "\u1D62",
  j: "\u2C7C",
  k: "\u2096",
  l: "\u2097",
  m: "\u2098",
  n: "\u2099",
  o: "\u2092",
  p: "\u209A",
  r: "\u1D63",
  s: "\u209B",
  t: "\u209C",
  u: "\u1D64",
  v: "\u1D65",
  x: "\u2093",
  "\u03B2": "\u1D66",
  "\u03B3": "\u1D67",
  "\u03C1": "\u1D68",
  "\u03C6": "\u1D69",
  "\u03D5": "\u1D69",
  "\u03C7": "\u1D6A"
};
var SMALL_CAPITALS = {
  A: "\u1D00",
  B: "\u0299",
  C: "\u1D04",
  D: "\u1D05",
  E: "\u1D07",
  F: "\uA730",
  G: "\u0262",
  H: "\u029C",
  I: "\u026A",
  J: "\u1D0A",
  K: "\u1D0B",
  L: "\u029F",
  M: "\u1D0D",
  N: "\u0274",
  O: "\u1D0F",
  P: "\u1D18",
  Q: "\uA7AF",
  R: "\u0280",
  S: "\uA731",
  T: "\u1D1B",
  U: "\u1D1C",
  V: "\u1D20",
  W: "\u1D21",
  X: "x",
  Y: "\u028F",
  Z: "\u1D22"
};
var SMALL_SUBSCRIPTS = {
  ...Object.fromEntries(Object.entries(SUBSCRIPTS).filter(([key]) => !/[a-z]/.test(key))),
  ...SMALL_CAPITALS,
  ...Object.fromEntries(Object.entries(SMALL_CAPITALS).map(([key, value]) => [key.toLowerCase(), value]))
};
var MATH_ALPHABETS = {
  bold: { upper: 119808, lower: 119834, digit: 120782 },
  italic: { upper: 119860, lower: 119886, holes: { h: "\u210E" } },
  boldItalic: { upper: 119912, lower: 119938 },
  script: {
    upper: 119964,
    lower: 119990,
    holes: { B: "\u212C", E: "\u2130", F: "\u2131", H: "\u210B", I: "\u2110", L: "\u2112", M: "\u2133", R: "\u211B", e: "\u212F", g: "\u210A", o: "\u2134" }
  },
  fraktur: { upper: 120068, lower: 120094, holes: { C: "\u212D", H: "\u210C", I: "\u2111", R: "\u211C", Z: "\u2128" } },
  doubleStruck: {
    upper: 120120,
    lower: 120146,
    digit: 120792,
    holes: { C: "\u2102", H: "\u210D", N: "\u2115", P: "\u2119", Q: "\u211A", R: "\u211D", Z: "\u2124" }
  },
  sansSerif: { upper: 120224, lower: 120250, digit: 120802 },
  monospace: { upper: 120432, lower: 120458, digit: 120822 }
};
var ALPHABET_COMMANDS = {
  boldsymbol: "boldItalic",
  bm: "boldItalic",
  mathbb: "doubleStruck",
  mathbf: "bold",
  mathcal: "script",
  mathfrak: "fraktur",
  mathit: "italic",
  mathscr: "script",
  mathsf: "sansSerif",
  mathtt: "monospace"
};
var UPRIGHT_COMMANDS = /^(?:text|mbox$|mathrm$|mathup$|operatorname$)/;
var ITALIC_LETTER = /[\u{1d434}-\u{1d467}\u210e]/gu;
var ALPHANUMERIC_OR_MARKER = /\u{f0000}\d+\u{f0001}|[A-Za-z0-9]/gu;
function mathLetter(character, alphabet) {
  const { upper, lower, digit, holes } = MATH_ALPHABETS[alphabet];
  const hole = holes?.[character];
  if (hole !== void 0) {
    return hole;
  }
  const code = character.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCodePoint(upper + code - 65);
  }
  if (code >= 97 && code <= 122) {
    return String.fromCodePoint(lower + code - 97);
  }
  if (code >= 48 && code <= 57 && digit !== void 0) {
    return String.fromCodePoint(digit + code - 48);
  }
  return character;
}
function uprightLetters(value) {
  return value.replace(ITALIC_LETTER, (character) => {
    if (character === "\u210E") {
      return "h";
    }
    const offset = character.codePointAt(0) - 119860;
    return String.fromCharCode(offset < 26 ? 65 + offset : 97 + offset - 26);
  });
}
function toMathAlphabet(value, alphabet) {
  return uprightLetters(value).replace(ALPHANUMERIC_OR_MARKER, (match) => match.length > 1 ? match : mathLetter(match, alphabet));
}
var TALL_DELIMITERS = {
  "(": { top: "\u256D", middle: "\u2502", bottom: "\u2570" },
  ")": { top: "\u256E", middle: "\u2502", bottom: "\u256F" },
  "[": { top: "\u250C", middle: "\u2502", bottom: "\u2514" },
  "]": { top: "\u2510", middle: "\u2502", bottom: "\u2518" },
  "\u2308": { top: "\u250C", middle: "\u2502", bottom: "\u2502" },
  "\u2309": { top: "\u2510", middle: "\u2502", bottom: "\u2502" },
  "\u230A": { top: "\u2502", middle: "\u2502", bottom: "\u2514" },
  "\u230B": { top: "\u2502", middle: "\u2502", bottom: "\u2518" },
  "{": { top: "\u256D", middle: "\u2502", bottom: "\u2570", point: "\u2524", pair: ["\u256D", "\u2570"] },
  "}": { top: "\u256E", middle: "\u2502", bottom: "\u256F", point: "\u251C", pair: ["\u256E", "\u256F"] },
  "|": { top: "\u2502", middle: "\u2502", bottom: "\u2502" },
  "\u2016": { top: "\u2551", middle: "\u2551", bottom: "\u2551" }
};
function tallDelimiter(delimiter, height, baseline) {
  if (height < 3 || delimiter === "") {
    const blank = " ".repeat(visibleWidth(delimiter));
    return Array.from({ length: height }, (_, row) => row === baseline ? delimiter : blank);
  }
  return delimiterColumn(delimiter, height);
}
function delimiterColumn(delimiter, height) {
  if (height === 1) {
    return [delimiter];
  }
  if (delimiter === "\u27E8" || delimiter === "\u27E9") {
    const [upper, lower] = delimiter === "\u27E8" ? ["\u2571", "\u2572"] : ["\u2572", "\u2571"];
    const half = Math.floor(height / 2);
    return Array.from({ length: height }, (_, row) => height % 2 === 1 && row === half ? delimiter : row < half ? upper : lower);
  }
  const pieces = own(TALL_DELIMITERS, delimiter);
  if (!pieces) {
    const middle = Math.floor((height - 1) / 2);
    return Array.from({ length: height }, (_, row) => row === middle ? delimiter : " ");
  }
  if (height === 2 && pieces.pair) {
    return [...pieces.pair];
  }
  const point = pieces.point === void 0 ? -1 : Math.floor((height - 1) / 2);
  return Array.from({ length: height }, (_, row) => row === 0 ? pieces.top : row === height - 1 ? pieces.bottom : row === point ? pieces.point : pieces.middle);
}
function drawBrace(width, kind) {
  const [left, tick, right] = kind === "under" ? ["\u2570", "\u252C", "\u256F"] : ["\u256D", "\u2534", "\u256E"];
  if (width <= 1) {
    return tick;
  }
  if (width === 2) {
    return left + right;
  }
  const before = Math.floor((width - 3) / 2);
  return `${left}${"\u2500".repeat(before)}${tick}${"\u2500".repeat(width - 3 - before)}${right}`;
}
var COLUMN_MARK = "\u{F0006}";
var ALIGNMENT_ROW = /^\\\\(?:\s*\[[^\]]*\])?/;
var ALIGNMENT_CELL = /^&/;
var ALIGNMENT_GUTTER = 2;
function splitTopLevel(source, separator) {
  const parts = [];
  let depth = 0;
  let start = 0;
  let index = 0;
  while (index < source.length) {
    const match = depth === 0 ? separator.exec(source.slice(index)) : null;
    if (match) {
      parts.push(source.slice(start, index));
      index += match[0].length;
      start = index;
      continue;
    }
    const character = source[index];
    if (character === "\\") {
      const name = /^\\([A-Za-z]+|.)/.exec(source.slice(index))?.[1] ?? "";
      if (name === "left" || name === "begin") {
        depth++;
      }
      if (name === "right" || name === "end") {
        depth--;
      }
      index += name.length + 1;
      continue;
    }
    if (character === "{") {
      depth++;
    }
    if (character === "}") {
      depth--;
    }
    index++;
  }
  parts.push(source.slice(start));
  return parts;
}
var OVERLINE = "\x1B[53m";
var NO_OVERLINE = "\x1B[55m";
var SGR = /\x1b\[[0-9;:]*m/g;
function cellsOf(line) {
  const cells = [];
  let pending = "";
  for (const [token] of line.matchAll(/\x1b\[[0-9;:]*m|[\s\S]/gu)) {
    if (token.startsWith("\x1B")) {
      pending += token;
      continue;
    }
    cells.push(pending + token);
    pending = "";
  }
  if (pending) {
    if (cells.length > 0) {
      cells[cells.length - 1] += pending;
    } else {
      cells.push(pending);
    }
  }
  return cells;
}
function isColumnMark(cell) {
  return cell.replace(SGR, "") === COLUMN_MARK;
}
function cutColumnMarks(lines, count) {
  let grid = lines.map(cellsOf);
  const bounds = [];
  for (let mark = 0; mark < count; mark++) {
    const row = grid.findIndex((cells) => cells.some(isColumnMark));
    if (row < 0) {
      return void 0;
    }
    const column = grid[row].findIndex(isColumnMark);
    const span = grid[row][column + 1] === " " ? 2 : 1;
    if (grid.some((cells, other) => other !== row && cells.slice(column, column + span).some((cell) => cell !== " "))) {
      return void 0;
    }
    grid = grid.map((cells) => [...cells.slice(0, column), ...cells.slice(column + span)]);
    bounds.push(column);
  }
  if (grid.some((cells) => cells.some(isColumnMark))) {
    return void 0;
  }
  return { lines: grid.map((cells) => cells.join("")), bounds };
}
var TALL_OPERATORS = { "\u222B": ["\u256D", "\u2502", "\u256F"] };
var SPACING_COMMANDS = /* @__PURE__ */ new Set([
  ",",
  ":",
  ";",
  " ",
  ">",
  "enspace",
  "enskip",
  "medspace",
  "quad",
  "qquad",
  "thickspace",
  "thinspace"
]);
var NEGATIVE_SPACING_COMMANDS = /* @__PURE__ */ new Set(["!", "negmedspace", "negthickspace", "negthinspace"]);
var NEGATIVE_SPACE = "\0";
var FONT_SWITCH_COMMANDS = /* @__PURE__ */ new Set(["bf", "cal", "it", "rm", "sf", "sl", "tt"]);
var IGNORED_COMMANDS = /* @__PURE__ */ new Set([
  "displaystyle",
  "limits",
  "nonumber",
  "notag",
  "nolimits",
  "scriptstyle",
  "scriptscriptstyle",
  "textstyle"
]);
var SIZE_COMMANDS = /* @__PURE__ */ new Set([
  "big",
  "Big",
  "bigg",
  "Bigg",
  "bigl",
  "Bigl",
  "biggl",
  "Biggl",
  "bigr",
  "Bigr",
  "biggr",
  "Biggr"
]);
var PLAIN_WRAPPERS = /* @__PURE__ */ new Set([
  "emph",
  "mathrm",
  "mathnormal",
  "mathup",
  "mbox",
  "overbrace",
  "pmb",
  "smash",
  "substack",
  "text",
  "textbf",
  "textit",
  "textmd",
  "textnormal",
  "textrm",
  "textsc",
  "textsf",
  "textsl",
  "texttt",
  "textup",
  "underbrace"
]);
var ACCENTS = {
  acute: "\u0301",
  bar: "\u0305",
  breve: "\u0306",
  check: "\u030C",
  ddot: "\u0308",
  dot: "\u0307",
  grave: "\u0300",
  hat: "\u0302",
  mathring: "\u030A",
  overleftarrow: "\u20D6",
  overleftrightarrow: "\u20E1",
  overline: "\u0305",
  overrightarrow: "\u20D7",
  tilde: "\u0303",
  underline: "\u0332",
  vec: "\u20D7",
  widehat: "\u0302",
  widetilde: "\u0303"
};
function own(table, key) {
  return Object.hasOwn(table, key) ? table[key] : void 0;
}
function replaceCharacters(value, replacements) {
  let result = "";
  for (const character of value) {
    const replacement = own(replacements, character);
    if (replacement === void 0) {
      return void 0;
    }
    result += replacement;
  }
  return result;
}
function normalizeScriptValue(value) {
  return value.trim().replace(/\s*([=+-])\s*/g, "$1");
}
function formatUnicodeScript(value, kind) {
  const upright = uprightLetters(normalizeScriptValue(value));
  if (kind === "sup") {
    return replaceCharacters(upright, SUPERSCRIPTS);
  }
  const lowered = replaceCharacters(upright, SUBSCRIPTS);
  if (lowered !== void 0 || !/[A-Za-z]/.test(upright)) {
    return lowered;
  }
  return replaceCharacters(upright, SMALL_SUBSCRIPTS);
}
function formatScript(value, kind) {
  value = normalizeScriptValue(value);
  const unicode = formatUnicodeScript(value, kind);
  if (unicode !== void 0) {
    return unicode;
  }
  const prefix = kind === "sub" ? "_" : "^";
  if (Array.from(value).length === 1 || kind === "sub" && /^[A-Za-z]+$/.test(value)) {
    return `${prefix}${value}`;
  }
  return `${prefix}(${value})`;
}
function formatFraction(numerator, denominator) {
  numerator = numerator.trim();
  denominator = denominator.trim();
  const simpleNumerator = /^[\p{L}\p{N}.]+$/u.test(numerator);
  const simpleDenominator = /^[\p{N}.]+$/u.test(denominator) || Array.from(denominator).length === 1;
  return `${simpleNumerator ? numerator : `(${numerator})`}/${simpleDenominator ? denominator : `(${denominator})`}`;
}
function formatRoot(value, symbol = "\u221A") {
  value = value.trim();
  return /^[\p{L}\p{N}.]+$/u.test(value) ? `${symbol}${value}` : `${symbol}(${value})`;
}
var NAMED_OPERATOR_START = "\u{F0004}";
var NAMED_OPERATOR_END = "\u{F0005}";
var NAMED_OPERATOR_LEFT_SPACING_PATTERN = /(?<=[\p{L}\p{N})\]}\u{f0001}])\u{f0004}/gu;
var NAMED_OPERATOR_RIGHT_SPACING_PATTERN = /\u{f0005}(?=[\p{L}\p{N}√\u{f0000}])/gu;
function normalizeOutput(value) {
  return value.replace(NAMED_OPERATOR_LEFT_SPACING_PATTERN, " ").replaceAll(NAMED_OPERATOR_START, "").replace(NAMED_OPERATOR_RIGHT_SPACING_PATTERN, " ").replaceAll(NAMED_OPERATOR_END, "").split("\n").map((line) => line.replace(/[ \t]+/g, " ").trim()).filter((line, index, lines) => line.length > 0 || index > 0 && index < lines.length - 1).join("\n").trim();
}
var LAYOUT_MARKER_START = "\u{F0000}";
var LAYOUT_MARKER_END = "\u{F0001}";
var LAYOUT_MARKER_PATTERN = /\u{f0000}(\d+)\u{f0001}/gu;
var TRAILING_LAYOUT_MARKER_PATTERN = /\u{f0000}(\d+)\u{f0001}$/u;
var PROTECTED_SPACE = "\u{F0002}";
function padLayoutLine(line, width, centered = false) {
  const padding = Math.max(0, width - visibleWidth(line));
  const left = centered ? Math.floor(padding / 2) : 0;
  return `${" ".repeat(left)}${line}${" ".repeat(padding - left)}`;
}
function joinLayouts(layouts) {
  if (layouts.length === 0) {
    return { lines: [""], width: 0, baseline: 0 };
  }
  const baseline = Math.max(...layouts.map((layout) => layout.baseline));
  const below = Math.max(...layouts.map((layout) => layout.lines.length - layout.baseline - 1));
  const lines = [];
  for (let row = 0; row <= baseline + below; row++) {
    let line = "";
    for (const layout of layouts) {
      const sourceRow = row - baseline + layout.baseline;
      line += sourceRow >= 0 && sourceRow < layout.lines.length ? padLayoutLine(layout.lines[sourceRow] ?? "", layout.width) : " ".repeat(layout.width);
    }
    lines.push(line.trimEnd());
  }
  return {
    lines,
    width: layouts.reduce((width, layout) => width + layout.width, 0),
    baseline
  };
}
function flushLeft(layout) {
  const indent = Math.min(...layout.lines.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length));
  const lines = layout.lines.map((line) => line.slice(indent));
  return { lines, width: Math.max(0, ...lines.map((line) => visibleWidth(line))), baseline: layout.baseline };
}
function keepsSpace(node) {
  return node?.type === "matrix" || node?.type === "root" || node?.type === "delimited" || node?.type === "brace";
}
function renderLayout(source, nodes) {
  const renderedLines = [];
  let firstBaseline = 0;
  for (const sourceLine of source.split("\n")) {
    const layouts = [];
    let position = 0;
    let previousNode;
    for (const match of sourceLine.matchAll(LAYOUT_MARKER_PATTERN)) {
      const index = match.index;
      const node = nodes[Number(match[1])];
      if (!node) {
        continue;
      }
      if (index > position) {
        const sliced = sourceLine.slice(position, index);
        const trimmed = (previousNode ? sliced.trimStart() : sliced).trimEnd();
        const preserveLeadingSpace = keepsSpace(previousNode) && /^\s/.test(sliced);
        const preserveTrailingSpace = (keepsSpace(node) || node.type === "operator") && /\s$/.test(sliced);
        const text = trimmed ? `${preserveLeadingSpace ? " " : ""}${trimmed}${preserveTrailingSpace ? " " : ""}` : preserveLeadingSpace || preserveTrailingSpace ? " " : "";
        layouts.push({ lines: [text], width: visibleWidth(text), baseline: 0 });
      }
      if (node.type === "fraction") {
        const numerator = renderLayout(node.numerator, nodes);
        const denominator = renderLayout(node.denominator, nodes);
        const contentWidth = Math.max(numerator.width, denominator.width, 1);
        const width = contentWidth + 2;
        layouts.push({
          lines: [
            ...numerator.lines.map((line) => padLayoutLine(line, width, true)),
            ` ${"\u2500".repeat(contentWidth)} `,
            ...denominator.lines.map((line) => padLayoutLine(line, width, true))
          ],
          width,
          baseline: numerator.lines.length
        });
      } else if (node.type === "operator") {
        const contentWidth = Math.max(visibleWidth(node.operator), node.lower === void 0 ? 0 : visibleWidth(node.lower), node.upper === void 0 ? 0 : visibleWidth(node.upper));
        const pieces = own(TALL_OPERATORS, node.operator) ?? [node.operator];
        const lines = [];
        if (node.upper !== void 0) {
          lines.push(`${padLayoutLine(node.upper, contentWidth, true)} `);
        }
        lines.push(...pieces.map((piece) => `${padLayoutLine(piece, contentWidth, true)} `));
        if (node.lower !== void 0) {
          lines.push(`${padLayoutLine(node.lower, contentWidth, true)} `);
        }
        layouts.push({
          lines,
          width: contentWidth + 1,
          baseline: (node.upper === void 0 ? 0 : 1) + Math.floor(pieces.length / 2)
        });
      } else if (node.type === "root") {
        const body = flushLeft(renderLayout(node.body, nodes));
        const height = body.lines.length;
        const lines = node.overline ? [] : [`${" ".repeat(height + 1)}${"\u2581".repeat(body.width + 1)}`];
        body.lines.forEach((line, row) => {
          const gutter = Array.from({ length: height + 2 }, () => " ");
          gutter[height - row] = "\u2571";
          if (row === height - 1) {
            gutter[0] = "\u2572";
          }
          const radicand = ` ${padLayoutLine(line, body.width)}`;
          lines.push(gutter.slice(0, -1).join("") + (node.overline && row === 0 ? `${OVERLINE}${radicand}${NO_OVERLINE}` : radicand));
        });
        layouts.push({ lines, width: height + 2 + body.width, baseline: body.baseline + (node.overline ? 0 : 1) });
      } else if (node.type === "brace") {
        const base = flushLeft(renderLayout(node.base, nodes));
        const label = node.label === void 0 ? void 0 : flushLeft(renderLayout(node.label, nodes));
        const width = Math.max(base.width, label?.width ?? 0);
        const centered = (line, lineWidth) => padLayoutLine(`${" ".repeat(Math.floor((width - lineWidth) / 2))}${line}`, width);
        const baseLines = base.lines.map((line) => centered(line, base.width));
        const labelLines = label?.lines.map((line) => centered(line, label.width)) ?? [];
        const brace = centered(drawBrace(base.width, node.kind), base.width);
        const under = node.kind === "under";
        layouts.push({
          lines: under ? [...baseLines, brace, ...labelLines] : [...labelLines, brace, ...baseLines],
          width,
          baseline: under ? base.baseline : labelLines.length + 1 + base.baseline
        });
      } else if (node.type === "delimited") {
        const body = flushLeft(renderLayout(node.body, nodes));
        const left = tallDelimiter(node.left, body.lines.length, body.baseline);
        const right = tallDelimiter(node.right, body.lines.length, body.baseline);
        layouts.push({
          lines: body.lines.map((line, row) => `${left[row]}${padLayoutLine(line, body.width)}${right[row]}`),
          width: visibleWidth(node.left) + body.width + visibleWidth(node.right),
          baseline: body.baseline
        });
      } else if (node.type === "script") {
        const upper = node.upper === void 0 ? void 0 : renderLayout(node.upper, nodes);
        const lower = node.lower === void 0 ? void 0 : renderLayout(node.lower, nodes);
        const width = Math.max(upper?.width ?? 0, lower?.width ?? 0);
        layouts.push({
          lines: [
            ...upper?.lines.map((line) => padLayoutLine(line, width)) ?? [],
            " ".repeat(width),
            ...lower?.lines.map((line) => padLayoutLine(line, width)) ?? []
          ],
          width,
          baseline: upper?.lines.length ?? 0
        });
      } else {
        const width = Math.max(0, ...node.lines.map((line) => visibleWidth(line)));
        layouts.push({
          lines: node.lines.map((line) => padLayoutLine(line, width)),
          width,
          baseline: node.baseline
        });
      }
      position = index + match[0].length;
      previousNode = node;
    }
    if (position < sourceLine.length) {
      const sliced = sourceLine.slice(position);
      const trimmed = previousNode ? sliced.trimStart() : sliced;
      const text = keepsSpace(previousNode) && /^\s/.test(sliced) ? ` ${trimmed}` : trimmed;
      layouts.push({ lines: [text], width: visibleWidth(text), baseline: 0 });
    }
    const lineLayout = joinLayouts(layouts);
    if (renderedLines.length === 0) {
      firstBaseline = lineLayout.baseline;
    }
    renderedLines.push(...lineLayout.lines);
  }
  return {
    lines: renderedLines,
    width: Math.max(0, ...renderedLines.map((line) => visibleWidth(line))),
    baseline: firstBaseline
  };
}
var LatexParser = class _LatexParser {
  source;
  layoutNodes;
  display;
  position = 0;
  supported = true;
  stackFractions = true;
  scriptDepth = 0;
  italic;
  ansi;
  uprightDepth = 0;
  constructor(source, layoutNodes, display, italic = false, ansi = false) {
    this.source = source;
    this.layoutNodes = layoutNodes;
    this.display = display;
    this.italic = italic;
    this.ansi = ansi;
  }
  render() {
    const rendered = this.parseSequence();
    if (!this.supported || this.position !== this.source.length) {
      return void 0;
    }
    return normalizeOutput(rendered);
  }
  parseSequence(endCharacter) {
    let result = "";
    while (this.position < this.source.length) {
      const character = this.source[this.position];
      if (endCharacter && character === endCharacter) {
        this.position++;
        return result;
      }
      if (character === "}") {
        this.supported = false;
        return result;
      }
      if (character === "{") {
        this.position++;
        result += this.parseSequence("}");
        continue;
      }
      if (character === "\\") {
        const command = this.parseCommand();
        if (command === NEGATIVE_SPACE) {
          result = result.trimEnd();
          if (result.endsWith(NAMED_OPERATOR_END)) {
            result = result.slice(0, -NAMED_OPERATOR_END.length);
          }
        } else {
          result += command;
        }
        continue;
      }
      if (character === "^" || character === "_") {
        this.position++;
        result = result.trimEnd();
        const script = this.parseScripts(character);
        if (result.endsWith(NAMED_OPERATOR_END)) {
          result = `${result.slice(0, -NAMED_OPERATOR_END.length)}${script}${NAMED_OPERATOR_END}`;
        } else {
          result += script;
        }
        continue;
      }
      if (/\s/.test(character)) {
        result += this.parseWhitespace();
        continue;
      }
      if (character === "=" || character === "<" || character === ">") {
        result = `${result.trimEnd()} ${character} `;
        this.position++;
        continue;
      }
      if (character === "&") {
        this.position++;
        continue;
      }
      if (character === "~") {
        this.position++;
        result += " ";
        continue;
      }
      if (character === ".") {
        const marker = TRAILING_LAYOUT_MARKER_PATTERN.exec(result);
        const node = marker ? this.layoutNodes[Number(marker[1])] : void 0;
        if (node?.type === "matrix") {
          const lastLine = node.lines.length - 1;
          node.lines[lastLine] = `${node.lines[lastLine] ?? ""}${character}`;
          this.position++;
          continue;
        }
      }
      result += this.italic && this.uprightDepth === 0 && /[A-Za-z]/.test(character) ? mathLetter(character, "italic") : character;
      this.position++;
    }
    if (endCharacter) {
      this.supported = false;
    }
    return result;
  }
  parseScripts(initialMarker) {
    const scripts = {};
    const order = [];
    const parse = (marker) => {
      const kind = marker === "_" ? "sub" : "sup";
      this.scriptDepth++;
      try {
        scripts[kind] = this.parseRequiredArgument(false);
      } finally {
        this.scriptDepth--;
      }
      order.push(kind);
    };
    parse(initialMarker);
    let nextPosition = this.position;
    while (nextPosition < this.source.length && /\s/.test(this.source[nextPosition] ?? "")) {
      nextPosition++;
    }
    const nextMarker = this.source[nextPosition];
    if ((nextMarker === "^" || nextMarker === "_") && nextMarker !== initialMarker) {
      this.position = nextPosition + 1;
      parse(nextMarker);
    }
    const subUnicode = scripts.sub === void 0 ? void 0 : formatUnicodeScript(scripts.sub, "sub");
    const supUnicode = scripts.sup === void 0 ? void 0 : formatUnicodeScript(scripts.sup, "sup");
    const canUseLayout = ![scripts.sub, scripts.sup].some((value) => value !== void 0 && (value.includes("/") || !value.includes(LAYOUT_MARKER_START) && Array.from(value).length > 1 && !/[A-Z*∗]/.test(uprightLetters(value))));
    const needsLayout = this.display && canUseLayout && (this.scriptDepth > 0 || scripts.sub !== void 0 && subUnicode === void 0 || scripts.sup !== void 0 && supUnicode === void 0);
    if (!needsLayout) {
      return order.map((kind) => kind === "sub" ? subUnicode ?? formatScript(scripts.sub ?? "", kind) : supUnicode ?? formatScript(scripts.sup ?? "", kind)).join("");
    }
    const index = this.layoutNodes.push({
      type: "script",
      lower: scripts.sub === void 0 ? void 0 : normalizeOutput(scripts.sub),
      upper: scripts.sup === void 0 ? void 0 : normalizeOutput(scripts.sup)
    }) - 1;
    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
  }
  parseWhitespace() {
    while (this.position < this.source.length && /\s/.test(this.source[this.position] ?? "")) {
      this.position++;
    }
    return " ";
  }
  parseCommand() {
    this.position++;
    if (this.position >= this.source.length) {
      this.supported = false;
      return "";
    }
    let command = "";
    const first = this.source[this.position] ?? "";
    if (first === "\n" || first === "\r") {
      this.position++;
      if (first === "\r" && this.source[this.position] === "\n") {
        this.position++;
      }
      return " ";
    }
    if (/[A-Za-z]/.test(first)) {
      const start = this.position;
      while (this.position < this.source.length && /[A-Za-z]/.test(this.source[this.position] ?? "")) {
        this.position++;
      }
      command = this.source.slice(start, this.position);
    } else {
      command = first;
      this.position++;
    }
    if (command === "\\") {
      return "\n";
    }
    if (SPACING_COMMANDS.has(command)) {
      return " ";
    }
    if (NEGATIVE_SPACING_COMMANDS.has(command)) {
      return NEGATIVE_SPACE;
    }
    if (FONT_SWITCH_COMMANDS.has(command)) {
      while (this.position < this.source.length && /\s/.test(this.source[this.position] ?? "")) {
        this.position++;
      }
      return "";
    }
    if (IGNORED_COMMANDS.has(command)) {
      return "";
    }
    if (command === "{" || command === "}" || command === "$" || command === "%" || command === "#" || command === "_" || command === "&") {
      return command;
    }
    if (command === "|") {
      return "\u2016";
    }
    if (command === "not") {
      const value = this.parseRequiredArgument(false).trim();
      const negated = own(NEGATED_SYMBOLS, value);
      if (negated !== void 0) {
        return ` ${negated} `;
      }
      const characters = Array.from(value);
      if (characters.length === 0) {
        this.supported = false;
        return "";
      }
      return ` ${characters[0]}\u0338${characters.slice(1).join("")} `;
    }
    if (LIMIT_OPERATORS.has(command)) {
      return this.parseOperator(command, "bracket", true, true);
    }
    const symbol = own(SYMBOLS, command);
    if (symbol !== void 0) {
      if (DISPLAY_LIMIT_SYMBOLS.has(command)) {
        return this.parseOperator(symbol, "script", true);
      }
      if (/^\p{L}+$/u.test(symbol)) {
        this.skipNameTerminator();
      }
      return command === "cdot" || command === "times" || RELATION_COMMANDS.has(command) ? ` ${symbol} ` : symbol;
    }
    if (NAMED_OPERATORS.has(command)) {
      return `${NAMED_OPERATOR_START}${command}${NAMED_OPERATOR_END}`;
    }
    if (SIZE_COMMANDS.has(command)) {
      return "";
    }
    if (command === "left") {
      return this.parseDelimited();
    }
    if (command === "middle" || command === "right") {
      if (this.source[this.position] === ".") {
        this.position++;
      }
      return "";
    }
    if (command === "frac" || command === "dfrac" || command === "tfrac") {
      const shouldStack = this.display && this.stackFractions && command !== "tfrac";
      const numerator = this.parseRequiredArgument(!shouldStack);
      const denominator = this.parseRequiredArgument(!shouldStack);
      if (shouldStack) {
        const index = this.layoutNodes.push({
          type: "fraction",
          numerator: normalizeOutput(numerator),
          denominator: normalizeOutput(denominator)
        }) - 1;
        return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
      }
      return formatFraction(numerator, denominator);
    }
    if (command === "sqrt") {
      const degree = this.parseOptionalArgument()?.trim();
      const value = this.parseRequiredArgument();
      if (degree === void 0 || degree === "2") {
        if (this.display && this.scriptDepth === 0 && !/^[\p{L}\p{N}.]+$/u.test(value.trim())) {
          const index = this.layoutNodes.push({ type: "root", body: normalizeOutput(value), overline: this.ansi }) - 1;
          return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
        }
        return formatRoot(value);
      }
      if (degree === "3") {
        return formatRoot(value, "\u221B");
      }
      if (degree === "4") {
        return formatRoot(value, "\u221C");
      }
      return `${formatScript(degree, "sup")}${formatRoot(value)}`;
    }
    if (command === "label") {
      this.readRawGroup();
      return "";
    }
    if (command === "boxed" || command === "fbox") {
      return `[${this.parseRequiredArgument().trim()}]`;
    }
    if (command === "binom" || command === "dbinom" || command === "tbinom") {
      return `(${this.parseRequiredArgument()} choose ${this.parseRequiredArgument()})`;
    }
    const accent = own(ACCENTS, command);
    if (accent !== void 0) {
      const value = this.parseRequiredArgument();
      return Array.from(value).length === 1 ? `${value}${accent}` : `${command}(${value})`;
    }
    const alphabet = own(ALPHABET_COMMANDS, command);
    if (alphabet !== void 0) {
      return toMathAlphabet(this.parseRequiredArgument().trim(), alphabet);
    }
    if (command === "operatorname") {
      const starred = this.source[this.position] === "*";
      if (starred) {
        this.position++;
      }
      const operator = normalizeOutput(this.parseUpright(() => this.parseRequiredArgument())).trim();
      return this.parseOperator(operator, "bracket", starred, true);
    }
    if (command === "mod" || command === "bmod") {
      return " mod ";
    }
    if (command === "pmod" || command === "pod") {
      const value = this.parseRequiredArgument().trim();
      return command === "pmod" ? ` (mod ${value})` : ` (${value})`;
    }
    if (command === "overset" || command === "stackrel") {
      const upper = this.parseRequiredArgument();
      const value = this.parseRequiredArgument().trim();
      return `${value}${formatScript(upper, "sup")}`;
    }
    if (command === "underset") {
      const lower = this.parseRequiredArgument();
      const value = this.parseRequiredArgument().trim();
      return `${value}${formatScript(lower, "sub")}`;
    }
    if ((command === "underbrace" || command === "overbrace") && this.display && this.scriptDepth === 0) {
      return this.parseBrace(command === "underbrace" ? "under" : "over");
    }
    if (PLAIN_WRAPPERS.has(command)) {
      const value = UPRIGHT_COMMANDS.test(command) ? this.parseUpright(() => this.parseRequiredArgument()) : this.parseRequiredArgument();
      return command.startsWith("text") || command === "mbox" ? value : value.trim();
    }
    if (command === "begin") {
      return this.parseEnvironment();
    }
    if (command === "end") {
      this.supported = false;
      return "";
    }
    this.supported = false;
    return `\\${command}`;
  }
  /**
   * In TeX the space after a command name only ends the name, so `\Delta t`
   * is Δt. Spaces before anything but a letter or digit stay, since the
   * converter reads its spacing around operators from the source.
   */
  skipNameTerminator() {
    let next = this.position;
    while (next < this.source.length && /[ \t]/.test(this.source[next] ?? "")) {
      next++;
    }
    if (next > this.position && /[A-Za-z0-9]/.test(this.source[next] ?? "")) {
      this.position = next;
    }
  }
  /** \underbrace{base}_{label} or \overbrace{base}^{label}; the label is optional. */
  parseBrace(kind) {
    const base = this.parseRequiredArgument();
    let next = this.position;
    while (next < this.source.length && /\s/.test(this.source[next] ?? "")) {
      next++;
    }
    let label;
    if (this.source[next] === (kind === "under" ? "_" : "^")) {
      this.position = next + 1;
      label = normalizeOutput(this.parseRequiredArgument(false));
    }
    const index = this.layoutNodes.push({ type: "brace", kind, base: normalizeOutput(base), label }) - 1;
    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
  }
  /** Parse with variables kept upright, as in \text and \operatorname. */
  parseUpright(parse) {
    this.uprightDepth++;
    try {
      return parse();
    } finally {
      this.uprightDepth--;
    }
  }
  /** One delimiter after \left or \right; `.` is none. */
  readDelimiter() {
    while (this.position < this.source.length && /\s/.test(this.source[this.position] ?? "")) {
      this.position++;
    }
    const character = this.source[this.position];
    if (character === void 0) {
      this.supported = false;
      return "";
    }
    if (character !== "\\") {
      this.position++;
      return { ".": "", "<": "\u27E8", ">": "\u27E9" }[character] ?? character;
    }
    const name = /^\\([A-Za-z]+|.)/.exec(this.source.slice(this.position))?.[1] ?? "";
    this.position += name.length + 1;
    if (name === "{" || name === "}") {
      return name;
    }
    if (name === "|") {
      return "\u2016";
    }
    const symbol = own(SYMBOLS, name);
    if (symbol === void 0) {
      this.supported = false;
      return "";
    }
    return symbol;
  }
  /** \left…\right, whose delimiters display math grows to fit what they enclose. */
  parseDelimited() {
    const left = this.readDelimiter();
    let depth = 1;
    let end = -1;
    for (let index2 = this.position; index2 < this.source.length; index2++) {
      if (this.source[index2] !== "\\") {
        continue;
      }
      const name = /^\\([A-Za-z]+|.)/.exec(this.source.slice(index2))?.[1] ?? "";
      if (name === "left") {
        depth++;
      }
      if (name === "right" && --depth === 0) {
        end = index2;
        break;
      }
      index2 += name.length;
    }
    if (end < 0) {
      return left;
    }
    const body = this.renderNested(this.source.slice(this.position, end), this.stackFractions);
    this.position = end + "\\right".length;
    const right = this.readDelimiter();
    if (!this.display || !body.includes(LAYOUT_MARKER_START)) {
      return `${left}${body}${right}`;
    }
    const index = this.layoutNodes.push({ type: "delimited", left, right, body }) - 1;
    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
  }
  parseOperator(operator, inlineLowerStyle, displayLimits, spaced = false) {
    let useDisplayLimits = displayLimits;
    let modifierPosition = this.position;
    while (modifierPosition < this.source.length && /[ \t]/.test(this.source[modifierPosition] ?? "")) {
      modifierPosition++;
    }
    const modifier = /^\\(limits|nolimits)(?![A-Za-z])/.exec(this.source.slice(modifierPosition));
    if (modifier) {
      useDisplayLimits = modifier[1] === "limits";
      this.position = modifierPosition + modifier[0].length;
    }
    let lower;
    let upper;
    while (true) {
      let scriptPosition = this.position;
      while (scriptPosition < this.source.length && /[ \t]/.test(this.source[scriptPosition] ?? "")) {
        scriptPosition++;
      }
      const kind = this.source[scriptPosition];
      if (kind !== "_" && kind !== "^") {
        break;
      }
      this.position = scriptPosition + 1;
      const value = normalizeOutput(this.parseRequiredArgument(false)).replaceAll(" ", "");
      if (kind === "_") {
        if (lower !== void 0) {
          this.supported = false;
        }
        lower = value;
      } else {
        if (upper !== void 0) {
          this.supported = false;
        }
        upper = value;
      }
    }
    const tall = own(TALL_OPERATORS, operator) !== void 0 && this.scriptDepth === 0;
    if (this.display && useDisplayLimits && (lower !== void 0 || upper !== void 0 || tall)) {
      const index = this.layoutNodes.push({ type: "operator", operator, lower, upper }) - 1;
      return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
    }
    let rendered = operator;
    if (lower !== void 0) {
      rendered += inlineLowerStyle === "bracket" ? `[${lower}]` : formatScript(lower, "sub");
    }
    if (upper !== void 0) {
      rendered += formatScript(upper, "sup");
    }
    return spaced ? ` ${rendered} ` : rendered;
  }
  parseRequiredArgument(stackFractions = true) {
    const previousStackFractions = this.stackFractions;
    this.stackFractions = previousStackFractions && stackFractions;
    const value = this.parseRequiredArgumentValue();
    this.stackFractions = previousStackFractions;
    return value;
  }
  parseRequiredArgumentValue() {
    while (this.position < this.source.length && /\s/.test(this.source[this.position] ?? "")) {
      this.position++;
    }
    if (this.position >= this.source.length) {
      this.supported = false;
      return "";
    }
    if (this.source[this.position] === "{") {
      this.position++;
      return this.parseSequence("}");
    }
    if (this.source[this.position] === "\\") {
      return this.parseCommand();
    }
    const value = this.source[this.position] ?? "";
    this.position++;
    return value;
  }
  parseOptionalArgument() {
    while (this.position < this.source.length && /[ \t]/.test(this.source[this.position] ?? "")) {
      this.position++;
    }
    if (this.source[this.position] !== "[") {
      return void 0;
    }
    const end = this.source.indexOf("]", this.position + 1);
    if (end < 0) {
      this.supported = false;
      return void 0;
    }
    const value = this.source.slice(this.position + 1, end);
    this.position = end + 1;
    return this.renderNested(value);
  }
  readRawGroup() {
    while (this.position < this.source.length && /[ \t]/.test(this.source[this.position] ?? "")) {
      this.position++;
    }
    if (this.source[this.position] !== "{") {
      this.supported = false;
      return void 0;
    }
    const start = ++this.position;
    let depth = 1;
    while (this.position < this.source.length) {
      const character = this.source[this.position];
      if (character === "\\") {
        this.position += 2;
        continue;
      }
      if (character === "{")
        depth++;
      if (character === "}")
        depth--;
      if (depth === 0) {
        const value = this.source.slice(start, this.position);
        this.position++;
        return value;
      }
      this.position++;
    }
    this.supported = false;
    return void 0;
  }
  splitEnvironmentRows(body) {
    return body.split(/\\\\(?:\[[^\]\n]*\])?/);
  }
  parseEnvironment() {
    const environment = this.readRawGroup();
    if (!environment) {
      return "";
    }
    const endMarker = `\\end{${environment}}`;
    const end = this.source.indexOf(endMarker, this.position);
    if (end < 0) {
      this.supported = false;
      return "";
    }
    const body = this.source.slice(this.position, end);
    this.position = end + endMarker.length;
    if (environment === "equation" || environment === "equation*" || environment === "displaymath") {
      return this.renderNested(body).trim();
    }
    if (this.display && ["aligned", "align", "align*", "split"].includes(environment)) {
      const aligned = this.renderAlignment(body);
      if (aligned !== void 0) {
        return aligned;
      }
    }
    if (environment === "aligned" || environment === "align" || environment === "align*" || environment === "alignedat" || environment === "alignat" || environment === "alignat*" || environment === "gather" || environment === "gathered" || environment === "multline" || environment === "multline*" || environment === "split") {
      const alignedAt = ["alignedat", "alignat", "alignat*"].includes(environment);
      const alignedBody = alignedAt ? body.replace(/^\s*\{[^}]*\}/, "") : body;
      return this.splitEnvironmentRows(alignedBody).map((row) => {
        const cells = row.split("&");
        const source = alignedAt ? Array.from({ length: Math.ceil(cells.length / 2) }, (_, index) => cells.slice(index * 2, index * 2 + 2).join("")).join(" ") : cells.join("");
        return this.renderNested(source).trim();
      }).filter(Boolean).join("\n");
    }
    if (environment === "cases" || environment === "cases*") {
      return this.renderCases(body);
    }
    if (["array", "matrix", "smallmatrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix"].includes(environment)) {
      const columnSpec = environment === "array" ? /^\s*\{([^}]*)\}/.exec(body) : null;
      const matrixBody = columnSpec ? body.slice(columnSpec[0].length) : body;
      return this.renderMatrix(environment, matrixBody, columnSpec?.[1].includes("|") === true);
    }
    this.supported = false;
    return body;
  }
  /**
   * aligned, align, and split: columns padded to a shared width, alternately
   * right- and left-aligned as LaTeX sets them, with a gutter before each
   * further pair. Undefined when a row cannot be split cleanly.
   */
  renderAlignment(body) {
    const rows = splitTopLevel(body, ALIGNMENT_ROW).filter((row) => row.trim());
    if (rows.length === 0) {
      return void 0;
    }
    const blocks = [];
    for (const row of rows) {
      const cells = splitTopLevel(row, ALIGNMENT_CELL);
      const rendered = this.renderNested(cells.join(COLUMN_MARK));
      if (!this.supported) {
        return void 0;
      }
      const block = cutColumnMarks(renderLayout(rendered, this.layoutNodes).lines, cells.length - 1);
      if (block === void 0) {
        return void 0;
      }
      const edges = [0, ...block.bounds, Math.max(...block.lines.map((line) => cellsOf(line).length))];
      blocks.push({ ...block, widths: edges.slice(1).map((edge, column) => edge - edges[column]) });
    }
    const columns = Math.max(...blocks.map((block) => block.widths.length));
    const target = Array.from({ length: columns }, (_, column) => Math.max(...blocks.map((block) => block.widths[column] ?? 0)));
    const lines = [];
    blocks.forEach((block, row) => {
      const starts = [0, ...block.bounds];
      let padded = block.lines.map(cellsOf);
      for (let column = block.widths.length - 1; column >= 0; column--) {
        const gutter = column > 0 && column % 2 === 0 ? ALIGNMENT_GUTTER : 0;
        const gap = target[column] - block.widths[column] + gutter;
        const at = column % 2 === 0 ? starts[column] : starts[column] + block.widths[column];
        padded = padded.map((cells) => [
          ...cells.slice(0, at),
          ...Array.from({ length: Math.max(0, at - cells.length) }, () => " "),
          ...Array.from({ length: gap }, () => " "),
          ...cells.slice(at)
        ]);
      }
      if (row > 0 && (block.lines.length > 1 || blocks[row - 1].lines.length > 1)) {
        lines.push("");
      }
      lines.push(...padded.map((cells) => cells.join("").trimEnd()));
    });
    const index = this.layoutNodes.push({ type: "matrix", lines, baseline: Math.floor((lines.length - 1) / 2) }) - 1;
    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
  }
  renderCases(body) {
    const rows = this.splitEnvironmentRows(body).map((row) => row.split("&").map((cell) => this.renderNested(cell, false).trim())).filter((row) => row.some(Boolean));
    const valueWidth = Math.max(0, ...rows.map((row) => visibleWidth((row[0] ?? "").replace(/,\s*$/, ""))));
    const contents = rows.map((row) => {
      const value = (row[0] ?? "").replace(/,\s*$/, "");
      const condition = row[1] ?? "";
      if (!condition) {
        return value;
      }
      const conditionPrefix = /^(?:if|when|for|otherwise)\b/i.test(uprightLetters(condition)) ? " " : " if ";
      return `${value}${PROTECTED_SPACE.repeat(valueWidth - visibleWidth(value))}${conditionPrefix}${condition}`;
    });
    if (contents.length <= 1) {
      return contents.length === 0 ? "" : `{ ${contents[0]}`;
    }
    const middle = Math.floor(contents.length / 2);
    const visualRows = [...contents];
    if (contents.length % 2 === 0) {
      visualRows.splice(middle, 0, void 0);
    }
    const brace = delimiterColumn("{", visualRows.length);
    const lines = visualRows.map((content, index2) => content === void 0 ? brace[index2] : `${brace[index2]} ${content}`);
    const index = this.layoutNodes.push({ type: "matrix", lines, baseline: middle }) - 1;
    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
  }
  /** A matrix's columns stand apart on space alone; an array that asks for rules gets them. */
  renderMatrix(environment, body, ruled = false) {
    const matrix = this.splitEnvironmentRows(body).map((row) => row.split("&").map((cell) => this.renderNested(cell, false).trim())).filter((row) => row.some(Boolean));
    const columnCount = Math.max(0, ...matrix.map((row) => row.length));
    const columnWidths = Array.from({ length: columnCount }, (_, column) => Math.max(0, ...matrix.map((row) => visibleWidth(row[column] ?? ""))));
    const rows = matrix.map((row) => Array.from({ length: columnCount }, (_, column) => {
      const cell = row[column] ?? "";
      return `${cell}${PROTECTED_SPACE.repeat(Math.max(0, (columnWidths[column] ?? 0) - visibleWidth(cell)))}`;
    }).join(ruled ? " \u2502 " : PROTECTED_SPACE.repeat(3)));
    let lines;
    if (environment === "array" || environment === "matrix" || environment === "smallmatrix") {
      lines = rows;
    } else {
      const delimiters = {
        pmatrix: ["(", ")"],
        bmatrix: ["[", "]"],
        Bmatrix: ["{", "}"],
        vmatrix: ["|", "|"],
        Vmatrix: ["\u2016", "\u2016"]
      };
      const delimiter = own(delimiters, environment);
      if (!delimiter) {
        this.supported = false;
        return rows.join("\n");
      }
      const left = delimiterColumn(delimiter[0], rows.length);
      const right = delimiterColumn(delimiter[1], rows.length);
      lines = rows.map((row, index2) => `${left[index2]} ${row} ${right[index2]}`);
    }
    if (lines.length <= 1) {
      return lines[0] ?? "";
    }
    const index = this.layoutNodes.push({ type: "matrix", lines, baseline: 0 }) - 1;
    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
  }
  renderNested(source, stackFractions = true) {
    const rendered = new _LatexParser(source, this.layoutNodes, this.display && stackFractions, this.italic, this.ansi).render();
    if (rendered === void 0) {
      this.supported = false;
      return source;
    }
    return rendered;
  }
};
function renderLatex(source, options = {}) {
  const layoutNodes = [];
  const rendered = new LatexParser(source, layoutNodes, options.display === true, options.italic === true, options.ansi === true).render();
  if (rendered === void 0) {
    return void 0;
  }
  if (layoutNodes.length === 0) {
    return rendered.replaceAll(PROTECTED_SPACE, " ");
  }
  const lines = renderLayout(rendered, layoutNodes).lines;
  const indentation = Math.min(...lines.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length));
  return lines.map((line) => line.slice(indentation).trimEnd()).join("\n").trimEnd().replaceAll(PROTECTED_SPACE, " ");
}

// core/markdown.ts
var QUOTE_PREFIX = /^(?: {0,3}>[ \t]?)+/;
var LEAD = /^(?:[ \t]*>)*[ \t]*(?:(?:[-*+]|\d{1,9}[.)])[ \t]+)?/;
var LIST_MARKER = /^([ \t]*)([-*+]|\d{1,9}[.)])([ \t]+|$)/;
var FENCE_OPEN = /^[ \t]*(`{3,}|~{3,})(.*)$/;
var FENCE_CLOSE = /^[ \t]*(`+|~+)[ \t]*$/;
var BLANK_LINE = /\n[ \t]*\r?\n/g;
var BLOCK_ENV = /\\begin\{(equation\*?|displaymath|math|align\*?|alignat\*?|flalign\*?|gather\*?|multline\*?|split|aligned|alignedat|gathered|array|matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|cases)\}/y;
var ENV_TOKEN = /\\(begin|end)\{([^{}]+)\}/y;
var HTML_CODE = /<(code|pre)[\s>]/iy;
function escapeMarkdown(text) {
  return text.replace(/[\\`*_\]<>|~#$]/g, (c) => "\\" + c);
}
function longestBacktickRun(text) {
  let longest = 0;
  for (const run of text.matchAll(/`+/g)) longest = Math.max(longest, run[0].length);
  return longest;
}
function codeBlock(art) {
  const fence = "`".repeat(Math.max(3, longestBacktickRun(art) + 1));
  return fence + "\n" + art + "\n" + fence;
}
function convertMarkdown(markdown, options = {}) {
  return expandMath(
    markdown,
    (span) => {
      if (span.display) {
        const art = renderLatex(span.latex, { display: true });
        return art === void 0 ? void 0 : codeBlock(art);
      }
      const text = renderLatex(span.latex);
      return text === void 0 || text.includes("\n") ? void 0 : escapeMarkdown(text);
    },
    options
  );
}
function convertMarkdownMath(markdown) {
  return convertMarkdown(markdown).text;
}
function expandMath(markdown, render, options = {}) {
  let fence = options.fence;
  if (!fence && !/[$\\]|```|~~~/.test(markdown)) return { text: markdown, fence, held: "" };
  const parts = [];
  const layout = { listOffset: 0, afterBlank: true };
  let copied = 0;
  let index = 0;
  if (fence) {
    const end = fenceEnd(markdown, 0, fence);
    if (end === void 0) return { text: markdown, fence, held: "" };
    fence = void 0;
    index = end;
  }
  const apply = (start, end, latex, display) => {
    index = end;
    const replacement = expansion(markdown, { latex: latex.trim(), display, start, end, standalone: isStandalone(markdown, start, end) }, render);
    if (replacement === void 0) return;
    parts.push(markdown.slice(copied, start), replacement);
    copied = end;
  };
  const hold = (opener) => {
    const held = opensLine(markdown, opener) ? lineStart(markdown, opener) : opener;
    parts.push(markdown.slice(copied, held));
    return { text: parts.join(""), fence: void 0, held: markdown.slice(held) };
  };
  while (index < markdown.length) {
    if (index === 0 || markdown[index - 1] === "\n") {
      const code = enterLine(markdown, index, layout);
      if (code) {
        index = code.end;
        fence = code.open;
        continue;
      }
    }
    const c = markdown[index];
    if (c === "`") {
      index = isEscaped(markdown, index) ? index + 1 : skipInlineCode(markdown, index);
      continue;
    }
    if (c === "<") {
      index = skipHtmlCode(markdown, index) ?? index + 1;
      continue;
    }
    if (c === "$" && !isEscaped(markdown, index)) {
      if (markdown[index + 1] === "$") {
        const close2 = findClose(markdown, "$$", index + 2, markdown.length);
        if (close2 >= 0) {
          apply(index, close2 + 2, markdown.slice(index + 2, close2), true);
        } else if (options.hold) {
          return hold(index);
        } else {
          index += 2;
        }
        continue;
      }
      const close = opensInlineDollar(markdown, index) ? findInlineDollarClose(markdown, index + 1) : -1;
      const latex = markdown.slice(index + 1, close);
      if (close >= 0 && !latex.includes("`") && !hasUnescapedDollar(latex)) {
        apply(index, close + 1, latex, false);
      } else {
        index++;
      }
      continue;
    }
    if (c === "\\" && !isEscaped(markdown, index)) {
      const verbEnd = skipVerb(markdown, index);
      if (verbEnd !== void 0) {
        index = verbEnd;
        continue;
      }
      const next = markdown[index + 1];
      if (next === "(") {
        const close = findClose(markdown, "\\)", index + 2, paragraphEnd(markdown, index));
        const latex = markdown.slice(index + 2, close);
        if (close >= 0 && !latex.includes("`")) {
          apply(index, close + 2, latex, false);
          continue;
        }
      } else if (next === "[" && opensLine(markdown, index)) {
        const close = findClose(markdown, "\\]", index + 2, markdown.length);
        if (close >= 0) {
          apply(index, close + 2, markdown.slice(index + 2, close), true);
          continue;
        }
        if (options.hold) return hold(index);
      } else {
        BLOCK_ENV.lastIndex = index;
        const env = BLOCK_ENV.exec(markdown);
        if (env) {
          const end = environmentEnd(markdown, index + env[0].length, env[1]);
          if (end >= 0) {
            apply(index, end, markdown.slice(index, end), env[1] !== "math");
            continue;
          }
          if (options.hold) return hold(index);
        }
      }
    }
    index++;
  }
  if (copied === 0) return { text: markdown, fence, held: "" };
  parts.push(markdown.slice(copied));
  return { text: parts.join(""), fence, held: "" };
}
function expansion(markdown, span, render) {
  if (span.latex === "") return void 0;
  let result;
  try {
    result = render(span);
  } catch {
    return void 0;
  }
  if (result === void 0) return void 0;
  const { text, block } = typeof result === "string" ? { text: result, block: false } : result;
  const body = text.replace(/\r\n?/g, "\n").replace(/^\n+|\n+$/g, "");
  if (body.trim() === "") return void 0;
  if (!span.display && !block && !body.includes("\n")) return body;
  return onOwnLines(markdown, span, body);
}
function onOwnLines(markdown, span, body) {
  const start = lineStart(markdown, span.start);
  const before = markdown.slice(start, span.start);
  const lead = LEAD.exec(before)[0];
  const pad = lead.replace(/[^>\s]/g, " ");
  const lineEnd = markdown.indexOf("\n", span.end);
  const after = markdown.slice(span.end, lineEnd < 0 ? markdown.length : lineEnd);
  let out = body.split("\n").join("\n" + pad);
  if (before !== lead) out = "\n\n" + pad + out;
  if (after.trim() !== "") out += "\n\n" + pad;
  return out;
}
function isStandalone(markdown, start, end) {
  const lineEnd = markdown.indexOf("\n", end);
  return markdown.slice(lineStart(markdown, start), start).trim() === "" && markdown.slice(end, lineEnd < 0 ? markdown.length : lineEnd).trim() === "";
}
function lineStart(text, index) {
  return text.lastIndexOf("\n", index - 1) + 1;
}
function opensLine(text, index) {
  const before = text.slice(lineStart(text, index), index);
  return LEAD.exec(before)[0].length === before.length;
}
function paragraphEnd(text, index) {
  BLANK_LINE.lastIndex = index;
  return BLANK_LINE.exec(text)?.index ?? text.length;
}
function isEscaped(text, index) {
  let slashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) slashes++;
  return slashes % 2 === 1;
}
function indentWidth(text) {
  let width = 0;
  for (const c of /^[ \t]*/.exec(text)[0]) width += c === "	" ? 4 - width % 4 : 1;
  return width;
}
function enterLine(text, index, layout) {
  const eol = text.indexOf("\n", index);
  const content = text.slice(index, eol < 0 ? text.length : eol).replace(/\r$/, "").replace(QUOTE_PREFIX, "");
  if (content.trim() === "") {
    layout.afterBlank = true;
    return void 0;
  }
  const indent = indentWidth(content);
  let code;
  if (layout.afterBlank && indent >= layout.listOffset + 4) {
    code = { end: indentedCodeEnd(text, index, layout.listOffset + 4) };
  } else {
    const open = FENCE_OPEN.exec(content);
    if (open && !(open[1][0] === "`" && open[2].includes("`"))) {
      const end = fenceEnd(text, eol < 0 ? text.length : eol + 1, open[1]);
      code = end === void 0 ? { end: text.length, open: open[1] } : { end };
    }
  }
  if (!code) {
    const marker = LIST_MARKER.exec(content);
    if (marker) {
      const gap = marker[3].length;
      layout.listOffset = indentWidth(marker[1]) + marker[2].length + (gap >= 1 && gap <= 4 ? gap : 1);
    } else if (layout.afterBlank && indent < layout.listOffset) {
      layout.listOffset = 0;
    }
  }
  layout.afterBlank = code !== void 0;
  return code;
}
function fenceEnd(text, from, run) {
  for (let start = from; ; ) {
    const eol = text.indexOf("\n", start);
    const line = text.slice(start, eol < 0 ? text.length : eol).replace(/\r$/, "").replace(QUOTE_PREFIX, "");
    const close = FENCE_CLOSE.exec(line)?.[1];
    if (close && close[0] === run[0] && close.length >= run.length) return eol < 0 ? text.length : eol + 1;
    if (eol < 0) return void 0;
    start = eol + 1;
  }
}
function indentedCodeEnd(text, from, width) {
  for (let start = from; start < text.length; ) {
    const eol = text.indexOf("\n", start);
    const content = text.slice(start, eol < 0 ? text.length : eol).replace(/\r$/, "").replace(QUOTE_PREFIX, "");
    if (content.trim() !== "" && indentWidth(content) < width) return start;
    if (eol < 0) break;
    start = eol + 1;
  }
  return text.length;
}
function countRun(text, index, char) {
  let end = index;
  while (text[end] === char) end++;
  return end - index;
}
function skipInlineCode(text, index) {
  const length = countRun(text, index, "`");
  const run = "`".repeat(length);
  const limit = paragraphEnd(text, index);
  for (let from = index + length; from < limit; ) {
    const close = text.indexOf(run, from);
    if (close < 0 || close >= limit) break;
    if (text[close - 1] !== "`" && text[close + length] !== "`") return close + length;
    from = close + 1;
  }
  return index + length;
}
function skipHtmlCode(text, index) {
  if (text.startsWith("<!--", index)) {
    const close2 = text.indexOf("-->", index + 4);
    return close2 < 0 ? text.length : close2 + 3;
  }
  HTML_CODE.lastIndex = index;
  const open = HTML_CODE.exec(text);
  if (!open) return void 0;
  const openEnd = text.indexOf(">", index + open[0].length - 1);
  if (openEnd < 0) return text.length;
  const closer = new RegExp(`</${open[1]}>`, "gi");
  closer.lastIndex = openEnd + 1;
  const close = closer.exec(text);
  return close ? close.index + close[0].length : text.length;
}
function skipVerb(text, index) {
  if (!text.startsWith("\\verb", index) || /[A-Za-z]/.test(text[index + 5] ?? "")) return void 0;
  let at = index + 5;
  if (text[at] === "*") at++;
  const delimiter = text[at];
  if (!delimiter || /[A-Za-z0-9\s]/.test(delimiter)) return void 0;
  const close = text.indexOf(delimiter, at + 1);
  const eol = text.indexOf("\n", at);
  return close < 0 || eol >= 0 && close > eol ? void 0 : close + 1;
}
function findClose(text, seq, from, limit) {
  for (let i = from; i < limit; i++) {
    const c = text[i];
    if (c === "%" && !isEscaped(text, i)) {
      const eol = text.indexOf("\n", i + 1);
      if (eol < 0) return -1;
      i = eol;
      continue;
    }
    if (c === "\\" && !isEscaped(text, i)) {
      const verbEnd = skipVerb(text, i);
      if (verbEnd !== void 0) {
        i = verbEnd - 1;
        continue;
      }
    }
    if (text.startsWith(seq, i) && !isEscaped(text, i)) return i;
  }
  return -1;
}
function environmentEnd(text, from, name) {
  const stack = [name];
  for (let i = from; i < text.length; i++) {
    const c = text[i];
    if (c === "%" && !isEscaped(text, i)) {
      const eol = text.indexOf("\n", i + 1);
      if (eol < 0) return -1;
      i = eol;
      continue;
    }
    if (c !== "\\" || isEscaped(text, i)) continue;
    const verbEnd = skipVerb(text, i);
    if (verbEnd !== void 0) {
      i = verbEnd - 1;
      continue;
    }
    ENV_TOKEN.lastIndex = i;
    const token = ENV_TOKEN.exec(text);
    if (!token) continue;
    if (token[1] === "begin") {
      stack.push(token[2]);
    } else if (stack.at(-1) === token[2]) {
      stack.pop();
      if (stack.length === 0) return i + token[0].length;
    }
    i += token[0].length - 1;
  }
  return -1;
}
function opensInlineDollar(text, index) {
  const next = text[index + 1];
  return next !== void 0 && next !== "$" && !/\s/.test(next);
}
function findInlineDollarClose(text, from) {
  for (let i = from; i < text.length; i++) {
    const c = text[i];
    if (c === "\n" || c === "\r") return -1;
    if (c !== "$" || isEscaped(text, i)) continue;
    if (text[i - 1] === "$" || text[i + 1] === "$" || /\s/.test(text[i - 1] ?? "")) continue;
    if (/\d/.test(text[i + 1] ?? "")) continue;
    return i;
  }
  return -1;
}
function hasUnescapedDollar(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "$" && !isEscaped(text, i)) return true;
  }
  return false;
}
export {
  convertMarkdown,
  convertMarkdownMath,
  expandMath,
  renderLatex
};
