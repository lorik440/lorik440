<!--
  LORIK OS — terminal profile README
  Rendered as a single inline SVG so the CRT/phosphor aesthetic is identical
  in light and dark GitHub themes. A plain-text transcript is included below
  in a <details> block for accessibility and crawlers.
-->

<p align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 812" width="880" height="812"
     role="img" aria-label="LORIK OS — lorik Bajrami GitHub profile terminal"
     preserveAspectRatio="xMidYMid meet">
  <title>LORIK OS</title>
  <desc>Terminal session for lorik Bajrami (lorik440): identity, projects, about and links.</desc>

  <style>@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&amp;display=swap');</style>

  <defs>
    <!-- soft depth shadow for the housing -->
    <filter id="ds" x="-10%" y="-10%" width="120%" height="135%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
      <feOffset dy="6" result="o"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.45"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- subtle phosphor glow -->
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="1.3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- CRT scanlines -->
    <pattern id="scan" width="880" height="3" patternUnits="userSpaceOnUse">
      <rect width="880" height="1" y="1" fill="#000" opacity="0.10"/>
    </pattern>
    <!-- screen vignette -->
    <radialGradient id="vig" cx="0.5" cy="0.45" r="0.78">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.42"/>
    </radialGradient>
    <clipPath id="screen"><rect x="20" y="20" width="840" height="772" rx="6"/></clipPath>
  </defs>

  <!-- housing -->
  <rect x="8" y="8" width="864" height="796" rx="12" fill="#020504" stroke="#0a1f12" stroke-width="2" filter="url(#ds)"/>
  <rect x="20" y="20" width="840" height="772" rx="6" fill="#030806" stroke="#123a26" stroke-width="1.5"/>

  <g clip-path="url(#screen)">
    <!-- title bar -->
    <rect x="22" y="22" width="836" height="38" fill="#0a1a12"/>
    <line x1="22" y1="60" x2="858" y2="60" stroke="#143a26" stroke-width="1"/>

    <!-- scanlines + vignette behind text -->
    <rect x="20" y="20" width="840" height="772" fill="url(#scan)"/>
    <rect x="20" y="20" width="840" height="772" fill="url(#vig)"/>

    <!-- HUD corner ticks -->
    <g stroke="#4FDC91" stroke-width="1" opacity="0.45" fill="none">
      <path d="M30 36 H44 M30 36 V50"/>
      <path d="M850 36 H836 M850 36 V50"/>
      <path d="M30 776 H44 M30 776 V762"/>
      <path d="M850 776 H836 M850 776 V762"/>
    </g>

    <!-- all terminal text -->
    <g font-family="'JetBrains Mono','Cascadia Code','Fira Code','Source Code Pro',ui-monospace,Menlo,Consolas,monospace" font-size="14" fill="#C8FFE0">

      <!-- ── boot ── -->
      <text x="36" y="82" font-size="12.5" fill="#3aa374">LORIK OS  v2.4.40   build 216603   kernel: phosphor-crt</text>
      <text x="36" y="104" font-size="12.5" fill="#6DEBAA">initializing phosphor driver <tspan fill="#8EFFC6">........ ok</tspan></text>
      <text x="36" y="126" font-size="12.5" fill="#6DEBAA">mounting /dev/lorik <tspan fill="#8EFFC6">................ ok</tspan></text>
      <text x="36" y="148" font-size="12.5" fill="#8EFFC6">session established — welcome back, operator.</text>
      <line x1="36" y1="166" x2="844" y2="166" stroke="#123a26" stroke-width="1"/>

      <!-- ── whoami ── -->
      <text x="36" y="190" fill="#4FDC91">lorik@lorik-os:~$ <tspan fill="#8EFFC6">whoami</tspan></text>
      <text x="52" y="216" font-size="16" fill="#8EFFC6" filter="url(#glow)">lorik Bajrami</text>
      <text x="52" y="238" font-size="13" fill="#6DEBAA">&quot;ssssss... git push 💥&quot;</text>

      <!-- ── system.identity ── -->
      <text x="36" y="266" fill="#4FDC91">lorik@lorik-os:~$ <tspan fill="#8EFFC6">system.identity</tspan></text>
      <rect x="36" y="280" width="600" height="150" rx="4" fill="#06120D" stroke="#143a26" stroke-width="1"/>
      <text x="52" y="304" font-size="13" fill="#6DEBAA">ID <tspan fill="#2a6b48">.............. </tspan><tspan fill="#C8FFE0">lorik440</tspan></text>
      <text x="52" y="326" font-size="13" fill="#6DEBAA">OPERATOR <tspan fill="#2a6b48">........ </tspan><tspan fill="#C8FFE0">lorik Bajrami</tspan></text>
      <text x="52" y="348" font-size="13" fill="#6DEBAA">CLEARANCE <tspan fill="#2a6b48">........ </tspan><tspan fill="#C8FFE0">developer</tspan></text>
      <text x="52" y="370" font-size="13" fill="#6DEBAA">STACK <tspan fill="#2a6b48">........... </tspan><tspan fill="#C8FFE0">Python · JavaScript · C#</tspan></text>
      <text x="52" y="392" font-size="13" fill="#6DEBAA">JOINED <tspan fill="#2a6b48">........... </tspan><tspan fill="#C8FFE0">2025.06</tspan></text>
      <text x="52" y="414" font-size="13" fill="#6DEBAA">STATUS <tspan fill="#2a6b48">........... </tspan><tspan fill="#27FF9C">●</tspan> <tspan fill="#C8FFE0">online</tspan></text>
      <text x="52" y="452" font-size="12.5" fill="#4FDC91">repos 5  ·  followers 2  ·  following 4  ·  public 5</text>

      <!-- ── ls projects/ ── -->
      <text x="36" y="478" fill="#4FDC91">lorik@lorik-os:~$ <tspan fill="#8EFFC6">ls projects/</tspan></text>
      <text x="52" y="502" font-size="11.5" letter-spacing="1" fill="#3aa374">NAME                LANG   STARS   DESCRIPTION</text>
      <line x1="52" y1="510" x2="844" y2="510" stroke="#123a26" stroke-width="1"/>

      <!-- Code.HP -->
      <text x="52" y="530" font-size="13.5"><a href="https://github.com/lorik440/Code.HP" target="_top"><tspan fill="#8EFFC6">Code.HP</tspan></a></text>
      <text x="196" y="530" font-size="13.5" fill="#6DEBAA">[JS]</text>
      <text x="252" y="530" font-size="13.5" fill="#E6B800">★1</text>
      <text x="300" y="530" font-size="13.5" fill="#BFE7D2">background snippet manager — store, search &amp; copy code</text>

      <!-- DockApp -->
      <text x="52" y="556" font-size="13.5"><a href="https://github.com/lorik440/DockApp" target="_top"><tspan fill="#8EFFC6">DockApp</tspan></a></text>
      <text x="196" y="556" font-size="13.5" fill="#6DEBAA">[C#]</text>
      <text x="252" y="556" font-size="13.5" fill="#E6B800">★0</text>
      <text x="300" y="556" font-size="13.5" fill="#BFE7D2">adaptive Windows launcher with a liquid-glass UI</text>

      <!-- TorchFoundry -->
      <text x="52" y="582" font-size="13.5"><a href="https://github.com/lorik440/TorchFoundry" target="_top"><tspan fill="#8EFFC6">TorchFoundry</tspan></a></text>
      <text x="196" y="582" font-size="13.5" fill="#6DEBAA">[PY]</text>
      <text x="252" y="582" font-size="13.5" fill="#E6B800">★0</text>
      <text x="300" y="582" font-size="13.5" fill="#BFE7D2">PyTorch utility lib — reusable ML/training functions</text>

      <!-- GestureNet -->
      <text x="52" y="608" font-size="13.5"><a href="https://github.com/lorik440/GestureNet" target="_top"><tspan fill="#8EFFC6">GestureNet</tspan></a></text>
      <text x="196" y="608" font-size="13.5" fill="#6DEBAA">[PY]</text>
      <text x="252" y="608" font-size="13.5" fill="#E6B800">★0</text>
      <text x="300" y="608" font-size="13.5" fill="#BFE7D2">gesture recognition model — model AI</text>

      <!-- ── cat about.md ── -->
      <text x="36" y="640" fill="#4FDC91">lorik@lorik-os:~$ <tspan fill="#8EFFC6">cat about.md</tspan></text>
      <text x="52" y="664" font-size="13" fill="#C8FFE0">I build desktop tools and ML utilities — mostly C#, JavaScript &amp; Python.</text>
      <text x="52" y="686" font-size="13" fill="#6DEBAA">This terminal is my profile; the repositories do the talking.</text>

      <!-- system.status: links -->
      <text x="36" y="710" fill="#4FDC91">lorik@lorik-os:~$ <tspan fill="#8EFFC6">system.status --links</tspan></text>
      <text x="52" y="734" font-size="14"><tspan fill="#3aa374">// channels:  </tspan><a href="https://github.com/lorik440" target="_top"><tspan fill="#8EFFC6" filter="url(#glow)">[ GITHUB ]</tspan></a><tspan fill="#3aa374" font-size="12">   // no other channels registered</tspan></text>

      <!-- ── live prompt + blinking cursor ── -->
      <text x="36" y="754" fill="#4FDC91">lorik@lorik-os:~$</text>
      <rect x="196" y="740" width="10" height="16" fill="#8EFFC6">
        <animate attributeName="opacity" values="1;0.12;1" dur="1.06s" repeatCount="indefinite"/>
      </rect>

      <!-- ── footer status bar ── -->
      <rect x="22" y="762" width="836" height="30" fill="#0a1a12"/>
      <line x1="22" y1="762" x2="858" y2="762" stroke="#143a26" stroke-width="1"/>
      <text x="40" y="782" font-size="12" fill="#4FDC91">LORIK OS</text>
      <text x="440" y="782" font-size="11.5" text-anchor="middle" fill="#6DEBAA">lorik@lorik-os:~  ·  phosphor-crt  ·  utf-8</text>
      <text x="844" y="782" font-size="11.5" text-anchor="end"><tspan fill="#E6B800">★1</tspan><tspan fill="#6DEBAA"> / 5 repos  ·  2 followers  ↑ 4 following</tspan></text>
    </g>
  </g>
</svg>
</p>

<details>
<summary><b>LORIK OS</b> — text transcript / accessible version</summary>

**lorik Bajrami** — <code>lorik440</code>
<blockquote>"ssssss... git push 💥"</blockquote>

| project | lang | ★ | description |
| --- | --- | --- | --- |
| [Code.HP](https://github.com/lorik440/Code.HP) | JS | 1 | background snippet manager — store, search & copy code |
| [DockApp](https://github.com/lorik440/DockApp) | C# | 0 | adaptive Windows launcher with a liquid-glass UI |
| [TorchFoundry](https://github.com/lorik440/TorchFoundry) | PY | 0 | PyTorch utility lib — reusable ML/training functions |
| [GestureNet](https://github.com/lorik440/GestureNet) | PY | 0 | gesture recognition model — model AI |

I build desktop tools and ML utilities — mostly C#, JavaScript & Python.
This terminal is my profile; the repositories do the talking.

GitHub: https://github.com/lorik440  ·  5 repos · 2 followers · following 4

</details>
