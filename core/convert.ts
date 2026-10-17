// LaTeX → Unicode, forked from renderLatex() in pi-tui 1.0.1 (MIT; see
// vendor/NOTICE). Additions over upstream:
//
// - Greek and capital super- and subscripts where Unicode has them, and small
//   capitals for subscript letters it cannot lower.
// - `\Delta t` is Δt: the space after a command name only ends the name.
// - Math alphabets: \mathbf, \mathit, \mathcal, \mathscr, \mathfrak,
//   \mathbb, \mathsf, \mathtt, \boldsymbol.
// - The `italic` option sets variables in math italic, as TeX does.
// - Display math draws tall integrals, radicals with a bar, \left…\right
//   delimiters grown to the height of what they enclose, \underbrace and
//   \overbrace, and aligned, align, and split with their columns lined up.
// - Matrices separate columns with space; only an array that asks for rules
//   gets them.

import { visibleWidth } from "./vendor/pi-width.js";

export type RenderLatexOptions = {
    display?: boolean;
    italic?: boolean;
    /** Output may carry ANSI styling: a radical's bar becomes an overline on its radicand. */
    ansi?: boolean;
};

const SYMBOLS: Record<string, string> = {
    alpha: "α",
    beta: "β",
    gamma: "γ",
    delta: "δ",
    epsilon: "ϵ",
    varepsilon: "ε",
    zeta: "ζ",
    eta: "η",
    theta: "θ",
    vartheta: "ϑ",
    iota: "ι",
    kappa: "κ",
    varkappa: "ϰ",
    lambda: "λ",
    mu: "μ",
    nu: "ν",
    xi: "ξ",
    pi: "π",
    varpi: "ϖ",
    rho: "ρ",
    varrho: "ϱ",
    sigma: "σ",
    varsigma: "ς",
    tau: "τ",
    upsilon: "υ",
    phi: "ϕ",
    varphi: "φ",
    chi: "χ",
    psi: "ψ",
    omega: "ω",
    Gamma: "Γ",
    Delta: "Δ",
    Theta: "Θ",
    Lambda: "Λ",
    Xi: "Ξ",
    Pi: "Π",
    Sigma: "Σ",
    Upsilon: "Υ",
    Phi: "Φ",
    Psi: "Ψ",
    Omega: "Ω",
    pm: "±",
    mp: "∓",
    times: "×",
    div: "÷",
    cdot: "·",
    ast: "∗",
    star: "⋆",
    circ: "∘",
    bullet: "•",
    oplus: "⊕",
    ominus: "⊖",
    otimes: "⊗",
    oslash: "⊘",
    odot: "⊙",
    bigcirc: "○",
    dagger: "†",
    ddagger: "‡",
    amalg: "⨿",
    uplus: "⊎",
    sqcap: "⊓",
    sqcup: "⊔",
    bowtie: "⋈",
    Join: "⋈",
    ltimes: "⋉",
    rtimes: "⋊",
    leftouterjoin: "⟕",
    rightouterjoin: "⟖",
    fullouterjoin: "⟗",
    triangleleft: "◁",
    triangleright: "▷",
    wr: "≀",
    cap: "∩",
    cup: "∪",
    bigcap: "⋂",
    bigcup: "⋃",
    bigwedge: "⋀",
    bigvee: "⋁",
    bigsqcup: "⨆",
    biguplus: "⨄",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigodot: "⨀",
    setminus: "∖",
    in: "∈",
    notin: "∉",
    ni: "∋",
    subset: "⊂",
    supset: "⊃",
    subseteq: "⊆",
    supseteq: "⊇",
    sqsubset: "⊏",
    sqsupset: "⊐",
    sqsubseteq: "⊑",
    sqsupseteq: "⊒",
    prec: "≺",
    preceq: "≼",
    succ: "≻",
    succeq: "≽",
    ll: "≪",
    gg: "≫",
    le: "≤",
    leq: "≤",
    leqslant: "≤",
    ge: "≥",
    geq: "≥",
    geqslant: "≥",
    ne: "≠",
    neq: "≠",
    equiv: "≡",
    approx: "≈",
    sim: "∼",
    simeq: "≃",
    cong: "≅",
    asymp: "≍",
    doteq: "≐",
    propto: "∝",
    parallel: "∥",
    perp: "⊥",
    mid: "∣",
    vdash: "⊢",
    dashv: "⊣",
    models: "⊨",
    Vdash: "⊩",
    Vvdash: "⊪",
    nvdash: "⊬",
    nvDash: "⊭",
    forall: "∀",
    exists: "∃",
    nexists: "∄",
    neg: "¬",
    land: "∧",
    wedge: "∧",
    lor: "∨",
    vee: "∨",
    to: "→",
    rightarrow: "→",
    longrightarrow: "→",
    leftarrow: "←",
    longleftarrow: "←",
    gets: "←",
    leftrightarrow: "↔",
    longleftrightarrow: "↔",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    leftharpoonup: "↼",
    leftharpoondown: "↽",
    rightharpoonup: "⇀",
    rightharpoondown: "⇁",
    rightleftharpoons: "⇌",
    leftrightharpoons: "⇋",
    nearrow: "↗",
    searrow: "↘",
    swarrow: "↙",
    nwarrow: "↖",
    rightsquigarrow: "⇝",
    leadsto: "⇝",
    Rightarrow: "⇒",
    Longrightarrow: "⇒",
    Leftarrow: "⇐",
    Longleftarrow: "⇐",
    Leftrightarrow: "⇔",
    Longleftrightarrow: "⇔",
    implies: "⇒",
    iff: "⇔",
    mapsto: "↦",
    longmapsto: "↦",
    uparrow: "↑",
    downarrow: "↓",
    partial: "∂",
    nabla: "∇",
    int: "∫",
    iint: "∬",
    iiint: "∭",
    oint: "∮",
    sum: "∑",
    prod: "∏",
    coprod: "∐",
    infty: "∞",
    emptyset: "∅",
    varnothing: "∅",
    angle: "∠",
    therefore: "∴",
    because: "∵",
    aleph: "ℵ",
    beth: "ℶ",
    gimel: "ℷ",
    daleth: "ℸ",
    top: "⊤",
    bot: "⊥",
    triangle: "△",
    square: "□",
    lozenge: "◊",
    checkmark: "✓",
    complement: "∁",
    wp: "℘",
    prime: "′",
    ldots: "…",
    dots: "…",
    cdots: "⋯",
    vdots: "⋮",
    ddots: "⋱",
    ell: "ℓ",
    hbar: "ℏ",
    Im: "ℑ",
    Re: "ℜ",
    langle: "⟨",
    rangle: "⟩",
    vert: "|",
    lvert: "|",
    rvert: "|",
    Vert: "‖",
    lVert: "‖",
    rVert: "‖",
    lbrace: "{",
    rbrace: "}",
    backslash: "\\",
    lfloor: "⌊",
    rfloor: "⌋",
    lceil: "⌈",
    rceil: "⌉",
    colon: ":",
};
const NAMED_OPERATORS = new Set([
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
    "tanh",
]);
const LIMIT_OPERATORS = new Set([
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
    "sup",
]);
const DISPLAY_LIMIT_SYMBOLS = new Set([
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
    "sum",
]);
const RELATION_COMMANDS = new Set([
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
    "vdash",
]);
const NEGATED_SYMBOLS: Record<string, string> = {
    "<": "≮",
    ">": "≯",
    "=": "≠",
    "∈": "∉",
    "∋": "∌",
    "∣": "∤",
    "∥": "∦",
    "∼": "≁",
    "≃": "≄",
    "≅": "≇",
    "≈": "≉",
    "≡": "≢",
    "≤": "≰",
    "≥": "≱",
    "≺": "⊀",
    "≻": "⊁",
    "⊂": "⊄",
    "⊃": "⊅",
    "⊆": "⊈",
    "⊇": "⊉",
    "⊢": "⊬",
    "⊨": "⊭",
    "↔": "↮",
    "←": "↚",
    "→": "↛",
    "⇒": "⇏",
    "⇐": "⇍",
    "⇔": "⇎",
    "≼": "⋠",
    "≽": "⋡",
};
const SUPERSCRIPTS: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "+": "⁺",
    "-": "⁻",
    "=": "⁼",
    "(": "⁽",
    ")": "⁾",
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ⁱ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
    A: "ᴬ",
    B: "ᴮ",
    D: "ᴰ",
    E: "ᴱ",
    G: "ᴳ",
    H: "ᴴ",
    I: "ᴵ",
    J: "ᴶ",
    K: "ᴷ",
    L: "ᴸ",
    M: "ᴹ",
    N: "ᴺ",
    O: "ᴼ",
    P: "ᴾ",
    R: "ᴿ",
    T: "ᵀ",
    U: "ᵁ",
    V: "ⱽ",
    W: "ᵂ",
    // No raised capitals exist for these; the lowercase forms share their shapes.
    C: "ᶜ",
    S: "ˢ",
    X: "ˣ",
    Z: "ᶻ",
    "α": "ᵅ",
    "β": "ᵝ",
    "γ": "ᵞ",
    "δ": "ᵟ",
    "ε": "ᵋ",
    "ϵ": "ᵋ",
    "θ": "ᶿ",
    "ι": "ᶥ",
    "υ": "ᶷ",
    "φ": "ᵠ",
    "ϕ": "ᵠ",
    "χ": "ᵡ",
    "*": "*",
    "∗": "*",
    "⋆": "⋆",
};
const SUBSCRIPTS: Record<string, string> = {
    "0": "₀",
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉",
    "+": "₊",
    "-": "₋",
    "=": "₌",
    "(": "₍",
    ")": "₎",
    a: "ₐ",
    e: "ₑ",
    h: "ₕ",
    i: "ᵢ",
    j: "ⱼ",
    k: "ₖ",
    l: "ₗ",
    m: "ₘ",
    n: "ₙ",
    o: "ₒ",
    p: "ₚ",
    r: "ᵣ",
    s: "ₛ",
    t: "ₜ",
    u: "ᵤ",
    v: "ᵥ",
    x: "ₓ",
    "β": "ᵦ",
    "γ": "ᵧ",
    "ρ": "ᵨ",
    "φ": "ᵩ",
    "ϕ": "ᵩ",
    "χ": "ᵪ",
};
// Unicode has no subscript capitals, and no lowered b, c, d, f, g, q, w, y, or
// z. Subscript letters it cannot lower use small capitals, which sit at
// subscript size on the baseline. X has none; its small capital is drawn as a
// lowercase x.
const SMALL_CAPITALS: Record<string, string> = {
    A: "ᴀ",
    B: "ʙ",
    C: "ᴄ",
    D: "ᴅ",
    E: "ᴇ",
    F: "ꜰ",
    G: "ɢ",
    H: "ʜ",
    I: "ɪ",
    J: "ᴊ",
    K: "ᴋ",
    L: "ʟ",
    M: "ᴍ",
    N: "ɴ",
    O: "ᴏ",
    P: "ᴘ",
    Q: "ꞯ",
    R: "ʀ",
    S: "ꜱ",
    T: "ᴛ",
    U: "ᴜ",
    V: "ᴠ",
    W: "ᴡ",
    X: "x",
    Y: "ʏ",
    Z: "ᴢ",
};
const SMALL_SUBSCRIPTS: Record<string, string> = {
    ...Object.fromEntries(Object.entries(SUBSCRIPTS).filter(([key]) => !/[a-z]/.test(key))),
    ...SMALL_CAPITALS,
    ...Object.fromEntries(Object.entries(SMALL_CAPITALS).map(([key, value]) => [key.toLowerCase(), value])),
};
// Unicode's Mathematical Alphanumeric Symbols: where each alphabet starts, and
// the letters that sit in the older Letterlike Symbols block instead.
type MathAlphabetName =
    | "bold"
    | "italic"
    | "boldItalic"
    | "script"
    | "fraktur"
    | "doubleStruck"
    | "sansSerif"
    | "monospace";
