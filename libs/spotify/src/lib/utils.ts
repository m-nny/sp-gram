export const toBase64 = (originalText: string): string =>
  Buffer.from(originalText).toString('base64');

export const fromBase64 = (encodedText: string): string =>
  Buffer.from(encodedText, 'base64').toString('ascii');
