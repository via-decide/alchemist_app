/**
 * @file reading-progress.js
 * @description Reading Progress & Location Engine for tracking and restoring user reading positions.
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';

class ReadingProgress {
  /**
   * @constructor
   */
  constructor() {
    this.emitter = new EventEmitter();
    this.readingPositions = {};
    this.currentPosition = null;
  }

  /**
   * @method trackReadingPosition
   * @description Track the current reading position.
   * @param {string} chapterId - The ID of the current chapter.
   * @param {number} scrollPosition - The current scroll position (0-100).
   * @param {number} progressPercentage - The current progress percentage (0-100).
   */
  trackReadingPosition(chapterId, scrollPosition, progressPercentage) {
    this.currentPosition = {
      chapterId,
      scrollPosition,
      progressPercentage,
    };
    this.readingPositions[chapterId] = this.currentPosition;
    this.emitter.emit('reading-position-updated', this.currentPosition);
  }

  /**
   * @method restoreReadingPosition
   * @description Restore the reading position from storage.
   */
  restoreReadingPosition() {
    const storedPosition = localStorage.getItem('reading-position');
    if (storedPosition) {
      this.currentPosition = JSON.parse(storedPosition);
      this.emitter.emit('reading-position-restored', this.currentPosition);
    }
  }

  /**
   * @method saveReadingPosition
   * @description Save the current reading position to storage.
   */
  saveReadingPosition() {
    localStorage.setItem('reading-position', JSON.stringify(this.currentPosition));
  }

  /**
   * @method getReadingPositions
   * @description Get a list of all tracked reading positions.
   * @returns {object} A map of chapter IDs to reading positions.
   */
  getReadingPositions() {
    return this.readingPositions;
  }
}

export default ReadingProgress;