type MathAlphabet = { upper: number; lower: number; digit?: number; holes?: Record<string, string> };
const MATH_ALPHABETS: Record<MathAlphabetName, MathAlphabet> = {
    bold: { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce },
    italic: { upper: 0x1d434, lower: 0x1d44e, holes: { h: "ℎ" } },
    boldItalic: { upper: 0x1d468, lower: 0x1d482 },
    script: {
        upper: 0x1d49c,
        lower: 0x1d4b6,
        holes: { B: "ℬ", E: "ℰ", F: "ℱ", H: "ℋ", I: "ℐ", L: "ℒ", M: "ℳ", R: "ℛ", e: "ℯ", g: "ℊ", o: "ℴ" },
    },
    fraktur: { upper: 0x1d504, lower: 0x1d51e, holes: { C: "ℭ", H: "ℌ", I: "ℑ", R: "ℜ", Z: "ℨ" } },
    doubleStruck: {
        upper: 0x1d538,
        lower: 0x1d552,
        digit: 0x1d7d8,
        holes: { C: "ℂ", H: "ℍ", N: "ℕ", P: "ℙ", Q: "ℚ", R: "ℝ", Z: "ℤ" },
    },
    sansSerif: { upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 },
    monospace: { upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 },
};
const ALPHABET_COMMANDS: Record<string, MathAlphabetName> = {
    boldsymbol: "boldItalic",
    bm: "boldItalic",
    mathbb: "doubleStruck",
    mathbf: "bold",
    mathcal: "script",
    mathfrak: "fraktur",
    mathit: "italic",
    mathscr: "script",
    mathsf: "sansSerif",
    mathtt: "monospace",
};
// Wrappers whose contents stay upright when variables are set in italic.
const UPRIGHT_COMMANDS = /^(?:text|mbox$|mathrm$|mathup$|operatorname$)/;
const ITALIC_LETTER = /[\u{1d434}-\u{1d467}\u210e]/gu;
const ALPHANUMERIC_OR_MARKER = /\u{f0000}\d+\u{f0001}|[A-Za-z0-9]/gu;
function mathLetter(character: string, alphabet: MathAlphabetName): string {
    const { upper, lower, digit, holes } = MATH_ALPHABETS[alphabet];
    const hole = holes?.[character];
    if (hole !== undefined) {
        return hole;
    }
    const code = character.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        return String.fromCodePoint(upper + code - 65);
    }
    if (code >= 97 && code <= 122) {
        return String.fromCodePoint(lower + code - 97);
    }
    if (code >= 48 && code <= 57 && digit !== undefined) {
        return String.fromCodePoint(digit + code - 48);
    }
    return character;
}
/** Back from math italic to plain letters, for lookups and for other alphabets. */
function uprightLetters(value: string): string {
    return value.replace(ITALIC_LETTER, (character) => {
        if (character === "ℎ") {
            return "h";
        }
        const offset = character.codePointAt(0)! - 0x1d434;
        return String.fromCharCode(offset < 26 ? 65 + offset : 97 + offset - 26);
    });
}
/** Set letters and digits in a math alphabet, leaving layout markers whole. */
function toMathAlphabet(value: string, alphabet: MathAlphabetName): string {
    return uprightLetters(value).replace(ALPHANUMERIC_OR_MARKER, (match) => match.length > 1 ? match : mathLetter(match, alphabet));
}
// Pieces that stack into a delimiter several rows tall: top, middle, bottom,
// and for braces the row their point sits on. They are box-drawing characters,
// which terminals draw themselves to fill the cell, so they join at any line
// height; font-drawn pieces such as ⎛⎜⎝ break apart when cells are taller than
// the font.
type TallDelimiter = { top: string; middle: string; bottom: string; point?: string; pair?: [string, string] };
const TALL_DELIMITERS: Record<string, TallDelimiter | undefined> = {
    "(": { top: "╭", middle: "│", bottom: "╰" },
    ")": { top: "╮", middle: "│", bottom: "╯" },
    "[": { top: "┌", middle: "│", bottom: "└" },
    "]": { top: "┐", middle: "│", bottom: "┘" },
    "⌈": { top: "┌", middle: "│", bottom: "│" },
    "⌉": { top: "┐", middle: "│", bottom: "│" },
    "⌊": { top: "│", middle: "│", bottom: "└" },
    "⌋": { top: "│", middle: "│", bottom: "┘" },
    "{": { top: "╭", middle: "│", bottom: "╰", point: "┤", pair: ["╭", "╰"] },
    "}": { top: "╮", middle: "│", bottom: "╯", point: "├", pair: ["╮", "╯"] },
    "|": { top: "│", middle: "│", bottom: "│" },
    "‖": { top: "║", middle: "║", bottom: "║" },
};
/**
 * One column of a \left…\right delimiter beside `height` rows. Two rows are a
 * script hanging off the baseline, which keeps a plain delimiter on the
 * baseline row.
 */
