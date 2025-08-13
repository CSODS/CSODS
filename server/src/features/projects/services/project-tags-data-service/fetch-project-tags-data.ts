import { fail, success } from "@/utils";
import { ProjectTag } from "../../errors";
import { ProjectTagsDbFetcher } from "../project-tags-db-fetcher.service";

//  todo: add docs
//  todo: add better error handling for each fetch.
export async function fetchProjectTagsData(dbFetcher: ProjectTagsDbFetcher) {
  try {
    const applicationIndustries =
      await dbFetcher.fetchAllApplicationIndustries();
    const databaseTechnologies = await dbFetcher.fetchAllDatabaseTechnologies();
    const devTypes = await dbFetcher.fetchAllDevTypes();
    const frameworks = await dbFetcher.fetchAllFrameworks();
    const programmingLanguages = await dbFetcher.fetchAllProgrammingLanguages();
    return success({
      applicationIndustries,
      databaseTechnologies,
      devTypes,
      frameworks,
      programmingLanguages,
    });
  } catch (err) {
    const error = new ProjectTag.ErrorClass({
      name: "DB_ACCESS_QUERY_ERROR",
      message: "Error fetching tag data from database.",
      cause: err,
    });
    return fail(error);
  }
}
