/**
 * @interface ICache
 * @description Represents the basic structure for a cache entry, including metadata about its creation and last access time.
 */
export interface ICache {
  /**
   * The timestamp when the cache was created.
   */
  createdOn: Date;
  /**
   * The timestamp when this cache was last loaded or refreshed.
   */
  lastAccessed: Date;
  /**
   *
   */
  viewCount: number;
}
