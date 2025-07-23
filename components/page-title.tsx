"use client"

export function PageTitle() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{ transform: "translateX(-50px)" }}
      >
        {/* Hidden text for sizing reference */}
        <h1
          className="text-8xl font-bold select-none opacity-0 absolute"
          style={{
            fontFamily: 'Monaco, "Lucida Console", "Courier New", monospace',
          }}
        >
          plateux
        </h1>

        {/* Backdrop filter applied only to text area - properly centered */}
        <div
          className="absolute flex items-center justify-center w-full h-full"
          style={{
            backdropFilter: "invert(1)",
            WebkitBackdropFilter: "invert(1)",
            mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 100'%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='Monaco, Consolas, monospace' fontSize='48' fontWeight='bold' fill='white'%3Eplateux%3C/text%3E%3C/svg%3E")`,
            WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 100'%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='Monaco, Consolas, monospace' fontSize='48' fontWeight='bold' fill='white'%3Eplateux%3C/text%3E%3C/svg%3E")`,
            maskSize: "1200px 300px",
            WebkitMaskSize: "1200px 300px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center center",
            WebkitMaskPosition: "center center",
          }}
        />
      </div>
    </div>
  )
}