function tallDelimiter(delimiter: string, height: number, baseline: number): string[] {
    if (height < 3 || delimiter === "") {
        const blank = " ".repeat(visibleWidth(delimiter));
        return Array.from({ length: height }, (_, row) => (row === baseline ? delimiter : blank));
    }
    return delimiterColumn(delimiter, height);
}
/** One column of a delimiter `height` rows tall; one row is the plain character. */
function delimiterColumn(delimiter: string, height: number): string[] {
    if (height === 1) {
        return [delimiter];
    }
    if (delimiter === "⟨" || delimiter === "⟩") {
        const [upper, lower] = delimiter === "⟨" ? ["╱", "╲"] : ["╲", "╱"];
        const half = Math.floor(height / 2);
        return Array.from({ length: height }, (_, row) => height % 2 === 1 && row === half ? delimiter : row < half ? upper : lower);
    }
    const pieces = own(TALL_DELIMITERS, delimiter);
    if (!pieces) {
        const middle = Math.floor((height - 1) / 2);
        return Array.from({ length: height }, (_, row) => (row === middle ? delimiter : " "));
    }
    if (height === 2 && pieces.pair) {
        return [...pieces.pair];
    }
    const point = pieces.point === undefined ? -1 : Math.floor((height - 1) / 2);
    return Array.from({ length: height }, (_, row) => row === 0
        ? pieces.top
        : row === height - 1
            ? pieces.bottom
            : row === point
                ? pieces.point!
                : pieces.middle);
}
/** A horizontal brace as wide as what it spans, its tick pointing at the label. */
function drawBrace(width: number, kind: "under" | "over"): string {
    const [left, tick, right] = kind === "under" ? ["\u2570", "\u252c", "\u256f"] : ["\u256d", "\u2534", "\u256e"];
    if (width <= 1) {
        return tick;
    }
    if (width === 2) {
        return left + right;
    }
    const before = Math.floor((width - 3) / 2);
    return `${left}${"\u2500".repeat(before)}${tick}${"\u2500".repeat(width - 3 - before)}${right}`;
}
// Stands in for each & of an alignment row while the row is laid out, so the
// column boundaries can be read off the result.
const COLUMN_MARK = "\u{f0006}";
const ALIGNMENT_ROW = /^\\\\(?:\s*\[[^\]]*\])?/;
const ALIGNMENT_CELL = /^&/;
// Extra space before each further equation pair, as align puts between them.
const ALIGNMENT_GUTTER = 2;
/** Split at a separator outside every group, \left…\right pair, and environment. */
function splitTopLevel(source: string, separator: RegExp): string[] {
    const parts: string[] = [];
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
const OVERLINE = "\x1b[53m";
const NO_OVERLINE = "\x1b[55m";
const SGR = /\x1b\[[0-9;:]*m/g;
/** A line's cells, each one character with any styling codes that precede it. */
function cellsOf(line: string): string[] {
    const cells: string[] = [];
    let pending = "";
    for (const [token] of line.matchAll(/\x1b\[[0-9;:]*m|[\s\S]/gu)) {
        if (token.startsWith("\x1b")) {
            pending += token;
            continue;
        }
        cells.push(pending + token);
        pending = "";
    }
    if (pending) {
        if (cells.length > 0) {
            cells[cells.length - 1] += pending;
        }
        else {
            cells.push(pending);
        }
    }
    return cells;
}
function isColumnMark(cell: string): boolean {
    return cell.replace(SGR, "") === COLUMN_MARK;
}
/**
 * Cut the column marks out of a laid-out row, returning where each column
 * begins. A mark must sit alone in its column, on one row; otherwise the row
 * cannot be split and comes back undefined.
 */
function cutColumnMarks(lines: string[], count: number): { lines: string[]; bounds: number[] } | undefined {
    let grid = lines.map(cellsOf);
    const bounds: number[] = [];
    for (let mark = 0; mark < count; mark++) {
        const row = grid.findIndex((cells) => cells.some(isColumnMark));
        if (row < 0) {
            return undefined;
        }
        const column = grid[row].findIndex(isColumnMark);
        const span = grid[row][column + 1] === " " ? 2 : 1;
        if (grid.some((cells, other) => other !== row && cells.slice(column, column + span).some((cell) => cell !== " "))) {
            return undefined;
        }
        grid = grid.map((cells) => [...cells.slice(0, column), ...cells.slice(column + span)]);
        bounds.push(column);
    }
    if (grid.some((cells) => cells.some(isColumnMark))) {
        return undefined;
    }
    return { lines: grid.map((cells) => cells.join("")), bounds };
}
// Integrals that display mode draws three rows tall.
const TALL_OPERATORS: Record<string, string[] | undefined> = { "∫": ["╭", "│", "╯"] };
const SPACING_COMMANDS = new Set([
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
    "thinspace",
]);
const NEGATIVE_SPACING_COMMANDS = new Set(["!", "negmedspace", "negthickspace", "negthinspace"]);
const NEGATIVE_SPACE = "\u0000";
const FONT_SWITCH_COMMANDS = new Set(["bf", "cal", "it", "rm", "sf", "sl", "tt"]);
const IGNORED_COMMANDS = new Set([
    "displaystyle",
    "limits",
    "nonumber",
    "notag",
    "nolimits",
    "scriptstyle",
    "scriptscriptstyle",
    "textstyle",
]);
const SIZE_COMMANDS = new Set([
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
    "Biggr",
]);
const PLAIN_WRAPPERS = new Set([
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
    "underbrace",
]);
const ACCENTS: Record<string, string> = {
    acute: "\u0301",
    bar: "\u0305",
    breve: "\u0306",
    check: "\u030c",
    ddot: "\u0308",
    dot: "\u0307",
    grave: "\u0300",
    hat: "\u0302",
    mathring: "\u030a",
    overleftarrow: "\u20d6",
    overleftrightarrow: "\u20e1",
    overline: "\u0305",
    overrightarrow: "\u20d7",
    tilde: "\u0303",
    underline: "\u0332",
    vec: "\u20d7",
    widehat: "\u0302",
    widetilde: "\u0303",
};
/** A table's own entry, never one inherited from Object.prototype (`\constructor`). */
function own<T>(table: Record<string, T>, key: string): T | undefined {
    return Object.hasOwn(table, key) ? table[key] : undefined;
}
function replaceCharacters(value: string, replacements: Record<string, string>): string | undefined {
    let result = "";
    for (const character of value) {
        const replacement = own(replacements, character);
        if (replacement === undefined) {
            return undefined;
        }
        result += replacement;
    }
    return result;
}
function normalizeScriptValue(value: string): string {
    return value.trim().replace(/\s*([=+-])\s*/g, "$1");
}
function formatUnicodeScript(value: string, kind: "sub" | "sup"): string | undefined {
    const upright = uprightLetters(normalizeScriptValue(value));
    if (kind === "sup") {
        return replaceCharacters(upright, SUPERSCRIPTS);
    }
    const lowered = replaceCharacters(upright, SUBSCRIPTS);
    if (lowered !== undefined || !/[A-Za-z]/.test(upright)) {
        return lowered;
    }
    return replaceCharacters(upright, SMALL_SUBSCRIPTS);
}
function formatScript(value: string, kind: "sub" | "sup"): string {
    value = normalizeScriptValue(value);
    const unicode = formatUnicodeScript(value, kind);
    if (unicode !== undefined) {
        return unicode;
    }
    const prefix = kind === "sub" ? "_" : "^";
    if (Array.from(value).length === 1 || (kind === "sub" && /^[A-Za-z]+$/.test(value))) {
        return `${prefix}${value}`;
    }
    return `${prefix}(${value})`;
}
function formatFraction(numerator: string, denominator: string): string {
    numerator = numerator.trim();
    denominator = denominator.trim();
    const simpleNumerator = /^[\p{L}\p{N}.]+$/u.test(numerator);
    const simpleDenominator = /^[\p{N}.]+$/u.test(denominator) || Array.from(denominator).length === 1;
    return `${simpleNumerator ? numerator : `(${numerator})`}/${simpleDenominator ? denominator : `(${denominator})`}`;
}
function formatRoot(value: string, symbol = "√"): string {
    value = value.trim();
    return /^[\p{L}\p{N}.]+$/u.test(value) ? `${symbol}${value}` : `${symbol}(${value})`;
}
const NAMED_OPERATOR_START = "\u{f0004}";
const NAMED_OPERATOR_END = "\u{f0005}";
const NAMED_OPERATOR_LEFT_SPACING_PATTERN = /(?<=[\p{L}\p{N})\]}\u{f0001}])\u{f0004}/gu;
const NAMED_OPERATOR_RIGHT_SPACING_PATTERN = /\u{f0005}(?=[\p{L}\p{N}√\u{f0000}])/gu;
function normalizeOutput(value: string): string {
    return value
        .replace(NAMED_OPERATOR_LEFT_SPACING_PATTERN, " ")
        .replaceAll(NAMED_OPERATOR_START, "")
        .replace(NAMED_OPERATOR_RIGHT_SPACING_PATTERN, " ")
        .replaceAll(NAMED_OPERATOR_END, "")
        .split("\n")
        .map((line) => line.replace(/[ \t]+/g, " ").trim())
        .filter((line, index, lines) => line.length > 0 || (index > 0 && index < lines.length - 1))
        .join("\n")
        .trim();
}
const LAYOUT_MARKER_START = "\u{f0000}";
const LAYOUT_MARKER_END = "\u{f0001}";
const LAYOUT_MARKER_PATTERN = /\u{f0000}(\d+)\u{f0001}/gu;
const TRAILING_LAYOUT_MARKER_PATTERN = /\u{f0000}(\d+)\u{f0001}$/u;
const PROTECTED_SPACE = "\u{f0002}";
type Layout = { lines: string[]; width: number; baseline: number };
type LayoutNode =
    | { type: "fraction"; numerator: string; denominator: string }
    | { type: "operator"; operator: string; lower: string | undefined; upper: string | undefined }
    | { type: "script"; lower: string | undefined; upper: string | undefined }
    | { type: "root"; body: string; overline: boolean }
    | { type: "delimited"; left: string; right: string; body: string }
    | { type: "brace"; kind: "under" | "over"; base: string; label: string | undefined }
    | { type: "matrix"; lines: string[]; baseline: number };
