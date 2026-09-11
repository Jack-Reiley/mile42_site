"""Rebuilds the dashboard illustration with a new figure.

Strips the traced person (subpaths 111 and 143-159 of the line-art path) and
appends a hand-authored <g id="person"> drawn as strokes, in the vocabulary of
the robot-team sketch: loose black lines, solid curly hair, striped sleeves,
wide trousers, solid sneakers.
"""
import re, math, random, sys

SRC = __file__.replace('dashboard_user_v3_figure.py', 'dashboard_user_v2_with_color.svg')
PERSON = set([111] + list(range(143, 160)))
SW = 9  # stroke width, matched to the traced outlines' weight

random.seed(int(sys.argv[2]) if len(sys.argv) > 2 else 7)


def wob(pts, amp=2.2, steps=6):
    """Polyline -> smooth path with a little hand tremor, as a quadratic chain."""
    out = []
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        for s in range(steps):
            t = s / steps
            out.append((x0 + (x1 - x0) * t + random.uniform(-amp, amp),
                        y0 + (y1 - y0) * t + random.uniform(-amp, amp)))
    out.append(pts[-1])
    d = f'M{out[0][0]:.1f},{out[0][1]:.1f}'
    for i in range(1, len(out) - 1):
        mx, my = (out[i][0] + out[i + 1][0]) / 2, (out[i][1] + out[i + 1][1]) / 2
        d += f' Q{out[i][0]:.1f},{out[i][1]:.1f} {mx:.1f},{my:.1f}'
    d += f' L{out[-1][0]:.1f},{out[-1][1]:.1f}'
    return d


def curve(pts, close=False):
    """Catmull-Rom through pts -> cubic path. Smooth, for outlines."""
    p = list(pts)
    if close:
        p = [p[-1]] + p + [p[0], p[1]]
    else:
        p = [p[0]] + p + [p[-1]]
    d = f'M{p[1][0]:.1f},{p[1][1]:.1f}'
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}'
    return d + (' Z' if close else '')


def stroke(d, w=SW, extra=''):
    return f'<path d="{d}" fill="none" stroke="#000" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"{extra}/>'


def fill(d, extra=''):
    return f'<path d="{d}" fill="#000" stroke="#000" stroke-width="{SW}" stroke-linejoin="round"{extra}/>'


def curls(cx, cy, rx, ry, n, r):
    """A ring of little bumps: the curly-hair silhouette."""
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n
        rr = r * random.uniform(0.7, 1.3)
        pts.append((cx + (rx + rr) * math.cos(a), cy + (ry + rr) * math.sin(a)))
        a2 = a + math.pi / n
        pts.append((cx + (rx - rr * 0.4) * math.cos(a2), cy + (ry - rr * 0.4) * math.sin(a2)))
    return curve(pts, close=True)


def band(center, hw):
    """Two rails offset either side of a centreline polyline, for an arm."""
    L, R = [], []
    for i, (x, y) in enumerate(center):
        (x0, y0) = center[max(i - 1, 0)]
        (x1, y1) = center[min(i + 1, len(center) - 1)]
        dx, dy = x1 - x0, y1 - y0
        n = math.hypot(dx, dy) or 1
        nx, ny = -dy / n * hw, dx / n * hw
        L.append((x + nx, y + ny))
        R.append((x - nx, y - ny))
    return L, R


def sleeve(center, hw, n=7):
    L, R = band(center, hw)
    g = [stroke(curve(L)), stroke(curve(R))]
    # stripes: straight across between the rails at even spacing along the centreline
    total = sum(math.dist(center[i], center[i + 1]) for i in range(len(center) - 1))
    for k in range(1, n + 1):
        want = total * k / (n + 1)
        acc = 0
        for i in range(len(center) - 1):
            seg = math.dist(center[i], center[i + 1])
            if acc + seg >= want:
                u = (want - acc) / seg
                cx = center[i][0] + (center[i + 1][0] - center[i][0]) * u
                cy = center[i][1] + (center[i + 1][1] - center[i][1]) * u
                dx, dy = center[i + 1][0] - center[i][0], center[i + 1][1] - center[i][1]
                nn = math.hypot(dx, dy)
                nx, ny = -dy / nn * (hw - 3), dx / nn * (hw - 3)
                g.append(stroke(wob([(cx + nx, cy + ny), (cx - nx, cy - ny)], amp=1.2, steps=3), w=SW * 0.8))
                break
            acc += seg
    return g, L, R


