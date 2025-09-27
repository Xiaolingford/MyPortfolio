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
    const count = Math.ceil(pathLength / spacing) + 2; // Extra buffer for smooth transitions
    const adjustedSpacing = pathLength / count

    totalIcons = Array.from({ length: count}, (_, i) => ({
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
      const newOffset = prev - dx;
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
        className={`select-none w-full overflow-visible block ${
          className ?? ""
        }`}
        viewBox={`0 0 ${containerWidth} 100`}
        preserveAspectRatio="XMidYMid meet"
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
    const actualPos = (pos - offset + pathLength) % pathLength;
    const point = pathRef.current.getPointAtLength(actualPos);

    const leftEdge = 0;
    const rightEdge = containerWidth;
    const fadeZone = size * 1.5;

    let opacity = 1;
    if (point.x < leftEdge + fadeZone) {
      const progress = (point.x - leftEdge) / fadeZone;
      opacity = Math.max(
        0,
        progress ** 3 * (progress * (progress * 6 - 15) + 10)
      );
    } else if (point.x > rightEdge - fadeZone) {
      const progress = (rightEdge - point.x) / fadeZone;
      opacity = Math.max(
        0,
        progress ** 3 * (progress * (progress * 6 - 15) + 10)
      );
    }

    return opacity > 0 ? (
      <foreignObject
        key={i}
        x={point.x - size / 2}
        y={point.y - size / 2}
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity,
            transition:
              "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
        >
          <img
            src={icon}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain" // ✅ keeps SVG logos from overflowing
            }}
          />
        </div>
      </foreignObject>
    ) : null;
  })}

      </svg>
    </div>
  );
};

export default CurvedLoop;
