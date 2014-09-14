package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class LostAndFound extends BaseModel {
	public String title;

	@Column(length = 4000000)
	public String contents;
	public Date startTime;

	public static LostAndFound findOneById(long announcementId) {
		return LostAndFound.find("id=?", announcementId).first();
	}

	public static List<LostAndFound> fetchAllLostAndFounds(int page, int size) {
		return find("isDeleted=false order by createTime desc").fetch(page,
				size);
	}

	public static long countLostAndFounds() {
		return count("isDeleted=false");
	}

	public static LostAndFound lostAndFoundUpdateAttributes(
			long announcementsId, String title, Date startTime, String contents) {
		LostAndFound LostAndFound = new LostAndFound();
		if (LostAndFound.findOneById(announcementsId) != null) {
			LostAndFound = LostAndFound.findOneById(announcementsId);
		}
		LostAndFound.title = title;
		LostAndFound.startTime = startTime;
		LostAndFound.contents = contents;
		LostAndFound.save();
		return LostAndFound;
	}

	public void removeOne() {
		// 相关的orderItem不删除
		// 相关的attachment不删除
		this.isDeleted = true;
		this.save();
	}
}
