import { createContext } from "@/db/csods";
import * as Repositories from "./repositories";

export async function createProjectTagsDbFetcher() {
  const dbContext = await createContext();
  const applicationIndustryRepo =
    new Repositories.ApplicationIndustryRepository(dbContext);
  const databaseTechnologyRepo = new Repositories.DatabaseTechnologyRepository(
    dbContext
  );
  const devTypeRepo = new Repositories.DevTypeRepository(dbContext);
  const frameworkRepo = new Repositories.FrameworkRepository(dbContext);
  const programmingLanguageRepo =
    new Repositories.ProgrammingLanguageRepository(dbContext);
  return new ProjectTagsDbFetcher({
    applicationIndustryRepo,
    databaseTechnologyRepo,
    devTypeRepo,
    frameworkRepo,
    programmingLanguageRepo,
  });
}

//  todo: document this
export class ProjectTagsDbFetcher {
  private readonly _applicationIndustryRepo: Repositories.ApplicationIndustryRepository;
  private readonly _databaseTechnologyRepo: Repositories.DatabaseTechnologyRepository;
  private readonly _devTypeRepo: Repositories.DevTypeRepository;
  private readonly _frameworkRepo: Repositories.FrameworkRepository;
  private readonly _programmingLanguageRepo: Repositories.ProgrammingLanguageRepository;

  public constructor({
    applicationIndustryRepo,
    databaseTechnologyRepo,
    devTypeRepo,
    frameworkRepo,
    programmingLanguageRepo,
  }: {
    applicationIndustryRepo: Repositories.ApplicationIndustryRepository;
    databaseTechnologyRepo: Repositories.DatabaseTechnologyRepository;
    devTypeRepo: Repositories.DevTypeRepository;
    frameworkRepo: Repositories.FrameworkRepository;
    programmingLanguageRepo: Repositories.ProgrammingLanguageRepository;
  }) {
    this._applicationIndustryRepo = applicationIndustryRepo;
    this._databaseTechnologyRepo = databaseTechnologyRepo;
    this._devTypeRepo = devTypeRepo;
    this._frameworkRepo = frameworkRepo;
    this._programmingLanguageRepo = programmingLanguageRepo;
  }

  public async fetchAllApplicationIndustries() {
    return await this._applicationIndustryRepo.getAll();
  }

  public async fetchAllDatabaseTechnologies() {
    return await this._databaseTechnologyRepo.getAll();
  }

  public async fetchAllDevTypes() {
    return await this._devTypeRepo.getAll();
  }

  public async fetchAllFrameworks() {
    return await this._frameworkRepo.getAll();
  }

  public async fetchAllProgrammingLanguages() {
    return await this._programmingLanguageRepo.getAll();
  }
}
