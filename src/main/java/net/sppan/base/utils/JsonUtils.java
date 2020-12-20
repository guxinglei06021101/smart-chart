package net.sppan.base.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;

import java.io.IOException;

public class JsonUtils {

    /**
     * 将对象的大写转换为下划线加小写，例如：userName-->user_name
     *
     * @param object
     * @return
     * @throws JsonProcessingException
     */
    public static String toUnderlineJSONString(Object object) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        String reqJson = null;
        try {
            reqJson = mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return reqJson;
    }

    /**
     * 将下划线转换为驼峰的形式，例如：user_name-->userName
     *
     * @param json
     * @param clazz
     * @return
     * @throws IOException
     */
    public static <T> T toSnakeObject(String json, Class<T> clazz) throws IOException {
        ObjectMapper mapper = new ObjectMapper();// mapper的configure方法可以设置多种配置（例如：多字段 少字段的处理）
        //mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        T reqJson =  mapper.readValue(json, clazz);
        return reqJson;
    }
}
