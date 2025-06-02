import React from 'react';

interface SafeHtmlProps {
  html: string;
}

export default function SafeHtml({ html }: SafeHtmlProps) {
  const elements = parseHtmlToJsx(html);
  return <>{elements}</>;
}

function parseHtmlToJsx(input: string): React.ReactNode[] {
  const escaped = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const html = escaped
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
    .replace(/&lt;ul&gt;/gi, '<ul>')
    .replace(/&lt;\/ul&gt;/gi, '</ul>')
    .replace(/&lt;li&gt;/gi, '<li>')
    .replace(/&lt;\/li&gt;/gi, '</li>')
    .replace(/&lt;u&gt;/gi, '<u>')
    .replace(/&lt;\/u&gt;/gi, '</u>')
    .replace(
      /&lt;a\s+href="(https?:\/\/[^"]+)"(?:\s+target="(_blank)")?&gt;(.*?)&lt;\/a&gt;/gi,
      (_, href, target, text) =>
        `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
    );

  return simpleHtmlToJsx(html);
}

function simpleHtmlToJsx(html: string): React.ReactNode[] {
  const container = document.createElement('div');
  container.innerHTML = html;

  function traverse(node: ChildNode): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const children = Array.from(el.childNodes).map(traverse);

      switch (el.tagName.toLowerCase()) {
        case 'br':
          return <br />;
        case 'a':
          return (
            <a
              href={el.getAttribute('href') || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        case 'ul':
          return <ul>{children}</ul>;
        case 'li':
          return <li>{children}</li>;
        case 'u':
          return <u>{children}</u>;
        default:
          return children;
      }
    }

    return null;
  }

  return Array.from(container.childNodes).map(traverse);
}

