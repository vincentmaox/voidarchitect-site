from pathlib import Path
from xml.sax.saxutils import escape

BASE = Path("public/images/projects")

PRODUCTS = {
    "voidarchitect-site": {
        "brand": "Studio OS",
        "dark": "#05070A",
        "mid": "#007AFF",
        "light": "#55C7FF",
        "hot": "#FF6B35",
        "screens": [
            ("home", "Spatial Studio Home", "VisionOS storefront", "5 curated apps", ["Hero glass shell", "Fluid blue/orange halo", "IP language routing"]),
            ("gallery", "Product Gallery", "Signal-first selection", "curated, not crowded", ["void-brain", "hermes-desktop", "AI-Screen-Record", "TexasPhilosopher"]),
            ("sync", "ProjectOS Sync", "Public registry pipeline", "safe boundary", ["ProjectOS export", "GitHub raw registry", "Vercel rebuild", "Public fields only"]),
        ],
    },
    "void-brain": {
        "brand": "Knowledge OS",
        "dark": "#071A2E",
        "mid": "#007AFF",
        "light": "#55C7FF",
        "hot": "#FF6B35",
        "screens": [
            ("library", "Local Knowledge Library", "Documents indexed by topic", "local first", ["Research notes", "Project journals", "PDF library", "Source boundary"]),
            ("rag", "Traceable RAG Answer", "Citations stay visible", "6 citations", ["Answer draft", "Context blocks", "Citation rail", "Source jump-back"]),
            ("export", "Brief Export", "Research becomes deliverable", "brief ready", ["Executive brief", "Evidence section", "Decision notes", "Export queue"]),
        ],
    },
    "hermes-desktop": {
        "brand": "Agent Cockpit",
        "dark": "#111318",
        "mid": "#FF6B35",
        "light": "#55C7FF",
        "hot": "#007AFF",
        "screens": [
            ("voice", "Voice Command Deck", "Hands-free task launch", "hands free", ["Wake phrase", "Intent parse", "Tool routing", "Live transcript"]),
            ("tasks", "Agent Task Queue", "Long-running work stays visible", "live queue", ["Acquire context", "Bridge sources", "Construct output", "Decide next action"]),
            ("state", "Runtime State Board", "Models, tools, and output", "observable", ["Claude", "Browser", "Files", "Deploy"]),
        ],
    },
    "ai-screen-record": {
        "brand": "Memory Recorder",
        "dark": "#05070A",
        "mid": "#143766",
        "light": "#007AFF",
        "hot": "#FF6B35",
        "screens": [
            ("player", "Screen Playback", "Replay the work session", "timeline", ["00:00 capture", "03:42 branch edit", "08:16 build check", "12:30 deploy note"]),
            ("events", "Action Timeline", "Clicks and switches become events", "action map", ["Open editor", "Search symbol", "Run build", "Inspect UI"]),
            ("summary", "AI Memory Summary", "Session compressed into memory", "memory card", ["Goal", "Evidence", "Decision", "Follow-up"]),
        ],
    },
    "texas-philosopher": {
        "brand": "Strategy Game",
        "dark": "#052E2A",
        "mid": "#FF6B35",
        "light": "#007AFF",
        "hot": "#30D158",
        "screens": [
            ("table", "Strategy Table", "Risk and probability in every hand", "decision loop", ["Pot odds", "Position", "Persona read", "Discipline score"]),
            ("persona", "AI Persona Opponents", "Read patterns, not scripts", "6 personas", ["Stoic Shark", "Chaos Fox", "Quiet Monk", "Market Wolf"]),
            ("run", "Roguelike Growth", "Training feedback compounds", "level 7", ["Range craft", "Tilt control", "Risk sizing", "Long game"]),
        ],
    },
}


def rect(x, y, w, h, rx, fill, opacity=1, stroke=None, sw=1):
    node = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" fill-opacity="{opacity}"'
    if stroke:
        node += f' stroke="{stroke}" stroke-width="{sw}"'
    return node + "/>"


def text(x, y, content, size, weight=700, fill="#0B1220", opacity=1, family="Instrument Sans, PingFang SC, sans-serif", spacing=0):
    return f'<text x="{x}" y="{y}" fill="{fill}" fill-opacity="{opacity}" font-family="{family}" font-size="{size}" font-weight="{weight}" letter-spacing="{spacing}">{escape(content)}</text>'


