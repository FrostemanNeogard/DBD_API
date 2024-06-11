export function formatPerkName(perkName: string): string {
  const formattedPerkName = defaultTextFormatter(perkName).replaceAll(
    'hex',
    '',
  );
  return formattedPerkName;
}

export function formatOwnerName(name: string): string {
  const formattedOwnerName = defaultTextFormatter(name);
  return formattedOwnerName;
}

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
