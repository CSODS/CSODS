import { Exhaustive } from "@/types";
import { ProjectTagError } from "../errors";

//  todo: add docs
export const ProjectTagsErrorStatusCodeMap: Exhaustive<ProjectTagError.ErrorName> =
  {
    EMPTY_TABLE_ERROR: 500,
    EXCEEDED_MAX_FETCH_RETRIES_ERROR: 500,
    DB_FETCH_ERROR: 500,
    RETRIEVE_TAGS_ERROR: 500,
    RESOLVE_TAGS_ERROR: 500,
    LOAD_FROM_CACHE_ERROR: 500,
    LOAD_BACKUP_ERROR: 500,
    CREATE_NEW_CACHE_ERROR: 500,
    BACKUP_CACHE_READONLY_MODIFICATION_ERROR: 500,
  } as const;
