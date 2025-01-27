'use client'
import React, { useEffect, useRef, useState } from 'react';

const FuturePreparation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 5000, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw exponential curve
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
      ctx.lineWidth = 4;

      // Calculate points for the full curve
      const points = [];
      const visibleLength = canvas.width * progress;
      
      for (let x = 0; x <= canvas.width; x += 2) {
        if (x > visibleLength) break;
        
        const normalizedX = x / canvas.width;
        // Blend linear and exponential for smoother start
        const blend = Math.pow(normalizedX, 15); // Increased power for steeper end
        const y = canvas.height - (blend * canvas.height * 0.95);
        points.push({ x, y });
      }

      // Draw visible portion of the curve
      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        // Add gradient fill
        if (points.length > 1) {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.05)');
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0.15)');
          
          ctx.lineTo(points[points.length - 1].x, canvas.height);
          ctx.lineTo(points[0].x, canvas.height);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isInView) {
      startTime = null;
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const firstHalf = `We are at the cusp of transformational change in human civilization due to AI. Our children will live in a vastly different world, requiring new adaptations and skills that will remain valuable regardless of technological change.`;

  const secondHalf = `Our approach focuses on timeless skills: mathematics, critical thinking, problem-solving, persuasion, public speaking, and hands-on building. These skills form the foundation of all sciences and will be crucial in an AI-driven future.

  By teaching pattern recognition and application-first learning, we prepare children to adapt to rapid changes and position themselves for success in an ever-evolving world.`;

  return (
    <section id="future-preparation" className="py-24 bg-white relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Preparing for the Future
        </h2>
        <div className="prose mx-auto max-w-3xl">
          <p className="text-lg text-gray-700 mb-4">
            {firstHalf}
          </p>
          <div 
            className={`text-lg text-gray-700 ${
              isMobile && !isExpanded ? 'hidden' : ''
            }`}
          >
            {secondHalf}
          </div>
          {isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors mt-2"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FuturePreparation;