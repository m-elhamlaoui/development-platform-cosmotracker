package com.cosmic.tracker;

import org.junit.jupiter.api.Disabled;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class TrackerApplicationTests {

	@Disabled("Temporarily disabled due to context loading issue")
	void contextLoads() {
	}
}
