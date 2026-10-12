// Rendering and pointer input share the same undistorted world rectangle.
export function fitScene(width, height, worldWidth = 1100, worldHeight = 680) {
  const scale = Math.max(0, Math.min(width / worldWidth, height / worldHeight));
  return {scale, left: Math.max(0, (width - worldWidth * scale) / 2),
    top: Math.max(0, (height - worldHeight * scale) / 2),
    width: worldWidth * scale, height: worldHeight * scale};
}
export function scenePoint(clientX, clientY, rect, scene) {
  if (!scene.scale) return null;
  const x = (clientX - rect.left - scene.left) / scene.scale;
  const y = (clientY - rect.top - scene.top) / scene.scale;
  return {x, y, inside: x >= 0 && y >= 0 && x <= scene.width / scene.scale && y <= scene.height / scene.scale};
}
