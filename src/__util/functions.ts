// Returns a formatted string from the default text formatter, then removes additional perk-specific words or symbols
export function formatPerkName(perkName: string): string {
  const formattedPerkName = defaultTextFormatter(perkName).replaceAll(
    'hex',
    '',
  );
  return formattedPerkName;
}

// Returns a formatted string based on the default text formatter
export function formatOwnerName(name: string): string {
  const formattedOwnerName = defaultTextFormatter(name);
  return formattedOwnerName;
}

// Default text formatter for things such as perk names, killer names, etc.
// Used to improve leniency in user input when fetching data by comparing two heavily formatted strings
export function defaultTextFormatter(unformattedInput: string): string {
  if (!unformattedInput) {
    return unformattedInput;
  }
  let formattedInput = unformattedInput;
  formattedInput = formattedInput.toLowerCase();
  formattedInput = formattedInput.replaceAll('-', '');
  formattedInput = formattedInput.replaceAll('_', '');
  formattedInput = formattedInput.replaceAll(',', '');
  formattedInput = formattedInput.replaceAll('.', '');
  formattedInput = formattedInput.replaceAll("'", '');
  formattedInput = formattedInput.replaceAll(' ', '');
  formattedInput = formattedInput.replaceAll('  ', '');
  formattedInput = formattedInput.replaceAll(':', '');
  return formattedInput;
}
