/**
 * Scroll to an element with a specified offset
 * @param elementId - The ID of the element to scroll to
 * @param offset - The offset in pixels (default: 80px = ~5rem)
 * @param behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToElement = (
  elementId: string, 
  offset: number = 80, 
  behavior: ScrollBehavior = 'smooth'
) => {
  const element = document.getElementById(elementId)
  if (!element) return

  // Use requestAnimationFrame to ensure smooth scrolling on mobile
  requestAnimationFrame(() => {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    // Try smooth scrolling first, fallback to instant if not supported
    try {
      window.scrollTo({
        top: offsetPosition,
        behavior: behavior
      })
    } catch (error) {
      // Fallback for older browsers or mobile issues
      window.scrollTo(0, offsetPosition)
    }
  })
}

/**
 * Scroll to an element by selector with offset
 * @param selector - CSS selector of the element to scroll to
 * @param offset - The offset in pixels (default: 80px = ~5rem)
 * @param behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToSelector = (
  selector: string, 
  offset: number = 80, 
  behavior: ScrollBehavior = 'smooth'
) => {
  const element = document.querySelector(selector)
  if (!element) return

  // Use requestAnimationFrame to ensure smooth scrolling on mobile
  requestAnimationFrame(() => {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    // Try smooth scrolling first, fallback to instant if not supported
    try {
      window.scrollTo({
        top: offsetPosition,
        behavior: behavior
      })
    } catch (error) {
      // Fallback for older browsers or mobile issues
      window.scrollTo(0, offsetPosition)
    }
  })
}
