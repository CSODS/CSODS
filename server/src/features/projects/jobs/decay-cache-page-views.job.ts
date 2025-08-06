import { JobsLogger } from "@/utils";
import { ProjectsViewsDecayService } from "../services";

export async function decayCachePageViews() {
  const decayRate = 0.2;
  const projectsViewDecayService = new ProjectsViewsDecayService(decayRate);

  JobsLogger.info("[ViewDecay] Decaying view counts of project caches...");
  await projectsViewDecayService.decayCachePagesViews({ decayTopLevel: true });
  JobsLogger.info("[ViewDecay] Finished decaying view counts.");
}
