/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.opensoft.desktop.view.utils;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.json.Json;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author MLLERENA
 */
public class JsonUtil {

    public static JsonObjectBuilder convertEntityToJSON(Object entity) {
        JsonObjectBuilder jObjectNode = Json.createObjectBuilder();

        try {

            Class clazz = entity.getClass();
            Field[] fields = clazz.getDeclaredFields();

            System.out.println("fields - " + fields.length);

            for (Field field : fields) {

                System.out.println("nuevo");

                field.setAccessible(true);

                //{IndirectList: not instantiated}
                if (field.get(entity) != null) {

                    System.out.println("field.getName() - " + field.getName() + " : " + field.get(entity));

                    if (field.get(entity) instanceof Long) {
                        jObjectNode.add(field.getName(), (Long) field.get(entity));
                    } else if (field.get(entity) instanceof String) {
                        jObjectNode.add(field.getName(), (String) field.get(entity));
                    } else if (field.get(entity) instanceof Double) {
                        jObjectNode.add(field.getName(), (Double) field.get(entity));
                    } else if (field.get(entity) instanceof Boolean) {
                        jObjectNode.add(field.getName(), (Boolean) field.get(entity));
                    } else if (field.get(entity) instanceof Date) {
                        Date date = (Date) field.get(entity);
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        jObjectNode.add(field.getName(), sdf.format(date));
                    } else if (field.get(entity) instanceof BigDecimal) {
                        jObjectNode.add(field.getName(), (BigDecimal) field.get(entity));
                    } else if (field.get(entity) instanceof BigInteger) {
                        jObjectNode.add(field.getName(), (BigInteger) field.get(entity));
                    }

                }

            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return jObjectNode;

    }

}
