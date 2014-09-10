package jobs;

import models.Person;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

/**
 * @author xuyuzhu
 */
@OnApplicationStart
public class StartUp extends Job {

	@Override
	public void doJob() throws Exception {
		Person.initAdmin();
		super.doJob();
	}

}