function padLayoutLine(line: string, width: number, centered = false): string {
    const padding = Math.max(0, width - visibleWidth(line));
    const left = centered ? Math.floor(padding / 2) : 0;
    return `${" ".repeat(left)}${line}${" ".repeat(padding - left)}`;
}
function joinLayouts(layouts: Layout[]): Layout {
    if (layouts.length === 0) {
        return { lines: [""], width: 0, baseline: 0 };
    }
    const baseline = Math.max(...layouts.map((layout) => layout.baseline));
    const below = Math.max(...layouts.map((layout) => layout.lines.length - layout.baseline - 1));
    const lines: string[] = [];
    for (let row = 0; row <= baseline + below; row++) {
        let line = "";
        for (const layout of layouts) {
            const sourceRow = row - baseline + layout.baseline;
            line +=
                sourceRow >= 0 && sourceRow < layout.lines.length
                    ? padLayoutLine(layout.lines[sourceRow] ?? "", layout.width)
                    : " ".repeat(layout.width);
        }
        lines.push(line.trimEnd());
    }
    return {
        lines,
        width: layouts.reduce((width, layout) => width + layout.width, 0),
        baseline,
    };
}
/** A layout without the indent its rows share, as delimiters and radicals hug it. */
function flushLeft(layout: Layout): Layout {
    const indent = Math.min(...layout.lines.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length));
    const lines = layout.lines.map((line) => line.slice(indent));
    return { lines, width: Math.max(0, ...lines.map((line) => visibleWidth(line))), baseline: layout.baseline };
}
// Nodes drawn without padding of their own keep the spaces written beside them.
function keepsSpace(node: LayoutNode | undefined): boolean {
    return (node?.type === "matrix" ||
        node?.type === "root" ||
        node?.type === "delimited" ||
        node?.type === "brace");
}
function renderLayout(source: string, nodes: LayoutNode[]): Layout {
    const renderedLines: string[] = [];
    let firstBaseline = 0;
    for (const sourceLine of source.split("\n")) {
        const layouts: Layout[] = [];
        let position = 0;
        let previousNode: LayoutNode | undefined;
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
                const text = trimmed
                    ? `${preserveLeadingSpace ? " " : ""}${trimmed}${preserveTrailingSpace ? " " : ""}`
                    : preserveLeadingSpace || preserveTrailingSpace
                        ? " "
                        : "";
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
                        ` ${"─".repeat(contentWidth)} `,
                        ...denominator.lines.map((line) => padLayoutLine(line, width, true)),
                    ],
                    width,
                    baseline: numerator.lines.length,
                });
            }
            else if (node.type === "operator") {
                const contentWidth = Math.max(visibleWidth(node.operator), node.lower === undefined ? 0 : visibleWidth(node.lower), node.upper === undefined ? 0 : visibleWidth(node.upper));
                const pieces = own(TALL_OPERATORS, node.operator) ?? [node.operator];
                const lines: string[] = [];
                if (node.upper !== undefined) {
                    lines.push(`${padLayoutLine(node.upper, contentWidth, true)} `);
                }
                lines.push(...pieces.map((piece) => `${padLayoutLine(piece, contentWidth, true)} `));
                if (node.lower !== undefined) {
                    lines.push(`${padLayoutLine(node.lower, contentWidth, true)} `);
                }
                layouts.push({
                    lines,
                    width: contentWidth + 1,
                    baseline: (node.upper === undefined ? 0 : 1) + Math.floor(pieces.length / 2),
                });
            }
            else if (node.type === "root") {
                // A radical sign whose stroke climbs one column per row of the
                // radicand. Its bar is an overline on the radicand's top row
                // where styling is allowed, otherwise a row of ▁ above it, which
                // terminals draw edge to edge.
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
            }
            else if (node.type === "brace") {
                // Base and label centered over each other, the brace under (or
                // over) the base alone.
                const base = flushLeft(renderLayout(node.base, nodes));
                const label = node.label === undefined ? undefined : flushLeft(renderLayout(node.label, nodes));
                const width = Math.max(base.width, label?.width ?? 0);
                const centered = (line: string, lineWidth: number) => padLayoutLine(`${" ".repeat(Math.floor((width - lineWidth) / 2))}${line}`, width);
                const baseLines = base.lines.map((line) => centered(line, base.width));
                const labelLines = label?.lines.map((line) => centered(line, label.width)) ?? [];
                const brace = centered(drawBrace(base.width, node.kind), base.width);
                const under = node.kind === "under";
                layouts.push({
                    lines: under ? [...baseLines, brace, ...labelLines] : [...labelLines, brace, ...baseLines],
                    width,
                    baseline: under ? base.baseline : labelLines.length + 1 + base.baseline,
                });
            }
            else if (node.type === "delimited") {
                const body = flushLeft(renderLayout(node.body, nodes));
                const left = tallDelimiter(node.left, body.lines.length, body.baseline);
                const right = tallDelimiter(node.right, body.lines.length, body.baseline);
                layouts.push({
                    lines: body.lines.map((line, row) => `${left[row]}${padLayoutLine(line, body.width)}${right[row]}`),
                    width: visibleWidth(node.left) + body.width + visibleWidth(node.right),
                    baseline: body.baseline,
                });
            }
            else if (node.type === "script") {
                const upper = node.upper === undefined ? undefined : renderLayout(node.upper, nodes);
                const lower = node.lower === undefined ? undefined : renderLayout(node.lower, nodes);
                const width = Math.max(upper?.width ?? 0, lower?.width ?? 0);
                layouts.push({
                    lines: [
                        ...(upper?.lines.map((line) => padLayoutLine(line, width)) ?? []),
                        " ".repeat(width),
                        ...(lower?.lines.map((line) => padLayoutLine(line, width)) ?? []),
                    ],
                    width,
                    baseline: upper?.lines.length ?? 0,
                });
            }
            else {
                const width = Math.max(0, ...node.lines.map((line) => visibleWidth(line)));
                layouts.push({
                    lines: node.lines.map((line) => padLayoutLine(line, width)),
                    width,
                    baseline: node.baseline,
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
        baseline: firstBaseline,
    };
}
class LatexParser {
    source: string;
    layoutNodes: LayoutNode[];
    display: boolean;
    position = 0;
    supported = true;
    stackFractions = true;
    scriptDepth = 0;
    italic: boolean;
    ansi: boolean;
    uprightDepth = 0;
    constructor(source: string, layoutNodes: LayoutNode[], display: boolean, italic = false, ansi = false) {
        this.source = source;
        this.layoutNodes = layoutNodes;
        this.display = display;
        this.italic = italic;
        this.ansi = ansi;
    }
    render(): string | undefined {
        const rendered = this.parseSequence();
        if (!this.supported || this.position !== this.source.length) {
            return undefined;
        }
        return normalizeOutput(rendered);
    }
    parseSequence(endCharacter?: string): string {
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
                }
                else {
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
                }
                else {
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
                const node = marker ? this.layoutNodes[Number(marker[1])] : undefined;
                if (node?.type === "matrix") {
                    const lastLine = node.lines.length - 1;
                    node.lines[lastLine] = `${node.lines[lastLine] ?? ""}${character}`;
                    this.position++;
                    continue;
                }
            }
            result +=
                this.italic && this.uprightDepth === 0 && /[A-Za-z]/.test(character)
                    ? mathLetter(character, "italic")
                    : character;
            this.position++;
        }
        if (endCharacter) {
            this.supported = false;
        }
        return result;
    }
    parseScripts(initialMarker: string): string {
        const scripts: { sub?: string; sup?: string } = {};
        const order: ("sub" | "sup")[] = [];
        const parse = (marker: string) => {
            const kind = marker === "_" ? "sub" : "sup";
            this.scriptDepth++;
            try {
                scripts[kind] = this.parseRequiredArgument(false);
            }
            finally {
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
        const subUnicode = scripts.sub === undefined ? undefined : formatUnicodeScript(scripts.sub, "sub");
        const supUnicode = scripts.sup === undefined ? undefined : formatUnicodeScript(scripts.sup, "sup");
        const canUseLayout = ![scripts.sub, scripts.sup].some((value) => value !== undefined &&
            (value.includes("/") ||
                (!value.includes(LAYOUT_MARKER_START) &&
                    Array.from(value).length > 1 &&
                    !/[A-Z*∗]/.test(uprightLetters(value)))));
        const needsLayout = this.display &&
            canUseLayout &&
            (this.scriptDepth > 0 ||
                (scripts.sub !== undefined && subUnicode === undefined) ||
                (scripts.sup !== undefined && supUnicode === undefined));
        if (!needsLayout) {
            return order
                .map((kind) => kind === "sub"
                ? (subUnicode ?? formatScript(scripts.sub ?? "", kind))
                : (supUnicode ?? formatScript(scripts.sup ?? "", kind)))
                .join("");
        }
        const index = this.layoutNodes.push({
            type: "script",
            lower: scripts.sub === undefined ? undefined : normalizeOutput(scripts.sub),
            upper: scripts.sup === undefined ? undefined : normalizeOutput(scripts.sup),
        }) - 1;
        return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
    }
    parseWhitespace(): string {
        while (this.position < this.source.length && /\s/.test(this.source[this.position] ?? "")) {
            this.position++;
        }
        return " ";
    }
    parseCommand(): string {
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
        }
        else {
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
        if (command === "{" ||
            command === "}" ||
            command === "$" ||
            command === "%" ||
            command === "#" ||
            command === "_" ||
            command === "&") {
            return command;
        }
        if (command === "|") {
            return "‖";
        }
        if (command === "not") {
            const value = this.parseRequiredArgument(false).trim();
            const negated = own(NEGATED_SYMBOLS, value);
            if (negated !== undefined) {
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
        if (symbol !== undefined) {
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
                    denominator: normalizeOutput(denominator),
                }) - 1;
                return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
            }
            return formatFraction(numerator, denominator);
        }
        if (command === "sqrt") {
            const degree = this.parseOptionalArgument()?.trim();
            const value = this.parseRequiredArgument();
            if (degree === undefined || degree === "2") {
                if (this.display && this.scriptDepth === 0 && !/^[\p{L}\p{N}.]+$/u.test(value.trim())) {
                    const index = this.layoutNodes.push({ type: "root", body: normalizeOutput(value), overline: this.ansi }) - 1;
                    return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
                }
                return formatRoot(value);
            }
            if (degree === "3") {
                return formatRoot(value, "∛");
            }
            if (degree === "4") {
                return formatRoot(value, "∜");
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
        if (accent !== undefined) {
            const value = this.parseRequiredArgument();
            return Array.from(value).length === 1 ? `${value}${accent}` : `${command}(${value})`;
        }
        const alphabet = own(ALPHABET_COMMANDS, command);
        if (alphabet !== undefined) {
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
            const value = UPRIGHT_COMMANDS.test(command)
                ? this.parseUpright(() => this.parseRequiredArgument())
                : this.parseRequiredArgument();
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
    skipNameTerminator(): void {
        let next = this.position;
        while (next < this.source.length && /[ \t]/.test(this.source[next] ?? "")) {
            next++;
        }
        if (next > this.position && /[A-Za-z0-9]/.test(this.source[next] ?? "")) {
            this.position = next;
        }
    }
    /** \underbrace{base}_{label} or \overbrace{base}^{label}; the label is optional. */
    parseBrace(kind: "under" | "over"): string {
        const base = this.parseRequiredArgument();
        let next = this.position;
        while (next < this.source.length && /\s/.test(this.source[next] ?? "")) {
            next++;
        }
        let label: string | undefined;
        if (this.source[next] === (kind === "under" ? "_" : "^")) {
            this.position = next + 1;
            label = normalizeOutput(this.parseRequiredArgument(false));
        }
        const index = this.layoutNodes.push({ type: "brace", kind, base: normalizeOutput(base), label }) - 1;
        return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
    }
    /** Parse with variables kept upright, as in \text and \operatorname. */
    parseUpright(parse: () => string): string {
        this.uprightDepth++;
        try {
            return parse();
        }
        finally {
            this.uprightDepth--;
        }
    }
    /** One delimiter after \left or \right; `.` is none. */
    readDelimiter(): string {
        while (this.position < this.source.length && /\s/.test(this.source[this.position] ?? "")) {
            this.position++;
        }
        const character = this.source[this.position];
        if (character === undefined) {
            this.supported = false;
            return "";
        }
        if (character !== "\\") {
            this.position++;
            return ({ ".": "", "<": "\u27e8", ">": "\u27e9" } as Record<string, string | undefined>)[character] ?? character;
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
        if (symbol === undefined) {
            this.supported = false;
            return "";
        }
        return symbol;
    }
    /** \left…\right, whose delimiters display math grows to fit what they enclose. */
    parseDelimited(): string {
        const left = this.readDelimiter();
        let depth = 1;
        let end = -1;
        for (let index = this.position; index < this.source.length; index++) {
            if (this.source[index] !== "\\") {
                continue;
            }
            const name = /^\\([A-Za-z]+|.)/.exec(this.source.slice(index))?.[1] ?? "";
            if (name === "left") {
                depth++;
            }
            if (name === "right" && --depth === 0) {
                end = index;
                break;
            }
            index += name.length;
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
    parseOperator(operator: string, inlineLowerStyle: "bracket" | "script", displayLimits: boolean, spaced = false): string {
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
        let lower: string | undefined;
        let upper: string | undefined;
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
                if (lower !== undefined) {
                    this.supported = false;
                }
                lower = value;
            }
            else {
                if (upper !== undefined) {
                    this.supported = false;
                }
                upper = value;
            }
        }
        const tall = own(TALL_OPERATORS, operator) !== undefined && this.scriptDepth === 0;
        if (this.display && useDisplayLimits && (lower !== undefined || upper !== undefined || tall)) {
            const index = this.layoutNodes.push({ type: "operator", operator, lower, upper }) - 1;
            return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
        }
        let rendered = operator;
        if (lower !== undefined) {
            rendered += inlineLowerStyle === "bracket" ? `[${lower}]` : formatScript(lower, "sub");
        }
        if (upper !== undefined) {
            rendered += formatScript(upper, "sup");
        }
        return spaced ? ` ${rendered} ` : rendered;
    }
    parseRequiredArgument(stackFractions = true): string {
        const previousStackFractions = this.stackFractions;
        this.stackFractions = previousStackFractions && stackFractions;
        const value = this.parseRequiredArgumentValue();
        this.stackFractions = previousStackFractions;
        return value;
    }
    parseRequiredArgumentValue(): string {
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
    parseOptionalArgument(): string | undefined {
        while (this.position < this.source.length && /[ \t]/.test(this.source[this.position] ?? "")) {
            this.position++;
        }
        if (this.source[this.position] !== "[") {
            return undefined;
        }
        const end = this.source.indexOf("]", this.position + 1);
        if (end < 0) {
            this.supported = false;
            return undefined;
        }
        const value = this.source.slice(this.position + 1, end);
        this.position = end + 1;
        return this.renderNested(value);
    }
    readRawGroup(): string | undefined {
        while (this.position < this.source.length && /[ \t]/.test(this.source[this.position] ?? "")) {
            this.position++;
        }
        if (this.source[this.position] !== "{") {
            this.supported = false;
            return undefined;
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
        return undefined;
    }
    splitEnvironmentRows(body: string): string[] {
        return body.split(/\\\\(?:\[[^\]\n]*\])?/);
    }
    parseEnvironment(): string {
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
            if (aligned !== undefined) {
                return aligned;
            }
        }
        if (environment === "aligned" ||
            environment === "align" ||
            environment === "align*" ||
            environment === "alignedat" ||
            environment === "alignat" ||
            environment === "alignat*" ||
            environment === "gather" ||
            environment === "gathered" ||
            environment === "multline" ||
            environment === "multline*" ||
            environment === "split") {
            const alignedAt = ["alignedat", "alignat", "alignat*"].includes(environment);
            const alignedBody = alignedAt ? body.replace(/^\s*\{[^}]*\}/, "") : body;
            return this.splitEnvironmentRows(alignedBody)
                .map((row) => {
                const cells = row.split("&");
                const source = alignedAt
                    ? Array.from({ length: Math.ceil(cells.length / 2) }, (_, index) => cells.slice(index * 2, index * 2 + 2).join("")).join(" ")
                    : cells.join("");
                return this.renderNested(source).trim();
            })
                .filter(Boolean)
                .join("\n");
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
    renderAlignment(body: string): string | undefined {
        const rows = splitTopLevel(body, ALIGNMENT_ROW).filter((row) => row.trim());
        if (rows.length === 0) {
            return undefined;
        }
        const blocks: { lines: string[]; bounds: number[]; widths: number[] }[] = [];
        for (const row of rows) {
            const cells = splitTopLevel(row, ALIGNMENT_CELL);
            const rendered = this.renderNested(cells.join(COLUMN_MARK));
            if (!this.supported) {
                return undefined;
            }
            const block = cutColumnMarks(renderLayout(rendered, this.layoutNodes).lines, cells.length - 1);
            if (block === undefined) {
                return undefined;
            }
            const edges = [0, ...block.bounds, Math.max(...block.lines.map((line) => cellsOf(line).length))];
            blocks.push({ ...block, widths: edges.slice(1).map((edge, column) => edge - edges[column]) });
        }
        const columns = Math.max(...blocks.map((block) => block.widths.length));
        const target = Array.from({ length: columns }, (_, column) => Math.max(...blocks.map((block) => block.widths[column] ?? 0)));
        const lines: string[] = [];
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
                    ...cells.slice(at),
                ]);
            }
            // A blank row keeps a stacked row from running into its neighbours.
            if (row > 0 && (block.lines.length > 1 || blocks[row - 1].lines.length > 1)) {
                lines.push("");
            }
            lines.push(...padded.map((cells) => cells.join("").trimEnd()));
        });
        const index = this.layoutNodes.push({ type: "matrix", lines, baseline: Math.floor((lines.length - 1) / 2) }) - 1;
        return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
    }
    renderCases(body: string): string {
        const rows = this.splitEnvironmentRows(body)
            .map((row) => row.split("&").map((cell) => this.renderNested(cell, false).trim()))
            .filter((row) => row.some(Boolean));
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
        const visualRows: (string | undefined)[] = [...contents];
        if (contents.length % 2 === 0) {
            visualRows.splice(middle, 0, undefined);
        }
        const brace = delimiterColumn("{", visualRows.length);
        const lines = visualRows.map((content, index) => content === undefined ? brace[index] : `${brace[index]} ${content}`);
        const index = this.layoutNodes.push({ type: "matrix", lines, baseline: middle }) - 1;
        return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
    }
    /** A matrix's columns stand apart on space alone; an array that asks for rules gets them. */
    renderMatrix(environment: string, body: string, ruled = false): string {
        const matrix = this.splitEnvironmentRows(body)
            .map((row) => row.split("&").map((cell) => this.renderNested(cell, false).trim()))
            .filter((row) => row.some(Boolean));
        const columnCount = Math.max(0, ...matrix.map((row) => row.length));
        const columnWidths = Array.from({ length: columnCount }, (_, column) => Math.max(0, ...matrix.map((row) => visibleWidth(row[column] ?? ""))));
        const rows = matrix.map((row) => Array.from({ length: columnCount }, (_, column) => {
            const cell = row[column] ?? "";
            return `${cell}${PROTECTED_SPACE.repeat(Math.max(0, (columnWidths[column] ?? 0) - visibleWidth(cell)))}`;
        }).join(ruled ? " │ " : PROTECTED_SPACE.repeat(3)));
        let lines: string[];
        if (environment === "array" || environment === "matrix" || environment === "smallmatrix") {
            lines = rows;
        }
        else {
            const delimiters: Record<string, [string, string]> = {
                pmatrix: ["(", ")"],
                bmatrix: ["[", "]"],
                Bmatrix: ["{", "}"],
                vmatrix: ["|", "|"],
                Vmatrix: ["‖", "‖"],
            };
            const delimiter = own(delimiters, environment);
            if (!delimiter) {
                this.supported = false;
                return rows.join("\n");
            }
            const left = delimiterColumn(delimiter[0], rows.length);
            const right = delimiterColumn(delimiter[1], rows.length);
            lines = rows.map((row, index) => `${left[index]} ${row} ${right[index]}`);
        }
        if (lines.length <= 1) {
            return lines[0] ?? "";
        }
        const index = this.layoutNodes.push({ type: "matrix", lines, baseline: 0 }) - 1;
        return `${LAYOUT_MARKER_START}${index}${LAYOUT_MARKER_END}`;
    }
    renderNested(source: string, stackFractions = true): string {
        const rendered = new LatexParser(source, this.layoutNodes, this.display && stackFractions, this.italic, this.ansi).render();
        if (rendered === undefined) {
            this.supported = false;
            return source;
        }
        return rendered;
    }
}
/**
 * Render a basic LaTeX math expression as terminal-friendly Unicode text.
 * Returns undefined when the expression contains unsupported or malformed syntax.
 */
export function renderLatex(source: string, options: RenderLatexOptions = {}): string | undefined {
    const layoutNodes: LayoutNode[] = [];
    const rendered = new LatexParser(source, layoutNodes, options.display === true, options.italic === true, options.ansi === true).render();
    if (rendered === undefined) {
        return undefined;
    }
    if (layoutNodes.length === 0) {
        return rendered.replaceAll(PROTECTED_SPACE, " ");
    }
    const lines = renderLayout(rendered, layoutNodes).lines;
    const indentation = Math.min(...lines.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length));
    return lines
        .map((line) => line.slice(indentation).trimEnd())
        .join("\n")
        .trimEnd()
        .replaceAll(PROTECTED_SPACE, " ");
}
