import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkedOptions, parse, Renderer } from 'marked';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css'],
})
export class MarkdownComponent implements OnInit {
  @Input() set data(value: string | undefined | null) {
    if (!value) {
      this.content = '';
      return;
    }

    const options: MarkedOptions = {
      smartypants: true,
      gfm: true,
      breaks: true,
      silent: true,
    };
    const renderer = new Renderer();
    renderer.link = this.formatLink;
    options.renderer = renderer;

    const compiled: string = parse(value, options);
    this.content = this.sanitizer.bypassSecurityTrustHtml(compiled);
  }

  content?: SafeHtml | string | null;

  constructor(readonly sanitizer: DomSanitizer, readonly location: Location) {}

  ngOnInit(): void {}

  private urlType(value: string): 'absolute' | 'relative' {
    const url = value.toLowerCase().trim();
    return url.startsWith('http://') || url.startsWith('https://')
      ? 'absolute'
      : 'relative';
  }

  private formatLink = (href: string, title: string, text: string): string => {
    const hrefType = this.urlType(href);
    let link = '<a ';
    if (hrefType === 'absolute') {
      link += ` href="${href}" target="_blank" `;
    } else {
      const url = this.location.prepareExternalUrl(href);
      link += ` href="${url}" data-relative-link="${href}" `;
    }

    if (title) {
      link += ` title="${title}" `;
    }

    link += ` >${text}</a>`;
    return link;
  };
}
