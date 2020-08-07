const HYPHENS_POSITIONS = [8, 12, 16, 20];
const UUIDSTRING_REGEXP = /^[0-9A-Fa-f]{32}$/;
const UUID_REGEXP = /^[0-9A-Fa-f]{8}-([0-9A-Fa-f]{4}-){3}[0-9A-Fa-f]{12}$/;

/**
 * Insert value to a source array at position
 * @param {Array} source array to insert
 * @param {number} position position to insert
 * @param {*} value value to insert
 * @returns {Array}
 */
function insert<T>(source: T[], position: number, value: T): T[] {
  return [...source.slice(0, position), value, ...source.slice(position)];
}

/**
 * Format string to UUID format 
 * @param {string} value string of 32 hexadecimal numbers
 * @returns {string} formatted toUUID string
 */
export function toUUID (value: string) {
  if (typeof value !== 'string') {
    throw new Error(`Value must be string`);
  }
  if (!UUIDSTRING_REGEXP.test(value)) {
    throw new Error(`Value must be string of 32 hexadecimal numbers`);
  }

  let array = value.split('');
  let offset = 0;
  for (const num of HYPHENS_POSITIONS) {
    const position = num + offset++;
    array = insert(array, position, '-');
  }
  return array.join('');
}

/**
 * Format UUID to string without dashes 
 * @param {string} UUID formatted string
 * @returns {string} string without dashes
 */
export function fromUUID (value: string) {
  if (typeof value !== 'string') {
    throw new Error(`Value must be string`);
  }
  if (!UUID_REGEXP.test(value)) {
    throw new Error(`Format does not match UUID. Ex.: '686813b5-1f5e-4992-901b-ec290552efd1'`);
  }
  
  return value.replace(/-/g, '');
}
