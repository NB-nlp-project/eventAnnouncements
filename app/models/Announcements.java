package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

@Entity
public class Announcements extends BaseModel {
	public String title;
	public String contents;
	public Date startTime;
	public Date endTime;

	public static Announcements findOneById(long announcementId) {
		return Announcements.find("id=?", announcementId).first();
	}

	public static List<Announcements> fetchAllAnnouncements(int page, int size) {
		return find("isDeleted=false order by createTime desc").fetch(page,
				size);
	}

	public static long countAnnouncements() {
		return count("isDeleted=false");
	}
}