def cloud(points, r):
    """Solid circles along a path: the curly-hair silhouette."""
    out = []
    for (x, y) in points:
        rr = r * random.uniform(0.85, 1.15)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rr:.1f}" fill="#000"/>')
    return out


def hand(wrist, angle, hw, flip=1):
    """A pointing hand. Local frame: wrist on the y axis from -hw to +hw, index
    finger along +x, thumb on -y. `angle` is the finger's world direction in
    degrees; `flip` puts the thumb on the other side."""
    a = math.radians(angle)
    ca, sa = math.cos(a), math.sin(a)
    k = hw / 28
    def T(x, y):
        x, y = x * k, y * k * flip
        return (wrist[0] + x * ca - y * sa, wrist[1] + x * sa + y * ca)
    def P(pts):
        return [T(x, y) for (x, y) in pts]
    g = []
    # one outline, wrist to wrist: back of the hand, the index finger out and
    # back, three folded fingers, the heel of the hand
    g.append(stroke(curve(P([(0, -28), (26, -30), (48, -26), (74, -24), (98, -20), (106, -12), (100, -2),
                              (76, -4), (54, -2), (58, 10), (54, 22), (44, 32), (24, 34), (0, 28)]))))
    # the thumb, hooked over the top of the fist
    g.append(stroke(curve(P([(18, -30), (30, -42), (46, -40), (48, -28)])), w=SW * 0.9))
    # two knuckle marks on the folded fingers
    g.append(stroke(curve(P([(48, 6), (56, 12)])), w=SW * 0.8))
    g.append(stroke(curve(P([(44, 18), (52, 24)])), w=SW * 0.8))
    return g