def build_visual(slug, key, mid, hot):
    if slug == "texas-philosopher" and key == "table":
        nodes = ['<ellipse cx="895" cy="500" rx="310" ry="176" fill="white" fill-opacity="0.16" stroke="white" stroke-opacity="0.35" stroke-width="2"/>']
        for i, label in enumerate(["BTN", "SB", "BB", "HJ"]):
            x = [650, 845, 1040, 845][i]
            y = [500, 340, 500, 650][i]
            nodes.append(rect(x, y, 88, 58, 20, "#FFFFFF", 0.26))
            nodes.append(text(x + 24, y + 37, label, 19, 800, "#FFFFFF", 0.88, "IBM Plex Mono, monospace"))
        return "".join(nodes)
    if slug == "ai-screen-record" and key in {"player", "events"}:
        nodes = [rect(660, 310, 570, 326, 36, "#FFFFFF", 0.15, "#FFFFFF", 1.2)]
        for i in range(7):
            y = 350 + i * 36
            nodes.append(rect(700, y, 360 + (i % 3) * 42, 12, 6, "#FFFFFF", 0.22 + i * 0.035))
            nodes.append(f'<circle cx="1190" cy="{y + 6}" r="8" fill="{hot}" fill-opacity="{0.35 + i * 0.055:.2f}"/>')
        return "".join(nodes)
    if slug == "hermes-desktop" and key == "state":
        nodes = []
        for i, label in enumerate(["MODEL", "TOOLS", "TOKENS", "OUTPUT"]):
            x = 660 + (i % 2) * 286
            y = 326 + (i // 2) * 160
            nodes.append(rect(x, y, 246, 122, 30, "#FFFFFF", 0.18 + i * 0.04, "#FFFFFF", 1.2))
            nodes.append(text(x + 28, y + 48, label, 18, 800, "#FFFFFF", 0.62, "IBM Plex Mono, monospace", 2))
            nodes.append(rect(x + 28, y + 76, 136, 12, 6, "#FFFFFF", 0.34))
        return "".join(nodes)

    nodes = []
    for i in range(3):
        x = 682 + i * 176
        h = [172, 126, 204][i]
        nodes.append(rect(x, 334 + (204 - h), 128, h, 30, "#FFFFFF", 0.18 + i * 0.08, "#FFFFFF", 1.4))
        nodes.append(rect(x + 26, 374 + (204 - h), 76, 12, 6, "#FFFFFF", 0.52))
        nodes.append(rect(x + 26, 402 + (204 - h), 52, 10, 5, "#FFFFFF", 0.28))
    return "".join(nodes)


def make_svg(slug, cfg, screen):
    key, title, subtitle, metric, items = screen
    dark, mid, light, hot = cfg["dark"], cfg["mid"], cfg["light"], cfg["hot"]
    item_cards = []
    for i, item in enumerate(items):
        y = 330 + i * 84
        item_cards.append(rect(260, y, 332, 56, 20, "#FFFFFF", 0.78))
        item_cards.append(rect(286, y + 18, 34, 20, 10, mid, 0.22))
        item_cards.append(text(340, y + 36, item, 21, 700, "#162033", 0.84))

    timeline = []
    for i in range(6):
        x = 684 + i * 88
        timeline.append(f'<circle cx="{x}" cy="652" r="8" fill="white" fill-opacity="{0.28 + i * 0.1:.2f}"/>')
        if i < 5:
            timeline.append(rect(x + 16, 648, 56, 8, 4, "#FFFFFF", 0.16 + i * 0.04))

    return f'''<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="1000" gradientUnits="userSpaceOnUse"><stop stop-color="#FFFFFF"/><stop offset="0.46" stop-color="#F5F8FC"/><stop offset="1" stop-color="#E9EEF5"/></linearGradient>
    <linearGradient id="app" x1="216" y1="182" x2="1360" y2="826" gradientUnits="userSpaceOnUse"><stop stop-color="{dark}"/><stop offset="0.54" stop-color="{mid}"/><stop offset="1" stop-color="{light}"/></linearGradient>
    <radialGradient id="haloA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1250 180) rotate(135) scale(560 420)"><stop stop-color="{mid}" stop-opacity="0.25"/><stop offset="1" stop-color="{mid}" stop-opacity="0"/></radialGradient>
    <radialGradient id="haloB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(290 790) rotate(-25) scale(460 320)"><stop stop-color="{hot}" stop-opacity="0.18"/><stop offset="1" stop-color="{hot}" stop-opacity="0"/></radialGradient>
    <filter id="shadow" x="100" y="80" width="1400" height="860" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="52" stdDeviation="62" flood-color="#203044" flood-opacity="0.20"/></filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#haloA)"/>
  <rect width="1600" height="1000" fill="url(#haloB)"/>
  <g filter="url(#shadow)">
    <rect x="170" y="126" width="1260" height="748" rx="66" fill="white" fill-opacity="0.82"/>
    <rect x="171" y="127" width="1258" height="746" rx="65" stroke="white" stroke-opacity="0.95" stroke-width="2"/>
  </g>
  <rect x="220" y="178" width="1160" height="644" rx="50" fill="url(#app)"/>
  <rect x="220" y="178" width="1160" height="72" rx="50" fill="white" fill-opacity="0.16"/>
  <circle cx="274" cy="215" r="10" fill="#FF5F57"/><circle cx="310" cy="215" r="10" fill="#FFBD2E"/><circle cx="346" cy="215" r="10" fill="#28C840"/>
  {text(408, 222, cfg["brand"], 17, 800, "#FFFFFF", 0.62, "IBM Plex Mono, monospace", 3)}
  <rect x="250" y="280" width="370" height="488" rx="38" fill="white" fill-opacity="0.14" stroke="white" stroke-opacity="0.24" stroke-width="1.5"/>
  {text(280, 318, metric.upper(), 15, 800, "#FFFFFF", 0.62, "IBM Plex Mono, monospace", 2)}
  {"".join(item_cards)}
  <rect x="650" y="286" width="610" height="402" rx="42" fill="white" fill-opacity="0.12" stroke="white" stroke-opacity="0.25" stroke-width="1.5"/>
  {build_visual(slug, key, mid, hot)}
  {"".join(timeline)}
  {text(650, 738, title, 56, 850, "#FFFFFF", 1, "Instrument Sans, PingFang SC, sans-serif", -2)}
  {text(654, 782, subtitle, 21, 650, "#FFFFFF", 0.66)}
  <rect x="1090" y="202" width="244" height="36" rx="18" fill="white" fill-opacity="0.18"/>
  {text(1120, 226, "APP STORE SCREEN", 13, 800, "#FFFFFF", 0.72, "IBM Plex Mono, monospace", 2)}
</svg>
'''


def main():
    for slug, cfg in PRODUCTS.items():
        out_dir = BASE / slug / "screens"
        out_dir.mkdir(parents=True, exist_ok=True)
        for screen in cfg["screens"]:
            (out_dir / f"{screen[0]}.svg").write_text(make_svg(slug, cfg, screen), encoding="utf-8")


if __name__ == "__main__":
    main()
