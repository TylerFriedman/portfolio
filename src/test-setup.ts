import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// testing library only cleans up on its own when vitest globals are on
afterEach(cleanup);

// jsdom has no pointer capture so every drag would throw without this
Element.prototype.setPointerCapture = () => {};
