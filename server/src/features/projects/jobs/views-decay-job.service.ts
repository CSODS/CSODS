import cron from "node-cron";
import { JobsLogger } from "@utils";
import { ProjectsViewsDecayService } from "../services";

export function createViewsDecayJobService() {
  return new ViewsDecayJobService();
}

/**
 * Schedules viewsDecayJob
 */
export class ViewsDecayJobService {
  private readonly _projectsViewsDecayService: ProjectsViewsDecayService;

  public constructor() {
    this._projectsViewsDecayService = new ProjectsViewsDecayService(0.2);
  }

  public scheduleViewsDecay() {
    cron.schedule("0 0 * * * *", async () => {
      JobsLogger.info("Decaying view counts of project caches.");
      await this._projectsViewsDecayService.decayCachePagesViews({
        decayTopLevel: true,
      }); // include top level decay
    });
  }
}
