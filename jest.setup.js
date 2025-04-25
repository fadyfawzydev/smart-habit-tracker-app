import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock the TextEncoder and TextDecoder for Next.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Request and Response for Next.js API routes
if (typeof Request !== 'function') {
  global.Request = class Request {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.body = init?.body;
      this._json = init?.body ? JSON.parse(init.body) : null;
    }

    async json() {
      return this._json;
    }
  };
}

if (typeof Response !== 'function') {
  global.Response = class Response {
    constructor(body, init) {
      this._body = body;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || '';
      this.headers = new Map(Object.entries(init?.headers || {}));
    }

    async json() {
      return typeof this._body === 'string' ? JSON.parse(this._body) : this._body;
    }
  };
} 