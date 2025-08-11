import { DbContext } from "@/db/csods";
import { DevType } from "@/models";
import { Repository } from "@/services";
import { DevTypeTable, DevTypeViewModel } from "../../types";

export class DevTypeRepository extends Repository<DevTypeTable> {
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
  public async getAll(): Promise<DevTypeViewModel[]> {
    const devTypes = await this.GetRows({ column: DevType.devTypeId });
    return devTypes;
  }
}
