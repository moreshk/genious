import React, { useEffect, useRef } from 'react';

const AbstractBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${(time * 2 + i * 50) % 360}, 50%, 50%)`;
        ctx.lineWidth = 2;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const x = centerX + Math.cos(angle + time * 0.1 + i) * (100 + Math.sin(time * 0.1) * 50);
          const y = centerY + Math.sin(angle + time * 0.1 + i) * (100 + Math.cos(time * 0.1) * 50);
          ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.stroke();
      }

      time += 0.05;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default AbstractBackground; 