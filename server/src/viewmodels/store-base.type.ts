/**
 * @interface IStore
 * @description Represents the basic structure for a store entry, including metadata about its creation and last access time.
 */
export type StoreBase = {
  /**
   * The timestamp when the store object was created.
   */
  createdOn: Date;
  /**
   * The timestamp when this store was last loaded or refreshed.
   */
  lastAccessed: Date;
  /**
   *
   */
  viewCount: number;
};
