import { sanitizeUrl as braintreeSanitizeUrl } from '@braintree/sanitize-url';
import DOMPurify from 'dompurify';
import * as xss from 'xss';

const XSSWL = Object.keys(xss.whiteList).reduce<xss.IWhiteList>((acc, element) => {
  acc[element] = xss.whiteList[element]?.concat(['class', 'style']);
  return acc;
}, {});

const sanitizeTextPanelWhitelist = new xss.FilterXSS({
  whiteList: XSSWL,
  css: {
    whiteList: {
      ...xss.getDefaultCSSWhiteList(),
      'flex-direction': true,
      'flex-wrap': true,
      'flex-basis': true,
      'flex-grow': true,
      'flex-shrink': true,
      'flex-flow': true,
      gap: true,
      order: true,
      'justify-content': true,
      'justify-items': true,
      'justify-self': true,
      'align-items': true,
      'align-content': true,
      'align-self': true,
    },
  },
});

export function sanitize(unsanitizedString: string): string {
  try {
    return DOMPurify.sanitize(unsanitizedString);
  } catch (error) {
    console.error('String could not be sanitized', unsanitizedString);
    return escapeHtml(unsanitizedString);
  }
}

export function sanitizeTextPanelContent(unsanitizedString: string): string {
  try {
    return sanitizeTextPanelWhitelist.process(unsanitizedString);
  } catch (error) {
    console.error('String could not be sanitized', unsanitizedString);
    return 'Text string could not be sanitized';
  }
}

export function sanitizeSVGContent(unsanitizedString: string): string {
  return DOMPurify.sanitize(unsanitizedString, { USE_PROFILES: { svg: true, svgFilters: true } });
}

export function sanitizeUrl(url: string): string {
  return braintreeSanitizeUrl(url);
}

export function hasAnsiCodes(input: string): boolean {
  return /\u001b\[\d{1,2}m/.test(input);
}

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#47;')
    .replace(/"/g, '&quot;');
}
