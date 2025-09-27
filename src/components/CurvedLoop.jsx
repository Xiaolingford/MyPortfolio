import { useRef, useEffect, useState, useId } from "react";

const CurvedLoop = ({
  icons = [],          // Array of image/SVG URLs
  speed = 2,           // Movement speed
  className,
  curveAmount = 400,   // Controls curve height
  direction = "left",  // left or right
  interactive = true,  // Drag to control
  size = 50,           // Icon size (px)
  gap = 40             // Spacing hint (used for initial calc)
}) => {
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const uid = useId();
  const pathId = `curve-${uid}`;
  
  const [offset, setOffset] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1240);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  // Dynamic path based on container width - extend beyond edges for seamless looping
  const pathD = `M0,40 Q${containerWidth/2},${40 + curveAmount} ${containerWidth},40`;

  const spacing = size + gap;

  // Effect to measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  let totalIcons = [];
  if (icons.length && pathLength) {
    // Calculate how many icons we need to fill the path plus extra buffer for seamless looping
    const count = Math.ceil(pathLength / spacing) + 8; // Extra buffer for smooth transitions
    const adjustedSpacing = pathLength / (count - 8);

    totalIcons = Array.from({ length: count * 4 }, (_, i) => ({
      icon: icons[i % icons.length],
      pos: i * adjustedSpacing,
    }));
  }
  

  // Animation loop
  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    setPathLength(length);

    let frame = 0;
    const step = () => {
      if (!dragRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        setOffset((prev) => {
          const newOffset = prev + delta;
          // Use modulo to create seamless looping
          return ((newOffset % length) + length) % length;
        });
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [speed, containerWidth]);

  // Dragging handlers
  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current || !pathLength) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    setOffset((prev) => {
      const newOffset = prev + dx;
      return ((newOffset % pathLength) + pathLength) % pathLength;
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full"
      style={{ cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className={`select-none w-full overflow-visible block aspect-[100/12] ${
          className ?? ""
        }`}
        viewBox={`0 0 ${containerWidth} 80`}
        preserveAspectRatio="None"
      >
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>

        {/* Render images along the path */}
        {pathLength > 0 &&
          totalIcons.map(({ icon, pos }, i) => {
            // Calculate the actual position along the path with proper offset
            const actualPos = (pos - offset + pathLength) % pathLength;
            const point = pathRef.current.getPointAtLength(actualPos);
            
            // Calculate opacity for smooth edge transitions
            const leftEdge = 0; // Start of visible area
            const rightEdge = containerWidth; // End of visible area
            const fadeZone = size * 1.5; // Even smaller fade zone for subtlety
            
            let opacity = 1;
            
            // Fade out at left edge with gentle easing
            if (point.x < leftEdge + fadeZone) {
              const progress = (point.x - leftEdge) / fadeZone;
              // Use smoothstep function for more natural transition
              opacity = Math.max(0, progress * progress * progress * (progress * (progress * 6 - 15) + 10));
            }
            // Fade out at right edge with gentle easing
            else if (point.x > rightEdge - fadeZone) {
              const progress = (rightEdge - point.x) / fadeZone;
              // Use smoothstep function for more natural transition
              opacity = Math.max(0, progress * progress * progress * (progress * (progress * 6 - 15) + 10));
            }
            
            // Only render if opacity is greater than 0
            return opacity > 0 ? (
              <image
                key={i}
                href={icon}
                width={size}
                height={size}
                x={point.x - size / 2}
                y={point.y - size / 2}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  opacity: opacity,
                  transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              />
            ) : null;
          })}
      </svg>
    </div>
  );
};

export default CurvedLoop;
