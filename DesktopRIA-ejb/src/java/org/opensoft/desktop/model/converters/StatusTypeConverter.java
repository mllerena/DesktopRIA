/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.opensoft.desktop.model.converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.opensoft.desktop.model.enums.StatusType;

/**
 *
 * @author mllerena
 */

@Converter(autoApply = true)
public class StatusTypeConverter implements AttributeConverter<StatusType, String>{

    @Override
    public String convertToDatabaseColumn(StatusType attribute) {
        switch (attribute) {
            case ACTIVO:
                return "A";
            case INACTIVO:
                return "H";
            default:
                throw new IllegalArgumentException("Unknown" + attribute);
        }
    }

    @Override
    public StatusType convertToEntityAttribute(String dbData) {
        switch (dbData) {
            case "A":
                return StatusType.ACTIVO;
            case "I":
                return StatusType.INACTIVO;
            default:
                throw new IllegalArgumentException("Unknown" + dbData);
        }
    }
    
}
