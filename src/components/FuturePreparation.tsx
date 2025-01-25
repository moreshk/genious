'use client'
import React, { useEffect, useRef } from 'react';

const FuturePreparation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let progress = 0;
    const animationDuration = 5000; // 5 seconds
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      progress = Math.min((currentTime - startTime) / animationDuration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw exponential curve
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
      ctx.lineWidth = 4;

      const points = [];
      for (let x = 0; x <= canvas.width; x += 2) {
        // Using higher power function for even steeper curve
        const normalizedX = x / canvas.width;
        const exponentialY = Math.pow(normalizedX, 8); // Increased power for steeper curve
        const y = canvas.height - (exponentialY * canvas.height * progress);
        points.push({ x, y });
      }

      // Draw the curve
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.stroke();

      // Add gradient effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'rgba(37, 99, 235, 0.05)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.15)');
      
      ctx.fillStyle = gradient;
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Preparing for the Future
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="space-y-8 text-justify backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-gray-700">
                We are at the cusp of transformational change in human civilization 
                due to AI. Our children will live in a vastly different world, requiring 
                new adaptations and skills that will remain valuable regardless of 
                technological change.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Our approach focuses on timeless skills: mathematics, critical 
                thinking, problem-solving, persuasion, public speaking, and hands-on 
                building. These skills form the foundation of all sciences and will 
                be crucial in an AI-driven future.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                By teaching pattern recognition and application-first learning, we 
                prepare children to adapt to rapid changes and position themselves 
                for success in an ever-evolving world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePreparation;