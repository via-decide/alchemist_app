/**
 * @file reading-progress.js
 * @description Refactored Reading Progress Engine for accurate, scalable, and safe tracking.
 */

const { getBookMetadata } = require('./book-metadata');
const { EPUBPositionTracker } = require('./epub-position-tracker');

class ReadingProgressEngine {
  /**
   * Initializes the engine with a book ID.
   *
   * @param {string} bookId The unique identifier for the book.
   */
  async init(bookId) {
    this.bookId = bookId;
    await getBookMetadata(bookId);
  }

  /**
   * Retrieves the current reading progress for the given book ID.
   *
   * @param {string} bookId The unique identifier for the book.
   * @returns {Promise<ReadingProgressData>}
   */
  async getProgress(bookId) {
    if (!this.bookId || this.bookId !== bookId) {
      throw new Error('Invalid book ID');
    }
    const positionTracker = new EPUBPositionTracker(this.bookId);
    await positionTracker.init();
    return positionTracker.getCurrentPosition();
  }

  /**
   * Updates the reading progress for the given book ID.
   *
   * @param {string} bookId The unique identifier for the book.
   * @param {ReadingProgressData} progress The new reading progress data.
   */
  async updateProgress(bookId, progress) {
    if (!this.bookId || this.bookId !== bookId) {
      throw new Error('Invalid book ID');
    }
    const positionTracker = new EPUBPositionTracker(this.bookId);
    await positionTracker.updatePosition(progress);
  }

  /**
   * Retrieves the reading progress history for the given book ID.
   *
   * @param {string} bookId The unique identifier for the book.
   * @returns {Promise<ReadingProgressHistory>}
   */
  async getHistory(bookId) {
    if (!this.bookId || this.bookId !== bookId) {
      throw new Error('Invalid book ID');
    }
    const positionTracker = new EPUBPositionTracker(this.bookId);
    await positionTracker.init();
    return positionTracker.getHistory();
  }
}

module.exports = ReadingProgressEngine;