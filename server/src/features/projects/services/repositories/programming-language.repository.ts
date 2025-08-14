import { DbContext } from "@/db/csods";
import { ProgrammingLanguage } from "@/models";
import { Repository } from "@/services";
import type { Tables, ViewModels } from "../../types";

export class ProgrammingLanguageRepository extends Repository<Tables.ProgrammingLanguageTable> {
  public constructor(dbContext: DbContext) {
    super(dbContext, ProgrammingLanguage);
  }

  /**
   * @public
   * @async
   * @function getAll
   * @description Asynchronously retrieves up to 100 rows from the
   * `programming_languages` table in the database sorted by the
   * `language_id` column.
   * @returns A `Promise` that resolves to the list of rows or
   * `null` if the read operation fails.
   */
  public async getAll(): Promise<ViewModels.ProgrammingLanguage[]> {
    const programmingLanguages = await this.GetRows({
      column: ProgrammingLanguage.languageId,
    });
    return programmingLanguages;
  }
}
