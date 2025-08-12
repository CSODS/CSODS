import { DbContext } from "@/db/csods";
import { Framework } from "@/models";
import { Repository } from "@/services";
import type { Tables, ViewModels } from "../../types";

export class FrameworkRepository extends Repository<Tables.FrameworkTable> {
  public constructor(dbContext: DbContext) {
    super(dbContext, Framework);
  }

  /**
   * @public
   * @async
   * @function getAll
   * @description Asynchronously retrieves up to 100 rows from the
   * `frameworks` table in the database sorted by the
   * `framework_id` column.
   * @returns A `Promise` that resolves to the list of rows or
   * `null` if the read operation fails.
   */
  public async getAll(): Promise<ViewModels.Framework[]> {
    const frameworks = await this.GetRows({ column: Framework.frameworkId });
    return frameworks;
  }
}
