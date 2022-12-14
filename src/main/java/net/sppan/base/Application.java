package net.sppan.base;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
@MapperScan("net.sppan.base.dao.mapper")
public class Application{

	private static Logger logger = LoggerFactory.getLogger(Application.class);
	/**
	 */
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		logger.debug("启动成功");
	}
	
}