def figure():
    g = []
    # ---- head from behind and a little to the side, tipped back to look up
    #      at the dashboard. The hair is a cap that follows the skull, and the
    #      face is a crescent on the left: brow, nose, lips, chin, jaw. ----
    HX, HY = 990, 948
    def tilt(pts, deg=30, about=(HX - 6, HY + 62)):
        a = math.radians(deg)
        ca, sa = math.cos(a), math.sin(a)
        return [(about[0] + (x - about[0]) * ca - (y - about[1]) * sa,
                 about[1] + (x - about[0]) * sa + (y - about[1]) * ca) for (x, y) in pts]
    # the cap: hairline at the forehead, over the crown, down the back to the
    # nape, then the hairline back up the temple and cheek
    cap = [(HX - 42, HY - 46), (HX - 14, HY - 70), (HX + 24, HY - 70), (HX + 56, HY - 46), (HX + 68, HY - 8),
           (HX + 56, HY + 30), (HX + 32, HY + 44), (HX + 14, HY + 34), (HX + 2, HY + 4),
           (HX - 10, HY - 16), (HX - 28, HY - 30)]
    g.append(fill(curve(tilt(cap), close=True)))
    # the face crescent: from the hairline down the profile and back along the jaw
    face = tilt([(HX - 42, HY - 46), (HX - 60, HY - 22), (HX - 78, HY + 2), (HX - 62, HY + 12), (HX - 68, HY + 26),
                 (HX - 58, HY + 34), (HX - 60, HY + 46), (HX - 42, HY + 60), (HX - 14, HY + 62), (HX + 10, HY + 50)])
    g.append(stroke(curve(face)))
    # the lash and brow, on the far side, turned up with the face
    g.append(stroke(curve(tilt([(HX - 58, HY - 8), (HX - 46, HY - 4)])), w=SW * 0.8))
    g.append(stroke(curve(tilt([(HX - 56, HY - 24), (HX - 42, HY - 28)])), w=SW * 0.75))
    # the ponytail hangs from the nape, under gravity rather than with the tilt
    nape = tilt([(HX + 34, HY + 40)])[0]
    nx, ny = nape
    tail = [(nx - 6, ny - 10), (nx + 22, ny - 2), (nx + 40, ny + 30), (nx + 44, ny + 72), (nx + 36, ny + 112),
            (nx + 20, ny + 124), (nx + 12, ny + 108), (nx + 20, ny + 72), (nx + 12, ny + 36), (nx - 4, ny + 14)]
    g.append(fill(curve(tail, close=True)))
    g.append(f'<path d="{wob([(nx - 4, ny - 8), (nx + 4, ny + 12)], amp=0.6, steps=3)}" fill="none" stroke="#fff" stroke-width="{SW*0.8}" stroke-linecap="round"/>')
    # neck
    g.append(stroke(wob([(HX - 22, HY + 70), (HX - 28, HY + 96)], amp=1)))
    g.append(stroke(wob([(HX + 20, HY + 66), (HX + 26, HY + 92)], amp=1)))

    # ---- a loose striped top ----
    SL, SR = (915, 1046), (1085, 1042)      # shoulders
    WL, WR = (926, 1306), (1074, 1306)      # hem
    torso = [SL, (SL[0] - 6, 1180), WL, (1000, 1310), WR, (SR[0] + 6, 1180), SR, (1000, 1052), SL]
    g.append(stroke(curve(torso, close=True)))
    g.append(stroke(curve([(HX - 30, HY + 108), (HX - 2, HY + 124), (HX + 28, HY + 104)]), w=SW * 0.9))  # collar
    for y in range(1090, 1300, 30):
        t = (y - 1046) / 260
        g.append(stroke(wob([(SL[0] - 6 * t + 5, y + random.uniform(-3, 3)),
                             (SR[0] + 6 * t - 5, y + random.uniform(-3, 3))], amp=1.6, steps=5), w=SW * 0.8))

    # ---- left arm (viewer's left): raised, pointing at the dashboard ----
    arm, L, R = sleeve([(938, 1080), (872, 1000), (850, 885)], 28)
    g += arm
    g.append(stroke(wob([L[-1], R[-1]], amp=1)))                                   # cuff
    g += hand(((L[-1][0] + R[-1][0]) / 2, (L[-1][1] + R[-1][1]) / 2), -104, 28, flip=-1)

    # ---- right arm (viewer's right): out to the side, palm open toward the panels ----
    arm, L, R = sleeve([(1064, 1076), (1160, 1112), (1232, 1096)], 27)
    g += arm
    g.append(stroke(wob([L[-1], R[-1]], amp=1)))                                   # cuff
    g += hand(((L[-1][0] + R[-1][0]) / 2, (L[-1][1] + R[-1][1]) / 2), -14, 27, flip=1)

    # ---- a waistband under the hem, with belt loops ----
    g.append(stroke(curve([(926, 1306), (922, 1334), (1000, 1338), (1078, 1334), (1074, 1306)])))
    for x in (952, 1000, 1048):
        g.append(stroke(wob([(x, 1310), (x, 1332)], amp=0.6, steps=3), w=SW * 0.8))

    # ---- wide trousers, feet planted, seen from behind ----
    left = [(922, 1334), (892, 1440), (860, 1580), (846, 1712)]
    left_in = [(1000, 1352), (990, 1440), (980, 1580), (976, 1712)]
    right_in = [(1000, 1352), (1014, 1440), (1030, 1580), (1044, 1704)]
    right = [(1078, 1334), (1112, 1440), (1150, 1580), (1178, 1704)]
    for P in (left, left_in, right_in, right):
        g.append(stroke(curve(P)))
    g.append(stroke(wob([(846, 1712), (976, 1712)], amp=1.2)))
    g.append(stroke(wob([(1044, 1704), (1178, 1704)], amp=1.2)))

    # ---- sneakers, solid, toes turned out ----
    g.append(fill(curve([(842, 1716), (978, 1718), (986, 1752), (976, 1792), (830, 1794), (806, 1772), (816, 1740)], close=True)))
    g.append(fill(curve([(1042, 1708), (1180, 1706), (1204, 1734), (1220, 1768), (1204, 1788), (1050, 1788), (1036, 1750)], close=True)))
    for pts in ([(868, 1758), (890, 1754), (914, 1760)], [(1096, 1750), (1120, 1746), (1146, 1752)]):
        g.append(f'<path d="{wob(pts, amp=0.6, steps=3)}" fill="none" stroke="#fff" stroke-width="{SW*0.7}" stroke-linecap="round"/>')
    return '\n    '.join(g)

src = open(SRC).read().replace('viewBox="0 0 2000 2000" width="2000" height="2000"', 'viewBox="315 193 1370 1617" width="1370" height="1617"')
m = re.search(r'<path id="line-art" d="([^"]*)" fill="#000" fill-rule="evenodd"/>', src)
subs = [s for s in re.split(r'(?=M)', m.group(1)) if s.strip()]
keep = ''.join(s for i, s in enumerate(subs) if i not in PERSON)
out = src.replace(
    m.group(0),
    f'<path id="line-art" d="{keep}" fill="#000" fill-rule="evenodd"/>\n  <g id="person">\n    {figure()}\n  </g>',
)
open(sys.argv[1], 'w').write(out)
print('wrote', sys.argv[1])
