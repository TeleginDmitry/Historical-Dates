export function compareObjects(
  currentObject: Record<string, any>,
  compareObject: Record<string, any>
): boolean {
  if (currentObject === compareObject) return true;

  if (
    typeof currentObject !== "object" ||
    typeof compareObject !== "object" ||
    currentObject === null ||
    compareObject === null
  )
    return false;

  const currentKeys = Object.keys(currentObject);
  const compareKeys = Object.keys(compareObject);

  if (currentKeys.length !== compareKeys.length) return false;

  return currentKeys.every(
    (currentKey) =>
      currentKey in compareObject &&
      compareObjects(currentObject[currentKey], compareObject[currentKey])
  );
}
