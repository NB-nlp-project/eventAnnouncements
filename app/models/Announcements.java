package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Announcements extends BaseModel {
	public String title;

	@Column(length = 4000000)
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

	public static Announcements announcementsUpdateAttributes(
			long announcementsId, String title, Date startTime, Date endTime,
			String contents) {
		Announcements announcements = new Announcements();
		if (Announcements.findOneById(announcementsId) != null) {
			announcements = Announcements.findOneById(announcementsId);
		}
		announcements.title = title;
		announcements.startTime = startTime;
		announcements.endTime = endTime;
		announcements.contents = contents;
		announcements.save();
		return announcements;
	}

	public void removeOne() {
		// 相关的orderItem不删除
		// 相关的attachment不删除
		this.isDeleted = true;
		this.save();
	}
}
