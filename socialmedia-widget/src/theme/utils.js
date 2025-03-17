/**
 * Check if value is an object
 * @param {any} item - Value to check
 * @returns {boolean} True if item is an object
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge
 * @returns {Object} Merged object
 */
export function deepMerge(target, source) {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Creates CSS variables from theme
 * @param {Object} theme - Theme object
 * @param {string} prefix - CSS variable prefix
 * @returns {Object} CSS variables object
 */
export function createThemeCssVariables(theme, prefix = '--sm') {
  const variables = {};
  
  function processObject(obj, path = []) {
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = [...path, key];
      
      if (isObject(value)) {
        processObject(value, newPath);
      } else {
        const variableName = `${prefix}-${newPath.join('-')}`;
        variables[variableName] = value;
      }
    });
  }
  
  processObject(theme);
  return variables;
}

/**
 * Applies CSS variables to an element
 * @param {HTMLElement} element - Element to apply variables to
 * @param {Object} variables - CSS variables object
 */
export function applyCssVariables(element, variables) {
  Object.entries(variables).forEach(([name, value]) => {
    element.style.setProperty(name, value);
  });
}
