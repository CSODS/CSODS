import { DbContext } from "@/db/csods";
import { DevType } from "@/models";
import { Repository } from "@/services";
import type { Tables, ViewModels } from "../../types";

export class DevTypeRepository extends Repository<Tables.DevTypeTable> {
  public constructor(dbContext: DbContext) {
    super(dbContext, DevType);
  }

  /**
   * @public
   * @async
   * @function getAll
   * @description Asynchronously retrieves up to 100 rows from the
   * `dev_types` table in the database sorted by the `dev_type_id`
   * column.
   * @returns A `Promise` that resolves to the list of rows or `null`
   * if the read operation fails.
   */
  public async getAll(): Promise<ViewModels.DevType[]> {
    const devTypes = await this.GetRows({ column: DevType.devTypeId });
    return devTypes;
  }
}
