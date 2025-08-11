import { DbContext } from "@/db/csods";
import { ApplicationIndustry } from "@/models";
import { Repository } from "@/services";
import {
  ApplicationIndustryTable,
  ApplicationIndustryViewModel,
} from "../../types";

export class ApplicationIndustryRepository extends Repository<ApplicationIndustryTable> {
  public constructor(dbContext: DbContext) {
    super(dbContext, ApplicationIndustry);
  }

  /**
   * @public
   * @async
   * @function getAll
   * @description Asynchronously retrieves up to 100 rows from the
   * `application_industries` table in the database sorted by the
   * `industry_id` column.
   * @returns A `Promise` that resolves to the list of rows or
   * `null` if the read operation fails.
   */
  public async getAll(): Promise<ApplicationIndustryViewModel[]> {
    const applicationIndustries = await this.GetRows({
      column: ApplicationIndustry.industryId,
    });
    return applicationIndustries;
  }
}
