/**
 * @file reading-progress.js
 * @description Refactored Reading Progress Engine for multi-book tracking, proper storage integration, and safe performance behavior.
 */

import { Book } from '../models';
import { Storage } from '../storage';

const ReadingProgress = {
  /**
   * Initializes the reading progress engine with a given book ID.
   *
   * @param {string} bookId The ID of the book to track.
   */
  init(bookId) {
    this.bookId = bookId;
    this.currentPage = 0;
    this.totalPages = 0;

    // Load existing progress from storage
    Storage.getProgress(this.bookId).then((progress) => {
      if (progress) {
        this.currentPage = progress.currentPage;
        this.totalPages = progress.totalPages;
      }
    });
  },

  /**
   * Updates the reading progress with a given page number.
   *
   * @param {number} pageNumber The current page number.
   */
  updatePage(pageNumber) {
    if (pageNumber > this.totalPages) {
      // New chapter or book, reset progress
      this.currentPage = 0;
      this.totalPages = pageNumber;
    } else {
      this.currentPage = pageNumber;
    }

    // Store updated progress in storage
    Storage.setProgress(this.bookId, { currentPage: this.currentPage, totalPages: this.totalPages });
  },

  /**
   * Returns the current reading progress as a string.
   *
   * @returns {string} The current page number and total pages.
   */
  getProgress() {
    return `${this.currentPage}/${this.totalPages}`;
  },
};

export default ReadingProgress;