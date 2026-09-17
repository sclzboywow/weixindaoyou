import type { WxCanvas } from '../platform/wechat';

/** Basic breakthrough celebration, hosted in the small startup package. */
export function createNativeCelebration(canvas: WxCanvas) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let redraw: (() => boolean) | undefined;
  const stop = () => {
    clearTimeout(timer);
    timer = undefined;
    const previous = redraw;
    redraw = undefined;
    previous?.();
  };
  return {
    stop,
    play(render: () => boolean) {
      stop();
      if (
        typeof matchMedia === 'function' &&
        matchMedia('(prefers-reduced-motion: reduce)').matches
      )
        return;
      redraw = render;
      const started = Date.now();
      const ctx = canvas.getContext('2d');
      const particles: {
        born: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: string;
        spin: number;
      }[] = [];
      const colors = [
        '#26ccff',
        '#a25afd',
        '#ff5e7e',
        '#88ff5a',
        '#fcff42',
        '#ffa62d',
        '#ff36ff',
      ];
      let lastBurst = -100;
      const frame = () => {
        if (!redraw) return;
        const elapsed = Date.now() - started;
        if (!redraw() || elapsed >= 3400) {
          stop();
          return;
        }
        // Logical coordinates also work after a window resize or DPR change.
        const width = canvas.width;
        const height = canvas.height;
        if (elapsed < 1400 && elapsed - lastBurst >= 100) {
          lastBurst = elapsed;
          const x = Math.random();
          const y = 0.22 + Math.random() * 0.2;
          const count = Math.max(10, Math.floor((1 - elapsed / 1400) * 28));
          for (let i = 0; i < count; i++) {
            const angle = ((-90 + (Math.random() - 0.5) * 68) * Math.PI) / 180;
            const speed = 0.35 + Math.random() * 0.3;
            particles.push({
              born: elapsed,
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: colors[i % colors.length],
              spin: Math.random() * 10,
            });
          }
        }
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          const age = (elapsed - p.born) / 1000;
          if (age >= 2) {
            particles.splice(i, 1);
            continue;
          }
          const x = (p.x + p.vx * age * 0.65) * width;
          const y = (p.y + p.vy * age + 0.5 * age * age) * height;
          const size = width / 75;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(p.spin + age * 7);
          ctx.globalAlpha = Math.min(1, (2 - age) * 2);
          ctx.fillStyle = p.color;
          ctx.fillRect(
            -size / 2,
            -size / 4,
            size,
            size * 0.5 * Math.cos(age * 12 + p.spin),
          );
          ctx.restore();
        }
        ctx.restore();
        timer = setTimeout(frame, 33);
      };
      frame();
    },
  };
}
