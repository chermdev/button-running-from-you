"use client"

import { useEffect } from "react"


export const ImpossibleButton = ({ children }: { children: React.ReactNode }) => {


  useEffect(() => {
    const OFFSET = 100
    const $ImpossibleButton = document.getElementById("impossible-button");

    function distanceFromCenter(boxPosition: number, mousePosition: number, boxSize: number) {
      return boxPosition - mousePosition + boxSize / 2
    }

    function setButtonPosition(left: number, top: number) {
      if (!$ImpossibleButton) return
      const windowBox = document.body.getBoundingClientRect()
      const buttonBox = $ImpossibleButton.getBoundingClientRect()

      if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
        left = windowBox.right - buttonBox.width - OFFSET
      }
      if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
        left = windowBox.left + OFFSET
      }
      if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
        top = windowBox.bottom - buttonBox.height - OFFSET
      }
      if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
        top = windowBox.top + OFFSET
      }

      $ImpossibleButton.style.left = `${left}px`
      $ImpossibleButton.style.top = `${top}px`
    }


    const handleMouseMove = (e: MouseEvent) => {
      if (!$ImpossibleButton) return
      const x = e.pageX
      const y = e.pageY
      const buttonBox = $ImpossibleButton.getBoundingClientRect()
      const horizontalDistanceFrom = distanceFromCenter(buttonBox.x, x, buttonBox.width)
      const verticalDistanceFrom = distanceFromCenter(buttonBox.y, y, buttonBox.height)
      const horizontalOffset = buttonBox.width / 2 + OFFSET
      const verticalOffset = buttonBox.height / 2 + OFFSET
      if (Math.abs(horizontalDistanceFrom) <= horizontalOffset && Math.abs(verticalDistanceFrom) <= verticalOffset) {
        setButtonPosition(
          buttonBox.x + horizontalOffset / horizontalDistanceFrom * 10,
          buttonBox.y + verticalOffset / verticalDistanceFrom * 10
        )
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    // cleanup event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <button
    id="impossible-button"
    onClick={() => alert("Nice try!")}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-nowrap transition-all [transition-duration:25ms] rounded-full"
  >
    {children}
  </button>
}