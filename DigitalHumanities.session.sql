SELECT COUNT(id)
					FROM ExtractedText
					WHERE content LIKE "%上海%"
					AND issue_name LIKE "RMHB%"
					AND issue_time >= "1950-01"
					AND issue_time <= "1970-12"
					ORDER BY page_name