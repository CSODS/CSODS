import { DbContext } from "@/db/csods";
import { DatabaseTechnology } from "@/models";
import { Repository } from "@/services";
import {
  DatabaseTechnologyTable,
  DatabaseTechnologyViewModel,
} from "../../types";

export class DatabaseTechnologyRepository extends Repository<DatabaseTechnologyTable> {
  public constructor(dbContext: DbContext) {
    super(dbContext, DatabaseTechnology);
  }

  /**
   * @public
   * @async
   * @function getAll
   * @description Asynchronously retrieves up to 100 rows from the
   * `database_technologies` table in the database sorted by the
   * `database_id` column.
   * @returns A `Promise` that resolves to the list of rows or
   * `null` if the read operation fails.
   */
  public async getAll(): Promise<DatabaseTechnologyViewModel[]> {
    const databaseTechnologies = await this.GetRows({
      column: DatabaseTechnology.databaseId,
    });
    return databaseTechnologies;
  }
}
